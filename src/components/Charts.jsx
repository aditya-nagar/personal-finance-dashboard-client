import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

const COLORS = ["#4ade80", "#f87171", "#60a5fa", "#facc15", "#c084fc"];

const Charts = ({ transactions }) => {
  /* ================= CATEGORY PIE CHART ================= */
  const expenseByCategory = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      const category = t.category || "Others";
      expenseByCategory[category] =
        (expenseByCategory[category] || 0) + Math.abs(t.amount);
    }
  });

  const pieData = Object.keys(expenseByCategory).map((key) => ({
    name: key,
    value: expenseByCategory[key],
  }));

  /* ================= MONTHLY BAR CHART ================= */
  const monthlyData = {};

  transactions.forEach((t) => {
    const date = new Date(t.createdAt);
    const month = date.toLocaleString("default", { month: "short" });

    if (!monthlyData[month]) {
      monthlyData[month] = { month, income: 0, expense: 0 };
    }

    if (t.type === "income") {
      monthlyData[month].income += t.amount;
    } else {
      monthlyData[month].expense += Math.abs(t.amount);
    }
  });

  const barData = Object.values(monthlyData);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* ================= PIE CHART ================= */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2 text-black">
          📊 Expense by Category
        </h3>

        {pieData.length === 0 ? (
          <p className="text-gray-500">No expense data</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* ================= BAR CHART ================= */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2 text-black">
          📈 Monthly Income vs Expense
        </h3>

        {barData.length === 0 ? (
          <p className="text-gray-500">No transaction data</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#4ade80" />
              <Bar dataKey="expense" fill="#f87171" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default Charts;