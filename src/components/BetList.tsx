"use client";

import React, { useEffect, useState } from 'react';
import web3 from '../utils/web3';
import betFactory from '../utils/betFactory';
import Bet from '../artifacts/contracts/Bet.sol/Bet.json';

interface BetDetails {
    address: string;
    better1: string;
    better2: string;
    decider: string;
    wager: string;
    conditions: string;
    status: number;
    winner: string;
    totalFunded: string;
}

const BetList: React.FC = () => {
    const [bets, setBets] = useState<BetDetails[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBets = async () => {
            const betAddresses: string[] = await betFactory.methods.getBets().call();
            const betDetails: BetDetails[] = await Promise.all(betAddresses.map(async (address) => {
                const betContract = new web3.eth.Contract(Bet.abi, address);
                const bet = await betContract.methods.bet().call();
                const totalFunded = await betContract.methods.totalFunded().call();
                return { address, ...bet, totalFunded };
            }));
            setBets(betDetails);
            setLoading(false);
        };

        fetchBets();
    }, []);

    const renderBets = () => {
        return bets.map((bet, index) => (
            <div key={index}>
                <p>Better 1: {bet.better1}</p>
                <p>Better 2: {bet.better2}</p>
                <p>Decider: {bet.decider}</p>
                <p>Wager: {web3.utils.fromWei(bet.wager, 'ether')} ETH</p>
                <p>Conditions: {bet.conditions}</p>
                <p>Status: {BetStatus[bet.status]}</p>
                <p>Total Funded: {web3.utils.fromWei(bet.totalFunded, 'ether')} ETH</p>
                {bet.status === 1 && <p>Winner: {bet.winner}</p>}
            </div>
        ));
    };

    return (
        <div>
            <h2>Ongoing and Closed Bets</h2>
            {loading ? <p>Loading...</p> : renderBets()}
        </div>
    );
};

enum BetStatus {
    Unfunded,
    Funded,
    Pending,
    Resolved,
    Invalid
}

export default BetList;
