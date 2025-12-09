
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
import { Badge } from "@/components/ui/badge";

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
      return <div className="p-2 bg-green-100 rounded-full"><ArrowDownRight className="h-4 w-4 text-green-700" /></div>;
    case "send":
      return <div className="p-2 bg-red-100 rounded-full"><ArrowUpRight className="h-4 w-4 text-red-700" /></div>;
    case "split":
      return <div className="p-2 bg-blue-100 rounded-full"><Users className="h-4 w-4 text-blue-700" /></div>;
    default:
      return <div className="p-2 bg-slate-100 rounded-full"><Send className="h-4 w-4 text-slate-700" /></div>;
  }
};

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "completed":
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
    case "failed":
      return <Badge variant="destructive">Failed</Badge>;
    case "pending":
      return <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
    case "processing":
      return <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">Processing</Badge>;
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
          <select className="bg-background text-foreground border border-input rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary">
            <option value="all">All Types</option>
            <option value="send">Sent</option>
            <option value="receive">Received</option>
            <option value="split">Split Bills</option>
          </select>

          <select className="bg-background text-foreground border border-input rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary">
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="processing">Processing</option>
          </select>

          <select className="bg-background text-foreground border border-input rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary">
            <option value="all">Last 30 days</option>
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
            <option value="year">Last year</option>
          </select>
        </div>
      )}

      <div className="rounded-md border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Transaction</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Date</th>
              <th className="text-right py-3 px-4 text-muted-foreground font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-border hover:bg-muted/30 transition-colors bg-card"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <TransactionIcon type={transaction.type} />
                    <div>
                      <p className="font-semibold text-foreground">{transaction.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.type === 'send' && transaction.recipient ? `To: ${transaction.recipient}` : ''}
                        {transaction.type === 'receive' && transaction.sender ? `From: ${transaction.sender}` : ''}
                        {transaction.reference ? ` • Ref: ${transaction.reference}` : ''}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <StatusBadge status={transaction.status} />
                </td>
                <td className="py-4 px-4">
                  <p className="text-foreground">
                    {format(transaction.timestamp, "MMM d, yyyy")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(transaction.timestamp, "h:mm a")}
                  </p>
                </td>
                <td className="py-4 px-4 text-right">
                  <p className={`font-bold ${transaction.amount >= 0 ? "text-green-600" : "text-red-600"
                    }`}>
                    {formatAmount(transaction.amount)}
                  </p>
                  {transaction.category && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground inline-block mt-1">
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
