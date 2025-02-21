
import { Card } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from "recharts";

interface FinancialTrendsData {
  name: string;
  spending: number;
  income: number;
  budget: number;
  debt: number;
  savings: number;
  peerAvg: number;
  forecast: number;
}

interface FinancialTrendsChartProps {
  data: FinancialTrendsData[];
}

const FinancialTrendsChart = ({ data }: FinancialTrendsChartProps) => {
  return (
    <Card className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4 text-white">Financial Trends</h3>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#888888" />
            <YAxis stroke="#888888" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(17, 17, 17, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="spending" stroke="#22c55e" name="Spending" strokeWidth={2} />
            <Line type="monotone" dataKey="income" stroke="#3b82f6" name="Income" strokeWidth={2} />
            <Line type="monotone" dataKey="budget" stroke="#f97316" name="Budget" strokeWidth={2} />
            <Line type="monotone" dataKey="debt" stroke="#ef4444" name="Debt" strokeWidth={2} />
            <Line type="monotone" dataKey="savings" stroke="#eab308" name="Savings" strokeWidth={2} />
            <Line type="monotone" dataKey="peerAvg" stroke="#8b5cf6" name="Peer Average" strokeWidth={2} />
            <Line type="monotone" dataKey="forecast" stroke="#ec4899" name="AI Forecast" strokeWidth={2} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default FinancialTrendsChart;
