"use client";

import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const budgetData = [
  { name: "Housing", value: 1200, color: "green" },
  { name: "Food & Dining", value: 650, color: "blue" },
  { name: "Transportation", value: 420, color: "orange" },
  { name: "Entertainment", value: 280, color: "pink" },
  { name: "Shopping", value: 380, color: "brown" },
  { name: "Utilities", value: 180, color: "purple" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, dataArray }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    console.log(data);
    return (
      <div className="bg-card border rounded-lg shadow-lg p-3">
        <p className="font-medium">{data.name}</p>
        <p className="text-sm text-muted-foreground">
          ${data.value.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground">
          {(
            (data.value /
              dataArray.reduce(
                (sum: never, item: { value: never }) => sum + item.value,
                0
              )) *
            100
          ).toFixed(1)}
          % of budget
        </p>
      </div>
    );
  }
  return null;
};

type chartType = {
  name: string;
  value: number;
};

type chartData = {
  dataArray: chartType[];
};

export function BudgetChart({ dataArray }: chartData) {
  const { isPending, data, error } = useQuery({
    queryKey: ["chart"],
    queryFn: async () => {
      const response = await fetch("/api/transactions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    },
  });

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={dataArray}
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
          <Tooltip content={<CustomTooltip dataArray={dataArray} />} />
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
