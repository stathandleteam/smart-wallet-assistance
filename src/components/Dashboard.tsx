import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FiAlertTriangle, FiDollarSign } from 'react-icons/fi';
import { BiMessageSquare, BiTrendingUp, BiWallet } from 'react-icons/bi';

// Types
interface Transaction {
  id: string;
  amount: number;
  category: string;
  date: string;
}

interface Budget {
  category: string;
  allocatedAmount: number;
  currentSpending: number;
}

interface DashboardProps {
  onDisconnect: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onDisconnect }) => {
    
  const [transactions] = useState<Transaction[]>([]);
  const [budgets] = useState<Budget[]>([
    { category: "Entertainment", allocatedAmount: 300, currentSpending: 250 },
    { category: "Groceries", allocatedAmount: 500, currentSpending: 420 },
    { category: "Transport", allocatedAmount: 200, currentSpending: 180 }
  ]);
  const [aiRecommendations, setAIRecommendations] = useState<string[]>([]);
  const [spendingAlerts, setSpendingAlerts] = useState<string[]>([]);

  useEffect(() => {
    // Simulate AI analysis
    const analyzeTransactions = () => {
      const recommendations: string[] = [
        'Consider moving $50 from dining to savings',
        'Your crypto investment potential looks good this month',
        'You could save $100 by reducing subscription services'
      ];
      
      const alerts: string[] = [];
      budgets.forEach(budget => {
        const overSpendingPercentage = (budget.currentSpending / budget.allocatedAmount) * 100;
        if (overSpendingPercentage > 100) {
          alerts.push(`You've exceeded your ${budget.category} budget by ${(overSpendingPercentage - 100).toFixed(2)}%`);
        } else if (overSpendingPercentage > 80) {
          alerts.push(`Close to ${budget.category} budget limit (${overSpendingPercentage.toFixed(2)}%)`);
        }
      });

      setAIRecommendations(recommendations);
      setSpendingAlerts(alerts);
    };

    analyzeTransactions();
  }, [transactions, budgets]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
              <BiWallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                AI Financial Dashboard
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Your personal financial advisor
              </p>
            </div>
          </div>
          <button 
            onClick={onDisconnect}
            className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Disconnect
          </button>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px] bg-white dark:bg-gray-800">
            <TabsTrigger value="overview" className="space-x-2">
              <BiTrendingUp className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="budget" className="space-x-2">
              <FiDollarSign className="h-4 w-4" />
              <span>Budget</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="space-x-2">
              <BiMessageSquare className="h-4 w-4" />
              <span>AI Chat</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-white dark:bg-gray-800 shadow-sm">
                <CardHeader>
                  <CardTitle>AI Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    {aiRecommendations.map((rec, idx) => (
                      <div key={idx} className="mb-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                        <p className="text-sm">{rec}</p>
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FiAlertTriangle className="h-5 w-5 text-red-500" />
                    Spending Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    {spendingAlerts.map((alert, idx) => (
                      <Alert key={idx} variant="destructive" className="mb-4">
                        <AlertDescription>{alert}</AlertDescription>
                      </Alert>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="budget">
            <Card className="bg-white dark:bg-gray-800 shadow-sm">
              <CardHeader>
                <CardTitle>Budget Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {budgets.map(budget => {
                    const percentage = (budget.currentSpending / budget.allocatedAmount) * 100;
                    return (
                      <div key={budget.category} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{budget.category}</span>
                          <span className="text-gray-600 dark:text-gray-300">
                            ${budget.currentSpending.toLocaleString()} / ${budget.allocatedAmount.toLocaleString()}
                          </span>
                        </div>
                        <Progress 
                          value={percentage} 
                          className={`h-2 ${percentage > 100 ? "bg-red-500" : "bg-blue-500"}`}
                        //   indicatorClassName={percentage > 100 ? "bg-red-500" : "bg-blue-500"}
                        />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat">
            <Card className="bg-white dark:bg-gray-800 shadow-sm">
              <CardHeader>
                <CardTitle>AI Financial Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[400px] bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-gray-600 dark:text-gray-300">Chat interface coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;