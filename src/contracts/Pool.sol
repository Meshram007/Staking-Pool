//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.5.0;

import "./YTH.sol";
import "./DAI.sol";

contract Pool is DAI, YTH {
    string public name = "Pool";
    address public owner;
    DAI public dai;
    YTH public yth;

    address[] public stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaked;

    constructor(YTH _yth, DAI _dai) public {
        dai = _dai;
        yth = _yth;
    }
   
    function stakeTokens(uint amount) public {
        require(amount > 0, "amount can not be zero");

        //transfer dao tokens to the yhis contract for staking
        dai.transferFrom(msg.sender, address(this), amount);
        
        //update the staking balance
        stakingBalance[msg.sender] -=amount;

        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        //updating the staking balanace
        hasStaked[msg.sender] = true;
        isStaked[msg.sender] = true;
    }
    
    //distribute rewards to customers
    function rewardDistribution() public {
        //require the owner to distribute tokens only
        require(msg.sender == owner, "only owner can");
        for(uint i = 0; i < stakers.length; i++ ) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient] / 9;
            if(balance > 0) {
                yth.transfer(recipient, balance);
            }
        } 
    }

    //unstake funds
    function unStake(uint _amount) public {
        uint balance = stakingBalance[msg.sender];
        require(balance > 0 , "can not be zero");

        //trasnsfer the balance from pool to user
        dai.transfer(msg.sender, _amount);
        stakingBalance[msg.sender] -= _amount;

        //updates staking status
        isStaked[msg.sender] = false;
    }
} 