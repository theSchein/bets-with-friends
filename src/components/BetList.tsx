"use client";
import React, { useState, useEffect } from "react";
import { useReadContract } from "thirdweb/react";
import { getContract } from "thirdweb";
import { client } from "../app/client"; 
import { bet } from "../generated/bet"; 
import OpenBets from "./OpenBets";
import UnfundedBets from "./UnfundedBets";
import BetHistory from "./BetHistory";

interface BetListProps {
  contract: any;
  accountAddress: string;
}

const BetList: React.FC<BetListProps> = ({ contract, accountAddress }) => {
  const [openBets, setOpenBets] = useState<string[]>([]);
  const [unfundedBets, setUnfundedBets] = useState<string[]>([]);
  const [betHistory, setBetHistory] = useState<string[]>([]);

  const { data: betAddresses, isLoading: isLoadingAddresses } = useReadContract({
    contract,
    method: "function getBets() view returns (address[])",
    params: [],
  });

  useEffect(() => {

    const fetchBetDetails = async () => {
      if (betAddresses && betAddresses.length > 0) {
        const open: string[] = [];
        const unfunded: string[] = [];
        const history: string[] = [];
    
        for (const betAddress of betAddresses) {
          try {
            const betContract = getContract({
              client,
              address: betAddress,
              chain: contract.chain,
            });
    
            const betData = await bet({ contract: betContract });
    
            if (betData) {
              const [better1, better2, decider, , , status] = betData;
              if (
                accountAddress.toLowerCase() === better1.toLowerCase() ||
                accountAddress.toLowerCase() === better2.toLowerCase() ||
                accountAddress.toLowerCase() === decider.toLowerCase()
              ) {
                if (status === 0) {
                  unfunded.push(betAddress);
                } else if (status === 1 || status === 2) {
                  open.push(betAddress);
                } else {
                  history.push(betAddress);
                }
              }
            }
          } catch (error) {
            console.error(`Error fetching bet details for ${betAddress}:`, error);
          }
        }
    
        setOpenBets(open);
        setUnfundedBets(unfunded);
        setBetHistory(history);
    
      }
    };

    fetchBetDetails();
  }, [betAddresses, accountAddress, contract.chain]);

  return (
    <div>
      {isLoadingAddresses ? (
        <p>Loading bet addresses...</p>
      ) : (
        <div>
          <OpenBets betAddresses={openBets} accountAddress={accountAddress} />
          <UnfundedBets betAddresses={unfundedBets} accountAddress={accountAddress} />
          <BetHistory betAddresses={betHistory} accountAddress={accountAddress} />
        </div>
      )}
    </div>
  );
};

export default BetList;