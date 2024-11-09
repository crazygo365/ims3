import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { ShopHistoryModal } from '../../components/investor/ShopHistoryModal';

const InvestorDetail = () => {
  const { id } = useParams();
  const [selectedShop, setSelectedShop] = useState<{
    name: string;
    type: 'dividend' | 'netWorth';
    data: any[];
  } | null>(null);

  // 模拟店铺历史数据
  const shopHistory = {
    '张万福1': {
      dividends: [
        { date: '2024-02', value: 12000, description: '2024年2月分红' },
        { date: '2024-01', value: 11500, description: '2024年1月分红' },
        { date: '2023-12', value: 11800, description: '2023年12月分红' },
        { date: '2023-11', value: 11200, description: '2023年11月分红' },
        { date: '2023-10', value: 10800, description: '2023年10月分红' },
      ],
      netWorth: [
        { date: '2024-02', value: 520000, description: '设备升级后评估' },
        { date: '2023-12', value: 500000, description: '年末评估' },
        { date: '2023-09', value: 485000, description: '季度评估' },
        { date: '2023-06', value: 470000, description: '季度评估' },
        { date: '2023-03', value: 450000, description: '季度评估' },
      ],
    },
    // ... 其他店铺的历史数据
  };

  // 模拟投资人数据
  const investor = {
    id: 1,
    name: '张三',
    totalInvestment: 1004000,
    totalNetWorth: 22222,
    totalDividends: -925194.6,
    investmentYears: 4.9,
    averageAnnualReturn: 443.91,
    shopCount: 4,
    shops: [
      {
        name: '张万福1',
        investment: 1000,
        netWorth: 0,
        dividends: 333.4,
        years: 4.9,
        annualReturn: -13.60
      },
      {
        name: '张万福2',
        investment: 1000,
        netWorth: 5555.5,
        dividends: 56250,
        years: 3.8,
        annualReturn: 1600.14
      },
      {
        name: '中国黄金',
        investment: 2000,
        netWorth: 16666.5,
        dividends: 0,
        years: 3.5,
        annualReturn: 209.52
      },
      {
        name: '周大福宇宙超窝',
        investment: 1000000,
        netWorth: 0,
        dividends: 0,
        years: 4.9,
        annualReturn: -20.41
      }
    ],
    monthlyDividends: [
      { month: '2024-02', amount: 32000 },
      { month: '2024-01', amount: 27000 },
      { month: '2023-12', amount: 30000 },
      { month: '2023-11', amount: 22000 },
      { month: '2023-10', amount: 28000 },
      { month: '2023-09', amount: 25000 }
    ],
    radarData: [
      { shop: '张万福1', value: 60 },
      { shop: '张万福2', value: 85 },
      { shop: '中国黄金', value: 75 },
      { shop: '周大福', value: 90 }
    ]
  };

  // 计算累计收益
  const totalReturn = investor.shops.reduce((sum, shop) => {
    return sum + (shop.netWorth + shop.dividends - shop.investment);
  }, 0);

  const handleShowHistory = (shopName: string, type: 'dividend' | 'netWorth') => {
    const shopData = shopHistory[shopName];
    if (shopData) {
      setSelectedShop({
        name: shopName,
        type,
        data: type === 'dividend' ? shopData.dividends : shopData.netWorth,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{investor.name}个人投资详情</h1>
          <div className="mt-1 flex items-center">
            <span className="text-sm text-gray-500">投资年限：{investor.investmentYears}年</span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-sm text-gray-500">投资店铺：{investor.shopCount}家</span>
          </div>
        </div>
      </div>

      {/* 投资概览卡片 */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">总投资</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            ¥{investor.totalInvestment.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">总净值</p>
          <p className="mt-2 text-2xl font-bold text-blue-600">
            ¥{investor.totalNetWorth.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">累计分红</p>
          <p className="mt-2 text-2xl font-bold text-green-600">
            ¥{investor.totalDividends.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">累计收益</p>
          <p className="mt-2 text-2xl font-bold text-purple-600">
            ¥{totalReturn.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">平均年化收益率</p>
          <p className="mt-2 text-2xl font-bold text-orange-600">
            {investor.averageAnnualReturn}%
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 分红趋势图 */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">各店铺分红</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={investor.monthlyDividends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `¥${value.toLocaleString()}`} />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 投资雷达图 */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">年化收益率</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={investor.radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="shop" />
                <PolarRadiusAxis />
                <Radar
                  name="收益率"
                  dataKey="value"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 店铺投资明细 */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">店铺投资明细</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">店铺名称</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">投资金额</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">当前净值</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">累计分红</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">累计收益</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">投资年限</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">年化收益率</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {investor.shops.map((shop, index) => {
                const totalReturn = shop.netWorth + shop.dividends - shop.investment;
                return (
                  <tr key={index}>
                    <td className="px-4 py-3 font-medium text-gray-900">{shop.name}</td>
                    <td className="px-4 py-3 text-right text-gray-600">
                      ¥{shop.investment.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleShowHistory(shop.name, 'netWorth')}
                        className="font-medium text-blue-600 hover:text-blue-700"
                      >
                        ¥{shop.netWorth.toLocaleString()}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleShowHistory(shop.name, 'dividend')}
                        className="font-medium text-green-600 hover:text-green-700"
                      >
                        ¥{shop.dividends.toLocaleString()}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-purple-600">
                      ¥{totalReturn.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600">{shop.years}年</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`font-medium ${
                        shop.annualReturn >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {shop.annualReturn}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 历史记录弹窗 */}
      {selectedShop && (
        <ShopHistoryModal
          isOpen={true}
          onClose={() => setSelectedShop(null)}
          type={selectedShop.type}
          shopName={selectedShop.name}
          data={selectedShop.data}
        />
      )}
    </div>
  );
};

export default InvestorDetail;