import React, { useState } from 'react';
import { Plus, Search, Calendar, TrendingUp, Store, Filter } from 'lucide-react';
import { Modal } from '../../components/modals/Modal';
import { NetWorthForm } from '../../components/forms/NetWorthForm';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface NetWorth {
  id: string;
  shopId: string;
  shopName: string;
  date: string;
  value: number;
  previousValue: number;
  changeRate: number;
  updater: string;
  notes?: string;
}

const NetWorthManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShop, setSelectedShop] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedNetWorth, setSelectedNetWorth] = useState<NetWorth | null>(null);

  const netWorths: NetWorth[] = [
    {
      id: '1',
      shopId: '1',
      shopName: '星巴克咖啡 - 中关村店',
      date: '2024-02',
      value: 2800000,
      previousValue: 2700000,
      changeRate: 3.7,
      updater: '张财务',
      notes: '设备升级后净值提升'
    },
    {
      id: '2',
      shopId: '2',
      shopName: '肯德基 - 望京店',
      date: '2024-02',
      value: 3200000,
      previousValue: 3000000,
      changeRate: 6.67,
      updater: '李财务',
      notes: '新增设备投资'
    },
    // 更多净值记录...
  ];

  // 趋势图数据
  const trendData = [
    { month: '2023-09', value: 2500000 },
    { month: '2023-10', value: 2600000 },
    { month: '2023-11', value: 2650000 },
    { month: '2023-12', value: 2700000 },
    { month: '2024-01', value: 2750000 },
    { month: '2024-02', value: 2800000 },
  ];

  const handleAddNetWorth = (data: any) => {
    console.log('Adding net worth:', data);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold text-gray-800">净值管理</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            更新净值
          </button>
        </div>
      </div>

      {/* 筛选条件 */}
      <div className="grid gap-4 rounded-lg bg-white p-4 shadow-sm md:grid-cols-4">
        <div className="flex items-center rounded-lg border border-gray-300">
          <Search className="ml-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索店铺..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border-none bg-transparent px-3 py-2 outline-none"
          />
        </div>

        <div>
          <select
            value={selectedShop}
            onChange={(e) => setSelectedShop(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="">全部店铺</option>
            <option value="1">星巴克咖啡 - 中关村店</option>
            <option value="2">肯德基 - 望京店</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
          <span className="text-gray-500">至</span>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>

        <button className="flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">
          <Filter className="mr-2 h-4 w-4" />
          筛选
        </button>
      </div>

      {/* 净值趋势图 */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">净值趋势</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `¥${value.toLocaleString()}`} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 净值列表 */}
      <div className="rounded-lg bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">店铺</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">更新日期</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">当前净值</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">上期净值</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">变化率</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">更新人</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">备注</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {netWorths.map((netWorth) => (
                <tr key={netWorth.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Store className="mr-2 h-5 w-5 text-gray-400" />
                      <span className="text-gray-900">{netWorth.shopName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-gray-400" />
                      <span className="text-gray-900">{netWorth.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-semibold text-gray-900">
                      ¥{netWorth.value.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-gray-500">
                    ¥{netWorth.previousValue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end">
                      <TrendingUp className={`mr-1 h-5 w-5 ${
                        netWorth.changeRate >= 0 ? 'text-green-500' : 'text-red-500'
                      }`} />
                      <span className={netWorth.changeRate >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {netWorth.changeRate >= 0 ? '+' : ''}{netWorth.changeRate}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{netWorth.updater}</td>
                  <td className="px-6 py-4 text-gray-500">{netWorth.notes || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 更新净值弹窗 */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="更新净值"
        size="lg"
      >
        <NetWorthForm onSubmit={handleAddNetWorth} />
      </Modal>
    </div>
  );
};

export default NetWorthManagement;