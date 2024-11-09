import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Wallet, Calendar, Building, Search } from 'lucide-react';
import { Modal } from '../components/modals/Modal';
import { WithdrawForm } from '../components/forms/WithdrawForm';

// 交易类型
const TRANSACTION_TYPES = [
  { value: 'investment_in', label: '投资款转入' },
  { value: 'investment_out', label: '投资款转出' },
  { value: 'dividend_in', label: '分红收入' },
  { value: 'dividend_out', label: '分红提取' },
  { value: 'loan_in', label: '贷款发放' },
  { value: 'loan_out', label: '贷款还款' },
  { value: 'interest', label: '利息支付' },
  { value: 'other', label: '其他' },
];

const Transactions = () => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShop, setSelectedShop] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [amountRange, setAmountRange] = useState({ min: '', max: '' });

  // 模拟当前用户数据
  const currentUser = {
    balance: 393797,
    recentIncomes: [
      { id: 1, date: '2024-02-27', amount: 75000, source: '2店2024年2月分红款' },
      { id: 2, date: '2024-01-27', amount: 318797, source: '1店2024年1月分红款' },
      { id: 3, date: '2024-01-15', amount: 35000, source: '店铺投资款' },
    ],
    bankCards: [
      { id: 1, bank: '工商银行', number: '****5888', name: '张三' },
      { id: 2, bank: '建设银行', number: '****6666', name: '张三' },
    ]
  };

  // 模拟交易记录数据
  const transactions = [
    {
      id: 1,
      date: '2024-02-27',
      type: 'dividend_in',
      amount: 75000,
      balance: 393797,
      description: '2店2024年2月分红款',
      shop: '肯德基 - 望京店'
    },
    {
      id: 2,
      date: '2024-01-27',
      type: 'dividend_in',
      amount: 318797,
      balance: 318797,
      description: '1店2024年1月分红款',
      shop: '星巴克咖啡 - 中关村店'
    },
    {
      id: 3,
      date: '2024-01-27',
      type: 'dividend_out',
      amount: -393797,
      balance: 0,
      description: '提现到银行卡工行5888',
      shop: '-'
    },
    {
      id: 4,
      date: '2024-01-27',
      type: 'investment_in',
      amount: 35000,
      balance: 35000,
      description: '收到店铺投资款35000',
      shop: '必胜客 - 三里屯店'
    },
    {
      id: 5,
      date: '2024-01-27',
      type: 'investment_out',
      amount: -35000,
      balance: 0,
      description: '投资到新店3店',
      shop: '必胜客 - 三里屯店'
    }
  ];

  const handleWithdraw = (data: any) => {
    console.log('提现数据:', data);
    setShowWithdrawModal(false);
  };

  // 计算收支合计
  const totals = transactions.reduce(
    (acc, curr) => {
      if (curr.amount > 0) {
        acc.income += curr.amount;
      } else {
        acc.expense += Math.abs(curr.amount);
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">资金往来</h1>

      {/* 我的账户卡片 */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-blue-100 p-3">
              <Wallet className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">我的账户</h2>
              <p className="text-sm text-gray-500">更新至：{new Date().toLocaleDateString()}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-800">¥{currentUser.balance.toLocaleString()}</p>
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
            >
              提现
            </button>
          </div>
        </div>

        {/* 最近收入记录 */}
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-medium text-gray-600">最近收入记录（近1个月）</h3>
          <div className="space-y-2">
            {currentUser.recentIncomes.map((income) => (
              <div key={income.id} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <div>
                  <p className="font-medium text-gray-800">{income.source}</p>
                  <p className="text-sm text-gray-500">{income.date}</p>
                </div>
                <p className="text-lg font-semibold text-green-600">
                  +¥{income.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 筛选框 */}
      <div className="grid grid-cols-1 gap-4 rounded-lg bg-white p-4 shadow-sm md:grid-cols-4">
        <div className="flex items-center rounded-lg border border-gray-300">
          <Search className="ml-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索交易..."
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

        <div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="">全部交易类型</option>
            {TRANSACTION_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
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

        <div className="md:col-span-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">金额范围：</span>
            <input
              type="number"
              value={amountRange.min}
              onChange={(e) => setAmountRange({ ...amountRange, min: e.target.value })}
              placeholder="最小金额"
              className="w-32 rounded-lg border border-gray-300 px-3 py-2"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              value={amountRange.max}
              onChange={(e) => setAmountRange({ ...amountRange, max: e.target.value })}
              placeholder="最大金额"
              className="w-32 rounded-lg border border-gray-300 px-3 py-2"
            />
          </div>
        </div>
      </div>

      {/* 账户明细表格 */}
      <div className="rounded-xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">时间</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">摘要</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">相关店铺</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">收入</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">支出</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">结余</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-500">{transaction.date}</td>
                  <td className="px-6 py-4 text-gray-800">{transaction.description}</td>
                  <td className="px-6 py-4 text-gray-500">{transaction.shop}</td>
                  <td className="px-6 py-4 text-right">
                    {transaction.amount > 0 ? (
                      <span className="text-green-600">
                        ¥{transaction.amount.toLocaleString()}
                      </span>
                    ) : '-'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {transaction.amount < 0 ? (
                      <span className="text-red-600">
                        ¥{Math.abs(transaction.amount).toLocaleString()}
                      </span>
                    ) : '-'}
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-gray-900">
                    ¥{transaction.balance.toLocaleString()}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-medium">
                <td colSpan={3} className="px-6 py-4 text-right">
                  本期合计：
                </td>
                <td className="px-6 py-4 text-right text-green-600">
                  ¥{totals.income.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right text-red-600">
                  ¥{totals.expense.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right text-gray-900">
                  ¥{currentUser.balance.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 提现弹窗 */}
      <Modal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        title="提现"
        size="lg"
      >
        <WithdrawForm
          balance={currentUser.balance}
          recentIncomes={currentUser.recentIncomes}
          bankCards={currentUser.bankCards}
          onSubmit={handleWithdraw}
        />
      </Modal>
    </div>
  );
};

export default Transactions;