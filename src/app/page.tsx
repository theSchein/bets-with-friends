"use client";

import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { ThirdwebProvider } from "thirdweb/react";
import { client, contract } from "./client";
import CreateBetForm from "../components/CreateBetForm";
import BetList from "../components/BetList";
import { createWallet } from "thirdweb/wallets";
import { defineChain } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import Image from "next/image";
import logo from "@public/bets.png"; // Import the logo image

export default function Home() {
  const account = useActiveAccount();
  const wallets = [createWallet("com.coinbase.wallet")];

  return (
    <ThirdwebProvider client={client}>
      <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
        <div className="py-20 text-center">
          <Image src={logo} alt="Bets with Friends" width={400} height={400} className="mx-auto mb-6" />

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
              <CreateBetForm contract={contract} />

              <h2 className="text-2xl mb-4 text-[var(--primary-color)]">My Bets</h2>
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
    <header className="flex flex-col items-center mb-20 md:mb-20 text-[var(--primary-color)]">
      <p className="text-xl md:text-3xl font-semibold md:font-bold tracking-tighter">
        Connect your wallet to start betting with friends!
      </p>
    </header>
  );
}
