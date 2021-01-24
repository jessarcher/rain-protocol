// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./AnyToken.sol";

contract BToken is AnyToken {
    constructor() public AnyToken(10 ** 19, "Token B", "TKNB") {}
}
