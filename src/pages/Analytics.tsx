
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, CartesianGrid } from "recharts";
import { ArrowUpRight, ArrowDownRight, AlertTriangle, TrendingUp, BrainCircuit, Users, Shield, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

// Enhanced mock data for AI insights
const monthlyData = [
  { name: "Jan", spending: 1200, income: 5000, budget: 4000, debt: 800, savings: 1000, peerAvg: 3500, forecast: 3800 },
  { name: "Feb", spending: 2100, income: 5200, budget: 4000, debt: 600, savings: 1500, peerAvg: 3600, forecast: 3700 },
  { name: "Mar", spending: 800, income: 5100, budget: 4000, debt: 900, savings: 2000, peerAvg: 3400, forecast: 3600 },
  { name: "Apr", spending: 1600, income: 5300, budget: 4000, debt: 700, savings: 2200, peerAvg: 3800, forecast: 3900 },
  { name: "May", spending: 900, income: 5400, budget: 4000, debt: 500, savings: 2800, peerAvg: 3700, forecast: 3500 },
  { name: "Jun", spending: 1700, income: 5500, budget: 4000, debt: 400, savings: 3000, peerAvg: 3900, forecast: 4000 },
];

const spendingCategories = [
  { name: "Food", value: 3500, color: "#1A1F71", change: "+5%" }, // Primary Navy
  { name: "Bills", value: 2500, color: "#F7B600", change: "-2%" }, // Accent Gold
  { name: "Shopping", value: 2000, color: "#0091DA", change: "+8%" }, // Visa Blueish
  { name: "Ent", value: 1500, color: "#6F7C87", change: "-3%" }, // Grey
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
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">Analytics Overview</h1>
          <p className="text-muted-foreground mt-1">Track your financial performance with ease.</p>
        </div>
        <Button variant="outline" className="bg-white" onClick={() => console.log("Download report")}>
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </Button>
      </header>

      {/* AI Insights Summary */}
      <Card className="shadow-sm border-l-4 border-l-purple-600 bg-purple-50/50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <BrainCircuit className="h-5 w-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-primary">AI-Powered Insights</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-white rounded-lg border border-purple-100 shadow-sm">
              <p className="text-sm text-muted-foreground">Spending Forecast</p>
              <p className="text-xl font-bold text-primary">₹4,200</p>
              <p className="text-sm text-green-600 font-medium">5% below average</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-purple-100 shadow-sm">
              <p className="text-sm text-muted-foreground">Suggested Budget</p>
              <p className="text-xl font-bold text-primary">₹3,800</p>
              <p className="text-sm text-blue-600 font-medium">Based on your patterns</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-purple-100 shadow-sm">
              <p className="text-sm text-muted-foreground">Savings Potential</p>
              <p className="text-xl font-bold text-primary">₹1,200</p>
              <p className="text-sm text-yellow-600 font-medium">Achievable this month</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Financial Trends */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary">Financial Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Legend iconType="circle" />
                <Line type="monotone" dataKey="income" stroke="#1A1F71" name="Income" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="spending" stroke="#F7B600" name="Expenses" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="savings" stroke="#22c55e" name="Savings" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="forecast" stroke="#94a3b8" name="Forecast" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Wallet Health & Savings Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-primary">Wallet Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <ArrowUpRight className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Balance</p>
                  <p className="font-bold text-primary">₹{walletHealth.balance.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-full">
                  <ArrowDownRight className="h-5 w-5 text-red-700" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Monthly Spending</p>
                  <p className="font-bold text-primary">₹{walletHealth.avgSpending.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-yellow-700" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming Bills</p>
                  <p className="font-bold text-primary">₹{walletHealth.upcomingBills.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg border border-border">
              <div className="flex justify-between mb-2">
                <p className="text-sm font-medium text-primary">Savings Goal Progress</p>
                <p className="text-sm text-muted-foreground">₹{walletHealth.savingsProgress} / ₹{walletHealth.savingsGoal}</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${(walletHealth.savingsProgress / walletHealth.savingsGoal) * 100}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-primary">Spending Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
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
                  >
                    {spendingCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-3">
              {spendingCategories.map((category, index) => (
                <div key={index} className="flex justify-between items-center border-b border-border pb-2 last:border-0 last:pb-0">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                    <span className="text-sm font-medium text-foreground">{category.name}</span>
                  </div>
                  <span className={`text-sm font-bold ${category.change.startsWith('+') ? 'text-red-500' : 'text-green-500'}`}>
                    {category.change}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security & Fraud Detection */}
      <Card className="shadow-sm border-l-4 border-l-blue-600 bg-blue-50/30">
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-primary">Security Status</h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            {securityMetrics.map((metric, index) => (
              <div key={index} className="p-4 bg-white rounded-lg border border-blue-100 shadow-sm">
                <p className="text-sm text-muted-foreground">{metric.name}</p>
                <p className="text-lg font-bold text-primary mt-1">{metric.status}</p>
                <p className="text-xs text-blue-500 mt-1">Last checked: {metric.lastCheck}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
