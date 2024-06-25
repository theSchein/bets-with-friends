import { getContract } from "thirdweb";
import { client } from "../app/client";
import { defineChain } from "thirdweb/chains";

// Function to get contract instance
export function getContractInstance(contractAddress: string) {
  return getContract({
    client,
    chain: defineChain(84532), // Make sure this matches your chain ID
    address: contractAddress,
  });
}
