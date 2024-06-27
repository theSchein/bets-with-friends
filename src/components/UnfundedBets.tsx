"use client";

import React, { useEffect, useState } from "react";
import { useSendTransaction } from "thirdweb/react";
import { getContract } from "thirdweb";
import { ethers } from "ethers";
import { client, contract } from "@/app/client"; 
import { bet, fundBet } from "../generated/bet"; 
import { resolveName } from "thirdweb/extensions/ens";

interface UnfundedBetsProps {
  betAddresses: string[];
  accountAddress: string;
}

const UnfundedBets: React.FC<UnfundedBetsProps> = ({ betAddresses, accountAddress }) => {
  const [betDetails, setBetDetails] = useState<any[]>([]);
  const [ethToUsdRate, setEthToUsdRate] = useState<number>(0);
  const address = accountAddress.toLowerCase();
  const { mutateAsync: sendTransaction } = useSendTransaction();

  useEffect(() => {
    const fetchEthToUsdRate = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
        const data = await response.json();
        setEthToUsdRate(data.ethereum.usd);
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
            const [better1, better2, decider] = await Promise.all([
              resolveName({ client, address: betData[0] }).catch(e => {
                console.error("Error resolving better1 ENS:", e);
                return null;
              }),
              resolveName({ client, address: betData[1] }).catch(e => {
                console.error("Error resolving better2 ENS:", e);
                return null;
              }),
              resolveName({ client, address: betData[2] }).catch(e => {
                console.error("Error resolving decider ENS:", e);
                return null;
              }),
            ]);

            details.push({
              address: betAddress,
              better1: better1 || betData[0],
              better2: better2 || betData[1],
              decider: decider || betData[2],
              wager: ethers.utils.formatUnits(betData[3], "wei"),
              conditions: betData[4],
              status: betData[5],
            });
          }
        } catch (error) {
          console.error(`Error fetching bet details for ${betAddress}:`, error);
        }
      }

      console.log("Final bet details:", details);
      setBetDetails(details);
    };

    fetchBetDetails();
  }, [betAddresses, address]);

  const handleFundBet = async (betAddress: string, wager: string) => {
    try {
      console.log(`Funding bet: ${betAddress}, wager: ${wager}`);
      const betContract = getContract({
        client,
        address: betAddress,
        chain: contract.chain,
      });

      const transaction = fundBet({
        contract: betContract,
        value: ethers.utils.parseUnits(wager, "wei").toString(),
      });

      await sendTransaction(transaction);
      console.log("Bet funded successfully");
      alert("Bet funded successfully!");
    } catch (error) {
      console.error("Error funding bet:", error);
      alert("Error funding bet. Please try again.");
    }
  };

  const shortenAddress = (address: string) => 
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div>
      <h3>Unfunded Bets</h3>
      {betDetails.map((bet, index) => {
        const wagerInEth = ethers.utils.formatUnits(bet.wager, "ether");
        const wagerInUsd = (parseFloat(wagerInEth) * ethToUsdRate).toFixed(2);

        console.log(`Rendering bet ${index}:`, bet);

        return (
          <div key={index} className="p-4 bg-[var(--secondary-color)] text-white rounded my-2">
            <p>Address: {shortenAddress(bet.address)}</p>
            <p>Better 1: {bet.better1.endsWith('.eth') ? bet.better1 : shortenAddress(bet.better1)}</p>
            <p>Better 2: {bet.better2.endsWith('.eth') ? bet.better2 : shortenAddress(bet.better2)}</p>
            <p>Decider: {bet.decider.endsWith('.eth') ? bet.decider : shortenAddress(bet.decider)}</p>
            <p>Wager: {wagerInEth} ETH (${wagerInUsd} USD)</p>
            <p>Conditions: {bet.conditions}</p>
            {address === bet.better1.toLowerCase() || address === bet.better2.toLowerCase() ? (
              <button
                onClick={() => handleFundBet(bet.address, bet.wager)}
                className="p-2 bg-yellow-500 text-black rounded"
              >
                Fund Bet
              </button>
            ) : (
              <p>You are the decider for this bet.</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default UnfundedBets;