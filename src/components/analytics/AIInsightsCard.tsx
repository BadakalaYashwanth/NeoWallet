
import { Card } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";

const AIInsightsCard = () => {
  return (
    <Card className="glass-card p-6">
      <div className="flex items-center space-x-2 mb-4">
        <BrainCircuit className="h-5 w-5 text-purple-400" />
        <h3 className="text-lg font-semibold text-white">AI-Powered Insights</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white/5 rounded-lg">
          <p className="text-sm text-gray-400">Spending Forecast</p>
          <p className="text-xl font-bold text-white">₹4,200</p>
          <p className="text-sm text-green-400">5% below average</p>
        </div>
        <div className="p-4 bg-white/5 rounded-lg">
          <p className="text-sm text-gray-400">Suggested Budget</p>
          <p className="text-xl font-bold text-white">₹3,800</p>
          <p className="text-sm text-blue-400">Based on your patterns</p>
        </div>
        <div className="p-4 bg-white/5 rounded-lg">
          <p className="text-sm text-gray-400">Savings Potential</p>
          <p className="text-xl font-bold text-white">₹1,200</p>
          <p className="text-sm text-yellow-400">Achievable this month</p>
        </div>
      </div>
    </Card>
  );
};

export default AIInsightsCard;
