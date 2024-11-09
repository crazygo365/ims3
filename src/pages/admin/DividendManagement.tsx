import React, { useState } from 'react';
import { Plus, Search, Calendar, DollarSign, Store, Filter } from 'lucide-react';
import { Modal } from '../../components/modals/Modal';
import { DividendForm } from '../../components/forms/DividendForm';

interface Dividend {
  id: string;
  shopId: string;
  shopName: string;
  period: string;
  amount: number;
  paymentDate: string;
  status: 'pending' | 'approved' | 'paid';
  approver?: string;
  paymentMethod?: string;
  notes?: string;
}

const DividendManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShop, setSelectedShop] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDividend, setSelectedDividend] = useState<Dividend | null>(null);

  const dividends: Dividend[] = [
    {
      id: '1',
      shopId: '1',
      shopName: '星巴克咖啡 - 中关村店',
      period: '2024-02',
      amount: 25800,
      paymentDate: '2024-02-15',
      status: 'paid',
      approver: '张财务',
      paymentMethod: '银行转账',
      notes: '2月份正常分红'
    },
    {
      id: '2',
      shopId: '2',
      shopName: '肯德基 - 望京店',
      period: '2024-02',
      amount: 32000,
      paymentDate: '2024-02-15',
      status: 'pending',
      notes: '等待审批'
    },
    // 更多分红记录...
  ];

  const handleAddDividend = (data: any) => {
    console.log('Adding dividend:', data);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold text-gray-800">分红管理</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            新增分红
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

      {/* 分红列表 */}
      <div className="rounded-lg bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">店铺</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">分红期间</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">分红金额</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">发放日期</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">状态</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">审批人</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">备注</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dividends.map((dividend) => (
                <tr key={dividend.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Store className="mr-2 h-5 w-5 text-gray-400" />
                      <span className="text-gray-900">{dividend.shopName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-gray-400" />
                      <span className="text-gray-900">{dividend.period}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end">
                      <DollarSign className="mr-1 h-5 w-5 text-gray-400" />
                      <span className="text-gray-900">
                        ¥{dividend.amount.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{dividend.paymentDate}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        dividend.status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : dividend.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {dividend.status === 'paid'
                        ? '已发放'
                        : dividend.status === 'pending'
                        ? '待审批'
                        : '已审批'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{dividend.approver || '-'}</td>
                  <td className="px-6 py-4 text-gray-500">{dividend.notes || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 新增分红弹窗 */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="新增分红"
        size="lg"
      >
        <DividendForm onSubmit={handleAddDividend} />
      </Modal>
    </div>
  );
};

export default DividendManagement;