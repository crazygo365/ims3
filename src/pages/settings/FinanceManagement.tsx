import React, { useState } from 'react';
import { Plus, FileText, Upload, Download, Filter } from 'lucide-react';

interface FinancialReport {
  id: string;
  title: string;
  type: string;
  shop: string;
  period: string;
  uploadDate: string;
  fileSize: string;
  status: 'pending' | 'approved' | 'rejected';
}

const FinanceManagement = () => {
  const [activeTab, setActiveTab] = useState('reports');
  const [filterShop, setFilterShop] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('');

  const reports: FinancialReport[] = [
    {
      id: '1',
      title: '2024年2月财务报表',
      type: '月度报表',
      shop: '星巴克咖啡 - 中关村店',
      period: '2024-02',
      uploadDate: '2024-02-28',
      fileSize: '2.5MB',
      status: 'approved',
    },
    {
      id: '2',
      title: '2024年1月财务报表',
      type: '月度报表',
      shop: '肯德基 - 望京店',
      period: '2024-01',
      uploadDate: '2024-01-31',
      fileSize: '2.3MB',
      status: 'approved',
    },
  ];

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-2xl font-bold text-gray-800">财务管理</h1>
        <div className="flex gap-3">
          <button className="flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            <Upload className="mr-2 h-4 w-4" />
            上传报表
          </button>
          <button className="flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50">
            <Filter className="mr-2 h-4 w-4" />
            筛选
          </button>
        </div>
      </div>

      <div className="rounded-lg bg-white shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4 px-4" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('reports')}
              className={`border-b-2 px-4 py-4 text-sm font-medium ${
                activeTab === 'reports'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              财务报表
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`border-b-2 px-4 py-4 text-sm font-medium ${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              财务设置
            </button>
          </nav>
        </div>

        <div className="p-4">
          {activeTab === 'reports' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-gray-600">报表名称</th>
                    <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-gray-600">类型</th>
                    <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-gray-600">店铺</th>
                    <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-gray-600">期间</th>
                    <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-gray-600">上传时间</th>
                    <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-gray-600">状态</th>
                    <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-gray-600">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <FileText className="mr-2 h-5 w-5 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">
                            {report.title}
                          </span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {report.type}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {report.shop}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {report.period}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {report.uploadDate}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className={`rounded-full px-2 py-1 text-xs ${
                          report.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : report.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {report.status === 'approved' ? '已审核' :
                           report.status === 'pending' ? '待审核' : '已驳回'}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <button className="flex items-center rounded-lg border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50">
                          <Download className="mr-1 h-4 w-4" />
                          下载
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6 p-4">
              <div className="rounded-lg border border-gray-200 p-4">
                <h3 className="mb-4 text-lg font-medium text-gray-800">报表设置</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      默认报表模板
                    </label>
                    <select className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2">
                      <option>标准月度报表</option>
                      <option>简化月度报表</option>
                      <option>年度报表</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      报表审核流程
                    </label>
                    <select className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2">
                      <option>需要审核</option>
                      <option>直接发布</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-4">
                <h3 className="mb-4 text-lg font-medium text-gray-800">权限设置</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">允许投资者下载报表</p>
                      <p className="text-sm text-gray-500">持股比例达到10%的投资者可下载报表</p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input type="checkbox" className="peer sr-only" defaultChecked />
                      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinanceManagement;