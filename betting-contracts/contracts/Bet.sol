// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Bet {
    enum BetStatus { Unfunded, Funded, Pending, Resolved, Invalid }
    
    struct BetDetails {
        address better1;
        address better2;
        address decider;
        uint256 wager;
        string conditions;
        BetStatus status;
        address winner;
    }
    
    BetDetails public bet;
    uint256 public totalFunded;

    constructor(address _better1, address _better2, address _decider, uint256 _wager, string memory _conditions) {
        bet.better1 = _better1;
        bet.better2 = _better2;
        bet.decider = _decider;
        bet.wager = _wager;
        bet.conditions = _conditions;
        bet.status = BetStatus.Unfunded;
    }

    function fundBet() public payable {
        require(msg.sender == bet.better1 || msg.sender == bet.better2, "Only the bettors can fund the bet.");
        require(bet.status == BetStatus.Unfunded || bet.status == BetStatus.Funded, "Bet is not in a fundable state.");
        require(msg.value == bet.wager, "Incorrect wager amount.");

        totalFunded += msg.value;

        if (totalFunded == bet.wager * 2) {
            bet.status = BetStatus.Funded;
        } else {
            bet.status = BetStatus.Funded;
        }
    }

    function resolveBet(address _winner) public {
        require(msg.sender == bet.decider, "Only the decider can resolve the bet.");
        require(bet.status == BetStatus.Funded, "Bet is not funded.");
        
        bet.winner = _winner;
        bet.status = BetStatus.Resolved;
        payable(_winner).transfer(address(this).balance);
    }

    function invalidateBet() public {
        require(msg.sender == bet.decider, "Only the decider can invalidate the bet.");
        require(bet.status == BetStatus.Funded, "Bet is not funded.");
        
        bet.status = BetStatus.Invalid;
        payable(bet.better1).transfer(bet.wager);
        payable(bet.better2).transfer(bet.wager);
    }
}
