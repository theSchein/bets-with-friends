"use client";

import React, { useEffect, useState } from "react";
import { useSendTransaction } from "thirdweb/react";
import { getContract } from "thirdweb";
import { ethers } from "ethers";
import { client, contract } from "@/app/client";
import { bet, resolveBet, invalidateBet } from "../generated/bet";
import { resolveName } from "thirdweb/extensions/ens";
import { Collapse } from "@mui/material"; 

interface OpenBetsProps {
  betAddresses: string[];
  accountAddress: string;
}

const OpenBets: React.FC<OpenBetsProps> = ({ betAddresses, accountAddress }) => {
  const [betDetails, setBetDetails] = useState<any[]>([]);
  const address = accountAddress.toLowerCase();
  const { mutateAsync: sendTransaction } = useSendTransaction();
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    const fetchBetDetails = async () => {
      const details: any[] = [];

      for (const betAddress of betAddresses) {
        try {
          const betContract = getContract({
            client,
            address: betAddress,
            chain: contract.chain,
          });

          const betData = await bet({ contract: betContract });

          if (betData) {
            const [better1, better2, decider] = await Promise.all([
              resolveName({ client, address: betData[0] }).catch(() => null),
              resolveName({ client, address: betData[1] }).catch(() => null),
              resolveName({ client, address: betData[2] }).catch(() => null),
            ]);

            details.push({
              address: betAddress,
              better1: betData[0],
              better1Display: better1 || betData[0],
              better2: betData[1],
              better2Display: better2 || betData[1],
              decider: betData[2],
              deciderDisplay: decider || betData[2],
              wagerWei: betData[3].toString(),
              wagerEth: ethers.utils.formatEther(betData[3]),
              conditions: betData[4],
              status: betData[5],
            });
          }
        } catch (error) {
          console.error(`Error fetching bet details for ${betAddress}:`, error);
        }
      }

      setBetDetails(details);
    };

    fetchBetDetails();
  }, [betAddresses, address]);

  const handleResolveBet = async (betAddress: string, winnerAddress: string) => {
    try {
      const betContract = getContract({
        client,
        address: betAddress,
        chain: contract.chain,
      });

      const transaction = resolveBet({
        contract: betContract,
        winner: winnerAddress,
      });

      await sendTransaction(transaction);
      alert("Bet resolved successfully!");
    } catch (error) {
      console.error("Error resolving bet:", error);
      alert(`Error resolving bet. Please try again. Details: ${error.message || error}`);
    }
  };

  const handleInvalidateBet = async (betAddress: string) => {
    try {
      const betContract = getContract({
        client,
        address: betAddress,
        chain: contract.chain,
      });

      const transaction = invalidateBet({
        contract: betContract,
      });

      await sendTransaction(transaction);
      alert("Bet invalidated successfully!");
    } catch (error) {
      console.error("Error invalidating bet:", error);
      alert(`Error invalidating bet. Please try again. Details: ${error.message || error}`);
    }
  };

  const shortenAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="my-4 p-4 bg-blue-600 text-white rounded">
      <h3 className="text-lg font-bold mb-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        Open Bets
      </h3>
      <Collapse in={isOpen}>
        {betDetails.map((bet, index) => {
          console.log(`Rendering bet ${index}:`, bet);

          return (
            <div key={index} className="p-4 bg-blue-800 text-white rounded mb-2 shadow-lg">
              <h4 className="text-xl font-bold mb-2">{bet.conditions}</h4>
              <div className="flex justify-between mb-2">
                <span>Better 1: {bet.better1Display.endsWith('.eth') ? bet.better1Display : shortenAddress(bet.better1Display)}</span>
                <span>Better 2: {bet.better2Display.endsWith('.eth') ? bet.better2Display : shortenAddress(bet.better2Display)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Decider: {bet.deciderDisplay.endsWith('.eth') ? bet.deciderDisplay : shortenAddress(bet.deciderDisplay)}</span>
                <span>Wager: {bet.wagerEth} ETH</span>
              </div>
              {address === bet.decider.toLowerCase() ? (
                <div>
                  <button
                    onClick={() => handleResolveBet(bet.address, bet.better1)}
                    className="w-full p-2 bg-green-500 text-black rounded mt-2 hover:bg-green-400 transition-colors"
                  >
                    Declare Better 1 as Winner
                  </button>
                  <button
                    onClick={() => handleResolveBet(bet.address, bet.better2)}
                    className="w-full p-2 bg-green-500 text-black rounded mt-2 hover:bg-green-400 transition-colors"
                  >
                    Declare Better 2 as Winner
                  </button>
                  <button
                    onClick={() => handleInvalidateBet(bet.address)}
                    className="w-full p-2 bg-red-500 text-black rounded mt-2 hover:bg-red-400 transition-colors"
                  >
                    Invalidate Bet
                  </button>
                </div>
              ) : (
                <p className="mt-2 text-center">Waiting for the decider to resolve the bet.</p>
              )}
            </div>
          );
        })}
      </Collapse>
    </div>
  );
};

export default OpenBets;
