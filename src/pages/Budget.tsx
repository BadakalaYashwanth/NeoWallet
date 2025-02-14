
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlusCircle, Wallet, ShoppingBag, Coffee, Home, Car, Plane, Phone, Utensils } from "lucide-react";
import { useState } from "react";

interface Budget {
  id: string;
  category: string;
  icon: JSX.Element;
  limit: number;
  spent: number;
  color: string;
}

const initialBudgets: Budget[] = [
  {
    id: "1",
    category: "Shopping",
    icon: <ShoppingBag className="h-5 w-5" />,
    limit: 20000,
    spent: 15400,
    color: "bg-purple-500"
  },
  {
    id: "2",
    category: "Food & Dining",
    icon: <Utensils className="h-5 w-5" />,
    limit: 15000,
    spent: 12300,
    color: "bg-blue-500"
  },
  {
    id: "3",
    category: "Transportation",
    icon: <Car className="h-5 w-5" />,
    limit: 8000,
    spent: 3200,
    color: "bg-green-500"
  },
  {
    id: "4",
    category: "Entertainment",
    icon: <Coffee className="h-5 w-5" />,
    limit: 5000,
    spent: 4100,
    color: "bg-yellow-500"
  },
  {
    id: "5",
    category: "Bills & Utilities",
    icon: <Phone className="h-5 w-5" />,
    limit: 10000,
    spent: 8900,
    color: "bg-red-500"
  }
];

const Budget = () => {
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);
  const totalSpent = budgets.reduce((acc, budget) => acc + budget.spent, 0);
  const totalBudget = budgets.reduce((acc, budget) => acc + budget.limit, 0);

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white">Budget Planner</h1>
          <p className="text-gray-400">Track and manage your monthly expenses</p>
        </div>
        <Button className="glass-card">
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Budget
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Monthly Overview</h3>
              <Wallet className="h-5 w-5 text-purple-400" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Budget</span>
                <span className="text-white">₹{totalBudget.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Spent</span>
                <span className="text-white">₹{totalSpent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Remaining</span>
                <span className="text-green-500">₹{(totalBudget - totalSpent).toLocaleString()}</span>
              </div>
            </div>
            <Progress value={(totalSpent / totalBudget) * 100} className="h-2" />
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Budget Health</h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-400">Good</span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-white">
              {Math.round((1 - totalSpent / totalBudget) * 100)}%
            </p>
            <p className="text-sm text-gray-400">of your budget remaining</p>
          </div>
        </Card>
      </div>

      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-6 text-white">Category Budgets</h3>
        <div className="space-y-6">
          {budgets.map((budget) => (
            <div key={budget.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${budget.color}/20`}>
                    {budget.icon}
                  </div>
                  <div>
                    <p className="font-medium text-white">{budget.category}</p>
                    <p className="text-sm text-gray-400">
                      ₹{budget.spent.toLocaleString()} / ₹{budget.limit.toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className={`text-sm ${
                  (budget.spent / budget.limit) > 0.9 ? 'text-red-500' : 'text-gray-400'
                }`}>
                  {Math.round((budget.spent / budget.limit) * 100)}%
                </p>
              </div>
              <Progress 
                value={(budget.spent / budget.limit) * 100} 
                className={`h-2 ${budget.color}`} 
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Budget;
