import {
    prepareEvent,
    prepareContractCall,
    readContract,
    type BaseTransactionOptions,
    type AbiParameterToPrimitiveType,
  } from "thirdweb";
  
  /**
  * Contract events
  */
  
  
  
  /**
   * Creates an event object for the BetCreated event.
   * @returns The prepared event object.
   * @example
   * ```
   * import { getContractEvents } from "thirdweb";
   * import { betCreatedEvent } from "TODO";
   * 
   * const events = await getContractEvents({
   * contract,
   * events: [
   *  betCreatedEvent()
   * ],
   * });
   * ```
   */ 
  export function betCreatedEvent() {
    return prepareEvent({
      signature: "event BetCreated(address betAddress, address better1, address better2, address decider, uint256 wager, string conditions)",
    });
  };
    
  
  /**
  * Contract read functions
  */
  
  /**
   * Represents the parameters for the "bets" function.
   */
  export type BetsParams = {
    arg_0: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"","type":"uint256"}>
  };
  
  /**
   * Calls the "bets" function on the contract.
   * @param options - The options for the bets function.
   * @returns The parsed result of the function call.
   * @example
   * ```
   * import { bets } from "TODO";
   * 
   * const result = await bets({
   *  arg_0: ...,
   * });
   * 
   * ```
   */
  export async function bets(
    options: BaseTransactionOptions<BetsParams>
  ) {
    return readContract({
      contract: options.contract,
      method: [
    "0x22af00fa",
    [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    [
      {
        "internalType": "contract Bet",
        "name": "",
        "type": "address"
      }
    ]
  ],
      params: [options.arg_0]
    });
  };
  
  
  
  
  /**
   * Calls the "getBets" function on the contract.
   * @param options - The options for the getBets function.
   * @returns The parsed result of the function call.
   * @example
   * ```
   * import { getBets } from "TODO";
   * 
   * const result = await getBets();
   * 
   * ```
   */
  export async function getBets(
    options: BaseTransactionOptions
  ) {
    return readContract({
      contract: options.contract,
      method: [
    "0xa6afd5fd",
    [],
    [
      {
        "internalType": "contract Bet[]",
        "name": "",
        "type": "address[]"
      }
    ]
  ],
      params: []
    });
  };
  
  
  /**
  * Contract write functions
  */
  
  /**
   * Represents the parameters for the "createBet" function.
   */
  export type CreateBetParams = {
    better1: AbiParameterToPrimitiveType<{"internalType":"address","name":"_better1","type":"address"}>
  better2: AbiParameterToPrimitiveType<{"internalType":"address","name":"_better2","type":"address"}>
  decider: AbiParameterToPrimitiveType<{"internalType":"address","name":"_decider","type":"address"}>
  wager: AbiParameterToPrimitiveType<{"internalType":"uint256","name":"_wager","type":"uint256"}>
  conditions: AbiParameterToPrimitiveType<{"internalType":"string","name":"_conditions","type":"string"}>
  };
  
  /**
   * Calls the "createBet" function on the contract.
   * @param options - The options for the "createBet" function.
   * @returns A prepared transaction object.
   * @example
   * ```
   * import { createBet } from "TODO";
   * 
   * const transaction = createBet({
   *  better1: ...,
   *  better2: ...,
   *  decider: ...,
   *  wager: ...,
   *  conditions: ...,
   * });
   * 
   * // Send the transaction
   * ...
   * 
   * ```
   */
  export function createBet(
    options: BaseTransactionOptions<CreateBetParams>
  ) {
    return prepareContractCall({
      contract: options.contract,
      method: [
    "0xccf0fbd6",
    [
      {
        "internalType": "address",
        "name": "_better1",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_better2",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_decider",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_wager",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_conditions",
        "type": "string"
      }
    ],
    []
  ],
      params: [options.better1, options.better2, options.decider, options.wager, options.conditions]
    });
  };
  
  
  