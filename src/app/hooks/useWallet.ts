'use client';

import React from 'react'

// Send STX

// async function sendSTX(amount: number, recipient: string, senderKey: string): Promise<TxBroadcastResult> {
//     const network = STACKS_TESTNET;
//     const txOptions = {
//       recipient,
//       amount: BigInt(Math.floor(amount * 1e6)), // Convert to microstacks and ensure integer
//       senderKey,
//       network,
//       memo: 'For testing'
//     };
    
//     const transaction = await makeSTXTokenTransfer(txOptions);
//     const result = await broadcastTransaction({ 
//         transaction, 
//         network // Optionally, you might want to include the network explicitly here
//     });
//     console.log("Transaction result:", result);
//     return result;
// }
