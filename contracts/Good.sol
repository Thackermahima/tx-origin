// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;
contract Good {
    address public owner;

    constructor(){
        owner = msg.sender;
    }
    function setOwner(address _newOwner) public{
     require(tx.origin == owner,"Not owner");
     owner = _newOwner;
    }
}