import React, { useState } from 'react';
import { Settings, Bell, Shield, Database, Lock, Key, MessageSquare } from 'lucide-react';

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('notification');

  const tabs = [
    { id: 'notification', name: '通知设置', icon: Bell },
    { id: 'security', name: '安全设置', icon: Shield },
    { id: 'sms', name: '短信配置', icon: MessageSquare },
    { id: 'system', name: '系统参数', icon: Settings },
    { id: 'backup', name: '数据备份', icon: Database },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-2xl font-bold text-gray-800">系统设置</h1>

        <div className="flex space-x-6">
          {/* 左侧导航 */}
          <div className="w-64 shrink-0">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* 右侧内容 */}
          <div className="flex-1 rounded-lg bg-white p-6 shadow-sm">
            {activeTab === 'notification' && (
              <div className="space-y-6">
                <div className="rounded-lg border border-gray-200 p-4">
                  <h3 className="mb-4 text-lg font-medium text-gray-800">通知事件</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">新投资者注册</p>
                        <p className="text-sm text-gray-500">新投资者注册时通知管理员</p>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" className="peer sr-only" defaultChecked />
                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">财务报表上传</p>
                        <p className="text-sm text-gray-500">新的财务报表上传时通知相关投资者</p>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" className="peer sr-only" defaultChecked />
                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">分红发放通知</p>
                        <p className="text-sm text-gray-500">分红发放时通知相关投资者</p>
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

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="rounded-lg border border-gray-200 p-4">
                  <h3 className="mb-4 text-lg font-medium text-gray-800">密码策略</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        密码最小长度
                      </label>
                      <input
                        type="number"
                        min="8"
                        max="32"
                        defaultValue="12"
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">强制密码复杂度</p>
                        <p className="text-sm text-gray-500">要求包含大小写字母、数字和特殊字符</p>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" className="peer sr-only" defaultChecked />
                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 p-4">
                  <h3 className="mb-4 text-lg font-medium text-gray-800">登录安全</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">双因素认证</p>
                        <p className="text-sm text-gray-500">启用短信或邮箱验证码登录</p>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" className="peer sr-only" defaultChecked />
                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        登录失败锁定阈值
                      </label>
                      <input
                        type="number"
                        min="3"
                        max="10"
                        defaultValue="5"
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sms' && (
              <div className="space-y-6">
                <div className="rounded-lg border border-gray-200 p-4">
                  <h3 className="mb-4 text-lg font-medium text-gray-800">短信服务配置</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        腾讯云 SecretId
                      </label>
                      <input
                        type="text"
                        name="secretId"
                        placeholder="输入腾讯云 SecretId"
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        腾讯云 SecretKey
                      </label>
                      <input
                        type="password"
                        name="secretKey"
                        placeholder="输入腾讯云 SecretKey"
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        短信应用 SDKAppID
                      </label>
                      <input
                        type="text"
                        name="sdkAppId"
                        placeholder="输入短信应用 SDKAppID"
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        短信签名
                      </label>
                      <input
                        type="text"
                        name="smsSign"
                        placeholder="输入短信签名"
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 p-4">
                  <h3 className="mb-4 text-lg font-medium text-gray-800">短信模板配置</h3>
                  <div className="space-y-4">
                    <div className="rounded-lg border border-gray-200 p-4">
                      <p className="font-medium text-gray-800">验证码模板</p>
                      <input
                        type="text"
                        name="verificationTemplateId"
                        placeholder="输入模板ID"
                        className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        模板示例：您的验证码是{'{1}'}，{'{2}'}分钟内有效。
                      </p>
                    </div>
                    <div className="rounded-lg border border-gray-200 p-4">
                      <p className="font-medium text-gray-800">分红通知模板</p>
                      <input
                        type="text"
                        name="dividendTemplateId"
                        placeholder="输入模板ID"
                        className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        模板示例：尊敬的{'{1}'}，您投资的{'{2}'}已发放{'{3}'}月分红{'{4}'}元，请查收。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 p-4">
                  <h3 className="mb-4 text-lg font-medium text-gray-800">短信测试</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        测试手机号
                      </label>
                      <div className="mt-1 flex space-x-4">
                        <input
                          type="tel"
                          placeholder="输入测试手机号"
                          className="block w-full rounded-lg border border-gray-300 px-3 py-2"
                        />
                        <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                          发送测试
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'system' && (
              <div className="space-y-6">
                <div className="rounded-lg border border-gray-200 p-4">
                  <h3 className="mb-4 text-lg font-medium text-gray-800">系统基本设置</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        系统名称
                      </label>
                      <input
                        type="text"
                        defaultValue="投资管理系统"
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        系统Logo
                      </label>
                      <div className="mt-1">
                        <div className="flex items-center space-x-4">
                          <div className="h-16 w-16 rounded-lg border border-gray-300"></div>
                          <button className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">
                            上传Logo
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'backup' && (
              <div className="space-y-6">
                <div className="rounded-lg border border-gray-200 p-4">
                  <h3 className="mb-4 text-lg font-medium text-gray-800">数据备份设置</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">自动备份</p>
                        <p className="text-sm text-gray-500">每天凌晨自动备份数据</p>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" className="peer sr-only" defaultChecked />
                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        备份保留天数
                      </label>
                      <input
                        type="number"
                        min="7"
                        max="90"
                        defaultValue="30"
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                      />
                    </div>
                    <div>
                      <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                        立即备份
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;