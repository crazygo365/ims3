import React, { useState } from 'react';
import { Calendar, DollarSign, FileText } from 'lucide-react';

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

interface LoanRepaymentFormProps {
  loan: Loan;
  onSubmit: (data: any) => void;
}

export const LoanRepaymentForm: React.FC<LoanRepaymentFormProps> = ({ loan, onSubmit }) => {
  const [repaymentType, setRepaymentType] = useState<'principal' | 'interest' | 'both'>('both');
  const [amount, setAmount] = useState(loan.remainingAmount + loan.accruedInterest);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      ...Object.fromEntries(formData),
      loanId: loan.id,
      repaymentType,
      amount
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-lg bg-gray-50 p-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">贷款人</p>
            <p className="text-lg font-semibold text-gray-900">{loan.borrower}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">贷款用途</p>
            <p className="text-lg font-semibold text-gray-900">{loan.purpose}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">剩余本金</p>
            <p className="text-lg font-semibold text-blue-600">
              ¥{loan.remainingAmount.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">应付利息</p>
            <p className="text-lg font-semibold text-blue-600">
              ¥{loan.accruedInterest.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">还款类型</label>
          <div className="mt-2 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={repaymentType === 'both'}
                onChange={() => {
                  setRepaymentType('both');
                  setAmount(loan.remainingAmount + loan.accruedInterest);
                }}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2">本息还款</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={repaymentType === 'principal'}
                onChange={() => {
                  setRepaymentType('principal');
                  setAmount(loan.remainingAmount);
                }}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2">仅还本金</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={repaymentType === 'interest'}
                onChange={() => {
                  setRepaymentType('interest');
                  setAmount(loan.accruedInterest);
                }}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2">仅还利息</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">还款金额</label>
          <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
            <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="number"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              max={loan.remainingAmount + loan.accruedInterest}
              className="block w-full rounded-r-lg border-0 py-2 pl-3"
              placeholder="输入还款金额"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">还款日期</label>
          <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
            <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
              <Calendar className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="date"
              name="repaymentDate"
              required
              defaultValue={new Date().toISOString().split('T')[0]}
              className="block w-full rounded-r-lg border-0 py-2 pl-3"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">备注说明</label>
          <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
            <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
              <FileText className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              name="notes"
              className="block w-full rounded-r-lg border-0 py-2 pl-3"
              placeholder="输入备注说明"
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-gray-50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">应还总额</span>
          <span className="text-lg font-semibold text-blue-600">
            ¥{amount.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => onSubmit(null)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
        >
          取消
        </button>
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          确认还款
        </button>
      </div>
    </form>
  );
};