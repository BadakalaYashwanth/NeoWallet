
import { Card } from "@/components/ui/card";
import { DollarSign, PieChart, ArrowUpRight, ArrowDownRight, Send, Download, Users, Wallet, Scan } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { useState } from "react";
import QRScanner from "@/components/QRScanner";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";

const data = [
  { name: "Jan", amount: 2400 },
  { name: "Feb", amount: 1398 },
  { name: "Mar", amount: 9800 },
  { name: "Apr", amount: 3908 },
  { name: "May", amount: 4800 },
  { name: "Jun", amount: 3800 },
];

const quickActions = [
  { icon: Send, label: "Send", color: "text-purple-500" },
  { icon: Download, label: "Receive", color: "text-green-500" },
  { icon: Users, label: "Split", color: "text-blue-500" },
];

const Index = () => {
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleScan = (result: string) => {
    try {
      const scannedData = JSON.parse(result);
      navigate('/send', { state: { scannedData } });
    } catch (error) {
      toast({
        title: "Invalid QR Code",
        description: "Could not process QR code data",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gradient">Welcome back, Yashwanth!</h1>
          <p className="text-muted-foreground">Manage your digital wallet and payments</p>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <button
            onClick={() => setIsQRScannerOpen(true)}
            className="glass-card p-2 rounded-lg hover:scale-105 transition-transform"
          >
            <Scan className="h-5 w-5 text-purple-500" />
          </button>
        </div>
      </header>

      <QRScanner
        isOpen={isQRScannerOpen}
        onClose={() => setIsQRScannerOpen(false)}
        onScan={handleScan}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card p-6 hover:scale-105 transition-transform">
          <div className="flex justify-between items-center mb-4">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Wallet className="h-6 w-6 text-purple-500" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-sm text-muted-foreground">Total Balance</p>
          <h2 className="text-2xl font-bold text-white">₹45,231.89</h2>
          <p className="text-sm text-green-500">+2.5% from last month</p>
        </Card>

        <Card className="glass-card p-6 hover:scale-105 transition-transform">
          <div className="flex justify-between items-center mb-4">
            <div className="p-2 rounded-lg bg-green-500/20">
              <ArrowUpRight className="h-6 w-6 text-green-500" />
            </div>
            <PieChart className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-sm text-muted-foreground">Income</p>
          <h2 className="text-2xl font-bold text-white">₹12,750.00</h2>
          <p className="text-sm text-green-500">+15% from last month</p>
        </Card>

        <Card className="glass-card p-6 hover:scale-105 transition-transform">
          <div className="flex justify-between items-center mb-4">
            <div className="p-2 rounded-lg bg-red-500/20">
              <ArrowDownRight className="h-6 w-6 text-red-500" />
            </div>
            <DollarSign className="h-4 w-4 text-red-500" />
          </div>
          <p className="text-sm text-muted-foreground">Expenses</p>
          <h2 className="text-2xl font-bold text-white">₹8,900.00</h2>
          <p className="text-sm text-red-500">-3% from last month</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass-card p-6 col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-white">Transaction History</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="name" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-6 text-white">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className="flex flex-col items-center p-4 rounded-lg glass-card hover:scale-105 transition-transform"
              >
                <action.icon className={`h-6 w-6 ${action.color}`} />
                <span className="mt-2 text-sm text-muted-foreground">{action.label}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
