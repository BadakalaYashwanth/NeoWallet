
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  TooltipProps
} from "recharts";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  PiggyBank, 
  QrCode,
  Send,
  Download
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

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-white">Dashboard</h1>
        <p className="text-secondary-foreground">Your financial overview</p>
      </header>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4">
        <Button 
          variant="outline" 
          className="glass-card p-6 flex flex-col items-center gap-2 h-auto"
          onClick={() => navigate('/send')}
        >
          <Send className="h-6 w-6 text-blue-500" />
          <span>Send Money</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="glass-card p-6 flex flex-col items-center gap-2 h-auto relative overflow-hidden group"
          onClick={() => setIsQRScannerOpen(true)}
        >
          <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <QrCode className="h-6 w-6 text-purple-500 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Scan QR</span>
          <span className="text-xs text-gray-400 hidden md:block">Quick Access</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="glass-card p-6 flex flex-col items-center gap-2 h-auto"
          onClick={() => navigate('/receive')}
        >
          <Download className="h-6 w-6 text-green-500" />
          <span>Receive Money</span>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Current Balance</p>
              <p className="text-2xl font-bold text-white mt-1">
                ₹{currentBalance.toLocaleString()}
              </p>
            </div>
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Wallet className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Monthly Income</p>
              <p className="text-2xl font-bold text-white mt-1">
                ₹{monthlyIncome.toLocaleString()}
              </p>
            </div>
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Monthly Expenses</p>
              <p className="text-2xl font-bold text-white mt-1">
                ₹{monthlyExpenses.toLocaleString()}
              </p>
            </div>
            <div className="p-2 bg-red-500/20 rounded-lg">
              <TrendingDown className="h-5 w-5 text-red-500" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Monthly Savings</p>
              <p className="text-2xl font-bold text-white mt-1">
                {savingsPercentage}%
              </p>
            </div>
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <PiggyBank className="h-5 w-5 text-purple-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Transaction History Graph */}
      <Card className="glass-card p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Transaction History</h3>
            <p className="text-sm text-gray-400">Your financial activity over time</p>
          </div>
        </div>
        
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={transactionHistory}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis 
                dataKey="month" 
                stroke="#888888"
              />
              <YAxis 
                stroke="#888888"
                tickFormatter={(value) => `₹${Math.abs(value/1000)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(17, 17, 17, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px'
                }}
                formatter={formatTooltipValue}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                name="Income"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6' }}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                name="Expenses"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: '#ef4444' }}
              />
              <Line
                type="monotone"
                dataKey="savings"
                name="Savings"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: '#8b5cf6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
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
