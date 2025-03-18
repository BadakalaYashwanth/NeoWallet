
import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface BudgetSummaryProps {
  totalBudget: number;
  totalSpent: number;
  remainingBudget: number;
  budgetProgress: number;
}

const BudgetSummary: React.FC<BudgetSummaryProps> = ({
  totalBudget,
  totalSpent,
  remainingBudget,
  budgetProgress
}) => {
  const isOverBudget = budgetProgress > 100;
  const isNearLimit = budgetProgress > 80 && budgetProgress <= 100;
  
  return (
    <Card className="glass-card p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Monthly Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="p-2 bg-purple-500/20 rounded-full mr-3">
              <Wallet className="h-5 w-5 text-purple-500" />
            </div>
            <span className="text-gray-400">Total Budget</span>
          </div>
          <p className="text-2xl font-bold text-white pl-11">₹{totalBudget.toLocaleString()}</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="p-2 bg-red-500/20 rounded-full mr-3">
              <TrendingDown className="h-5 w-5 text-red-500" />
            </div>
            <span className="text-gray-400">Total Spent</span>
          </div>
          <p className="text-2xl font-bold text-white pl-11">₹{totalSpent.toLocaleString()}</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="p-2 bg-green-500/20 rounded-full mr-3">
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <span className="text-gray-400">Remaining</span>
          </div>
          <p 
            className={cn(
              "text-2xl font-bold pl-11",
              isOverBudget ? "text-red-500" : "text-white"
            )}
          >
            ₹{remainingBudget.toLocaleString()}
          </p>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-400">Monthly Budget Usage</span>
          <span className="text-sm font-medium text-white">{Math.min(Math.round(budgetProgress), 100)}%</span>
        </div>
        <Progress 
          value={Math.min(budgetProgress, 100)} 
          className="h-3"
          indicatorClassName={cn(
            isOverBudget ? "bg-red-500" : 
            isNearLimit ? "bg-yellow-500" : 
            "bg-green-500"
          )}
        />
      </div>
    </Card>
  );
};

export default BudgetSummary;
