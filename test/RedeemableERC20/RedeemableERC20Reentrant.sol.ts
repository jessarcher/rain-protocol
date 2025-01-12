import * as Util from "../Util";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import { ethers } from "hardhat";
import type { ReadWriteTier } from "../../typechain/ReadWriteTier";
import type { RedeemableERC20Reentrant } from "../../typechain/RedeemableERC20Reentrant";
import type { RedeemableERC20 } from "../../typechain/RedeemableERC20";
import type { Contract } from "ethers";

chai.use(solidity);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { expect, assert } = chai;

enum Tier {
  NIL,
  COPPER,
  BRONZE,
  SILVER,
  GOLD,
  PLATINUM,
  DIAMOND,
  CHAD,
  JAWAD,
}

describe("RedeemableERC20Reentrant", async function () {
  it("should guard against reentrancy if a treasury asset is malicious", async function () {
    this.timeout(0);

    const ONE_TOKEN = ethers.BigNumber.from("1" + Util.eighteenZeros);
    const FIFTY_TOKENS = ethers.BigNumber.from("50" + Util.eighteenZeros);

    const signers = await ethers.getSigners();

    // Constructing the RedeemableERC20 sets the parameters but nothing stateful happens.

    const tierFactory = await ethers.getContractFactory("ReadWriteTier");
    const tier = (await tierFactory.deploy()) as ReadWriteTier & Contract;

    const minimumStatus = Tier.NIL;

    const redeemableERC20Factory = await ethers.getContractFactory(
      "RedeemableERC20"
    );
    const maliciousReserveFactory = await ethers.getContractFactory(
      "RedeemableERC20Reentrant"
    );
    const erc20Config = { name: "RedeemableERC20", symbol: "RDX" };
    const totalSupply = ethers.BigNumber.from("5000" + Util.eighteenZeros);

    const redeemableERC20 = (await redeemableERC20Factory.deploy({
      admin: signers[0].address,
      erc20Config,
      tier: tier.address,
      minimumStatus: minimumStatus,
      totalSupply: totalSupply,
    })) as RedeemableERC20 & Contract;

    await redeemableERC20.deployed();

    const maliciousReserve = (await maliciousReserveFactory.deploy(
      redeemableERC20.address
    )) as RedeemableERC20Reentrant & Contract;

    // send redeemable tokens to signer 1
    await redeemableERC20.transfer(signers[1].address, FIFTY_TOKENS);

    await redeemableERC20.grantRole(
      await redeemableERC20.DISTRIBUTOR_BURNER(),
      signers[0].address
    );

    await redeemableERC20.burnDistributor(Util.oneAddress);

    // theoretical pool amount being sent to redeemable token
    const reserveTotal = ethers.BigNumber.from("1000" + Util.sixZeros);

    // move all reserve tokens from pool, to become redeemables
    await maliciousReserve.transfer(redeemableERC20.address, reserveTotal);

    await Util.assertError(
      async () =>
        await redeemableERC20
          .connect(signers[1])
          .redeem([maliciousReserve.address], ONE_TOKEN),
      "revert ReentrancyGuard: reentrant call",
      "did not guard against reentrancy attack"
    );
  });
});
