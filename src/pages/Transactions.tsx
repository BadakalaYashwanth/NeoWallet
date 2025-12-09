
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, ArrowDownRight, Search, Filter, Download } from "lucide-react";
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
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="border-b border-border pb-6">
        <h1 className="text-3xl font-bold text-primary tracking-tight">Transactions</h1>
        <p className="text-muted-foreground mt-1">Track your income and expenses with detailed history.</p>
      </header>

      {/* Transaction Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground">Monthly Inflow</p>
            <p className="text-2xl font-bold text-green-600 mt-2">
              +₹{transactionSummary.totalMonthlyInflow.toLocaleString()}
            </p>
            <div className="flex items-center mt-2">
              <div className="bg-green-100 p-1 rounded-full mr-2">
                <ArrowDownRight className="h-3 w-3 text-green-700" />
              </div>
              <span className="text-xs text-muted-foreground">8 transactions</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground">Monthly Outflow</p>
            <p className="text-2xl font-bold text-red-600 mt-2">
              -₹{transactionSummary.totalMonthlyOutflow.toLocaleString()}
            </p>
            <div className="flex items-center mt-2">
              <div className="bg-red-100 p-1 rounded-full mr-2">
                <ArrowUpRight className="h-3 w-3 text-red-700" />
              </div>
              <span className="text-xs text-muted-foreground">20 transactions</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground">Net Change</p>
            <p className={`text-2xl font-bold mt-2 ${transactionSummary.netMonthlyChange >= 0 ? "text-green-600" : "text-red-600"
              }`}>
              {transactionSummary.netMonthlyChange >= 0 ? "+" : ""}
              ₹{transactionSummary.netMonthlyChange.toLocaleString()}
            </p>
            <div className="flex items-center mt-2">
              <span className="text-xs text-muted-foreground">This month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground">Total Transactions</p>
            <p className="text-2xl font-bold text-primary mt-2">
              {transactionSummary.totalTransactions}
            </p>
            <div className="flex items-center mt-2">
              <span className="text-xs text-muted-foreground">Last 30 days</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            className="pl-10 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" className="bg-white">
          <Filter className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="bg-white">
          <Download className="h-4 w-4" />
        </Button>
      </div>

      {/* Transactions List */}
      <Card className="shadow-sm border-border">
        <CardContent className="p-6">
          <Tabs defaultValue="all">
            <div className="flex justify-between items-center mb-6">
              <TabsList className="bg-muted">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;
