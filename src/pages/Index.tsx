
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  QrCode,
  Send,
  Download,
  Calculator,
  ArrowRight
} from "lucide-react";
import { ValueType } from "recharts/types/component/DefaultTooltipContent";
import { useState } from "react";
import QRScanner from "@/components/QRScanner";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

// Mock data for the transaction history
const transactionHistory = [
  { month: "Jan", income: 45000, expenses: -32000, savings: 13000 },
  { month: "Feb", income: 48000, expenses: -35000, savings: 13000 },
  { month: "Mar", income: 52000, expenses: -34000, savings: 18000 },
  { month: "Apr", income: 49000, expenses: -31000, savings: 18000 },
  { month: "May", income: 53000, expenses: -36000, savings: 17000 },
  { month: "Jun", income: 55000, expenses: -38000, savings: 17000 },
  { month: "Jul", income: 54000, expenses: -35000, savings: 19000 },
];

const Index = () => {
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Calculate total balance and other financial metrics
  const currentBalance = 124500;
  const monthlyIncome = 55000;
  const monthlyExpenses = 38000;
  const monthlySavings = monthlyIncome - monthlyExpenses;
  const savingsPercentage = ((monthlySavings / monthlyIncome) * 100).toFixed(1);

  const formatTooltipValue = (value: ValueType) => {
    if (typeof value === 'number') {
      return [`₹${Math.abs(value).toLocaleString()}`, ''];
    }
    return ['₹0', ''];
  };

  const handleScan = (result: string) => {
    try {
      const paymentData = JSON.parse(result);

      toast({
        title: "QR Code Scanned",
        description: "Payment details loaded successfully",
      });

      // Navigate to send money page with payment data
      navigate('/send', { state: { paymentData } });
    } catch (error) {
      toast({
        title: "Invalid QR Code",
        description: "Could not process QR code data",
        variant: "destructive",
      });
    }
  };

  const QuickActionCard = ({ icon: Icon, title, onClick, colorClass }: { icon: any, title: string, onClick: () => void, colorClass: string }) => (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow border-slate-200 group"
      onClick={onClick}
    >
      <CardContent className="flex flex-col items-center justify-center p-6 gap-4 text-center">
        <div className={`p-4 rounded-full bg-slate-50 group-hover:bg-slate-100 transition-colors ${colorClass}`}>
          <Icon className="h-8 w-8" />
        </div>
        <span className="font-semibold text-primary group-hover:text-primary/80">{title}</span>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">Welcome back, Yashwanth</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your money today.</p>
        </div>
        <Button onClick={() => navigate('/analytics')} className="bg-primary text-primary-foreground hover:bg-primary/90">
          View Full Report <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </header>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-primary shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Balance</p>
                <h3 className="text-2xl font-bold text-primary mt-2">
                  ₹{currentBalance.toLocaleString()}
                </h3>
              </div>
              <div className="p-2 bg-slate-100 rounded-full">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Income</p>
                <h3 className="text-2xl font-bold text-green-600 mt-2">
                  +₹{monthlyIncome.toLocaleString()}
                </h3>
              </div>
              <div className="p-2 bg-green-50 rounded-full">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Expenses</p>
                <h3 className="text-2xl font-bold text-red-600 mt-2">
                  -₹{monthlyExpenses.toLocaleString()}
                </h3>
              </div>
              <div className="p-2 bg-red-50 rounded-full">
                <TrendingDown className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Savings Rate</p>
                <h3 className="text-2xl font-bold text-purple-600 mt-2">
                  {savingsPercentage}%
                </h3>
              </div>
              <div className="p-2 bg-purple-50 rounded-full">
                <PiggyBank className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-bold text-primary mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickActionCard
            icon={Send}
            title="Send Money"
            onClick={() => navigate('/send')}
            colorClass="text-blue-600"
          />
          <QuickActionCard
            icon={QrCode}
            title="Scan QR"
            onClick={() => setIsQRScannerOpen(true)}
            colorClass="text-primary"
          />
          <QuickActionCard
            icon={Download}
            title="Request Money"
            onClick={() => navigate('/receive')}
            colorClass="text-green-600"
          />
          <QuickActionCard
            icon={Calculator}
            title="Calculator"
            onClick={() => navigate('/calculator')}
            colorClass="text-orange-500"
          />
        </div>
      </section>

      {/* Transaction History Graph */}
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="border-b border-border bg-slate-50/50">
          <CardTitle className="text-lg font-bold text-primary">Financial Performance</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={transactionHistory}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis
                  dataKey="month"
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `₹${Math.abs(value / 1000)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  cursor={{ stroke: '#94a3b8', strokeWidth: 1 }}
                  formatter={formatTooltipValue}
                />
                <Legend iconType="circle" />
                <Line
                  type="monotone"
                  dataKey="income"
                  name="Income"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  name="Expenses"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ fill: '#ef4444', r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="savings"
                  name="Savings"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* QR Scanner Dialog */}
      <QRScanner
        isOpen={isQRScannerOpen}
        onClose={() => setIsQRScannerOpen(false)}
        onScan={handleScan}
      />
    </div>
  );
};

export default Index;
