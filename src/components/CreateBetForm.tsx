"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

interface CreateBetFormProps {
  contract: any;
}

const CreateBetForm: React.FC<CreateBetFormProps> = ({ contract }) => {
  const [better1, setBetter1] = useState<string>('');
  const [better2, setBetter2] = useState<string>('');
  const [decider, setDecider] = useState<string>('');
  const [wager, setWager] = useState<string>('');
  const [conditions, setConditions] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { mutateAsync: sendTransaction } = useSendTransaction();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const transaction = prepareContractCall({
        contract,
        method: "createBet",
        params: [better1, better2, decider, wager, conditions]
      });

      await sendTransaction(transaction);
      setMessage('Bet created successfully!');
    } catch (error) {
      console.error('Error creating bet:', error);
      setMessage('Error creating bet. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="better1">Better 1 Address</label>
        <input
          id="better1"
          value={better1}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setBetter1(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="better2">Better 2 Address</label>
        <input
          id="better2"
          value={better2}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setBetter2(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="decider">Decider Address</label>
        <input
          id="decider"
          value={decider}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDecider(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="wager">Wager Amount (ETH)</label>
        <input
          id="wager"
          type="number"
          step="0.000000000000000001"
          value={wager}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setWager(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="conditions">Conditions</label>
        <input
          id="conditions"
          value={conditions}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setConditions(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating Bet...' : 'Create Bet'}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default CreateBetForm;