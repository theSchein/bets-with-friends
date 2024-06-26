"use client";

import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { ThirdwebProvider } from "thirdweb/react";
import { client, contract } from "./client";
import CreateBetForm from "../components/CreateBetForm";
import BetList from "../components/BetList";
import { createWallet } from "thirdweb/wallets";
import { defineChain } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";

export default function Home() {
  const account = useActiveAccount();
  const wallets = [createWallet("com.coinbase.wallet")];
  return (
    <ThirdwebProvider client={client}>
      <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
        <div className="py-20">
          <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
            Bets with Friends
          </h1>
 

          <div className="flex justify-center mb-20">
            <ConnectButton
              client={client}
              wallets={wallets}
              chain={defineChain(baseSepolia)}
              appMetadata={{
                name: "Bets with Friends",
                url: "https://betswithfriends.fun",
              }}
            />
          </div>

          {account ? (
          <div>
          <h2 className="text-xl mb-4">Create a New Bet</h2>
          <CreateBetForm contract={contract} />

            <BetList contract={contract} />
            </div>
          ) : (
            <Pitch />
          )}
        </div>
      </main>
    </ThirdwebProvider>
  );
}

function Pitch() {
  return (
    <header className="flex flex-col items-center mb-20 md:mb-20">
      lorem ipsum
    </header>
  );
}
