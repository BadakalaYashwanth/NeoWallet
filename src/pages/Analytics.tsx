
import { Card } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { ArrowUpRight, ArrowDownRight, AlertTriangle, TrendingUp, BrainCircuit, Users, Shield, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

// Enhanced mock data for AI insights
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

      {/* AI Insights Summary */}
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

      {/* Main Financial Trends */}
      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Financial Trends</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <XAxis dataKey="name" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(17, 17, 17, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="spending" stroke="#22c55e" name="Spending" strokeWidth={2} />
              <Line type="monotone" dataKey="income" stroke="#3b82f6" name="Income" strokeWidth={2} />
              <Line type="monotone" dataKey="budget" stroke="#f97316" name="Budget" strokeWidth={2} />
              <Line type="monotone" dataKey="debt" stroke="#ef4444" name="Debt" strokeWidth={2} />
              <Line type="monotone" dataKey="savings" stroke="#eab308" name="Savings" strokeWidth={2} />
              <Line type="monotone" dataKey="peerAvg" stroke="#8b5cf6" name="Peer Average" strokeWidth={2} />
              <Line type="monotone" dataKey="forecast" stroke="#ec4899" name="AI Forecast" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Wallet Health & Savings Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4 text-white">Wallet Health</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <ArrowUpRight className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-400">Current Balance</p>
                  <p className="font-medium text-white">₹{walletHealth.balance.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <ArrowDownRight className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-sm text-gray-400">Average Monthly Spending</p>
                  <p className="font-medium text-white">₹{walletHealth.avgSpending.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-400">Upcoming Bills</p>
                  <p className="font-medium text-white">₹{walletHealth.upcomingBills.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="flex justify-between mb-2">
                <p className="text-sm text-gray-400">Savings Goal Progress</p>
                <p className="text-sm text-white">₹{walletHealth.savingsProgress} / ₹{walletHealth.savingsGoal}</p>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{ width: `${(walletHealth.savingsProgress / walletHealth.savingsGoal) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4 text-white">Spending Categories</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={spendingCategories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {spendingCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(17, 17, 17, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {spendingCategories.map((category, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                  <span className="text-sm text-white">{category.name}</span>
                </div>
                <span className={`text-sm ${category.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {category.change}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Monthly Income vs Expenses */}
      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Income vs Expenses</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <XAxis dataKey="name" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(17, 17, 17, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="income" name="Income" fill="#3b82f6" />
              <Bar dataKey="spending" name="Expenses" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Security & Fraud Detection */}
      <Card className="glass-card p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Shield className="h-5 w-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Security Insights</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {securityMetrics.map((metric, index) => (
            <div key={index} className="p-4 bg-white/5 rounded-lg">
              <p className="text-sm text-gray-400">{metric.name}</p>
              <p className="text-lg font-semibold text-white">{metric.status}</p>
              <p className="text-xs text-gray-500">Last checked: {metric.lastCheck}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Analytics;
