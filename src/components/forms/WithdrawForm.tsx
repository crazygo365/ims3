import React, { useState } from 'react';
import { CreditCard, Wallet2, User, FileText, MessageSquare } from 'lucide-react';

interface WithdrawFormProps {
  balance: number;
  recentIncomes: Array<{
    id: number;
    date: string;
    amount: number;
    source: string;
  }>;
  bankCards: Array<{
    id: number;
    bank: string;
    number: string;
    name: string;
  }>;
  onSubmit: (data: any) => void;
}

// 交易类型
const transactionTypes = [
  { value: 'dividend_withdraw', label: '分红提取' },
  { value: 'loan_repayment', label: '贷款还款' },
  { value: 'investment_withdraw', label: '投资款提取' },
  { value: 'other', label: '其他' }
];

export const WithdrawForm: React.FC<WithdrawFormProps> = ({
  balance,
  recentIncomes,
  bankCards,
  onSubmit
}) => {
  const [withdrawType, setWithdrawType] = useState<'custom' | 'income'>('custom');
  const [selectedIncomes, setSelectedIncomes] = useState<number[]>([]);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawTarget, setWithdrawTarget] = useState<'self' | 'other'>('self');
  const [selectedCard, setSelectedCard] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [notes, setNotes] = useState('');

  const calculateSelectedAmount = () => {
    if (withdrawType === 'income') {
      return recentIncomes
        .filter(income => selectedIncomes.includes(income.id))
        .reduce((sum, income) => sum + income.amount, 0);
    }
    return Number(withdrawAmount) || 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      ...Object.fromEntries(formData),
      withdrawType,
      amount: calculateSelectedAmount(),
      selectedIncomes: withdrawType === 'income' ? selectedIncomes : undefined,
      transactionType,
      notes
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-lg bg-blue-50 p-4">
        <div className="flex items-center">
          <Wallet2 className="h-5 w-5 text-blue-600" />
          <div className="ml-3">
            <p className="text-sm text-gray-600">当前可提现金额</p>
            <p className="text-lg font-semibold text-blue-600">
              ¥{balance.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">提现方式</label>
          <div className="mt-2 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={withdrawType === 'custom'}
                onChange={() => setWithdrawType('custom')}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2">自定义金额</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={withdrawType === 'income'}
                onChange={() => setWithdrawType('income')}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2">选择收入提现</span>
            </label>
          </div>
        </div>

        {withdrawType === 'custom' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700">提现金额</label>
            <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
              <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
                ¥
              </span>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                max={balance}
                className="block w-full rounded-r-lg border-0 py-2 pl-3"
                placeholder="输入提现金额"
              />
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700">选择收入</label>
            <div className="mt-2 space-y-2">
              {recentIncomes.map((income) => (
                <label
                  key={income.id}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedIncomes.includes(income.id)}
                      onChange={(e) => {
                        setSelectedIncomes(
                          e.target.checked
                            ? [...selectedIncomes, income.id]
                            : selectedIncomes.filter(id => id !== income.id)
                        );
                      }}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-3">
                      <p className="font-medium text-gray-800">{income.source}</p>
                      <p className="text-sm text-gray-500">{income.date}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-green-600">
                    ¥{income.amount.toLocaleString()}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">提现用途</label>
          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
            required
          >
            <option value="">选择用途</option>
            {transactionTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">备注说明</label>
          <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
            <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
              <MessageSquare className="h-5 w-5 text-gray-400" />
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

        <div>
          <label className="block text-sm font-medium text-gray-700">提现至</label>
          <div className="mt-2 space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={withdrawTarget === 'self'}
                onChange={() => setWithdrawTarget('self')}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2">本人银行卡</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={withdrawTarget === 'other'}
                onChange={() => setWithdrawTarget('other')}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2">他人账户</span>
            </label>
          </div>
        </div>

        {withdrawTarget === 'self' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700">选择银行卡</label>
            <select
              value={selectedCard}
              onChange={(e) => setSelectedCard(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              required
            >
              <option value="">选择银行卡</option>
              {bankCards.map((card) => (
                <option key={card.id} value={card.id}>
                  {card.bank} ({card.number})
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">收款人姓名</label>
              <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
                <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
                  <User className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="text"
                  name="receiverName"
                  className="block w-full rounded-r-lg border-0 py-2 pl-3"
                  placeholder="输入收款人姓名"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">收款账号</label>
              <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
                <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="text"
                  name="receiverAccount"
                  className="block w-full rounded-r-lg border-0 py-2 pl-3"
                  placeholder="输入收款账号"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">开户银行</label>
              <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
                <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="text"
                  name="receiverBank"
                  className="block w-full rounded-r-lg border-0 py-2 pl-3"
                  placeholder="输入开户银行"
                  required
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-lg bg-gray-50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">提现金额</span>
          <span className="text-lg font-semibold text-blue-600">
            ¥{calculateSelectedAmount().toLocaleString()}
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
          确认提现
        </button>
      </div>
    </form>
  );
};