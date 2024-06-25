"use client";

import React from "react";
import { useReadContract } from "thirdweb/react";
import BetDetails from "./BetDetails";
import { getContractInstance } from "../utils/getContractInstance";

interface BetListProps {
  contract: any;
}

const BetList: React.FC<BetListProps> = ({ contract }) => {
  const { data: betAddresses, isLoading: isLoadingAddresses } = useReadContract(
    {
      contract,
      method: "function getBets() view returns (address[])",
      params: [],
    }
  );

  return (
    <div>
      <h2>All Bets</h2>
      {isLoadingAddresses ? (
        <p>Loading bet addresses...</p>
      ) : (
        <ul>
          {betAddresses?.map((address: string, index: number) => (
            <div key={index}>
              <p>{address}</p>
              <BetDetails contract={getContractInstance(address)} />
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BetList;
