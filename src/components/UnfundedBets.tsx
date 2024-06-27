"use client";

import React, { useEffect, useState } from "react";
import { useSendTransaction } from "thirdweb/react";
import { getContract } from "thirdweb";
import { ethers } from "ethers";
import { client, contract } from "@/app/client";
import { bet, fundBet } from "../generated/bet";
import { resolveName } from "thirdweb/extensions/ens";
import { Collapse } from "@mui/material"; 

interface UnfundedBetsProps {
  betAddresses: string[];
  accountAddress: string;
}

const UnfundedBets: React.FC<UnfundedBetsProps> = ({ betAddresses, accountAddress }) => {
  const [betDetails, setBetDetails] = useState<any[]>([]);
  const [ethToUsdRate, setEthToUsdRate] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const address = accountAddress.toLowerCase();
  const { mutateAsync: sendTransaction } = useSendTransaction();

  useEffect(() => {
    const fetchEthToUsdRate = async () => {
      try {
        const response = await fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD");
        const data = await response.json();
        setEthToUsdRate(data.USD);
      } catch (error) {
        console.error("Error fetching ETH to USD rate:", error);
      }
    };

    fetchEthToUsdRate();
  }, []);

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
              better1: better1 || betData[0],
              better2: better2 || betData[1],
              decider: decider || betData[2],
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

  const handleFundBet = async (betAddress: string, wagerWei: string) => {
    try {
      const betContract = getContract({
        client,
        address: betAddress,
        chain: contract.chain,
      });

      const transaction = fundBet({
        contract: betContract,
      });

      await sendTransaction({ ...transaction, value: wagerWei });
      alert("Bet funded successfully!");
    } catch (error) {
      console.error("Error funding bet:", error);
      alert(`Error funding bet. Please try again. Details: ${error.message || error}`);
    }
  };

  const shortenAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="my-4 p-4 bg-blue-600 text-white rounded">
      <h3 className="text-lg font-bold mb-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        Unfunded Bets
      </h3>
      <Collapse in={isOpen}>
        {betDetails.map((bet, index) => {
          const wagerInUsd = (parseFloat(bet.wagerEth) * ethToUsdRate).toFixed(2);

          return (
            <div key={index} className="p-4 bg-blue-800 text-white rounded mb-2 shadow-lg">
              <h4 className="text-xl font-bold mb-2">{bet.conditions}</h4>
              <div className="flex justify-between mb-2">
                <span>Better 1: {bet.better1.endsWith('.eth') ? bet.better1 : shortenAddress(bet.better1)}</span>
                <span>Better 2: {bet.better2.endsWith('.eth') ? bet.better2 : shortenAddress(bet.better2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Decider: {bet.decider.endsWith('.eth') ? bet.decider : shortenAddress(bet.decider)}</span>
                <span>Wager: {bet.wagerEth} ETH (${wagerInUsd} USD)</span>
              </div>
              {address === bet.better1.toLowerCase() || address === bet.better2.toLowerCase() ? (
                <button
                  onClick={() => handleFundBet(bet.address, bet.wagerWei)}
                  className="w-full p-2 bg-yellow-500 text-black rounded mt-2 hover:bg-yellow-400 transition-colors"
                >
                  Fund Bet
                </button>
              ) : (
                <p className="mt-2 text-center">You are the decider for this bet.</p>
              )}
            </div>
          );
        })}
      </Collapse>
    </div>
  );
};

export default UnfundedBets;
