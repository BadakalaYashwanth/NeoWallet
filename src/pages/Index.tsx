import { Card } from "@/components/ui/card";
import { DollarSign, PieChart, ArrowUpRight, ArrowDownRight, Send, Download, Users, Wallet, Scan } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { useState, useEffect } from "react";
import QRScanner from "@/components/QRScanner";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { supabase } from "@/lib/supabaseClient";
import { format } from "date-fns";

const quickActions = [
  { icon: Send, label: "Send", action: "send", color: "text-purple-500" },
  { icon: Download, label: "Receive", action: "receive", color: "text-green-500" },
  { icon: Users, label: "Split", action: "split", color: "text-blue-500" },
];

const Index = () => {
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
    fetchChartData();
    fetchRecentTransactions();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'transactions'
        },
        () => {
          fetchUserData();
          fetchChartData();
          fetchRecentTransactions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchChartData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const last6Months = Array.from({ length: 6 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        return date;
      }).reverse();

      const monthlyData = await Promise.all(
        last6Months.map(async (date) => {
          const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
          const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

          const { data: transactions } = await supabase
            .from('transactions')
            .select('*')
            .or(`user_id.eq.${user.id},recipient_id.eq.${user.id}`)
            .gte('created_at', startOfMonth.toISOString())
            .lte('created_at', endOfMonth.toISOString());

          const income = transactions
            ?.filter(t => t.recipient_id === user.id && t.status === 'completed')
            .reduce((sum, t) => sum + Number(t.amount), 0) || 0;

          const expenses = transactions
            ?.filter(t => t.user_id === user.id && t.status === 'completed')
            .reduce((sum, t) => sum + Number(t.amount), 0) || 0;

          return {
            name: format(date, 'MMM'),
            income,
            expenses
          };
        })
      );

      setChartData(monthlyData);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  const fetchRecentTransactions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: transactions } = await supabase
        .from('transactions')
        .select(`
          *,
          sender:user_id(email),
          recipient:recipient_id(email)
        `)
        .or(`user_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .order('created_at', { ascending: false })
        .limit(5);

      setRecentTransactions(transactions || []);
    } catch (error) {
      console.error('Error fetching recent transactions:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to view your financial data",
          variant: "destructive",
        });
        return;
      }

      // Get current balance
      const { data: balanceData, error: balanceError } = await supabase
        .from('users_balances')
        .select('balance')
        .eq('id', user.id)
        .single();

      if (balanceError) {
        console.error('Error fetching balance:', balanceError);
        throw balanceError;
      }

      // Get all transactions for the current month
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { data: transactions, error: transactionsError } = await supabase
        .from('transactions')
        .select('*')
        .or(`user_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .gte('created_at', startOfMonth.toISOString())
        .order('created_at', { ascending: false });

      if (transactionsError) {
        console.error('Error fetching transactions:', transactionsError);
        throw transactionsError;
      }

      // Calculate monthly income (received money)
      const monthlyIncome = transactions
        .filter(t => t.recipient_id === user.id && t.status === 'completed')
        .reduce((sum, t) => sum + Number(t.amount), 0);

      // Calculate monthly expenses (sent money)
      const monthlyExpenses = transactions
        .filter(t => t.user_id === user.id && t.status === 'completed')
        .reduce((sum, t) => sum + Number(t.amount), 0);

      setBalance(balanceData?.balance || 0);
      setIncome(monthlyIncome);
      setExpenses(monthlyExpenses);
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast({
        title: "Error",
        description: "Failed to load your financial data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
          <h2 className="text-2xl font-bold text-white">
            {isLoading ? "Loading..." : `₹${balance.toLocaleString()}`}
          </h2>
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
          <h2 className="text-2xl font-bold text-white">
            {isLoading ? "Loading..." : `₹${income.toLocaleString()}`}
          </h2>
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
          <h2 className="text-2xl font-bold text-white">
            {isLoading ? "Loading..." : `₹${expenses.toLocaleString()}`}
          </h2>
          <p className="text-sm text-red-500">This month</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass-card p-6 col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-white">Transaction History</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="name" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#22c55e" 
                  strokeWidth={2} 
                  name="Income"
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#ef4444" 
                  strokeWidth={2} 
                  name="Expenses"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Actions</h3>
            <div className="grid grid-cols-3 gap-4">
              {quickActions.map((action) => (
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

          <Card className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4 text-white">Recent Transactions</h3>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div 
                  key={transaction.id} 
                  className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      transaction.user_id === transaction.recipient_id ? 'bg-blue-500/20' :
                      transaction.recipient_id === user?.id ? 'bg-green-500/20' : 'bg-red-500/20'
                    }`}>
                      {transaction.user_id === transaction.recipient_id ? (
                        <Users className="h-4 w-4 text-blue-500" />
                      ) : transaction.recipient_id === user?.id ? (
                        <ArrowDownRight className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {transaction.user_id === user?.id ? 
                          `Sent to ${transaction.recipient?.email}` :
                          `Received from ${transaction.sender?.email}`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(transaction.created_at), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                  <p className={`text-sm font-medium ${
                    transaction.recipient_id === user?.id ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {transaction.recipient_id === user?.id ? '+' : '-'}₹{Number(transaction.amount).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
