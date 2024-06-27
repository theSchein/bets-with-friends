import { createThirdwebClient, getContract, resolveMethod } from "thirdweb";
import { defineChain } from "thirdweb/chains";

const clientId =  process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID

if (!clientId) {
  throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
});

// connect to your contract
export const contract = getContract({ 
  client, 
  chain: defineChain(84532), 
  address: "0x6b059b145CdfdeD22E490F2E44593cF284C0b16F" 
});
