// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Token {
    string public name = "Token";
    string public symbol = "TKN";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    address public owner;
    uint256 public tokenValue = 3000000; // 0.000000003 TBNB
    mapping(address => uint256) public balanceOf;
    mapping(address => uint256) public voteTokens;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event TokensPurchased(address indexed buyer, uint256 tokensPurchased, uint256 tbnbSent);
    event TokenValueUpdated(uint256 newValue);

//gives inital supply
    constructor(uint256 _initialSupply) {
        totalSupply = _initialSupply * 10 ** uint256(decimals);
        balanceOf[msg.sender] = totalSupply;
        owner = msg.sender;
    }
//buy token function sends me TBNB in exchance for vote tokens
    function buyTokens(uint256 _tokensToBuy) external payable {
        uint256 requiredTbnb = _tokensToBuy * tokenValue;

        require(msg.value >= requiredTbnb, "Insufficient TBNB sent");

        uint256 tokensToPurchase = _tokensToBuy * 10 ** uint256(decimals);

        balanceOf[owner] -= tokensToPurchase;
        balanceOf[msg.sender] += tokensToPurchase;

        // Increase vote tokens of user
        voteTokens[msg.sender] += _tokensToBuy;

        // Transfer TBNB to owner
        payable(owner).transfer(requiredTbnb);

        emit Transfer(owner, address(this), tokensToPurchase);
        emit TokensPurchased(msg.sender, _tokensToBuy, requiredTbnb);
    }

    function setTokenValue(uint256 _newValue) external {
        require(msg.sender == owner, "Only owner can set token value");
        tokenValue = _newValue;
        emit TokenValueUpdated(_newValue);
    }

    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }

    // Fallback function to receive ether
    receive() external payable {}

//function gets me the users vote tokens
    function getVoteTokens() external view returns (uint256) {
        return voteTokens[msg.sender];
    }

//decrements the users vote tokens by 1 whenever they vote
    function decrementVoteTokens() external {
        require(voteTokens[msg.sender] > 0, "Insufficient vote tokens");
        voteTokens[msg.sender]--;
    }
}
