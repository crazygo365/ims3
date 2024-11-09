import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Users, Building2, TrendingUp, DollarSign, ArrowUp, ArrowDown } from 'lucide-react';

const Dashboard = () => {
  // 趋势图数据
  const trendData = [
    { month: '2023-01', revenue: 1200000, netWorth: 2800000, profit: 300000 },
    { month: '2023-06', revenue: 1500000, netWorth: 3200000, profit: 450000 },
    { month: '2023-12', revenue: 1800000, netWorth: 3600000, profit: 600000 },
    { month: '2024-01', revenue: 2000000, netWorth: 4000000, profit: 750000 },
    { month: '2024-02', revenue: 1900000, netWorth: 4200000, profit: 800000 },
  ];

  // 店铺收益排行榜
  const revenueRankings = [
    { id: 1, name: '星巴克咖啡 - 中关村店', revenue: 343222, trend: 'up' },
    { id: 2, name: '肯德基 - 望京店', revenue: 320000, trend: 'down' },
    { id: 3, name: '必胜客 - 三里屯店', revenue: 280000, trend: 'up' },
    { id: 4, name: '麦当劳 - 西单店', revenue: 260000, trend: 'down' },
    { id: 5, name: '奈雪的茶 - 国贸店', revenue: 240000, trend: 'up' },
  ];

  // 店铺净值排行榜
  const netWorthRankings = [
    { id: 1, name: '星巴克咖啡 - 中关村店', netWorth: 2800000 },
    { id: 2, name: '肯德基 - 望京店', netWorth: 2600000 },
    { id: 3, name: '必胜客 - 三里屯店', netWorth: 2400000 },
    { id: 4, name: '麦当劳 - 西单店', netWorth: 2200000 },
    { id: 5, name: '奈雪的茶 - 国贸店', netWorth: 2000000 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">数据中心</h1>

      {/* 数据概览 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">总投资人数</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">14</p>
              <p className="mt-1 text-sm text-gray-600">较上月 +2</p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">店铺总数</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">8</p>
              <p className="mt-1 text-sm text-gray-600">较上月 +1</p>
            </div>
            <div className="rounded-full bg-green-100 p-3">
              <Building2 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">总投资额</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">¥20.14M</p>
              <p className="mt-1 text-sm text-gray-600">较上月 +2.5M</p>
            </div>
            <div className="rounded-full bg-purple-100 p-3">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">总净值</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">¥32.71M</p>
              <p className="mt-1 text-sm text-green-600">增长率 +12.5%</p>
            </div>
            <div className="rounded-full bg-orange-100 p-3">
              <DollarSign className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* 趋势图 */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">经营趋势</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                name="营业收入"
                stroke="#3b82f6"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="netWorth"
                name="净值"
                stroke="#10b981"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="profit"
                name="利润"
                stroke="#f59e0b"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 店铺收益排行榜 */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">店铺收益排行</h2>
          <div className="space-y-4">
            {revenueRankings.map((shop, index) => (
              <div
                key={shop.id}
                className="flex items-center justify-between rounded-lg border border-gray-100 p-4"
              >
                <div className="flex items-center">
                  <span className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                    {index + 1}
                  </span>
                  <span className="font-medium text-gray-800">{shop.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 font-semibold text-gray-900">
                    ¥{shop.revenue.toLocaleString()}
                  </span>
                  {shop.trend === 'up' ? (
                    <ArrowUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 店铺净值排行榜 */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">店铺净值排行</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={netWorthRankings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="netWorth"
                  name="净值"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;