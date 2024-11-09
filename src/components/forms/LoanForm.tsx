import React, { useState } from 'react';
import { Calendar, DollarSign, User, FileText } from 'lucide-react';

interface LoanFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  isEdit?: boolean;
}

export const LoanForm: React.FC<LoanFormProps> = ({ onSubmit, initialData, isEdit }) => {
  // 模拟投资人数据
  const investors = [
    { id: '1', name: '张三' },
    { id: '2', name: '李四' },
    { id: '3', name: '王五' },
  ];

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      onSubmit(Object.fromEntries(formData));
    }} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">贷款人 *</label>
          <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
            <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
              <User className="h-5 w-5 text-gray-400" />
            </span>
            <select
              name="borrowerId"
              required
              defaultValue={initialData?.borrowerId}
              className="block w-full rounded-r-lg border-0 py-2 pl-3"
            >
              <option value="">选择贷款人</option>
              {investors.map(investor => (
                <option key={investor.id} value={investor.id}>
                  {investor.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">贷款名称 *</label>
          <input
            type="text"
            name="purpose"
            required
            defaultValue={initialData?.purpose}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="输入贷款用途"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">贷款金额 *</label>
          <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
            <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="number"
              name="amount"
              required
              defaultValue={initialData?.amount}
              className="block w-full rounded-r-lg border-0 py-2 pl-3"
              placeholder="输入贷款金额"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">贷款利率(%) *</label>
          <input
            type="number"
            name="interest"
            step="0.01"
            required
            defaultValue={initialData?.interest}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="输入年化利率"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">贷款日期 *</label>
          <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
            <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
              <Calendar className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="date"
              name="loanDate"
              required
              defaultValue={initialData?.loanDate}
              className="block w-full rounded-r-lg border-0 py-2 pl-3"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">计划还款日期 *</label>
          <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
            <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
              <Calendar className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="date"
              name="repaymentDate"
              required
              defaultValue={initialData?.repaymentDate}
              className="block w-full rounded-r-lg border-0 py-2 pl-3"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">备注说明</label>
          <textarea
            name="notes"
            rows={4}
            defaultValue={initialData?.notes}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="输入备注说明"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
        >
          取消
        </button>
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          {isEdit ? '保存更改' : '发放贷款'}
        </button>
      </div>
    </form>
  );
};