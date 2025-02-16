
import { Card } from "@/components/ui/card";
import { Bell, Check, X, Wallet, ArrowUpRight, ArrowDownRight, AlertTriangle, DollarSign } from "lucide-react";
import { useState } from "react";

// Mock notifications data with diverse transaction types
const mockNotifications = [
  {
    id: 1,
    type: "payment_received",
    title: "Payment Received",
    description: "You have received ₹5,000 from Rahul Kumar",
    time: "2 minutes ago",
    icon: ArrowDownRight,
    color: "text-green-500",
    isRead: false,
  },
  {
    id: 2,
    type: "payment_sent",
    title: "Payment Sent",
    description: "You have sent ₹2,500 to Priya Singh",
    time: "15 minutes ago",
    icon: ArrowUpRight,
    color: "text-blue-500",
    isRead: false,
  },
  {
    id: 3,
    type: "low_balance",
    title: "Low Balance Alert",
    description: "Your wallet balance is below ₹1,000. Add money to continue transactions.",
    time: "1 hour ago",
    icon: AlertTriangle,
    color: "text-amber-500",
    isRead: false,
  },
  {
    id: 4,
    type: "payment_request",
    title: "Payment Request",
    description: "Amit Patel has requested ₹3,000 for Dinner",
    time: "2 hours ago",
    icon: DollarSign,
    color: "text-purple-500",
    isRead: false,
  },
  {
    id: 5,
    type: "payment_success",
    title: "Payment Successful",
    description: "Your transaction of ₹10,000 to Bank Account XX4389 was successful",
    time: "3 hours ago",
    icon: Check,
    color: "text-green-500",
    isRead: true,
  },
  {
    id: 6,
    type: "payment_failed",
    title: "Transaction Failed",
    description: "Payment of ₹5,000 to Deepa Shah failed. Please try again.",
    time: "4 hours ago",
    icon: X,
    color: "text-red-500",
    isRead: true,
  },
];

const NotificationCard = ({ notification }: { notification: typeof mockNotifications[0] }) => {
  const Icon = notification.icon;
  return (
    <div className={`flex items-center space-x-4 p-4 rounded-lg transition-colors ${
      notification.isRead ? 'bg-white/5' : 'bg-purple-500/10 border border-purple-500/20'
    }`}>
      <div className={`p-2 rounded-full ${notification.isRead ? 'bg-white/10' : `bg-${notification.color.split('-')[1]}-500/20`}`}>
        <Icon className={`h-5 w-5 ${notification.color}`} />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-white">{notification.title}</h3>
          <span className="text-xs text-white/70">{notification.time}</span>
        </div>
        <p className="text-sm text-white/80 mt-1">{notification.description}</p>
      </div>
    </div>
  );
};

const Notifications = () => {
  const [filter, setFilter] = useState<string>("all");
  const [notifications, setNotifications] = useState(mockNotifications);

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.isRead;
    return notification.type === filter;
  });

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white">Notifications</h1>
          <p className="text-white/80">Stay updated with your account activity</p>
        </div>
        <button
          onClick={markAllAsRead}
          className="px-4 py-2 bg-white text-purple-500 rounded-lg hover:bg-white/90 transition-colors"
        >
          Mark all as read
        </button>
      </header>

      <Card className="glass-card p-6">
        <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
          {[
            { id: "all", label: "All" },
            { id: "unread", label: "Unread" },
            { id: "payment_received", label: "Received" },
            { id: "payment_sent", label: "Sent" },
            { id: "payment_request", label: "Requests" },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setFilter(type.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                filter === type.id
                  ? "bg-purple-500 text-white"
                  : "bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))
          ) : (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-white/50 mx-auto mb-4" />
              <p className="text-white/70">No notifications to show</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Notifications;
