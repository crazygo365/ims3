import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface NetWorthHistoryProps {
  history: Array<{
    date: string;
    value: number;
  }>;
}

export const NetWorthHistory: React.FC<NetWorthHistoryProps> = ({ history }) => {
  // 计算增长率
  const growthRate = history.length > 1
    ? ((history[history.length - 1].value - history[0].value) / history[0].value * 100).toFixed(2)
    : 0;

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">净值变化</h2>
        <div className="rounded-lg bg-blue-50 px-3 py-1">
          <span className="text-sm text-gray-600">总增长率：</span>
          <span className={`font-semibold ${Number(growthRate) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {growthRate}%
          </span>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => [`¥${value.toLocaleString()}`, '净值']}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{
                stroke: '#3b82f6',
                strokeWidth: 2,
                r: 4,
                fill: '#fff'
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4">
        <div>
          <p className="text-sm text-gray-500">初始净值</p>
          <p className="text-lg font-semibold text-gray-800">
            ¥{history[0].value.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">当前净值</p>
          <p className="text-lg font-semibold text-blue-600">
            ¥{history[history.length - 1].value.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};