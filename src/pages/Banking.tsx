
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import QRScanner from "@/components/QRScanner";
import { useToast } from "@/components/ui/use-toast";
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
  AlertTriangle,
  QrCode,
  FilePenLine,
  Download,
  BarChart4
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

// Mock transaction history
const recentTransactions = [
  {
    id: 1,
    title: "Rent Payment",
    amount: -12000,
    date: "2024-03-15",
    category: "Housing"
  },
  {
    id: 2,
    title: "Salary Credit",
    amount: 55000,
    date: "2024-03-01",
    category: "Income"
  },
  {
    id: 3,
    title: "Grocery Shopping",
    amount: -2800,
    date: "2024-03-12",
    category: "Food"
  }
];

interface PaymentData {
  recipient: string;
  accountNo: string;
  amount: number;
  description?: string;
}

const Banking = () => {
  const { toast } = useToast();
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);

  const handleQRScan = (result: string) => {
    try {
      const data = JSON.parse(result) as PaymentData;
      setPaymentData(data);
      setShowPaymentConfirmation(true);
    } catch (error) {
      console.error("Error parsing QR data:", error);
    }
  };

  const handleConfirmPayment = () => {
    toast({
      title: "Payment Successful",
      description: `₹${paymentData?.amount} sent to ${paymentData?.recipient}`,
    });
    setShowPaymentConfirmation(false);
    setPaymentData(null);
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-white">Net Banking</h1>
        <p className="text-secondary-foreground">Manage your bank accounts and transactions</p>
      </header>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

        <Card className="glass-card p-4 hover:bg-white/5 transition-colors cursor-pointer" onClick={() => setIsQRScannerOpen(true)}>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <QrCode className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <h3 className="font-medium text-white">Scan & Pay</h3>
              <p className="text-sm text-gray-400">QR Code Payments</p>
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
              <p className="text-sm text-gray-400">Generate Instantly</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Advanced Banking Options */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-card p-4 hover:bg-white/5 transition-colors cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <Calendar className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <h3 className="font-medium text-white">Schedule Payments</h3>
              <p className="text-sm text-gray-400">Future Transactions</p>
            </div>
          </div>
        </Card>
        
        <Card className="glass-card p-4 hover:bg-white/5 transition-colors cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <FilePenLine className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="font-medium text-white">Standing Orders</h3>
              <p className="text-sm text-gray-400">Recurring Payments</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-4 hover:bg-white/5 transition-colors cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-teal-500/20 rounded-lg">
              <Download className="h-5 w-5 text-teal-400" />
            </div>
            <div>
              <h3 className="font-medium text-white">Statement</h3>
              <p className="text-sm text-gray-400">Download PDF/Excel</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-4 hover:bg-white/5 transition-colors cursor-pointer">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-pink-500/20 rounded-lg">
              <BarChart4 className="h-5 w-5 text-pink-400" />
            </div>
            <div>
              <h3 className="font-medium text-white">Spending Analytics</h3>
              <p className="text-sm text-gray-400">Track Expenses</p>
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

      {/* Recent Transactions */}
      <Card className="glass-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-white">{transaction.title}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-sm text-gray-400">{transaction.date}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                      {transaction.category}
                    </span>
                  </div>
                </div>
                <p className={`font-medium ${
                  transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}₹{transaction.amount.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

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

      {/* QR Scanner Component */}
      <QRScanner 
        isOpen={isQRScannerOpen}
        onClose={() => setIsQRScannerOpen(false)}
        onScan={handleQRScan}
      />

      {/* Payment Confirmation Modal */}
      {showPaymentConfirmation && paymentData && (
        <Dialog open={showPaymentConfirmation} onOpenChange={setShowPaymentConfirmation}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Payment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-lg">
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-sm text-gray-400">Recipient:</p>
                  <p className="text-sm text-white">{paymentData.recipient}</p>
                  
                  <p className="text-sm text-gray-400">Account:</p>
                  <p className="text-sm text-white">{paymentData.accountNo}</p>
                  
                  <p className="text-sm text-gray-400">Amount:</p>
                  <p className="text-sm text-white">₹{paymentData.amount.toLocaleString()}</p>
                  
                  {paymentData.description && (
                    <>
                      <p className="text-sm text-gray-400">Description:</p>
                      <p className="text-sm text-white">{paymentData.description}</p>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowPaymentConfirmation(false)}>
                  Cancel
                </Button>
                <Button onClick={handleConfirmPayment}>
                  Confirm Payment
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Banking;
