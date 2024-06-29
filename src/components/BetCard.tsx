// components/BetCard.js
"use client";

import React, { useState } from "react";
import { Collapse } from "@mui/material";

interface BetCardProps {
  bet: any;
  ethToUsdRate: number;
  address: string;
}

const BetCard: React.FC<BetCardProps> = ({ bet, ethToUsdRate, address }) => {
  const [isOpen, setIsOpen] = useState(false);

  const shortenAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  const wagerInUsd = (parseFloat(bet.wagerEth) * ethToUsdRate).toFixed(2);

  let betCardClass = "bg-secondary";

  if (bet.status === 5) {
    betCardClass = "bg-gray-300";
  } else if (bet.status === 4) {
    if (bet.winner.toLowerCase() === address.toLowerCase()) {
      betCardClass = "bg-green-500";
    } else if (bet.better1.toLowerCase() === address.toLowerCase() || bet.better2.toLowerCase() === address.toLowerCase()) {
      betCardClass = "bg-red-500";
    }
  }

  return (
    <div className="mb-4">
      <div
        className={`p-4 ${betCardClass} text-font rounded-lg shadow-md cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="text-xl font-bold mb-2">{bet.conditions}</h4>
      </div>
      <Collapse in={isOpen}>
        <div className={`p-4 ${betCardClass} text-font rounded-lg shadow-md mt-2`}>
          <div className="grid grid-cols-1 gap-4 mb-2">
            <div className="p-4 bg-yellow-300 text-font rounded-lg shadow-md">
              <span>
                Better 1:{" "}
                {bet.better1Display.endsWith(".eth")
                  ? bet.better1Display
                  : shortenAddress(bet.better1Display)}
              </span>
            </div>
            <div className="p-4 bg-yellow-300 text-font rounded-lg shadow-md">
              <span>
                Better 2:{" "}
                {bet.better2Display.endsWith(".eth")
                  ? bet.better2Display
                  : shortenAddress(bet.better2Display)}
              </span>
            </div>
            <div className="p-4 bg-yellow-300 text-font rounded-lg shadow-md">
              <span>
                Decider:{" "}
                {bet.deciderDisplay.endsWith(".eth")
                  ? bet.deciderDisplay
                  : shortenAddress(bet.deciderDisplay)}
              </span>
            </div>
          </div>
          <div className="mb-2">
            <span className="inline-block px-4 py-2 bg-blue-500 text-white rounded-full">
              Wager: ${wagerInUsd} USD ({bet.wagerEth} ETH)
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span>{bet.status === 4 ? "Resolved" : "Cancelled"}</span>
            <span>
              Winner:{" "}
              {bet.winnerDisplay
                ? bet.winnerDisplay.endsWith(".eth")
                  ? bet.winnerDisplay
                  : shortenAddress(bet.winnerDisplay)
                : "N/A"}
            </span>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default BetCard;
