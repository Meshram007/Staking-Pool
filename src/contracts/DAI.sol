//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.5.0;

contract DAI {
    string public name = "dai";
    string public symbol = "DAI";
    uint public totalSupply = 1000000000000000000000000;  //1 millions tokens
    uint public decimals = 18;

    event Transfer(address indexed _from, address indexed _to, uint _value);
    event Approve(address indexed _owner, address indexed _spender, uint _value);

    mapping(address => uint) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;

    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint _value) public returns(bool success) {
        //receiver address should not be zero
        require(_to != address(0), "Zero Address");
        require(balanceOf[msg.sender] >= _value, "less amount availaible");
        //transfer the amount and subtract the value
        balanceOf[msg.sender] -= _value;
        //add balances
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;  
    } 

    function approve(address _spender, uint _value) public returns(bool success){
        allowance[msg.sender][_spender] = _value;
        emit Approve(msg.sender,_spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint _value) public returns(bool success){
        //receiver address should not be zero
        require(_to != address(0), "Zero Address");
        require(balanceOf[_from] >= _value, "less amount availaible");
        require(allowance[_from][msg.sender] >= _value);
        //subtract the balance for  transferForm
        balanceOf[_from] -= _value;

        //add balance for the transferFrom
        balanceOf[_to] += _value;
           
        allowance[_from][msg.sender] -= _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }


}