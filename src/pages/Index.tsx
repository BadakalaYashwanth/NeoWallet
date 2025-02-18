
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import {
  Send,
  Download,
  Users,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Building,
  Wallet,
  Loader2
} from "lucide-react";

type Transaction = {
  id: string;
  type: string;
  amount: number;
  created_at: string;
  description: string | null;
  status: string;
};

type WalletData = {
  balance: number;
  currency: string;
};

const Index = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) return;

        // Fetch wallet data
        const { data: walletData, error: walletError } = await supabase
          .from('wallets')
          .select('balance, currency')
          .eq('user_id', user.id)
          .single();

        if (walletError) throw walletError;
        setWallet(walletData);

        // Fetch recent transactions
        const { data: transactionsData, error: transactionsError } = await supabase
          .from('transactions')
          .select('*')
          .or(`user_id.eq.${user.id},recipient_id.eq.${user.id}`)
          .order('created_at', { ascending: false })
          .limit(5);

        if (transactionsError) throw transactionsError;
        setRecentTransactions(transactionsData);

      } catch (error: any) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load your account data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const QuickActionButton = ({ to, icon: Icon, label, description }: { to: string; icon: any; label: string; description: string }) => (
    <Link to={to}>
      <Card className="glass-card h-full p-4 hover:bg-white/5 transition-colors cursor-pointer">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Icon className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <h3 className="font-medium text-white">{label}</h3>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
        </div>
      </Card>
    </Link>
  );

  return (
    <div className="space-y-8">
      {/* Header with Wallet Balance */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-4xl font-bold text-white">Welcome back{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ''}</h1>
          <p className="text-gray-400 mt-2">Manage your money securely with NeoWallet</p>
        </div>
        <Card className="glass-card p-6 mt-4 md:mt-0 w-full md:w-auto">
          <div className="flex items-center space-x-3">
            <Wallet className="h-6 w-6 text-purple-400" />
            <div>
              <p className="text-sm text-gray-400">Available Balance</p>
              <div className="flex items-center space-x-2">
                {isLoading ? (
                  <Loader2 className="h-5 w-5 text-purple-400 animate-spin" />
                ) : (
                  <h2 className="text-2xl font-bold text-white">
                    ₹{wallet?.balance?.toLocaleString() ?? '0.00'}
                  </h2>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <QuickActionButton 
          to="/send" 
          icon={Send} 
          label="Send Money" 
          description="Transfer to friends"
        />
        <QuickActionButton 
          to="/receive" 
          icon={Download} 
          label="Receive" 
          description="Get paid easily"
        />
        <QuickActionButton 
          to="/split" 
          icon={Users} 
          label="Split Bills" 
          description="Share expenses"
        />
        <QuickActionButton 
          to="/banking" 
          icon={Building} 
          label="Banking" 
          description="Manage accounts"
        />
      </div>

      {/* Recent Activity */}
      <Card className="glass-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
          <Link to="/transactions">
            <Button variant="outline" size="sm" className="gap-2">
              View All
            </Button>
          </Link>
        </div>
        
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 text-purple-400 animate-spin" />
            </div>
          ) : recentTransactions.length > 0 ? (
            recentTransactions.map((transaction) => (
              <div 
                key={transaction.id} 
                className="flex items-center justify-between p-4 hover:bg-white/5 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/5 rounded-full">
                    {transaction.type === 'receive' ? (
                      <ArrowDownRight className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-white">
                      {transaction.description || (transaction.type === 'receive' ? 'Money Received' : 'Money Sent')}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <p className="text-sm text-gray-400">
                        {new Date(transaction.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                <p className={`font-medium ${
                  transaction.type === 'receive' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {transaction.type === 'receive' ? '+' : '-'}₹{Math.abs(transaction.amount).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">No recent transactions</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Index;
