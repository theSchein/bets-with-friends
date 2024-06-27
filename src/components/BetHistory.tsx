"use client";

import React, { useEffect, useState } from "react";
import { getContract } from "thirdweb";
import { ethers } from "ethers";
import { client, contract } from "@/app/client";
import { bet } from "../generated/bet";
import { resolveName } from "thirdweb/extensions/ens";
import { Collapse } from "@mui/material"; // Import MUI Collapse for collapsibility

interface BetHistoryProps {
  betAddresses: string[];
  accountAddress: string;
}

const BetHistory: React.FC<BetHistoryProps> = ({ betAddresses, accountAddress }) => {
  const [betDetails, setBetDetails] = useState<any[]>([]);
  const [stats, setStats] = useState({
    betsWon: 0,
    betsLost: 0,
    betsDecided: 0,
    pnl: 0,
  });
  const address = accountAddress.toLowerCase();
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    const fetchBetDetails = async () => {
      const details: any[] = [];
      let betsWon = 0;
      let betsLost = 0;
      let betsDecided = 0;
      let pnl = 0;

      for (const betAddress of betAddresses) {
        try {
          console.log(`Processing bet address: ${betAddress}`);
          const betContract = getContract({
            client,
            address: betAddress,
            chain: contract.chain,
          });

          const betData = await bet({ contract: betContract });
          console.log("Bet data:", betData);

          if (betData) {
            console.log("Resolving ENS names...");
            const [better1, better2, decider, winner] = await Promise.all([
              resolveName({ client, address: betData[0] }).catch(() => null),
              resolveName({ client, address: betData[1] }).catch(() => null),
              resolveName({ client, address: betData[2] }).catch(() => null),
              resolveName({ client, address: betData[6] }).catch(() => null),
            ]);

            const isWinner = winner && winner.toLowerCase() === address;
            const isDecider = decider && decider.toLowerCase() === address;

            if (betData[5] === 3 || betData[5] === 4) { // Resolved or Invalid status
              details.push({
                address: betAddress,
                better1: better1 || betData[0],
                better2: better2 || betData[1],
                decider: decider || betData[2],
                wagerWei: betData[3].toString(),
                wagerEth: ethers.utils.formatEther(betData[3]),
                conditions: betData[4],
                status: betData[5],
                winner: winner || betData[6],
              });

              if (isWinner) {
                betsWon += 1;
                pnl += parseFloat(ethers.utils.formatEther(betData[3]));
              } else if (!isDecider) {
                betsLost += 1;
                pnl -= parseFloat(ethers.utils.formatEther(betData[3]));
              }

              if (isDecider) {
                betsDecided += 1;
              }
            }
          }
        } catch (error) {
          console.error(`Error fetching bet details for ${betAddress}:`, error);
        }
      }

      setBetDetails(details);
      setStats({ betsWon, betsLost, betsDecided, pnl });
    };

    fetchBetDetails();
  }, [betAddresses, address]);

  const shortenAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="my-4 p-4 bg-green-600 text-white rounded">
      <h3 className="text-lg font-bold mb-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        Bet History
      </h3>
      <Collapse in={isOpen}>
        <div className="p-4 bg-green-800 text-white rounded mb-4 shadow-lg">
          <h4 className="text-xl font-bold mb-2">Statistics</h4>
          <p>Bets Won: {stats.betsWon}</p>
          <p>Bets Lost: {stats.betsLost}</p>
          <p>Bets Decided: {stats.betsDecided}</p>
          <p>Profit and Loss (PnL): {stats.pnl.toFixed(2)} ETH</p>
        </div>
        {betDetails.map((bet, index) => {
          console.log(`Rendering bet ${index}:`, bet);

          return (
            <div key={index} className="p-4 bg-green-800 text-white rounded mb-2 shadow-lg">
              <h4 className="text-xl font-bold mb-2">{bet.conditions}</h4>
              <div className="flex justify-between mb-2">
                <span>Better 1: {bet.better1.endsWith('.eth') ? bet.better1 : shortenAddress(bet.better1)}</span>
                <span>Better 2: {bet.better2.endsWith('.eth') ? bet.better2 : shortenAddress(bet.better2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Decider: {bet.decider.endsWith('.eth') ? bet.decider : shortenAddress(bet.decider)}</span>
                <span>Wager: {bet.wagerEth} ETH</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Status: {bet.status === 3 ? "Resolved" : "Invalidated"}</span>
                <span>Winner: {bet.winner.endsWith('.eth') ? bet.winner : shortenAddress(bet.winner)}</span>
              </div>
            </div>
          );
        })}
      </Collapse>
    </div>
  );
};

export default BetHistory;
