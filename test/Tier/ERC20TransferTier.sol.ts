import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import type { Contract } from "ethers";
import { ethers } from "hardhat";
import type { ERC20TransferTier } from "../../typechain/ERC20TransferTier";
import type { ReserveTokenTest } from "../../typechain/ReserveTokenTest";
import { assertError, basicDeploy, eighteenZeros } from "../Util";

chai.use(solidity);
const { expect, assert } = chai;

enum Tier {
  ZERO,
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
}

const LEVELS = Array.from(Array(8).keys()).map((value) =>
  ethers.BigNumber.from(++value + eighteenZeros)
);

describe("ERC20TransferTier", async function () {
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;
  let erc20TransferTier: ERC20TransferTier & Contract;
  let reserve: ReserveTokenTest & Contract;

  beforeEach(async () => {
    [, alice, bob] = await ethers.getSigners();

    reserve = (await basicDeploy("ReserveTokenTest", {})) as ReserveTokenTest &
      Contract;

    const erc20TransferTierFactory = await ethers.getContractFactory(
      "ERC20TransferTier"
    );

    erc20TransferTier = (await erc20TransferTierFactory.deploy(
      reserve.address,
      LEVELS
    )) as ERC20TransferTier & Contract;

    await erc20TransferTier.deployed();
  });

  it("should have no hysteresis on balance when repeatedly shifting tiers", async () => {
    const requiredTierFour = LEVELS[3];
    const requiredTierFive = LEVELS[4];

    // give Alice exact amount for Tier FIVE
    await reserve.transfer(alice.address, requiredTierFive);

    // Alice sets Tier FIVE
    await reserve
      .connect(alice)
      .approve(erc20TransferTier.address, requiredTierFive);
    await erc20TransferTier
      .connect(alice)
      .setTier(alice.address, Tier.FIVE, []);

    assert(
      (await reserve.balanceOf(erc20TransferTier.address)).eq(requiredTierFive),
      "wrong reserve balance on tier"
    );
    assert(
      (await reserve.balanceOf(alice.address)).isZero(),
      "wrong reserve balance for alice"
    );

    // Alice downgrades to Tier FOUR, receives refund
    await erc20TransferTier
      .connect(alice)
      .setTier(alice.address, Tier.FOUR, []);

    assert(
      (await reserve.balanceOf(erc20TransferTier.address)).eq(requiredTierFour),
      "wrong reserve balance on tier"
    );
    assert(
      (await reserve.balanceOf(alice.address)).eq(
        requiredTierFive.sub(requiredTierFour)
      ),
      "wrong reserve balance for alice"
    );

    // Alice upgrades from FOUR back up to FIVE
    await reserve
      .connect(alice)
      .approve(
        erc20TransferTier.address,
        requiredTierFive.sub(requiredTierFour)
      );
    await erc20TransferTier
      .connect(alice)
      .setTier(alice.address, Tier.FIVE, []);

    assert(
      (await reserve.balanceOf(erc20TransferTier.address)).eq(requiredTierFive),
      "wrong reserve balance on tier"
    );
    assert(
      (await reserve.balanceOf(alice.address)).isZero(),
      "wrong reserve balance for alice"
    );
  });

  it("should allow delegating tier upgrades", async () => {
    const requiredForTier2 = LEVELS[1];

    await reserve.transfer(bob.address, requiredForTier2);

    // bob intends to cover the cost of upgrading alice
    await reserve
      .connect(bob)
      .approve(erc20TransferTier.address, requiredForTier2);

    // bob sets alice's tier to TWO
    await erc20TransferTier.connect(bob).setTier(alice.address, Tier.TWO, []);
  });

  it("should prevent delegating tier downgrades, sender must much target", async () => {
    const requiredForTier2 = LEVELS[1];

    await reserve.transfer(alice.address, requiredForTier2);

    // alice sets their tier to TWO
    await reserve
      .connect(alice)
      .approve(erc20TransferTier.address, requiredForTier2);
    await erc20TransferTier.connect(alice).setTier(alice.address, Tier.TWO, []);

    await assertError(
      async () =>
        await erc20TransferTier
          .connect(bob)
          .setTier(alice.address, Tier.ONE, []),
      "revert DELEGATED_TIER_LOSS",
      "bob downgraded alice's tier"
    );

    await erc20TransferTier.connect(alice).setTier(alice.address, Tier.ONE, []);
  });

  it("should correctly handle block number on same tier", async () => {
    const requiredForTier2 = LEVELS[1];
    const aliceErc20TransferTier = erc20TransferTier.connect(alice);
    const bobErc20TransferTier = erc20TransferTier.connect(bob);

    await reserve.transfer(alice.address, requiredForTier2);

    await reserve
      .connect(alice)
      .approve(erc20TransferTier.address, requiredForTier2);
    const report1 = await aliceErc20TransferTier.report(alice.address);
    await aliceErc20TransferTier.setTier(alice.address, Tier.TWO, []);
    const report2 = await aliceErc20TransferTier.report(alice.address);
    await aliceErc20TransferTier.setTier(alice.address, Tier.TWO, []);
    const report3 = await aliceErc20TransferTier.report(alice.address);

    assert(
      !report1.eq(report2),
      `report1 equals report2 ${report1} ${report2}`
    );
    assert(
      report2.eq(report3),
      `report2 not equals report3 ${report2} ${report3}`
    );

    await assertError(
      async () =>
        await bobErc20TransferTier.setTier(alice.address, Tier.TWO, []),
      "revert DELEGATED_TIER_LOSS",
      "bob wrongly set tier when start and end tiers were equivalent"
    );
  });

  it("should restrict setting ZERO tier", async () => {
    await assertError(
      async () =>
        await erc20TransferTier
          .connect(alice)
          .setTier(alice.address, Tier.ZERO, []),
      "revert SET_ZERO_TIER",
      "alice directly set to tier ZERO"
    );
  });

  it("should require transferring ERC20 tokens to set tier directly", async function () {
    // attempt setting tier with zero ERC20 token balance
    assert(
      (await reserve.balanceOf(alice.address)).isZero(),
      "alice doesn't have 0 ERC20 tokens"
    );

    await assertError(
      async () =>
        await erc20TransferTier
          .connect(alice)
          .setTier(alice.address, Tier.ONE, []),
      "revert ERC20: transfer amount exceeds balance",
      "alice set to tier ONE with a zero ERC20 balance"
    );

    // alice has current tier of ZERO
    const report0 = await erc20TransferTier.report(alice.address);
    const expectedReport0 =
      "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF";
    assert(
      report0.eq(expectedReport0),
      `alice was not tier ZERO
      expected  ${expectedReport0}
      got       ${report0.toHexString()}`
    );

    // alice needs ERC20 balance equal to difference between current tier and desired tier
    const requiredForTier1 = LEVELS[0];

    // give alice enough reserve
    await reserve.transfer(alice.address, requiredForTier1);
    assert(
      (await reserve.balanceOf(alice.address)).eq(requiredForTier1),
      "alice has wrong required reserve balance"
    );

    // alice sets their tier to ONE
    await reserve
      .connect(alice)
      .approve(erc20TransferTier.address, requiredForTier1);
    const setTier1Promise = erc20TransferTier
      .connect(alice)
      .setTier(alice.address, Tier.ONE, []);

    await expect(setTier1Promise)
      .to.emit(erc20TransferTier, "TierChange")
      .withArgs(alice.address, Tier.ZERO, Tier.ONE);

    await setTier1Promise;

    // alice has current tier of ONE
    const report1 = await erc20TransferTier.report(alice.address);
    const currentBlockHex1 = ethers.BigNumber.from(
      await ethers.provider.getBlockNumber()
    )
      .toHexString()
      .slice(2);
    const history1 = "0".repeat(8 - currentBlockHex1.length) + currentBlockHex1;
    const expectedReport1 =
      "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffff" + history1;

    assert(
      report1.eq(expectedReport1),
      `alice was not tier ONE
      expected  ${expectedReport1}
      got       ${report1.toHexString()}`
    );

    // alice needs ERC20 balance equal to difference between current tier and desired tier
    const requiredForTier2 = LEVELS[2].sub(LEVELS[1]);

    // give alice enough reserve
    await reserve.transfer(alice.address, requiredForTier2);
    assert(
      (await reserve.balanceOf(alice.address)).eq(requiredForTier2),
      "alice has wrong required reserve balance"
    );

    // alice sets their tier to TWO
    await reserve
      .connect(alice)
      .approve(erc20TransferTier.address, requiredForTier2);
    const setTier2Promise = erc20TransferTier
      .connect(alice)
      .setTier(alice.address, Tier.TWO, []);

    await expect(setTier2Promise)
      .to.emit(erc20TransferTier, "TierChange")
      .withArgs(alice.address, Tier.ONE, Tier.TWO);

    await setTier2Promise;

    // alice has current tier of TWO
    const report2 = await erc20TransferTier.report(alice.address);
    const currentBlockHex2 = ethers.BigNumber.from(
      await ethers.provider.getBlockNumber()
    )
      .toHexString()
      .slice(2);
    const history2 = "0".repeat(8 - currentBlockHex2.length) + currentBlockHex2;
    const expectedReport2 =
      "0xffffffffffffffffffffffffffffffffffffffffffffffff" +
      history2 +
      history1;

    assert(
      report2.eq(expectedReport2),
      `alice was not tier ONE
      expected  ${expectedReport2}
      got       ${report2.toHexString()}`
    );
  });
});
