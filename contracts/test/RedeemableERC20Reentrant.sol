// SPDX-License-Identifier: CAL
pragma solidity ^0.8.10;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import { ReserveToken } from "./ReserveToken.sol";
// solhint-disable-next-line max-line-length
import { RedeemableERC20, ERC20 } from "../redeemableERC20/RedeemableERC20.sol";

/// @title RedeemableERC20Reentrant
/// Test contract that attempts to call reentrant code on `RedeemableERC20`.
/// The calls MUST fail when driven by the test harness.
contract RedeemableERC20Reentrant is ReserveToken {
    RedeemableERC20 private redeemableERC20Contract;

    /// Configures the contract to attempt to reenter.
    constructor(RedeemableERC20 redeemableERC20Contract_)
        ReserveToken()
    {
        redeemableERC20Contract = redeemableERC20Contract_;
    }

    /// @inheritdoc ERC20
    function _beforeTokenTransfer(
        address sender_,
        address receiver_,
        uint256 amount_
    ) internal virtual override {
        super._beforeTokenTransfer(sender_, receiver_, amount_);
        if (
            sender_ != address(0)
            && sender_ == address(redeemableERC20Contract)
        ) {
            IERC20[] memory treasuryAssets_ = new IERC20[](1);
            treasuryAssets_[0] = IERC20(address(this));
            // This call MUST fail.
            redeemableERC20Contract.redeem(
                treasuryAssets_,
                amount_
            );
        }
    }
}
