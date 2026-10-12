import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';

export default function SemesterHistoryChart({ history = [] }) {
  if (!history || history.length === 0) {
    return (
      <div className="h-52 flex items-center justify-center text-sm text-slate-400">
        No semester history data available yet.
      </div>
    );
  }

  const chartData = history.map(item => ({
    semester: item.semester,
    rating: Number(item.rating),
    difficulty: Number(item.difficulty),
    reviews: item.reviews_count || 1
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 text-xs">
          <p className="font-bold text-slate-800 dark:text-slate-100 mb-1">{label}</p>
          <div className="space-y-1">
            <p className="text-emerald-600 dark:text-emerald-400 flex items-center justify-between gap-4">
              <span>Overall Rating:</span>
              <span className="font-semibold">{payload[0]?.value?.toFixed(1)} / 5.0</span>
            </p>
            <p className="text-amber-600 dark:text-amber-400 flex items-center justify-between gap-4">
              <span>Difficulty:</span>
              <span className="font-semibold">{payload[1]?.value?.toFixed(1)} / 5.0</span>
            </p>
            {payload[0]?.payload?.reviews && (
              <p className="text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-700">
                {payload[0].payload.reviews} reviews submitted
              </p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
          <XAxis
            dataKey="semester"
            tick={{ fontSize: 11, fill: '#64748b' }}
            tickLine={false}
          />
          <YAxis
            domain={[1, 5]}
            ticks={[1, 2, 3, 4, 5]}
            tick={{ fontSize: 11, fill: '#64748b' }}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            formatter={(value) => <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{value}</span>}
          />
          <Line
            type="monotone"
            name="Overall Rating"
            dataKey="rating"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#ffffff' }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            name="Course Difficulty"
            dataKey="difficulty"
            stroke="#f59e0b"
            strokeWidth={2.5}
            strokeDasharray="4 4"
            dot={{ r: 4, fill: '#f59e0b', strokeWidth: 2, stroke: '#ffffff' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
