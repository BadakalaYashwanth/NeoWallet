
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, Trash2, AlertTriangle, Check, TrendingUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import BudgetCategoryCard from "@/components/budget/BudgetCategoryCard";
import BudgetSummary from "@/components/budget/BudgetSummary";
import BudgetInsights from "@/components/budget/BudgetInsights";

// Mock budget categories data
const initialCategories = [
  { 
    id: "1", 
    name: "Groceries", 
    limit: 15000, 
    spent: 12000, 
    color: "#10b981",
    icon: "ShoppingBag" 
  },
  { 
    id: "2", 
    name: "Entertainment", 
    limit: 8000, 
    spent: 6200, 
    color: "#8b5cf6",
    icon: "Film" 
  },
  { 
    id: "3", 
    name: "Transportation", 
    limit: 5000, 
    spent: 4500, 
    color: "#3b82f6",
    icon: "Car" 
  },
  { 
    id: "4", 
    name: "Dining Out", 
    limit: 10000, 
    spent: 8500, 
    color: "#ef4444",
    icon: "UtensilsCrossed" 
  },
];

const Budget = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState(initialCategories);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", limit: "", icon: "ShoppingBag", color: "#10b981" });
  
  const totalBudget = categories.reduce((sum, cat) => sum + cat.limit, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const remainingBudget = totalBudget - totalSpent;
  const budgetProgress = (totalSpent / totalBudget) * 100;

  const handleAddCategory = () => {
    if (!newCategory.name || !newCategory.limit) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newCat = {
      id: Date.now().toString(),
      name: newCategory.name,
      limit: Number(newCategory.limit),
      spent: 0,
      color: newCategory.color,
      icon: newCategory.icon,
    };

    setCategories([...categories, newCat]);
    setNewCategory({ name: "", limit: "", icon: "ShoppingBag", color: "#10b981" });
    setIsAddDialogOpen(false);

    toast({
      title: "Budget category added",
      description: `${newCategory.name} budget category has been created`,
    });
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
    
    toast({
      title: "Category deleted",
      description: "Budget category has been removed",
    });
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-primary">Budget Planning</h1>
        <p className="text-secondary-foreground">Manage your spending limits and track expenses</p>
      </header>

      <BudgetSummary 
        totalBudget={totalBudget} 
        totalSpent={totalSpent} 
        remainingBudget={remainingBudget} 
        budgetProgress={budgetProgress} 
      />

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Budget Categories</h2>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-purple-500 hover:bg-purple-600"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <BudgetCategoryCard 
            key={category.id}
            category={category}
            onDelete={() => handleDeleteCategory(category.id)}
          />
        ))}
      </div>

      <BudgetInsights categories={categories} />

      {/* Add New Category Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="glass-card sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-white">Create New Budget Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Category Name</Label>
              <Input
                id="name"
                placeholder="e.g., Groceries, Entertainment"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="limit" className="text-white">Monthly Limit (₹)</Label>
              <Input
                id="limit"
                type="number"
                placeholder="10000"
                value={newCategory.limit}
                onChange={(e) => setNewCategory({ ...newCategory, limit: e.target.value })}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon" className="text-white">Icon</Label>
              <Select 
                onValueChange={(value) => setNewCategory({ ...newCategory, icon: value })}
                defaultValue={newCategory.icon}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select icon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ShoppingBag">Shopping</SelectItem>
                  <SelectItem value="Film">Entertainment</SelectItem>
                  <SelectItem value="Car">Transportation</SelectItem>
                  <SelectItem value="UtensilsCrossed">Dining</SelectItem>
                  <SelectItem value="Home">Housing</SelectItem>
                  <SelectItem value="Smartphone">Technology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="color" className="text-white">Color</Label>
              <div className="flex space-x-2">
                {["#10b981", "#8b5cf6", "#3b82f6", "#ef4444", "#f59e0b", "#ec4899"].map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`w-8 h-8 rounded-full ${
                      newCategory.color === color ? "ring-2 ring-white" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setNewCategory({ ...newCategory, color })}
                  />
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-purple-500 hover:bg-purple-600" onClick={handleAddCategory}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Budget;
