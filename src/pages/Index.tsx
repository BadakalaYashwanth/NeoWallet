import { Card } from "@/components/ui/card";
import { DollarSign, PieChart, ArrowUpRight, ArrowDownRight, Send, Download, Users, Wallet, Scan } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { useState, useEffect } from "react";
import QRScanner from "@/components/QRScanner";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { supabase } from "@/lib/supabaseClient";

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
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to view your financial data",
          variant: "destructive",
        });
        return;
      }

      const { data: balanceData } = await supabase
        .from('users_balances')
        .select('balance')
        .eq('id', user.id)
        .single();

      if (balanceData) {
        setBalance(balanceData.balance);
      }

      const { data: transactions } = await supabase
        .from('transactions')
        .select('*')
        .or(`user_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (transactions) {
        const monthIncome = transactions
          .filter(t => t.type === 'receive' && t.status === 'completed')
          .reduce((sum, t) => sum + Number(t.amount), 0);
        
        const monthExpenses = transactions
          .filter(t => (t.type === 'send' || t.type === 'split') && t.status === 'completed')
          .reduce((sum, t) => sum + Number(t.amount), 0);

        setIncome(monthIncome);
        setExpenses(monthExpenses);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast({
        title: "Error",
        description: "Failed to load your financial data",
        variant: "destructive",
      });
    }
  };

  const handleQuickAction = async (action: string) => {
    switch (action) {
      case 'send':
        navigate('/send');
        break;
      case 'receive':
        navigate('/receive');
        break;
      case 'split':
        navigate('/split');
        break;
      default:
        break;
    }
  };

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
          <h1 className="text-4xl font-bold text-gradient">Welcome back!</h1>
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
          <h2 className="text-2xl font-bold text-white">₹{balance.toLocaleString()}</h2>
          <p className="text-sm text-green-500">Updated just now</p>
        </Card>

        <Card className="glass-card p-6 hover:scale-105 transition-transform">
          <div className="flex justify-between items-center mb-4">
            <div className="p-2 rounded-lg bg-green-500/20">
              <ArrowUpRight className="h-6 w-6 text-green-500" />
            </div>
            <PieChart className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-sm text-muted-foreground">Income</p>
          <h2 className="text-2xl font-bold text-white">₹{income.toLocaleString()}</h2>
          <p className="text-sm text-green-500">This month</p>
        </Card>

        <Card className="glass-card p-6 hover:scale-105 transition-transform">
          <div className="flex justify-between items-center mb-4">
            <div className="p-2 rounded-lg bg-red-500/20">
              <ArrowDownRight className="h-6 w-6 text-red-500" />
            </div>
            <DollarSign className="h-4 w-4 text-red-500" />
          </div>
          <p className="text-sm text-muted-foreground">Expenses</p>
          <h2 className="text-2xl font-bold text-white">₹{expenses.toLocaleString()}</h2>
          <p className="text-sm text-red-500">This month</p>
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
            {[
              { icon: Send, label: "Send", action: "send", color: "text-purple-500" },
              { icon: Download, label: "Receive", action: "receive", color: "text-green-500" },
              { icon: Users, label: "Split", action: "split", color: "text-blue-500" },
            ].map((action) => (
              <button
                key={action.label}
                onClick={() => handleQuickAction(action.action)}
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
