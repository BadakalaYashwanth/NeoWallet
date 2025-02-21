
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface MonthlyData {
  name: string;
  income: number;
  spending: number;
}

interface IncomeExpensesChartProps {
  data: MonthlyData[];
}

const IncomeExpensesChart = ({ data }: IncomeExpensesChartProps) => {
  return (
    <Card className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4 text-white">Income vs Expenses</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
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
            <Bar dataKey="income" name="Income" fill="#3b82f6" />
            <Bar dataKey="spending" name="Expenses" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default IncomeExpensesChart;
