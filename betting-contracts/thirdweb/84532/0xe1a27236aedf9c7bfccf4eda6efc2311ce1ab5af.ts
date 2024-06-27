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
 * Creates an event object for the BetCancelled event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { betCancelledEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  betCancelledEvent()
 * ],
 * });
 * ```
 */ 
export function betCancelledEvent() {
  return prepareEvent({
    signature: "event BetCancelled(address canceller)",
  });
};
  



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
    signature: "event BetCreated(address better1, address better2, address decider, uint256 wager, string conditions)",
  });
};
  



/**
 * Creates an event object for the BetFullyFunded event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { betFullyFundedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  betFullyFundedEvent()
 * ],
 * });
 * ```
 */ 
export function betFullyFundedEvent() {
  return prepareEvent({
    signature: "event BetFullyFunded()",
  });
};
  



/**
 * Creates an event object for the BetFunded event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { betFundedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  betFundedEvent()
 * ],
 * });
 * ```
 */ 
export function betFundedEvent() {
  return prepareEvent({
    signature: "event BetFunded(address funder, uint256 amount)",
  });
};
  



/**
 * Creates an event object for the BetInvalidated event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { betInvalidatedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  betInvalidatedEvent()
 * ],
 * });
 * ```
 */ 
export function betInvalidatedEvent() {
  return prepareEvent({
    signature: "event BetInvalidated()",
  });
};
  



/**
 * Creates an event object for the BetResolved event.
 * @returns The prepared event object.
 * @example
 * ```
 * import { getContractEvents } from "thirdweb";
 * import { betResolvedEvent } from "TODO";
 * 
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  betResolvedEvent()
 * ],
 * });
 * ```
 */ 
export function betResolvedEvent() {
  return prepareEvent({
    signature: "event BetResolved(address winner)",
  });
};
  

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
export async function bet(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x11610c25",
  [],
  [
    {
      "internalType": "address",
      "name": "better1",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "better2",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "decider",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "wager",
      "type": "uint256"
    },
    {
      "internalType": "string",
      "name": "conditions",
      "type": "string"
    },
    {
      "internalType": "enum Bet.BetStatus",
      "name": "status",
      "type": "uint8"
    },
    {
      "internalType": "address",
      "name": "winner",
      "type": "address"
    }
  ]
],
    params: []
  });
};


/**
 * Represents the parameters for the "hasFunded" function.
 */
export type HasFundedParams = {
  arg_0: AbiParameterToPrimitiveType<{"internalType":"address","name":"","type":"address"}>
};

/**
 * Calls the "hasFunded" function on the contract.
 * @param options - The options for the hasFunded function.
 * @returns The parsed result of the function call.
 * @example
 * ```
 * import { hasFunded } from "TODO";
 * 
 * const result = await hasFunded({
 *  arg_0: ...,
 * });
 * 
 * ```
 */
export async function hasFunded(
  options: BaseTransactionOptions<HasFundedParams>
) {
  return readContract({
    contract: options.contract,
    method: [
  "0x61dba32a",
  [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ]
],
    params: [options.arg_0]
  });
};




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
export async function totalFunded(
  options: BaseTransactionOptions
) {
  return readContract({
    contract: options.contract,
    method: [
  "0xad044f49",
  [],
  [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
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
 * Calls the "cancelBet" function on the contract.
 * @param options - The options for the "cancelBet" function.
 * @returns A prepared transaction object.
 * @example
 * ```
 * import { cancelBet } from "TODO";
 * 
 * const transaction = cancelBet();
 * 
 * // Send the transaction
 * ...
 * 
 * ```
 */
export function cancelBet(
  options: BaseTransactionOptions
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x7b6d79f1",
  [],
  []
],
    params: []
  });
};




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
export function fundBet(
  options: BaseTransactionOptions
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x5a428117",
  [],
  []
],
    params: []
  });
};




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
export function invalidateBet(
  options: BaseTransactionOptions
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0x2193f8b9",
  [],
  []
],
    params: []
  });
};


/**
 * Represents the parameters for the "resolveBet" function.
 */
export type ResolveBetParams = {
  winner: AbiParameterToPrimitiveType<{"internalType":"address","name":"_winner","type":"address"}>
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
export function resolveBet(
  options: BaseTransactionOptions<ResolveBetParams>
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
  "0xd0b8a361",
  [
    {
      "internalType": "address",
      "name": "_winner",
      "type": "address"
    }
  ],
  []
],
    params: [options.winner]
  });
};


