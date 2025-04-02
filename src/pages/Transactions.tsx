
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, ArrowDownRight, Search, Filter, Download } from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import TransactionHistoryTable, { Transaction } from "@/components/TransactionHistoryTable";

// Mock transaction data with expanded details
const mockTransactions: Transaction[] = [
  {
    id: 1,
    type: "receive",
    title: "Salary Credit",
    amount: 45000,
    timestamp: new Date(2024, 2, 15, 14, 30),
    status: "completed",
    sender: "Tata Consultancy Services",
    reference: "SAL-MAR2024",
    category: "Income"
  },
  {
    id: 2,
    type: "send",
    title: "Rent Payment",
    amount: -25000,
    timestamp: new Date(2024, 2, 15, 12, 45),
    status: "completed",
    recipient: "Skyline Properties",
    reference: "RENT-APR",
    category: "Housing"
  },
  {
    id: 3,
    type: "split",
    title: "Weekend Trip Expenses",
    amount: -8400,
    timestamp: new Date(2024, 2, 14, 21, 15),
    status: "completed",
    recipient: "Group (5 people)",
    category: "Travel"
  },
  {
    id: 4,
    type: "receive",
    title: "Freelance Project Payment",
    amount: 15000,
    timestamp: new Date(2024, 2, 14, 18, 20),
    status: "completed",
    sender: "Globex Web Solutions",
    reference: "INV-2024-056",
    category: "Freelance"
  },
  {
    id: 5,
    type: "send",
    title: "Credit Card Bill Payment",
    amount: -35000,
    timestamp: new Date(2024, 2, 14, 15, 10),
    status: "processing",
    recipient: "HDFC Credit Card",
    reference: "CCBILL-MAR24",
    category: "Bills"
  },
  {
    id: 6,
    type: "send",
    title: "Amazon Shopping",
    amount: -4500,
    timestamp: new Date(2024, 2, 13, 19, 25),
    status: "completed",
    recipient: "Amazon India",
    reference: "ORD-45789653",
    category: "Shopping"
  },
  {
    id: 7,
    type: "send",
    title: "Electricity Bill",
    amount: -2200,
    timestamp: new Date(2024, 2, 10, 10, 15),
    status: "completed",
    recipient: "State Electricity Board",
    reference: "ELEC-MAR-24",
    category: "Utilities"
  },
  {
    id: 8,
    type: "receive",
    title: "Tax Refund",
    amount: 12500,
    timestamp: new Date(2024, 2, 8, 12, 30),
    status: "completed",
    sender: "Income Tax Department",
    reference: "REFUND-FY23",
    category: "Tax"
  }
];

// Summary metrics
const transactionSummary = {
  totalMonthlyInflow: 72500,
  totalMonthlyOutflow: 75600,
  netMonthlyChange: -3100,
  largestTransaction: 45000,
  totalTransactions: 28,
};

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredTransactions = mockTransactions.filter(transaction => 
    transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (transaction.reference?.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (transaction.sender?.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (transaction.recipient?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-white">Transactions</h1>
        <p className="text-secondary-foreground">Your financial activity</p>
      </header>

      {/* Transaction Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-card p-4">
          <p className="text-sm text-gray-400">Monthly Inflow</p>
          <p className="text-2xl font-semibold text-green-500">
            +₹{transactionSummary.totalMonthlyInflow.toLocaleString()}
          </p>
          <div className="flex items-center mt-2">
            <ArrowDownRight className="h-4 w-4 text-green-500" />
            <span className="text-xs text-gray-400 ml-1">8 transactions</span>
          </div>
        </Card>

        <Card className="glass-card p-4">
          <p className="text-sm text-gray-400">Monthly Outflow</p>
          <p className="text-2xl font-semibold text-red-500">
            -₹{transactionSummary.totalMonthlyOutflow.toLocaleString()}
          </p>
          <div className="flex items-center mt-2">
            <ArrowUpRight className="h-4 w-4 text-red-500" />
            <span className="text-xs text-gray-400 ml-1">20 transactions</span>
          </div>
        </Card>

        <Card className="glass-card p-4">
          <p className="text-sm text-gray-400">Net Change</p>
          <p className={`text-2xl font-semibold ${
            transactionSummary.netMonthlyChange >= 0 ? "text-green-500" : "text-red-500"
          }`}>
            {transactionSummary.netMonthlyChange >= 0 ? "+" : ""}
            ₹{transactionSummary.netMonthlyChange.toLocaleString()}
          </p>
          <div className="flex items-center mt-2">
            <span className="text-xs text-gray-400">This month</span>
          </div>
        </Card>

        <Card className="glass-card p-4">
          <p className="text-sm text-gray-400">Total Transactions</p>
          <p className="text-2xl font-semibold text-white">
            {transactionSummary.totalTransactions}
          </p>
          <div className="flex items-center mt-2">
            <span className="text-xs text-gray-400">Last 30 days</span>
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search transactions..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Download className="h-4 w-4" />
        </Button>
      </div>

      {/* Transactions List */}
      <Card className="glass-card p-6">
        <Tabs defaultValue="all">
          <div className="flex justify-between items-center mb-6">
            <TabsList className="bg-white/5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="incoming">Incoming</TabsTrigger>
              <TabsTrigger value="outgoing">Outgoing</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all">
            <TransactionHistoryTable transactions={filteredTransactions} />
          </TabsContent>
          
          <TabsContent value="incoming">
            <TransactionHistoryTable 
              transactions={filteredTransactions.filter(t => t.type === "receive")} 
            />
          </TabsContent>
          
          <TabsContent value="outgoing">
            <TransactionHistoryTable 
              transactions={filteredTransactions.filter(t => t.type === "send")} 
            />
          </TabsContent>
          
          <TabsContent value="pending">
            <TransactionHistoryTable 
              transactions={filteredTransactions.filter(t => t.status === "pending" || t.status === "processing")} 
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Transactions;
