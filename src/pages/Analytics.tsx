
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import AIInsightsCard from "@/components/analytics/AIInsightsCard";
import FinancialTrendsChart from "@/components/analytics/FinancialTrendsChart";
import WalletHealthCard from "@/components/analytics/WalletHealthCard";
import SpendingCategoriesChart from "@/components/analytics/SpendingCategoriesChart";
import IncomeExpensesChart from "@/components/analytics/IncomeExpensesChart";
import SecurityInsightsCard from "@/components/analytics/SecurityInsightsCard";

const monthlyData = [
  { name: "Jan", spending: -1200, income: 5000, budget: 4000, debt: -800, savings: 1000, peerAvg: 3500, forecast: 3800 },
  { name: "Feb", spending: -2100, income: 5200, budget: 4000, debt: -600, savings: 1500, peerAvg: 3600, forecast: 3700 },
  { name: "Mar", spending: -800, income: 5100, budget: 4000, debt: -900, savings: 2000, peerAvg: 3400, forecast: 3600 },
  { name: "Apr", spending: -1600, income: 5300, budget: 4000, debt: -700, savings: 2200, peerAvg: 3800, forecast: 3900 },
  { name: "May", spending: -900, income: 5400, budget: 4000, debt: -500, savings: 2800, peerAvg: 3700, forecast: 3500 },
  { name: "Jun", spending: -1700, income: 5500, budget: 4000, debt: -400, savings: 3000, peerAvg: 3900, forecast: 4000 },
];

const spendingCategories = [
  { name: "Food", value: 3500, color: "#FF8042", change: "+5%" },
  { name: "Bills", value: 2500, color: "#00C49F", change: "-2%" },
  { name: "Shopping", value: 2000, color: "#FFBB28", change: "+8%" },
  { name: "Entertainment", value: 1500, color: "#0088FE", change: "-3%" },
];

const walletHealth = {
  balance: 25000,
  avgSpending: 1500,
  upcomingBills: 3000,
  savingsGoal: 10000,
  savingsProgress: 6000,
  predictedSavings: 8500,
};

const securityMetrics = [
  { name: "Login Activity", status: "Normal", lastCheck: "2 hours ago" },
  { name: "Unusual Transactions", status: "None Detected", lastCheck: "1 hour ago" },
  { name: "Duplicate Payments", status: "None Found", lastCheck: "30 mins ago" },
];

const Analytics = () => {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-primary">Analytics Overview</h1>
          <p className="text-secondary-foreground">Track your financial performance</p>
        </div>
        <Button className="glass-card hover:bg-white/10" onClick={() => console.log("Download report")}>
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </Button>
      </header>

      <AIInsightsCard />
      <FinancialTrendsChart data={monthlyData} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WalletHealthCard data={walletHealth} />
        <SpendingCategoriesChart categories={spendingCategories} />
      </div>

      <IncomeExpensesChart data={monthlyData} />
      <SecurityInsightsCard metrics={securityMetrics} />
    </div>
  );
};

export default Analytics;
