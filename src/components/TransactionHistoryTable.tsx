
import React from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Users, 
  Send,
  Check,
  X,
  AlertTriangle,
  Clock
} from "lucide-react";
import { format } from "date-fns";

export interface Transaction {
  id: number;
  type: 'send' | 'receive' | 'split';
  title: string;
  amount: number;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed' | 'processing';
  category?: string;
  recipient?: string;
  sender?: string;
  reference?: string;
}

interface TransactionHistoryTableProps {
  transactions: Transaction[];
  showFilter?: boolean;
}

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

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "completed":
      return <Check className="h-4 w-4 text-green-500" />;
    case "failed":
      return <X className="h-4 w-4 text-red-500" />;
    case "pending":
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case "processing":
      return <Clock className="h-4 w-4 text-blue-500" />;
    default:
      return null;
  }
};

const formatAmount = (amount: number) => {
  const prefix = amount >= 0 ? "+" : "";
  return `${prefix}₹${Math.abs(amount).toLocaleString()}`;
};

const TransactionHistoryTable: React.FC<TransactionHistoryTableProps> = ({ 
  transactions,
  showFilter = true
}) => {
  return (
    <div className="space-y-4">
      {showFilter && (
        <div className="flex flex-wrap gap-3">
          <select className="bg-white/5 text-white border border-white/10 rounded-lg px-3 py-2">
            <option value="all">All Types</option>
            <option value="send">Sent</option>
            <option value="receive">Received</option>
            <option value="split">Split Bills</option>
          </select>
          
          <select className="bg-white/5 text-white border border-white/10 rounded-lg px-3 py-2">
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="processing">Processing</option>
          </select>
          
          <select className="bg-white/5 text-white border border-white/10 rounded-lg px-3 py-2">
            <option value="all">Last 30 days</option>
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
            <option value="year">Last year</option>
          </select>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Transaction</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
              <th className="text-right py-3 px-4 text-gray-400 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr 
                key={transaction.id} 
                className="border-b border-white/5 hover:bg-white/5"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/5 rounded-full">
                      <TransactionIcon type={transaction.type} />
                    </div>
                    <div>
                      <p className="font-medium text-white">{transaction.title}</p>
                      <p className="text-xs text-gray-400">
                        {transaction.type === 'send' && transaction.recipient ? `To: ${transaction.recipient}` : ''}
                        {transaction.type === 'receive' && transaction.sender ? `From: ${transaction.sender}` : ''}
                        {transaction.reference ? ` • Ref: ${transaction.reference}` : ''}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-1">
                    <StatusIcon status={transaction.status} />
                    <span className="text-sm capitalize">{transaction.status}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <p className="text-sm text-muted-foreground">
                    {format(transaction.timestamp, "MMM d, yyyy")}
                  </p>
                  <p className="text-xs text-gray-400">
                    {format(transaction.timestamp, "h:mm a")}
                  </p>
                </td>
                <td className="py-4 px-4 text-right">
                  <p className={`font-medium ${
                    transaction.amount >= 0 ? "text-green-500" : "text-red-500"
                  }`}>
                    {formatAmount(transaction.amount)}
                  </p>
                  {transaction.category && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-300 inline-block mt-1">
                      {transaction.category}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistoryTable;
