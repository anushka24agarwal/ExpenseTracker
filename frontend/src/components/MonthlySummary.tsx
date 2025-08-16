import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

type Expense = {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string; // stored as string
};

const MonthlySummaryChart: React.FC<{ data: Expense[] }> = ({ data }) => {
  if (!data || data.length === 0) return <p>No data to show.</p>;

  // Group expenses by month-year (e.g. "Jun 2025")
  const monthlyTotals: Record<string, number> = {};

  data.forEach((expense) => {
    const parsedDate = new Date(expense.date);
    if (!isNaN(parsedDate.getTime())) {
      // Format: "Jun 2025"
      const monthYearLabel = parsedDate.toLocaleString('default', {
        month: 'short',
        year: 'numeric',
      });
      monthlyTotals[monthYearLabel] = (monthlyTotals[monthYearLabel] || 0) + Number(expense.amount);
    }
  });

  // Convert to array for chart data
  const chartData = Object.entries(monthlyTotals).map(([month, total]) => ({
    month,
    total,
  }));

  // Optional: Sort by date ascending (oldest month first)
  chartData.sort((a, b) => {
    const dateA = new Date(a.month);
    const dateB = new Date(b.month);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer>
        <BarChart data={chartData} margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
          <Legend />
          <Bar dataKey="total" fill="#8884d8" name="Total Expenses" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySummaryChart;
