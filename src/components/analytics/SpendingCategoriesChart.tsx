
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface SpendingCategory {
  name: string;
  value: number;
  color: string;
  change: string;
}

interface SpendingCategoriesChartProps {
  categories: SpendingCategory[];
}

const SpendingCategoriesChart = ({ categories }: SpendingCategoriesChartProps) => {
  return (
    <Card className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4 text-white">Spending Categories</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categories}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {categories.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(17, 17, 17, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-2">
        {categories.map((category, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
              <span className="text-sm text-white">{category.name}</span>
            </div>
            <span className={`text-sm ${category.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
              {category.change}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SpendingCategoriesChart;
