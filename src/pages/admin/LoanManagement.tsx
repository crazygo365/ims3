import React, { useState } from 'react';
import { Plus, Search, Calendar, DollarSign, Filter, ArrowDownLeft } from 'lucide-react';
import { Modal } from '../../components/modals/Modal';
import { LoanForm } from '../../components/forms/LoanForm';
import { LoanRepaymentForm } from '../../components/forms/LoanRepaymentForm';

interface Loan {
  id: string;
  borrower: string;
  purpose: string;
  loanDate: string;
  repaymentDate: string;
  amount: number;
  interest: number;
  remainingAmount: number;
  accruedInterest: number;
}

const LoanManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRepayModalOpen, setIsRepayModalOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);

  // 汇总数据
  const summary = {
    totalLoans: 3,
    activeLoans: 3,
    totalAmount: 185000,
    remainingAmount: 80000,
    totalInterest: 5600,
    nextPayment: '2024-03-15'
  };

  const loans: Loan[] = [
    {
      id: '1',
      borrower: '张三',
      purpose: '新店开业贷款',
      loanDate: '2024-11-11',
      repaymentDate: '2025-11-11',
      amount: 35000,
      interest: 8.00,
      remainingAmount: 25000,
      accruedInterest: 1600
    },
    {
      id: '2',
      borrower: '李四',
      purpose: '投资新店',
      loanDate: '2024-11-12',
      repaymentDate: '2025-11-12',
      amount: 50000,
      interest: 6.00,
      remainingAmount: 30000,
      accruedInterest: 2500
    },
    {
      id: '3',
      borrower: '王五',
      purpose: '投资新店',
      loanDate: '2024-11-13',
      repaymentDate: '2025-11-13',
      amount: 100000,
      interest: 4.00,
      remainingAmount: 25000,
      accruedInterest: 1500
    }
  ];

  const handleAddLoan = (data: any) => {
    console.log('Adding loan:', data);
    setIsAddModalOpen(false);
  };

  const handleRepayment = (data: any) => {
    console.log('Processing repayment:', data);
    setIsRepayModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold text-gray-800">贷款管理</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            发放贷款
          </button>
        </div>
      </div>

      {/* 贷款汇总信息 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">贷款总额</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                ¥{summary.totalAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">剩余贷款</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                ¥{summary.remainingAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">产生利息</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                ¥{summary.totalInterest.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 筛选条件 */}
      <div className="grid gap-4 rounded-lg bg-white p-4 shadow-sm md:grid-cols-3">
        <div className="flex items-center rounded-lg border border-gray-300">
          <Search className="ml-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索贷款人..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border-none bg-transparent px-3 py-2 outline-none"
          />
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

      {/* 贷款列表 */}
      <div className="rounded-lg bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">贷款人</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">贷款名称</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">贷款日期</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">计划还款</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">贷款金额</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">贷款利率</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">剩余贷款</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">产生利息</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loans.map((loan) => (
                <tr key={loan.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{loan.borrower}</td>
                  <td className="px-6 py-4">{loan.purpose}</td>
                  <td className="px-6 py-4">{loan.loanDate}</td>
                  <td className="px-6 py-4">{loan.repaymentDate}</td>
                  <td className="px-6 py-4 text-right">¥{loan.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">{loan.interest}%</td>
                  <td className="px-6 py-4 text-right">¥{loan.remainingAmount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">¥{loan.accruedInterest.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => {
                          setSelectedLoan(loan);
                          setIsRepayModalOpen(true);
                        }}
                        className="flex items-center rounded-lg bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
                      >
                        <ArrowDownLeft className="mr-1 h-4 w-4" />
                        还款
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 发放贷款弹窗 */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="发放贷款"
        size="lg"
      >
        <LoanForm onSubmit={handleAddLoan} />
      </Modal>

      {/* 还款弹窗 */}
      <Modal
        isOpen={isRepayModalOpen}
        onClose={() => setIsRepayModalOpen(false)}
        title="贷款还款"
        size="lg"
      >
        {selectedLoan && (
          <LoanRepaymentForm
            loan={selectedLoan}
            onSubmit={handleRepayment}
          />
        )}
      </Modal>
    </div>
  );
};

export default LoanManagement;