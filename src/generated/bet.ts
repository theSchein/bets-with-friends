import {
    prepareEvent,
    prepareContractCall,
    readContract,
    type BaseTransactionOptions,
    type AbiParameterToPrimitiveType,
  } from "thirdweb";
  
  /**
   * Contract read functions
   */
  
  /**
   * Calls the "bet" function on the contract.
   * @param options - The options for the bet function.
   * @returns The parsed result of the function call.
   * @example
   * ```
   * import { bet } from "TODO";
   *
   * const result = await bet();
   *
   * ```
   */
  export async function bet(options: BaseTransactionOptions) {
    return readContract({
      contract: options.contract,
      method: [
        "0x11610c25",
        [],
        [
          {
            internalType: "address",
            name: "better1",
            type: "address",
          },
          {
            internalType: "address",
            name: "better2",
            type: "address",
          },
          {
            internalType: "address",
            name: "decider",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "wager",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "conditions",
            type: "string",
          },
          {
            internalType: "enum Bet.BetStatus",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "winner",
            type: "address",
          },
        ],
      ],
      params: [],
    });
  }
  
  /**
   * Calls the "totalFunded" function on the contract.
   * @param options - The options for the totalFunded function.
   * @returns The parsed result of the function call.
   * @example
   * ```
   * import { totalFunded } from "TODO";
   *
   * const result = await totalFunded();
   *
   * ```
   */
  export async function totalFunded(options: BaseTransactionOptions) {
    return readContract({
      contract: options.contract,
      method: [
        "0xad044f49",
        [],
        [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
      ],
      params: [],
    });
  }
  
  /**
   * Contract write functions
   */
  
  /**
   * Calls the "fundBet" function on the contract.
   * @param options - The options for the "fundBet" function.
   * @returns A prepared transaction object.
   * @example
   * ```
   * import { fundBet } from "TODO";
   *
   * const transaction = fundBet();
   *
   * // Send the transaction
   * ...
   *
   * ```
   */
  export function fundBet(options: BaseTransactionOptions) {
    return prepareContractCall({
      contract: options.contract,
      method: ["0x5a428117", [], []],
      params: [],
    });
  }
  
  /**
   * Calls the "invalidateBet" function on the contract.
   * @param options - The options for the "invalidateBet" function.
   * @returns A prepared transaction object.
   * @example
   * ```
   * import { invalidateBet } from "TODO";
   *
   * const transaction = invalidateBet();
   *
   * // Send the transaction
   * ...
   *
   * ```
   */
  export function invalidateBet(options: BaseTransactionOptions) {
    return prepareContractCall({
      contract: options.contract,
      method: ["0x2193f8b9", [], []],
      params: [],
    });
  }
  
  /**
   * Represents the parameters for the "resolveBet" function.
   */
  export type ResolveBetParams = {
    winner: AbiParameterToPrimitiveType<{
      internalType: "address";
      name: "_winner";
      type: "address";
    }>;
  };
  
  /**
   * Calls the "resolveBet" function on the contract.
   * @param options - The options for the "resolveBet" function.
   * @returns A prepared transaction object.
   * @example
   * ```
   * import { resolveBet } from "TODO";
   *
   * const transaction = resolveBet({
   *  winner: ...,
   * });
   *
   * // Send the transaction
   * ...
   *
   * ```
   */
  export function resolveBet(options: BaseTransactionOptions<ResolveBetParams>) {
    return prepareContractCall({
      contract: options.contract,
      method: [
        "0xd0b8a361",
        [
          {
            internalType: "address",
            name: "_winner",
            type: "address",
          },
        ],
        [],
      ],
      params: [options.winner],
    });
  }
  