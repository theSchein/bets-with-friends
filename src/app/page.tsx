"use client";

import Image from "next/image";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { ThirdwebProvider } from "thirdweb/react";
import { client, contract } from "./client";
import CreateBetForm from "../components/CreateBetForm";
import BetList from "../components/BetList";
import thirdwebIcon from "@public/thirdweb.svg";
import { createWallet } from "thirdweb/wallets";
import { defineChain } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";

export default function Home() {
  const account = useActiveAccount();
  const wallets = [
    createWallet("com.coinbase.wallet")
  ];
  return (
    <ThirdwebProvider client={client}>
      <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
        <div className="py-20">
          <Header />

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

          <div>
            <h2 className="text-xl mb-4">Create a New Bet</h2>
            <CreateBetForm
              contract={contract}
            />
          </div>
          
          
            {account ? (
            <BetList contract={contract} />
            ) : (
              <p className="text-zinc-300 text-base">
                Connect your wallet to view all bets.
              </p>
            )}
         

          <ThirdwebResources />
        </div>
      </main>
    </ThirdwebProvider>
  );
}

function Header() {
  return (
    <header className="flex flex-col items-center mb-20 md:mb-20">
      <Image
        src={thirdwebIcon}
        alt=""
        className="size-[150px] md:size-[150px]"
        style={{
          filter: "drop-shadow(0px 0px 24px #a726a9a8)",
        }}
      />

      <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
        Bets with Friends
      </h1>

      <p className="text-zinc-300 text-base">
        Read the{" "}
        <code className="bg-zinc-800 text-zinc-300 px-2 rounded py-1 text-sm mx-1">
          README.md
        </code>{" "}
        file to get started.
      </p>
    </header>
  );
}

function ThirdwebResources() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 justify-center">
      {/* You can add any resources or links you need here */}
    </div>
  );
}
