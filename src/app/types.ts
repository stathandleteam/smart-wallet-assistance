// types.ts
interface StacksTransaction {
    tx_id: string;
    burn_block_time_iso: string;
    tx_type: string;
    tx_status: string;
    token_transfer?: {
      recipient_address: string;
      amount: string;
      memo: string;
    };
  }
  
  interface ProcessedData {
    recentTransactions: Array<{
      date: string;
      amount: number;
      type: string;
    }>;
    spending: {
      [category: string]: number;
    };
    insights: {
      totalSpent: number;
      largestTransaction: number;
      frequentRecipients: string[];
      commonCategories: string[];
    };
  }
  