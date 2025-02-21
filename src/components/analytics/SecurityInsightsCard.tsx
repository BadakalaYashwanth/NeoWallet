
import { Card } from "@/components/ui/card";
import { Shield } from "lucide-react";

interface SecurityMetric {
  name: string;
  status: string;
  lastCheck: string;
}

interface SecurityInsightsCardProps {
  metrics: SecurityMetric[];
}

const SecurityInsightsCard = ({ metrics }: SecurityInsightsCardProps) => {
  return (
    <Card className="glass-card p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Shield className="h-5 w-5 text-purple-400" />
        <h3 className="text-lg font-semibold text-white">Security Insights</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="p-4 bg-white/5 rounded-lg">
            <p className="text-sm text-gray-400">{metric.name}</p>
            <p className="text-lg font-semibold text-white">{metric.status}</p>
            <p className="text-xs text-gray-500">Last checked: {metric.lastCheck}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SecurityInsightsCard;
