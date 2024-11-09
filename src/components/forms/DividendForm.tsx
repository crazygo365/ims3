import React, { useState, useEffect } from 'react';
import { Calendar, DollarSign, Store, Users } from 'lucide-react';

interface Investor {
  id: number;
  name: string;
  shares: number;
}

interface DividendFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  isEdit?: boolean;
}

export const DividendForm: React.FC<DividendFormProps> = ({ onSubmit, initialData, isEdit }) => {
  const [selectedShop, setSelectedShop] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [investors, setInvestors] = useState<Investor[]>([]);

  // 模拟获取店铺的投资人数据
  useEffect(() => {
    if (selectedShop) {
      // 实际项目中应该从API获取数据
      const mockInvestors = [
        { id: 1, name: '张三', shares: 30 },
        { id: 2, name: '李四', shares: 40 },
        { id: 3, name: '王五', shares: 30 },
      ];
      setInvestors(mockInvestors);
    } else {
      setInvestors([]);
    }
  }, [selectedShop]);

  const calculateDividend = (shares: number) => {
    return (amount * shares) / 100;
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const data = {
        ...Object.fromEntries(formData),
        amount: Number(amount),
        investors: investors.map(inv => ({
          id: inv.id,
          name: inv.name,
          shares: inv.shares,
          dividend: calculateDividend(inv.shares)
        }))
      };
      onSubmit(data);
    }} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">店铺 *</label>
          <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
            <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
              <Store className="h-5 w-5 text-gray-400" />
            </span>
            <select
              name="shopId"
              required
              value={selectedShop}
              onChange={(e) => setSelectedShop(e.target.value)}
              className="block w-full rounded-r-lg border-0 py-2 pl-3"
            >
              <option value="">选择店铺</option>
              <option value="1">星巴克咖啡 - 中关村店</option>
              <option value="2">肯德基 - 望京店</option>
              <option value="3">必胜客 - 三里屯店</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">分红期间 *</label>
          <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
            <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
              <Calendar className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="month"
              name="period"
              required
              defaultValue={initialData?.period}
              className="block w-full rounded-r-lg border-0 py-2 pl-3"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">分红金额 *</label>
          <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
            <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="number"
              name="amount"
              required
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="block w-full rounded-r-lg border-0 py-2 pl-3"
              placeholder="输入分红金额"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">发放日期 *</label>
          <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
            <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
              <Calendar className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="date"
              name="paymentDate"
              required
              defaultValue={initialData?.paymentDate}
              className="block w-full rounded-r-lg border-0 py-2 pl-3"
            />
          </div>
        </div>

        {investors.length > 0 && (
          <div className="md:col-span-2">
            <div className="rounded-lg border border-gray-200">
              <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                <div className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-gray-400" />
                  <h3 className="text-sm font-medium text-gray-700">投资人分红明细</h3>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {investors.map((investor) => (
                  <div key={investor.id} className="flex items-center justify-between px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-800">{investor.name}</p>
                      <p className="text-sm text-gray-500">持股 {investor.shares}%</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-800">
                        ¥{calculateDividend(investor.shares).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        分红比例 {investor.shares}%
                      </p>
                    </div>
                  </div>
                ))}
                <div className="bg-gray-50 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-700">合计</p>
                    <p className="font-medium text-gray-900">
                      ¥{amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">备注</label>
          <textarea
            name="notes"
            rows={4}
            defaultValue={initialData?.notes}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="输入备注信息"
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
          {isEdit ? '保存更改' : '创建分红'}
        </button>
      </div>
    </form>
  );
};