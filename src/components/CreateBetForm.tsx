"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { prepareContractCall, createThirdwebClient } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { resolveAddress } from "thirdweb/extensions/ens";
import { ethers } from "ethers";
import { client } from "@/app/client";

interface CreateBetFormProps {
  contract: any;
}

const CreateBetForm: React.FC<CreateBetFormProps> = ({ contract }) => {
  const [better1, setBetter1] = useState<string>("");
  const [better2, setBetter2] = useState<string>("");
  const [decider, setDecider] = useState<string>("");
  const [wager, setWager] = useState<string>("");
  const [conditions, setConditions] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const { mutateAsync: sendTransaction } = useSendTransaction();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const resolvedBetter1 = await resolveAddress({ client, name: better1 });
      const resolvedBetter2 = await resolveAddress({ client, name: better2 });
      const resolvedDecider = await resolveAddress({ client, name: decider });
      const wagerInWei = ethers.utils.parseEther(wager);

      const transaction = prepareContractCall({
        contract,
        method: "function createBet(address _better1, address _better2, address _decider, uint256 _wager, string _conditions)",
        params: [resolvedBetter1, resolvedBetter2, resolvedDecider, wagerInWei.toString(), conditions],
      });

      await sendTransaction(transaction);
      setMessage("Bet created successfully!");
    } catch (error: any) {
      console.error("Error creating bet:", error);
      setMessage(`Error creating bet: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-4">
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="w-full p-2 mb-4 bg-[var(--accent-color)] text-[var(--primary-color)] font-bold rounded"
      >
        {isFormVisible ? "Hide Form" : "Create a New Bet"}
      </button>
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="p-6 bg-[var(--accent-color)] text-white rounded space-y-4">
          <div>
            <label htmlFor="better1" className="block mb-2">Better 1 Address or ENS</label>
            <input
              id="better1"
              value={better1}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setBetter1(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="better2" className="block mb-2">Better 2 Address or ENS</label>
            <input
              id="better2"
              value={better2}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setBetter2(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="decider" className="block mb-2">Decider Address or ENS</label>
            <input
              id="decider"
              value={decider}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDecider(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="wager" className="block mb-2">Wager Amount (ETH)</label>
            <input
              id="wager"
              type="number"
              step="0.000000000000000001"
              value={wager}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setWager(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="conditions" className="block mb-2">Conditions</label>
            <input
              id="conditions"
              value={conditions}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setConditions(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <button type="submit" disabled={isLoading} className="w-full p-2 bg-yellow-500 text-black rounded">
            {isLoading ? "Creating Bet..." : "Create Bet"}
          </button>
          {message && <p className="mt-4">{message}</p>}
        </form>
      )}
    </div>
  );
};

export default CreateBetForm;
