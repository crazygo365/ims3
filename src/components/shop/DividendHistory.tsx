import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DividendHistoryProps {
  dividends: Array<{
    id: number;
    period: string;
    amount: number;
    paymentDate: string;
    status: string;
  }>;
}

export const DividendHistory: React.FC<DividendHistoryProps> = ({ dividends }) => {
  // 计算分红趋势数据
  const trendData = dividends
    .filter(d => d.status === '已发放')
    .map(d => ({
      period: d.period,
      amount: d.amount,
    }))
    .reverse();

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">分红记录</h2>
      
      {/* 分红趋势图 */}
      <div className="mb-6 h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => [`¥${value.toLocaleString()}`, '分红金额']}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 分红记录表格 */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-600">分红期间</th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-600">分红金额</th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-600">发放日期</th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold text-gray-600">状态</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {dividends.map((dividend) => (
              <tr key={dividend.id}>
                <td className="whitespace-nowrap px-4 py-3 text-gray-800">{dividend.period}</td>
                <td className="whitespace-nowrap px-4 py-3 text-green-600">
                  ¥{dividend.amount.toLocaleString()}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-500">{dividend.paymentDate}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs ${
                    dividend.status === '已发放' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {dividend.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};