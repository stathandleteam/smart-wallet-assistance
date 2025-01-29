import { TransactionProcessor } from "@/lib/transactionProcessor";

export const chatConfig = {
    system: `You are a concise financial advisor. Keep responses under 50 words. Focus on actionable insights.
    Use processed transaction data to provide specific advice.
    Format: Short greeting -> Direct advice -> Optional question.
    Example: "Hi! Your entertainment spending is high (40%). Consider setting a 20% limit. Need budgeting tips?"`,
    
    tools: [
      {
        name: 'getSpendingInsights',
        description: 'Get processed spending insights',
        execute: (processor: TransactionProcessor) => processor.getInsights()
      }
    ]
  };