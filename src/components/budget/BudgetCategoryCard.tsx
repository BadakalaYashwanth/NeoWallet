
import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Trash2, Check } from "lucide-react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

interface BudgetCategoryProps {
  category: {
    id: string;
    name: string;
    limit: number;
    spent: number;
    color: string;
    icon: string;
  };
  onDelete: (id: string) => void;
}

const BudgetCategoryCard: React.FC<BudgetCategoryProps> = ({ category, onDelete }) => {
  const spentPercentage = (category.spent / category.limit) * 100;
  const remaining = category.limit - category.spent;
  const isOverBudget = spentPercentage > 100;
  const isCloseToLimit = spentPercentage > 80 && spentPercentage <= 100;
  
  // Dynamically get the icon from Lucide based on the icon name
  const IconComponent = (Icons as any)[category.icon] || Icons.ShoppingBag;

  return (
    <Card className="glass-card p-5 transition-all hover:scale-[1.01]">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div 
            className="p-2 rounded-full mr-3" 
            style={{ backgroundColor: `${category.color}25` }}
          >
            <IconComponent className="h-5 w-5" style={{ color: category.color }} />
          </div>
          <div>
            <h3 className="font-medium text-white">{category.name}</h3>
            <p className="text-sm text-gray-400">Monthly budget</p>
          </div>
        </div>
        <button 
          onClick={() => onDelete(category.id)}
          className="p-1.5 hover:bg-white/10 rounded-full"
        >
          <Trash2 className="h-4 w-4 text-gray-400" />
        </button>
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-400">
            {isOverBudget ? "Over budget by" : "Remaining"}
          </span>
          <span 
            className={cn(
              "font-medium",
              isOverBudget ? "text-red-500" : "text-white"
            )}
          >
            {isOverBudget 
              ? `₹${Math.abs(remaining).toLocaleString()}`
              : `₹${remaining.toLocaleString()}`
            }
          </span>
        </div>
        
        <Progress 
          value={Math.min(spentPercentage, 100)} 
          className="h-2" 
          indicatorClassName={cn(
            isOverBudget ? "bg-red-500" : 
            isCloseToLimit ? "bg-yellow-500" : 
            "bg-green-500"
          )}
        />
      </div>
      
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-400">₹{category.spent.toLocaleString()}</span>
        <span className="text-gray-400">₹{category.limit.toLocaleString()}</span>
      </div>
      
      {isOverBudget && (
        <div className="mt-3 p-2 bg-red-500/20 text-red-400 rounded-lg flex items-center text-xs">
          <AlertTriangle className="h-4 w-4 mr-2" />
          You've exceeded your budget limit
        </div>
      )}
      
      {isCloseToLimit && !isOverBudget && (
        <div className="mt-3 p-2 bg-yellow-500/20 text-yellow-400 rounded-lg flex items-center text-xs">
          <AlertTriangle className="h-4 w-4 mr-2" />
          You're approaching your budget limit
        </div>
      )}
      
      {!isCloseToLimit && !isOverBudget && (
        <div className="mt-3 p-2 bg-green-500/20 text-green-400 rounded-lg flex items-center text-xs">
          <Check className="h-4 w-4 mr-2" />
          You're within your budget
        </div>
      )}
    </Card>
  );
};

export default BudgetCategoryCard;
