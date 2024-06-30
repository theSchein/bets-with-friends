![Logo](public/logo.png)

# Bets with Friends


The P2P betting app for the groupchat
'Submission for Onchain Summer 2024'

https://www.betswithfriends.fun/

## The stack

This uses NextJS written in TypeScipt for the application, and is hosted on Vercel. The smart contracts are deployed by Thirdweb and Thirdweb apis are used to interact with the conracts on the application layer. Coinbase Smart Wallet is also used as an option to sign-in making this easy for the mobile use. Contracts are deployed on running on Base Seppolia testnet. 

## How it works

After signing in with a web3 wallet the user can make a bet. The bet consists of:
- Bettors 1 & 2: The two parties making the bet
- Decider: The one determining who one and has the ability to can cancel and refund
- Wager: Collected in ETH
- Conditions: A short blurb on what the bet is on, is open ended and up to all parties

When a bet is created its status becomes Unfunded. Each better has to put in the wager amount before the betting is Active and locked. When a bet is unfunded or partially funded any of the 3 parties may cancel the bet and refund the money.

After a bet has been fully funded it is now locked out to better 1 and 2, they may see it but only the decider can choose who gets the money or if the bet is to be cancelled. The truth is fully and completely trusted to the decider, I call this system a 'dictatorial oracle' and while the decider doesn't make any money on the bets either way, they sure do get a power trip.

After a bet is settled, its metrics are tracked. Users can track their wins/losses and whether they are in the black overall. 

## Feedback

I think this is a cool idea that my friends that don't even like crypto would love to use, and it only needs a little bit more work to be a full product. If you are interested in getting access to the base mainnet beta that I'll be launching, want to get involved, give feedback, or just wanna say hi please hit me up on telegram:

https://t.me/schein_berg
