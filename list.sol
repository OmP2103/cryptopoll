// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PollContract {
    struct Option {
        string name;
        uint256 votes;
    }
//struct for POLl
    struct Poll {
        string question;
        Option[] options;
    }

    Poll[] public polls;
//creates poll passing in the question and options
    function createPoll(string memory _question, string[] memory _options) external {
        require(_options.length >= 2, "Must provide at least two options");

        Poll storage newPoll = polls.push();
        newPoll.question = _question;

        for (uint256 i = 0; i < _options.length; i++) {
            newPoll.options.push(Option({ name: _options[i], votes: 0 }));
        }
    }

//when user selects index and votes this vote function is called
    function vote(uint256 pollIndex, uint256 optionIndex) external {
        require(pollIndex < polls.length, "Invalid poll index");
        require(optionIndex < polls[pollIndex].options.length, "Invalid option index");

        polls[pollIndex].options[optionIndex].votes++;
    }

    function voteForOption(uint256 pollIndex, uint256 optionIndex) external {
        require(pollIndex < polls.length, "Invalid poll index");
        require(optionIndex < polls[pollIndex].options.length, "Invalid option index");

        polls[pollIndex].options[optionIndex].votes++;
    }
//returns all polls in the contract
    function getPolls() external view returns (Poll[] memory) {
        return polls;
    }
}
