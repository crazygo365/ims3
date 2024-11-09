import React, { useState } from 'react';
import { Calendar, DollarSign, FileText, CreditCard, Plus } from 'lucide-react';

interface BankCard {
  id: number;
  bank: string;
  number: string;
  name: string;
}

interface AccountOperationFormProps {
  type: 'withdraw' | 'income' | 'expense' | 'bank';
  investor: any;
  onSubmit: (data: any) => void;
}

const transactionTypes = {
  withdraw: [
    { value: 'dividend_withdraw', label: '分红提取' },
    { value: 'investment_withdraw', label: '投资款提取' },
    { value: 'other_withdraw', label: '其他提取' },
  ],
  income: [
    { value: 'dividend_income', label: '分红收入' },
    { value: 'investment_return', label: '投资回收' },
    { value: 'other_income', label: '其他收入' },
  ],
  expense: [
    { value: 'investment_expense', label: '投资支出' },
    { value: 'loan_repayment', label: '贷款还款' },
    { value: 'other_expense', label: '其他支出' },
  ],
};

const BANK_LIST = [
  '工商银行',
  '建设银行',
  '农业银行',
  '中国银行',
  '交通银行',
  '招商银行',
  '浦发银行',
  '中信银行',
  '光大银行',
  '民生银行',
  '华夏银行',
  '平安银行',
  '兴业银行',
];

export const AccountOperationForm: React.FC<AccountOperationFormProps> = ({
  type,
  investor,
  onSubmit,
}) => {
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState(investor?.name || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'bank') {
      onSubmit({
        bank: selectedBank,
        number: accountNumber,
        name: accountName,
        investorId: investor.id,
      });
    } else {
      onSubmit({
        amount: Number(amount),
        type: transactionType,
        notes,
        date: new Date().toISOString().split('T')[0],
        investorId: investor.id,
      });
    }
  };

  if (type === 'bank') {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">开户银行 *</label>
          <select
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            required
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="">选择银行</option>
            {BANK_LIST.map((bank) => (
              <option key={bank} value={bank}>{bank}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">银行卡号 *</label>
          <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
            <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
              <CreditCard className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="block w-full rounded-r-lg border-0 py-2 pl-3"
              placeholder="输入银行卡号"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">开户人姓名 *</label>
          <input
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="输入开户人姓名"
            required
          />
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
            添加银行卡
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">操作类型</label>
        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          required
        >
          <option value="">选择类型</option>
          {transactionTypes[type].map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {type === 'withdraw' ? '提现金额' : type === 'income' ? '收入金额' : '支出金额'}
        </label>
        <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
          <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
            <DollarSign className="h-5 w-5 text-gray-400" />
          </span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="block w-full rounded-r-lg border-0 py-2 pl-3"
            placeholder="输入金额"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">操作日期</label>
        <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
          <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
            <Calendar className="h-5 w-5 text-gray-400" />
          </span>
          <input
            type="date"
            name="date"
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
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="block w-full rounded-r-lg border-0 py-2 pl-3"
            placeholder="输入备注说明"
          />
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
          确认
        </button>
      </div>
    </form>
  );
};