
import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Users, Send } from "lucide-react";
import { format } from "date-fns";

// Mock transaction data
const mockTransactions = [
  {
    id: 1,
    type: "receive",
    title: "Received from Rahul Kumar",
    amount: 5000,
    timestamp: new Date(2024, 2, 15, 14, 30),
    status: "completed"
  },
  {
    id: 2,
    type: "send",
    title: "Sent to Priya Singh",
    amount: -2500,
    timestamp: new Date(2024, 2, 15, 12, 45),
    status: "completed"
  },
  {
    id: 3,
    type: "split",
    title: "Group Dinner Split",
    amount: -1200,
    timestamp: new Date(2024, 2, 14, 21, 15),
    status: "completed"
  },
  {
    id: 4,
    type: "receive",
    title: "Received from Amit Patel",
    amount: 3000,
    timestamp: new Date(2024, 2, 14, 18, 20),
    status: "completed"
  },
  {
    id: 5,
    type: "send",
    title: "Sent to Deepa Shah",
    amount: -1500,
    timestamp: new Date(2024, 2, 14, 15, 10),
    status: "completed"
  }
];

const TransactionIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "receive":
      return <ArrowDownRight className="h-4 w-4 text-green-500" />;
    case "send":
      return <ArrowUpRight className="h-4 w-4 text-red-500" />;
    case "split":
      return <Users className="h-4 w-4 text-blue-500" />;
    default:
      return <Send className="h-4 w-4" />;
  }
};

const formatAmount = (amount: number) => {
  const prefix = amount >= 0 ? "+" : "";
  return `${prefix}₹${Math.abs(amount).toLocaleString()}`;
};

const Transactions = () => {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-white">Transactions</h1>
        <p className="text-secondary-foreground">Recent financial activity</p>
      </header>

      <Card className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
          <div className="flex gap-2">
            <select className="bg-purple-500 text-white border border-purple-600 rounded-lg px-3 py-2">
              <option value="all">All Types</option>
              <option value="send">Sent</option>
              <option value="receive">Received</option>
              <option value="split">Split Bills</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {mockTransactions.map((transaction) => (
            <div 
              key={transaction.id} 
              className="flex items-center justify-between p-4 hover:bg-white/5 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/5 rounded-full">
                  <TransactionIcon type={transaction.type} />
                </div>
                <div>
                  <p className="font-medium text-white">{transaction.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(transaction.timestamp, "MMM d, yyyy 'at' h:mm a")}
                  </p>
                </div>
              </div>
              <p className={`font-medium ${
                transaction.amount >= 0 ? "text-green-500" : "text-red-500"
              }`}>
                {formatAmount(transaction.amount)}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Transactions;
