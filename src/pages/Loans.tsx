import React from 'react';
import { Calendar, DollarSign, Percent, Clock, FileText, CreditCard } from 'lucide-react';

const Loans = () => {
  // 汇总数据
  const summary = {
    totalLoans: 2,
    activeLoans: 2,
    totalAmount: 800000,
    remainingAmount: 650000,
    totalInterest: 2850,
    nextPayment: '2024-03-15'
  };

  const loans = [
    {
      id: 1,
      purpose: '望京店装修',
      amount: 500000,
      date: '2024-01-15',
      repaymentDate: '2024-12-31',
      interest: 4.35,
      monthlyInterest: 1812.5,
      remainingAmount: 450000,
      repaymentMethod: '等额本息',
      status: 'active',
      payments: [
        { date: '2024-02-15', amount: 50000, type: '本金' },
        { date: '2024-02-15', amount: 1812.5, type: '利息' },
        { date: '2024-01-15', amount: 1812.5, type: '利息' },
      ],
    },
    {
      id: 2,
      purpose: '三里屯店设备采购',
      amount: 300000,
      date: '2023-12-01',
      repaymentDate: '2024-11-30',
      interest: 4.15,
      monthlyInterest: 1037.5,
      remainingAmount: 200000,
      repaymentMethod: '等额本金',
      status: 'active',
      payments: [
        { date: '2024-02-15', amount: 50000, type: '本金' },
        { date: '2024-02-15', amount: 1037.5, type: '利息' },
        { date: '2024-01-15', amount: 50000, type: '本金' },
        { date: '2024-01-15', amount: 1037.5, type: '利息' },
        { date: '2023-12-15', amount: 1037.5, type: '利息' },
      ],
    }
  ];

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-gray-800">贷款记录</h1>

      {/* 贷款汇总信息 */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">当前贷款</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{summary.activeLoans}笔</p>
              <p className="mt-1 text-sm text-gray-600">累计贷款：{summary.totalLoans}笔</p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">贷款余额</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                ¥{summary.remainingAmount.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                总贷款额：¥{summary.totalAmount.toLocaleString()}
              </p>
            </div>
            <div className="rounded-full bg-green-100 p-3">
              <CreditCard className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">本月应还利息</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                ¥{summary.totalInterest.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-gray-600">下次还款日：{summary.nextPayment}</p>
            </div>
            <div className="rounded-full bg-orange-100 p-3">
              <DollarSign className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* 贷款列表 */}
      <div className="grid grid-cols-1 gap-6">
        {loans.map((loan) => (
          <div key={loan.id} className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-6 grid gap-6 lg:grid-cols-4">
              <div>
                <p className="text-sm text-gray-500">贷款用途</p>
                <p className="mt-1 text-xl font-semibold text-gray-800">
                  {loan.purpose}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">贷款金额</p>
                <p className="mt-1 text-xl font-semibold text-gray-800">
                  ¥{loan.amount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">剩余金额</p>
                <p className="mt-1 text-xl font-semibold text-blue-600">
                  ¥{loan.remainingAmount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">还款方式</p>
                <p className="mt-1 text-xl font-semibold text-gray-800">
                  {loan.repaymentMethod}
                </p>
              </div>
            </div>

            <div className="mb-6 grid gap-6 lg:grid-cols-4">
              <div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-gray-400" />
                  <p className="text-sm text-gray-500">贷款时间</p>
                </div>
                <p className="mt-1 text-lg font-semibold text-gray-800">{loan.date}</p>
              </div>
              <div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-gray-400" />
                  <p className="text-sm text-gray-500">计划还款时间</p>
                </div>
                <p className="mt-1 text-lg font-semibold text-gray-800">{loan.repaymentDate}</p>
              </div>
              <div>
                <div className="flex items-center">
                  <Percent className="mr-2 h-5 w-5 text-gray-400" />
                  <p className="text-sm text-gray-500">年化利率</p>
                </div>
                <p className="mt-1 text-lg font-semibold text-gray-800">{loan.interest}%</p>
              </div>
              <div>
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5 text-gray-400" />
                  <p className="text-sm text-gray-500">月供利息</p>
                </div>
                <p className="mt-1 text-lg font-semibold text-gray-800">
                  ¥{loan.monthlyInterest.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">还款记录</h3>
              <div className="rounded-lg border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">还款日期</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">还款金额</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">类型</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {loan.payments.map((payment, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 text-gray-800">{payment.date}</td>
                          <td className="px-6 py-4 text-gray-800">
                            ¥{payment.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-gray-800">{payment.type}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loans;