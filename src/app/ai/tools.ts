import { tool as createTool, ToolSet } from "ai"
import { z } from "zod";

// export const tool = createTool({
//     description: "Get insights from a prompt",
//     parameters: z.object({
//         name: z.string().describe("The name of the person"),
//     }),
//     execute: async ({ name }) => {
//         return {name}
//     },
// });

// Example tool with context as an additional parameter
export const getSpendingBreakdownTool =(context:any)=>createTool({
    description: "Get detailed spending breakdown",
    parameters: z.object({
      category: z.string().describe("The category of spending to breakdown"),
    }),
    execute: async ({ category }) => {
      // Use context inside the function
      return context.processedData.spending[category] || 0;
    },
  });

  export const getRecentTransactionsTool = (context:any)=> createTool({
    description: "Get recent transactions for analysis",
    parameters: z.object({
      days: z.number().describe("The number of days for recent transactions"),
    }),
    execute: async ({ days }) => {
      return context.processedData.recentTransactions.filter((tx:any) => {
        const txDate = new Date(tx.date);
        const daysAgo = (Date.now() - txDate.getTime()) / (1000 * 60 * 60 * 24);
        return daysAgo <= days;
      });
    },
  });
  

  