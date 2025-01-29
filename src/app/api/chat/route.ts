import { getRecentTransactionsTool, getSpendingBreakdownTool } from '@/app/ai/tools';
import { openai } from '@ai-sdk/openai'
import {  streamText } from "ai"
import { TransactionProcessor } from '@/lib/transactionProcessor';
import { ChatContext, createChatSystem } from './chatService';

  // Export the tools

export async function POST(req: Request) {
    const { messages, address } = await req.json()
    const processor = new TransactionProcessor();
    
    // Get the processed data
    const processedData = await processor.getStoredData(address);

    // Create chat context
    const context: ChatContext = {
      processedData,
      userAddress: address
  };

  const tools = {
    getSpendingBreakdown: getSpendingBreakdownTool(context),
    getRecentTransactions: getRecentTransactionsTool(context),
  };

  
  const result = await streamText({
    model: openai('gpt-4o'),
    system: createChatSystem(context),
    maxSteps: 5,
    messages,
    tools: tools
  });
    return result.toDataStreamResponse()
}
