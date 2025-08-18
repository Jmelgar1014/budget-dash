"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const budgetData = [
  { name: "Housing", value: 1200, color: "hsl(var(--chart-1))" },
  { name: "Food & Dining", value: 650, color: "hsl(var(--chart-2))" },
  { name: "Transportation", value: 420, color: "hsl(var(--chart-3))" },
  { name: "Entertainment", value: 280, color: "hsl(var(--chart-4))" },
  { name: "Shopping", value: 380, color: "hsl(var(--chart-5))" },
  { name: "Utilities", value: 180, color: "hsl(var(--accent))" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-card border rounded-lg shadow-lg p-3">
        <p className="font-medium">{data.name}</p>
        <p className="text-sm text-muted-foreground">
          ${data.value.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground">
          {(
            (data.value /
              budgetData.reduce((sum, item) => sum + item.value, 0)) *
            100
          ).toFixed(1)}
          % of budget
        </p>
      </div>
    );
  }
  return null;
};

export function BudgetChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={budgetData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            paddingAngle={2}
            dataKey="value"
          >
            {budgetData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value, entry) => (
              <span
                style={{ color: entry.color }}
                className="text-sm font-medium"
              >
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
