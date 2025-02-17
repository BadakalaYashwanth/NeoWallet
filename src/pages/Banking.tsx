import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  CreditCard, 
  Building, 
  Send, 
  Receipt, 
  Calendar, 
  Shield, 
  Banknote,
  ChevronRight,
  PlusCircle,
  Clock,
  AlertTriangle
} from "lucide-react";

// Mock data for linked banks
const linkedBanks = [
  {
    id: 1,
    name: "State Bank",
    accountNumber: "XXXX4389",
    balance: 45000,
    type: "Savings",
  },
  {
    id: 2,
    name: "HDFC Bank",
    accountNumber: "XXXX2156",
    balance: 28000,
    type: "Current",
  }
];

// Mock data for upcoming payments
const upcomingPayments = [
  {
    id: 1,
    title: "Electricity Bill",
    amount: 2500,
    dueDate: "2024-03-20",
    type: "utility",
    status: "pending"
  },
  {
    id: 2,
    title: "Home Loan EMI",
    amount: 15000,
    dueDate: "2024-03-25",
    type: "loan",
    status: "scheduled"
  }
];

const Banking = () => {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-primary">Net Banking</h1>
        <p className="text-secondary-foreground">Manage your bank accounts and transactions</p>
      </header>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card p-4 hover:bg-white/5 transition-colors cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Send className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-medium text-white">Transfer Money</h3>
              <p className="text-sm text-gray-400">NEFT/RTGS/IMPS</p>
            </div>
          </div>
        </Card>
        
        <Card className="glass-card p-4 hover:bg-white/5 transition-colors cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Receipt className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-medium text-white">Pay Bills</h3>
              <p className="text-sm text-gray-400">Utilities & More</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-4 hover:bg-white/5 transition-colors cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Calendar className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <h3 className="font-medium text-white">Schedule Payment</h3>
              <p className="text-sm text-gray-400">Set Future Transfers</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-4 hover:bg-white/5 transition-colors cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <CreditCard className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="font-medium text-white">Virtual Card</h3>
              <p className="text-sm text-gray-400">Generate Instant</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Banking Interface */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Linked Accounts */}
        <Card className="glass-card p-6 md:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">Linked Accounts</h3>
            <Button variant="outline" size="sm" className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Account
            </Button>
          </div>
          
          <div className="space-y-4">
            {linkedBanks.map((bank) => (
              <div key={bank.id} className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <Building className="h-5 w-5 text-purple-400" />
                    <div>
                      <h4 className="font-medium text-white">{bank.name}</h4>
                      <p className="text-sm text-gray-400">{bank.accountNumber}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">₹{bank.balance.toLocaleString()}</p>
                    <p className="text-sm text-gray-400">{bank.type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Payments */}
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4 text-white">Upcoming Payments</h3>
          <div className="space-y-4">
            {upcomingPayments.map((payment) => (
              <div key={payment.id} className="p-4 bg-white/5 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-white">{payment.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <p className="text-sm text-gray-400">Due: {payment.dueDate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">₹{payment.amount.toLocaleString()}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      payment.status === 'scheduled' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {payment.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Security Status */}
      <Card className="glass-card p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Shield className="h-5 w-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Security Status</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">2FA Status</p>
                <p className="text-white font-medium">Enabled</p>
              </div>
              <div className="p-2 bg-green-500/20 rounded-full">
                <Shield className="h-5 w-5 text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Last Login</p>
                <p className="text-white font-medium">2 hours ago</p>
              </div>
              <div className="p-2 bg-blue-500/20 rounded-full">
                <Clock className="h-5 w-5 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Device Trust</p>
                <p className="text-white font-medium">Verified</p>
              </div>
              <div className="p-2 bg-purple-500/20 rounded-full">
                <Shield className="h-5 w-5 text-purple-400" />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Banking;
