export class TransactionProcessor {
    private processedData: ProcessedData | null = null;
  
    processTransactions(transactions: StacksTransaction[]): ProcessedData {
      if (this.processedData) return this.processedData;
  
      const processed: ProcessedData = {
        recentTransactions: [],
        spending: {},
        insights: {
          totalSpent: 0,
          largestTransaction: 0,
          frequentRecipients: [],
          commonCategories: []
        }
      };
  
      // Process transactions
      transactions.forEach(tx => {
        if (tx.tx_status === 'success' && tx.token_transfer) {
          const amount = parseInt(tx.token_transfer.amount) / 1000000; // Convert to STX
          const date = new Date(tx.burn_block_time_iso);
          const category = this.categorizeTransaction(tx);
  
          processed.recentTransactions.push({
            date: date.toISOString(),
            amount,
            type: category
          });
  
          processed.spending[category] = (processed.spending[category] || 0) + amount;
          processed.insights.totalSpent += amount;
          processed.insights.largestTransaction = Math.max(processed.insights.largestTransaction, amount);
        }
      });
  
      this.processedData = processed;
      return processed;
    }
  
    private categorizeTransaction(tx: StacksTransaction): string {
      // Simple categorization based on amount and memo
      const amount = parseInt(tx.token_transfer?.amount || '0');
      if (amount < 100000000) return 'Entertainment';
      if (amount < 500000000) return 'Transport';
      return 'Groceries';
    }
  
    getInsights(): string[] {
      if (!this.processedData) return [];
  
      const insights: string[] = [];
      const { spending, insights: { totalSpent } } = this.processedData;
  
      // Generate concise insights
      Object.entries(spending).forEach(([category, amount]) => {
        const percentage = (amount / totalSpent * 100).toFixed(1);
        if (Number(percentage) > 30) {
          insights.push(`High ${category} spending at ${percentage}% of total`);
        }
      });
  
      return insights;
    }

    // getStoredData(address: string): ProcessedData {
    //   // Retrieve processed data from local storage
    //   const storedData = localStorage.getItem(`processedData_${address}`);
    //   if (storedData) {
    //     return JSON.parse(storedData);
    //   }
    //   return { recentTransactions: [], spending: {}, insights: { totalSpent: 0, largestTransaction: 0, frequentRecipients: [], commonCategories: [] } };
    // }


    async getStoredData(address: string): Promise<ProcessedData> {
        try {
            // First check if we have cached data
            const cachedData = localStorage.getItem(`transactions_${address}`);
            if (cachedData) {
                const { data, timestamp } = JSON.parse(cachedData);
                // Return cached data if it's less than 5 minutes old
                if (Date.now() - timestamp < 5 * 60 * 1000) {
                    return data;
                }
            }
    
            // Fetch new data if cache missing or expired
            const response = await fetch(
                `https://api.testnet.stacks.co/extended/v1/address/${address}/transactions`
            );
            const transactions = await response.json();
    
            // Process the transactions
            const processed: ProcessedData = {
                recentTransactions: [],
                spending: {},
                insights: {
                    totalSpent: 0,
                    largestTransaction: 0,
                    frequentRecipients: [],
                    commonCategories: []
                }
            };
    
            // Process each transaction
            transactions.forEach((tx: StacksTransaction) => {
                if (tx.tx_status === 'success' && tx.token_transfer) {
                    const amount = parseInt(tx.token_transfer.amount) / 1000000; // Convert to STX
                    const date = new Date(tx.burn_block_time_iso);
                    
                    // Simple categorization based on amount
                    let category = 'Other';
                    if (amount < 100) category = 'Entertainment';
                    else if (amount < 500) category = 'Transport';
                    else if (amount < 1000) category = 'Groceries';
    
                    // Add to recent transactions
                    processed.recentTransactions.push({
                        date: date.toISOString(),
                        amount,
                        type: category
                    });
    
                    // Update spending by category
                    processed.spending[category] = (processed.spending[category] || 0) + amount;
                    
                    // Update insights
                    processed.insights.totalSpent += amount;
                    processed.insights.largestTransaction = Math.max(
                        processed.insights.largestTransaction, 
                        amount
                    );
                }
            });
    
            // Cache the processed data
            localStorage.setItem(`transactions_${address}`, JSON.stringify({
                data: processed,
                timestamp: Date.now()
            }));
    
            return processed;
        } catch (error) {
            console.error('Error processing transactions:', error);
            throw error;
        }
    }
  }
  