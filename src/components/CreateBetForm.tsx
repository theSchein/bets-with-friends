// components/CreateBetForm.js
"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { prepareContractCall, createThirdwebClient } from "thirdweb";
import { useSendTransaction, useActiveAccount } from "thirdweb/react";
import { resolveAddress } from "thirdweb/extensions/ens";
import { ethers } from "ethers";
import { client } from "@/app/client";
import { Collapse } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import AlertModal from "./AlertModal";

interface CreateBetFormProps {
  contract: any;
}

const CreateBetForm: React.FC<CreateBetFormProps> = ({ contract }) => {
  const [better1, setBetter1] = useState<string>("");
  const [better2, setBetter2] = useState<string>("");
  const [decider, setDecider] = useState<string>("");
  const [wagerUSD, setWagerUSD] = useState<string>("");
  const [conditions, setConditions] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [ethToUsdRate, setEthToUsdRate] = useState<number>(0);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  const { mutateAsync: sendTransaction } = useSendTransaction();
  const account = useActiveAccount();

  useEffect(() => {
    if (account) {
      setBetter1(account.address);
    }
  }, [account]);

  useEffect(() => {
    const fetchEthToUsdRate = async () => {
      try {
        const response = await fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD");
        const data = await response.json();
        setEthToUsdRate(data.USD);
      } catch (error) {
        console.error("Error fetching ETH to USD rate:", error);
      }
    };

    fetchEthToUsdRate();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const resolvedBetter1 = await resolveAddress({ client, name: better1 });
      const resolvedBetter2 = await resolveAddress({ client, name: better2 });
      const resolvedDecider = await resolveAddress({ client, name: decider });
      const wagerInEth = (parseFloat(wagerUSD) / ethToUsdRate).toFixed(18);
      const wagerInWei = ethers.utils.parseEther(wagerInEth);

      const transaction = prepareContractCall({
        contract,
        method: "function createBet(address _better1, address _better2, address _decider, uint256 _wager, string _conditions)",
        params: [resolvedBetter1, resolvedBetter2, resolvedDecider, wagerInWei.toString(), conditions],
      });

      await sendTransaction(transaction);
      setMessage("Bet created successfully!");
      setIsAlertOpen(true);
      
      // Reset form fields and close form
      setBetter1(account?.address || "");
      setBetter2("");
      setDecider("");
      setWagerUSD("");
      setConditions("");
      setIsFormVisible(false);
    } catch (error: any) {
      console.error("Error creating bet:", error);
      setMessage(`Error creating bet: ${error.message}`);
      setIsAlertOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-4 p-4 bg-primary text-quaternary rounded-lg shadow-lg">
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="text-lg w-full p-2 bg-primary text-quaternary font-bold font-heading rounded"
      >
        {isFormVisible ? "Hide Form" : "Make a Bet"}
      </button>
      <Collapse in={isFormVisible}>
        <form onSubmit={handleSubmit} className="p-6 bg-secondary text-font rounded space-y-4 shadow-lg">
          <Tooltip title="Your wallet address will be autofilled as Better 1" arrow>
            <div>
              <label htmlFor="better1" className="block mb-2">Better 1 Address or ENS</label>
              <input
                id="better1"
                value={better1}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setBetter1(e.target.value)}
                required
                className="w-full p-2 border rounded text-black"
              />
            </div>
          </Tooltip>
          <Tooltip title="Enter the address or ENS of the second bettor" arrow>
            <div>
              <label htmlFor="better2" className="block mb-2">Better 2 Address or ENS</label>
              <input
                id="better2"
                value={better2}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setBetter2(e.target.value)}
                required
                className="w-full p-2 border rounded text-black"
              />
            </div>
          </Tooltip>
          <Tooltip title="Enter the address or ENS of the decider" arrow>
            <div>
              <label htmlFor="decider" className="block mb-2">Decider Address or ENS</label>
              <input
                id="decider"
                value={decider}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setDecider(e.target.value)}
                required
                className="w-full p-2 border rounded text-black"
              />
            </div>
          </Tooltip>
          <Tooltip title="Enter the amount of USD for the wager. It will be converted to ETH." arrow>
            <div>
              <label htmlFor="wager" className="block mb-2">Wager Amount (USD)</label>
              <input
                id="wager"
                type="number"
                step="0.01"
                value={wagerUSD}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setWagerUSD(e.target.value)}
                required
                className="w-full p-2 border rounded text-black"
              />
            </div>
          </Tooltip>
          <Tooltip title="Describe the conditions of the bet" arrow>
            <div>
              <label htmlFor="conditions" className="block mb-2">Conditions</label>
              <input
                id="conditions"
                value={conditions}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setConditions(e.target.value)}
                required
                className="w-full p-2 border rounded text-black"
              />
            </div>
          </Tooltip>
          <button type="submit" disabled={isLoading} className="w-full p-4 bg-tertiary text-font font-heading rounded-lg hover:bg-quaternary transition-colors">
            {isLoading ? "Creating Bet..." : "Make Bet"}
          </button>
          {message && <p className="mt-4">{message}</p>}
        </form>
      </Collapse>
      <AlertModal isOpen={isAlertOpen} message={message} onClose={() => setIsAlertOpen(false)} />
    </div>
  );
};

export default CreateBetForm;
