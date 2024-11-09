import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  ChevronDown,
  Building2,
  Wallet,
  TrendingUp,
  PiggyBank,
  Clock
} from 'lucide-react';

interface Investor {
  id: number;
  name: string;
  phone: string;
  shopCount: number;
  totalInvestment: number;
  currentNetWorth: number;
  totalDividends: number;
  investmentYears: number;
  shops: {
    name: string;
    investment: number;
    netWorth: number;
    dividends: number;
  }[];
}

const InvestorManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const investors: Investor[] = [
    {
      id: 1,
      name: '张三',
      phone: '13800138000',
      shopCount: 3,
      totalInvestment: 1500000,
      currentNetWorth: 1800000,
      totalDividends: 180000,
      investmentYears: 2,
      shops: [
        {
          name: '星巴克咖啡 - 中关村店',
          investment: 500000,
          netWorth: 600000,
          dividends: 60000
        },
        {
          name: '肯德基 - 望京店',
          investment: 600000,
          netWorth: 700000,
          dividends: 70000
        },
        {
          name: '必胜客 - 三里屯店',
          investment: 400000,
          netWorth: 500000,
          dividends: 50000
        }
      ]
    },
    // 更多投资人数据...
  ];

  const handleInvestorClick = (investor: Investor) => {
    setSelectedInvestor(investor);
    setShowDetails(true);
  };

  const DetailModal = () => {
    if (!selectedInvestor) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">投资人详情</h2>
            <button
              onClick={() => setShowDetails(false)}
              className="rounded-lg p-2 hover:bg-gray-100"
            >
              <ChevronDown className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-500">姓名</p>
              <p className="text-lg font-semibold">{selectedInvestor.name}</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-500">联系电话</p>
              <p className="text-lg font-semibold">{selectedInvestor.phone}</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold">投资店铺明细</h3>
            <div className="rounded-lg border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-4 py-3 text-left">店铺名称</th>
                    <th className="px-4 py-3 text-right">投资金额</th>
                    <th className="px-4 py-3 text-right">当前净值</th>
                    <th className="px-4 py-3 text-right">累计分红</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvestor.shops.map((shop, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-3">{shop.name}</td>
                      <td className="px-4 py-3 text-right">
                        ¥{shop.investment.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-blue-600">
                        ¥{shop.netWorth.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-green-600">
                        ¥{shop.dividends.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold text-gray-800">投资人管理</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索投资人..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-gray-600">
                  投资人信息
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-gray-600">
                  投资店铺数量
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-gray-600">
                  投资总金额
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-gray-600">
                  当前净值总额
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-gray-600">
                  分红总金额
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-gray-600">
                  投资年限
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {investors
                .filter(
                  (investor) =>
                    investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    investor.phone.includes(searchTerm)
                )
                .map((investor) => (
                  <tr
                    key={investor.id}
                    onClick={() => handleInvestorClick(investor)}
                    className="cursor-pointer transition-colors hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-800">{investor.name}</p>
                        <p className="text-sm text-gray-500">{investor.phone}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-semibold text-blue-600">
                        {investor.shopCount}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-semibold text-blue-600">
                        ¥{investor.totalInvestment.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-semibold text-blue-600">
                        ¥{investor.currentNetWorth.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-semibold text-blue-600">
                        ¥{investor.totalDividends.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {investor.investmentYears} 年
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {showDetails && <DetailModal />}
    </div>
  );
};

export default InvestorManagement;