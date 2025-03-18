
import React from "react";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { TrendingUp, AlertCircle, PiggyBank } from "lucide-react";

interface CategoryType {
  id: string;
  name: string;
  limit: number;
  spent: number;
  color: string;
  icon: string;
}

interface BudgetInsightsProps {
  categories: CategoryType[];
}

const BudgetInsights: React.FC<BudgetInsightsProps> = ({ categories }) => {
  const pieData = categories.map(cat => ({
    name: cat.name,
    value: cat.spent,
    color: cat.color
  }));

  // Calculate top spending category
  const topCategory = [...categories].sort((a, b) => b.spent - a.spent)[0];
  
  // Calculate saving opportunities
  const highPercentageCategories = categories.filter(
    cat => (cat.spent / cat.limit) > 0.9
  );
  
  // Calculate overall budget health
  const totalBudget = categories.reduce((sum, cat) => sum + cat.limit, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const budgetHealthPercentage = (totalSpent / totalBudget) * 100;
  
  let budgetHealthStatus = "Excellent";
  let budgetHealthColor = "text-green-500";
  
  if (budgetHealthPercentage > 95) {
    budgetHealthStatus = "Critical";
    budgetHealthColor = "text-red-500";
  } else if (budgetHealthPercentage > 80) {
    budgetHealthStatus = "Warning";
    budgetHealthColor = "text-yellow-500";
  } else if (budgetHealthPercentage > 60) {
    budgetHealthStatus = "Good";
    budgetHealthColor = "text-blue-500";
  }

  return (
    <Card className="glass-card p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Spending Insights</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-white mb-4">Spending Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount Spent']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(17, 17, 17, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-white mb-4">Key Insights</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex items-center mb-2">
                <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
                <h4 className="font-medium text-white">Top Spending Category</h4>
              </div>
              <p className="text-sm text-gray-400">
                Your highest spending is in <span className="text-white font-medium">{topCategory?.name}</span> at  
                <span className="text-white font-medium"> ₹{topCategory?.spent.toLocaleString()}</span>, which is 
                <span className="text-white font-medium"> {Math.round((topCategory?.spent / topCategory?.limit) * 100)}%</span> of your budget.
              </p>
            </div>
            
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex items-center mb-2">
                <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                <h4 className="font-medium text-white">Saving Opportunities</h4>
              </div>
              {highPercentageCategories.length > 0 ? (
                <p className="text-sm text-gray-400">
                  {highPercentageCategories.length === 1 ? 'There is' : 'There are'} {highPercentageCategories.length} {highPercentageCategories.length === 1 ? 'category' : 'categories'} where you're close to or exceeding your budget: 
                  <span className="text-white font-medium"> {highPercentageCategories.map(cat => cat.name).join(', ')}</span>.
                </p>
              ) : (
                <p className="text-sm text-gray-400">
                  You're doing great! All your spending categories are well within their limits.
                </p>
              )}
            </div>
            
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex items-center mb-2">
                <PiggyBank className="h-5 w-5 text-purple-500 mr-2" />
                <h4 className="font-medium text-white">Budget Health</h4>
              </div>
              <p className="text-sm text-gray-400">
                Your overall budget health is <span className={`font-medium ${budgetHealthColor}`}>{budgetHealthStatus}</span>. 
                You've used <span className="text-white font-medium">{Math.round(budgetHealthPercentage)}%</span> of your total budget this month.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BudgetInsights;
