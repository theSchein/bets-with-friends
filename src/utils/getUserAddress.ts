import { useSDK } from "@thirdweb-dev/react";

export function useUserAddress() {
  const sdk = useSDK();

  if (!sdk) return null;

  return sdk.wallet.address;
}
