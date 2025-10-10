"use client";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const CHART_COLORS = [
  "#000814", // purple-500 (matches Balance card)
  "#001d3d", // pink-500 (matches Spending card)
  "#003566", // cyan-500 (matches Savings card)
  "#ffc300", // violet-500 (complementary)
  "#ffd60a", // orange-500 (accent color)
  "white", // emerald-500 (additional color)
];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, dataArray }: any) => {
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
  if (dataArray.length == 0) {
    return (
      <div className="h-80 flex justify-center items-center">
        <h1 className="font-semibold">
          There are no transactions for the current month.
        </h1>
      </div>
    );
  }
  return (
    <div className="h-80 ">
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
            {dataArray.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={CHART_COLORS[index % CHART_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip dataArray={dataArray} />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => (
              <span
                // style={{ color: "white" }}
                className="text-sm font-medium dark:text-white text-richBlack"
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
