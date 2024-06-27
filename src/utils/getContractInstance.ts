import { useReadContract } from "thirdweb/react";

export default function Component() {
  const { data, isLoading } = useReadContract({ 
    contract, 
    method: "function getBets() view returns (address[])", 
    params: [] 
  });
}