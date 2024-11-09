import React, { useState } from 'react';
import { Save, Upload, Download, Filter, FileText, Settings } from 'lucide-react';

const FinanceSettings = () => {
  const [activeTab, setActiveTab] = useState('reports');

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">财务设置</h1>
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
              报表设置
            </button>
            <button
              onClick={() => setActiveTab('permissions')}
              className={`border-b-2 px-4 py-4 text-sm font-medium ${
                activeTab === 'permissions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              权限设置
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="rounded-lg border border-gray-200 p-4">
                <h3 className="mb-4 text-lg font-medium text-gray-800">报表模板设置</h3>
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
                      报表生成周期
                    </label>
                    <select className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2">
                      <option>每月</option>
                      <option>每季度</option>
                      <option>每年</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-4">
                <h3 className="mb-4 text-lg font-medium text-gray-800">报表审核流程</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">启用报表审核</p>
                      <p className="text-sm text-gray-500">上传的报表需要审核后才能发布</p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input type="checkbox" className="peer sr-only" defaultChecked />
                      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      审核人员
                    </label>
                    <select className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2">
                      <option>财务主管</option>
                      <option>财务总监</option>
                      <option>系统管理员</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'permissions' && (
            <div className="space-y-6">
              <div className="rounded-lg border border-gray-200 p-4">
                <h3 className="mb-4 text-lg font-medium text-gray-800">报表访问权限</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">投资者查看权限</p>
                      <p className="text-sm text-gray-500">持股比例达到10%的投资者可查看报表</p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input type="checkbox" className="peer sr-only" defaultChecked />
                      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">允许下载报表</p>
                      <p className="text-sm text-gray-500">允许有权限的用户下载报表文件</p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input type="checkbox" className="peer sr-only" defaultChecked />
                      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-4">
                <h3 className="mb-4 text-lg font-medium text-gray-800">财务人员权限</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      报表上传权限
                    </label>
                    <select className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2">
                      <option>所有财务人员</option>
                      <option>仅财务主管</option>
                      <option>指定人员</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      数据修改权限
                    </label>
                    <select className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2">
                      <option>仅财务主管</option>
                      <option>所有财务人员</option>
                      <option>禁止修改</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 p-4">
          <div className="flex justify-end space-x-4">
            <button className="flex items-center rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50">
              取消
            </button>
            <button className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              <Save className="mr-2 h-4 w-4" />
              保存设置
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceSettings;