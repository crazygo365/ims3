import React from 'react';
import { Store, PiggyBank, Clock, Wallet2, Building2, Calendar, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  // 模拟当前登录用户数据
  const currentUser = {
    name: '张三',
    activeShops: 4,
    totalShops: 6,
    totalInvestment: 3100000,
    monthlyIncrease: 450000,
    annualReturn: 16.2,
    lastMonthReturn: 13.7,
    totalDividends: 580000,
    monthlyDividends: 45000,
    investmentYears: 4.9,
    accountBalance: 250000,
    loans: 450000,
    paidLoans: 250000
  };

  // 月度分红趋势数据
  const dividendTrends = [
    { month: '2023-09', amount: 42000 },
    { month: '2023-10', amount: 44000 },
    { month: '2023-11', amount: 43000 },
    { month: '2023-12', amount: 48000 },
    { month: '2024-01', amount: 45000 },
    { month: '2024-02', amount: 45000 }
  ];

  // 店铺收益排行
  const shopPerformance = [
    { name: '星巴克中关村店', revenue: 85000, profit: 25000, roi: 18.5 },
    { name: '肯德基望京店', revenue: 120000, profit: 32000, roi: 16.8 },
    { name: '必胜客三里屯店', revenue: 95000, profit: 28000, roi: 15.2 },
    { name: '麦当劳西单店', revenue: 110000, profit: 30000, roi: 17.4 }
  ];

  // 店铺动态
  const shopUpdates = [
    {
      id: 1,
      shopName: '星巴克中关村店',
      date: '2024-03-15',
      type: '装修升级',
      content: '完成店面整体翻新，提升用户体验'
    },
    {
      id: 2,
      shopName: '肯德基望京店',
      date: '2024-03-10',
      type: '促销活动',
      content: '春季特惠活动开启，带动销售额提升30%'
    },
    {
      id: 3,
      shopName: '必胜客三里屯店',
      date: '2024-03-05',
      type: '设备更新',
      content: '更换新一代烤箱设备，提升出餐效率'
    },
    {
      id: 4,
      shopName: '麦当劳西单店',
      date: '2024-03-01',
      type: '人员培训',
      content: '完成全员服务标准培训，提升服务质量'
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">投资概览</h1>
        <p className="mt-2 text-gray-600">欢迎您，{currentUser.name}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">投资店铺数量</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{currentUser.activeShops}</p>
              <p className="mt-1 text-sm text-gray-600">累计投资店铺: {currentUser.totalShops}</p>
            </div>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100">
              <Store className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">投资总金额</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                ¥{currentUser.totalInvestment.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                本月新增: ¥{currentUser.monthlyIncrease.toLocaleString()}
              </p>
            </div>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100">
              <Building2 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">累计分红</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                ¥{currentUser.totalDividends.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                本月分红: ¥{currentUser.monthlyDividends.toLocaleString()}
              </p>
            </div>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-100">
              <PiggyBank className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">投资年限</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{currentUser.investmentYears}年</p>
              <p className="mt-1 text-sm text-gray-600">
                年化收益率: {currentUser.annualReturn}%
              </p>
            </div>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-yellow-100">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">账户余额</p>
              <p className={`mt-2 text-3xl font-bold ${
                currentUser.accountBalance >= 0 ? 'text-gray-900' : 'text-red-600'
              }`}>
                ¥{currentUser.accountBalance.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                最近更新: {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-100">
              <Wallet2 className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">我的贷款</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                ¥{currentUser.loans.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                已还款: ¥{currentUser.paidLoans.toLocaleString()}
              </p>
            </div>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 月度分红趋势 */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">月度分红趋势</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dividendTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `¥${value.toLocaleString()}`} />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 店铺收益排行 */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">店铺收益排行</h2>
          <div className="space-y-4">
            {shopPerformance.map((shop, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-gray-100 p-4"
              >
                <div className="flex items-center">
                  <span className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-gray-800">{shop.name}</p>
                    <p className="text-sm text-gray-500">ROI: {shop.roi}%</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ¥{shop.revenue.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600">
                    +¥{shop.profit.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 店铺动态 */}
        <div className="lg:col-span-2 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">店铺动态</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {shopUpdates.map((update) => (
              <div
                key={update.id}
                className="rounded-lg border border-gray-200 p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                    {update.type}
                  </span>
                  <span className="text-sm text-gray-500">{update.date}</span>
                </div>
                <h3 className="mb-2 font-medium text-gray-800">{update.shopName}</h3>
                <p className="text-sm text-gray-600">{update.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;