"use client";

import React, { useState } from "react";
import IosShareIcon from '@mui/icons-material/IosShare';

interface ShareButtonProps {
  better1Display: string;
  better2Display: string;
  deciderDisplay: string;
  wagerEth: string;
  status: number;
  conditions: string;
  ethToUsdRate: number;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  better1Display,
  better2Display,
  deciderDisplay,
  wagerEth,
  status,
  conditions,
  ethToUsdRate,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const shortenAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;
  const wagerInUsd = (parseFloat(wagerEth) * ethToUsdRate).toFixed(2);
  const statusText = status === 4 ? "Resolved" : status === 5 ? "Invalidated" : "Pending";

  const shareText = `Check out this bet on Bets with Friends!
Conditions: ${conditions}
Better 1: ${better1Display.endsWith('.eth') ? better1Display : shortenAddress(better1Display)}
Better 2: ${better2Display.endsWith('.eth') ? better2Display : shortenAddress(better2Display)}
Decided By: ${deciderDisplay.endsWith('.eth') ? deciderDisplay : shortenAddress(deciderDisplay)}
Wager: ${wagerEth} ETH ($${wagerInUsd} USD)
Status: ${statusText}
https://www.betswithfriends.fun`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Bets with Friends',
          text: shareText,
        });
      } catch (error) {
        console.error("Error sharing", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (error) {
        console.error("Failed to copy: ", error);
      }
    }
  };

  return (
    <div className="flex items-center">
      <IosShareIcon 
        onClick={handleShare} 
        className="text-primary hover:text-quaternary cursor-pointer" 
      />
      {isCopied && <p className="ml-2 text-green-500">Copied!</p>}
    </div>
  );
};

export default ShareButton;
