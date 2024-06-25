// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Bet.sol";

contract BetFactory {
    address[] public bets;

    event BetCreated(address betAddress);

    function createBet(address _better1, address _better2, address _decider, uint256 _wager, string memory _conditions) public {
        Bet newBet = new Bet(_better1, _better2, _decider, _wager, _conditions);
        bets.push(address(newBet));
        emit BetCreated(address(newBet));
    }

    function getBets() public view returns (address[] memory) {
        return bets;
    }
}
