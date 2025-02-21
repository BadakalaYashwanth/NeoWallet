
import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, AlertTriangle } from "lucide-react";

interface WalletHealthData {
  balance: number;
  avgSpending: number;
  upcomingBills: number;
  savingsGoal: number;
  savingsProgress: number;
  predictedSavings: number;
}

interface WalletHealthCardProps {
  data: WalletHealthData;
}

const WalletHealthCard = ({ data }: WalletHealthCardProps) => {
  return (
    <Card className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4 text-white">Wallet Health</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
          <div className="flex items-center space-x-3">
            <ArrowUpRight className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-gray-400">Current Balance</p>
              <p className="font-medium text-white">₹{data.balance.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
          <div className="flex items-center space-x-3">
            <ArrowDownRight className="h-5 w-5 text-red-500" />
            <div>
              <p className="text-sm text-gray-400">Average Monthly Spending</p>
              <p className="font-medium text-white">₹{data.avgSpending.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <div>
              <p className="text-sm text-gray-400">Upcoming Bills</p>
              <p className="font-medium text-white">₹{data.upcomingBills.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white/5 rounded-lg">
          <div className="flex justify-between mb-2">
            <p className="text-sm text-gray-400">Savings Goal Progress</p>
            <p className="text-sm text-white">₹{data.savingsProgress} / ₹{data.savingsGoal}</p>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-blue-500 h-2.5 rounded-full"
              style={{ width: `${(data.savingsProgress / data.savingsGoal) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WalletHealthCard;
