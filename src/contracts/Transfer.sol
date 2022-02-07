//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.5.0;

contract Transfer {
    address public admin;
    uint public lasTransfer;

    constructor() public {
        admin = msg.sender;
    }

    modifier onlyAdmin {
        require(msg.sender == admin, "only owner can");
        _;
    }

    function setTransferCompleted(uint completed) public onlyAdmin {
        lasTransfer = completed;
    }

    function upgradeTransfer(address newAdmin) public onlyAdmin {
        Transfer upgraded = Transfer(newAdmin);
        upgraded.setTransferCompleted(lasTransfer);
    }
}