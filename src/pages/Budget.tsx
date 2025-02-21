import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  PlusCircle, 
  Wallet, 
  ShoppingBag, 
  Coffee, 
  Home, 
  Car, 
  Plane, 
  Phone, 
  Utensils,
  Sparkles,
  TrendingDown,
  AlertCircle,
  ArrowUpRight,
  Repeat,
  PiggyBank
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface Budget {
  id: string;
  category: string;
  icon: JSX.Element;
  limit: number;
  spent: number;
  color: string;
}

interface SavingSuggestion {
  id: string;
  title: string;
  description: string;
  potentialSaving: number;
  icon: JSX.Element;
  type: 'optimization' | 'alert' | 'opportunity';
}

interface AutoSweep {
  enabled: boolean;
  threshold: number;
  targetAmount: number;
  frequency: 'daily' | 'weekly' | 'monthly';
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

const savingSuggestions: SavingSuggestion[] = [
  {
    id: "1",
    title: "Reduce Food Delivery Spending",
    description: "You've spent 40% more on food delivery this month compared to your average. Consider cooking at home more often.",
    potentialSaving: 2500,
    icon: <Utensils className="h-5 w-5 text-yellow-400" />,
    type: 'optimization'
  },
  {
    id: "2",
    title: "Unused Subscription Found",
    description: "We noticed you haven't used your music streaming service in 2 months.",
    potentialSaving: 199,
    icon: <AlertCircle className="h-5 w-5 text-red-400" />,
    type: 'alert'
  },
  {
    id: "3",
    title: "Smart Saving Opportunity",
    description: "Based on your cash flow, you can save ₹5,000 more this month without affecting your lifestyle.",
    potentialSaving: 5000,
    icon: <Sparkles className="h-5 w-5 text-purple-400" />,
    type: 'opportunity'
  }
];

const Budget = () => {
  const { toast } = useToast();
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);
  const [autoSweep, setAutoSweep] = useState<AutoSweep>({
    enabled: false,
    threshold: 10000,
    targetAmount: 50000,
    frequency: 'monthly'
  });
  
  const totalSpent = budgets.reduce((acc, budget) => acc + budget.spent, 0);
  const totalBudget = budgets.reduce((acc, budget) => acc + budget.limit, 0);

  const handleOptimize = (suggestion: SavingSuggestion) => {
    toast({
      title: "Optimization Applied",
      description: `We'll help you track ${suggestion.title.toLowerCase()} to save ₹${suggestion.potentialSaving.toLocaleString()}`
    });
  };

  const toggleAutoSweep = () => {
    setAutoSweep(prev => ({
      ...prev,
      enabled: !prev.enabled
    }));
    
    toast({
      title: autoSweep.enabled ? "Auto-Sweep Disabled" : "Auto-Sweep Enabled",
      description: autoSweep.enabled 
        ? "Auto-sweep to fixed deposit has been disabled"
        : `Will automatically sweep excess funds above ₹${autoSweep.threshold.toLocaleString()} to fixed deposit`,
    });
  };

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

        <Card className="glass-card p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <PiggyBank className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-white">Auto-Sweep</h3>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleAutoSweep}
              className={`${autoSweep.enabled ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-400'}`}
            >
              {autoSweep.enabled ? 'Enabled' : 'Disabled'}
            </Button>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Threshold</span>
              <span className="text-white">₹{autoSweep.threshold.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Target Amount</span>
              <span className="text-white">₹{autoSweep.targetAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Frequency</span>
              <span className="text-white capitalize">{autoSweep.frequency}</span>
            </div>
            <div className="pt-2">
              <Button variant="outline" className="w-full" onClick={() => {
                toast({
                  title: "Auto-Sweep Settings",
                  description: "Settings panel will be implemented in the next update"
                });
              }}>
                <Repeat className="h-4 w-4 mr-2" />
                Configure Auto-Sweep
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Card className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">AI Savings Insights</h3>
          </div>
          <span className="text-sm text-gray-400">Updated just now</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {savingSuggestions.map((suggestion) => (
            <Card 
              key={suggestion.id} 
              className="glass-card p-4 hover:bg-white/5 transition-all cursor-pointer"
              onClick={() => handleOptimize(suggestion)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-white/5">
                  {suggestion.icon}
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-400" />
              </div>
              <h4 className="font-medium text-white mb-2">{suggestion.title}</h4>
              <p className="text-sm text-gray-400 mb-3">{suggestion.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Potential Saving</span>
                <span className="text-green-400 font-medium">
                  ₹{suggestion.potentialSaving.toLocaleString()}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </Card>

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
