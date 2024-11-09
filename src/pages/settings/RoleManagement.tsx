import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Shield, ChevronDown } from 'lucide-react';
import { PERMISSIONS } from '../../types/auth';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

const RoleManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const roles: Role[] = [
    {
      id: '1',
      name: '系统管理员',
      description: '拥有系统所有权限',
      permissions: Object.values(PERMISSIONS),
      userCount: 2,
    },
    {
      id: '2',
      name: '财务主管',
      description: '管理财务报表和审核',
      permissions: [
        PERMISSIONS.DATA_CENTER_VIEW,
        PERMISSIONS.DATA_CENTER_EXPORT,
        PERMISSIONS.SHOP_VIEW,
        PERMISSIONS.SHOP_FINANCE_VIEW,
        PERMISSIONS.SHOP_FINANCE_MANAGE,
        PERMISSIONS.INVESTOR_VIEW,
        PERMISSIONS.INVESTOR_ACCOUNT_VIEW,
        PERMISSIONS.DIVIDEND_VIEW,
        PERMISSIONS.DIVIDEND_CREATE,
        PERMISSIONS.DIVIDEND_EDIT,
        PERMISSIONS.DIVIDEND_APPROVE,
        PERMISSIONS.DIVIDEND_EXPORT,
        PERMISSIONS.NET_WORTH_VIEW,
        PERMISSIONS.NET_WORTH_CREATE,
        PERMISSIONS.NET_WORTH_EDIT,
        PERMISSIONS.NET_WORTH_APPROVE,
        PERMISSIONS.NET_WORTH_EXPORT,
        PERMISSIONS.LOAN_VIEW,
        PERMISSIONS.LOAN_CREATE,
        PERMISSIONS.LOAN_EDIT,
        PERMISSIONS.LOAN_APPROVE,
        PERMISSIONS.LOAN_REPAYMENT,
        PERMISSIONS.FINANCE_CONFIG_VIEW,
        PERMISSIONS.FINANCE_CONFIG_MANAGE,
        PERMISSIONS.FINANCE_REPORT_VIEW,
        PERMISSIONS.FINANCE_REPORT_MANAGE,
        PERMISSIONS.FINANCE_REPORT_APPROVE,
      ],
      userCount: 3,
    },
    {
      id: '3',
      name: '财务人员',
      description: '处理日常财务工作',
      permissions: [
        PERMISSIONS.DATA_CENTER_VIEW,
        PERMISSIONS.SHOP_VIEW,
        PERMISSIONS.SHOP_FINANCE_VIEW,
        PERMISSIONS.INVESTOR_VIEW,
        PERMISSIONS.DIVIDEND_VIEW,
        PERMISSIONS.DIVIDEND_CREATE,
        PERMISSIONS.NET_WORTH_VIEW,
        PERMISSIONS.NET_WORTH_CREATE,
        PERMISSIONS.LOAN_VIEW,
        PERMISSIONS.LOAN_REPAYMENT,
        PERMISSIONS.FINANCE_REPORT_VIEW,
      ],
      userCount: 5,
    },
    {
      id: '4',
      name: '投资者',
      description: '查看投资相关信息',
      permissions: [
        PERMISSIONS.SHOP_VIEW,
        PERMISSIONS.SHOP_HISTORY_VIEW,
        PERMISSIONS.SHOP_FINANCE_VIEW,
        PERMISSIONS.INVESTOR_VIEW,
        PERMISSIONS.INVESTOR_ACCOUNT_VIEW,
        PERMISSIONS.DIVIDEND_VIEW,
        PERMISSIONS.NET_WORTH_VIEW,
        PERMISSIONS.LOAN_VIEW,
        PERMISSIONS.FINANCE_REPORT_VIEW,
      ],
      userCount: 15,
    },
  ];

  const permissionGroups = [
    {
      name: '数据中心',
      permissions: [
        { code: PERMISSIONS.DATA_CENTER_VIEW, name: '查看数据', description: '查看系统整体数据统计' },
        { code: PERMISSIONS.DATA_CENTER_EXPORT, name: '导出数据', description: '导出数据中心的统计数据' },
        { code: PERMISSIONS.DATA_CENTER_MANAGE, name: '管理数据', description: '管理和配置数据中心' },
      ],
    },
    {
      name: '店铺管理',
      permissions: [
        { code: PERMISSIONS.SHOP_VIEW, name: '查看店铺', description: '查看店铺基本信息' },
        { code: PERMISSIONS.SHOP_CREATE, name: '创建店铺', description: '创建新的店铺' },
        { code: PERMISSIONS.SHOP_EDIT, name: '编辑店铺', description: '编辑店铺信息' },
        { code: PERMISSIONS.SHOP_DELETE, name: '删除店铺', description: '删除店铺' },
        { code: PERMISSIONS.SHOP_HISTORY_VIEW, name: '查看历史', description: '查看店铺历史记录' },
        { code: PERMISSIONS.SHOP_FINANCE_VIEW, name: '查看财务', description: '查看店铺财务信息' },
        { code: PERMISSIONS.SHOP_FINANCE_MANAGE, name: '管理财务', description: '管理店铺财务信息' },
      ],
    },
    {
      name: '投资人管理',
      permissions: [
        { code: PERMISSIONS.INVESTOR_VIEW, name: '查看投资人', description: '查看投资人信息' },
        { code: PERMISSIONS.INVESTOR_CREATE, name: '创建投资人', description: '创建新的投资人' },
        { code: PERMISSIONS.INVESTOR_EDIT, name: '编辑投资人', description: '编辑投资人信息' },
        { code: PERMISSIONS.INVESTOR_DELETE, name: '删除投资人', description: '删除投资人' },
        { code: PERMISSIONS.INVESTOR_ACCOUNT_VIEW, name: '查看账户', description: '查看投资人账户信息' },
        { code: PERMISSIONS.INVESTOR_ACCOUNT_MANAGE, name: '管理账户', description: '管理投资人账户' },
      ],
    },
    {
      name: '分红管理',
      permissions: [
        { code: PERMISSIONS.DIVIDEND_VIEW, name: '查看分红', description: '查看分红记录' },
        { code: PERMISSIONS.DIVIDEND_CREATE, name: '创建分红', description: '创建新的分红' },
        { code: PERMISSIONS.DIVIDEND_EDIT, name: '编辑分红', description: '编辑分红信息' },
        { code: PERMISSIONS.DIVIDEND_DELETE, name: '删除分红', description: '删除分红记录' },
        { code: PERMISSIONS.DIVIDEND_APPROVE, name: '审核分红', description: '审核分红申请' },
        { code: PERMISSIONS.DIVIDEND_EXPORT, name: '导出分红', description: '导出分红记录' },
      ],
    },
    {
      name: '净值管理',
      permissions: [
        { code: PERMISSIONS.NET_WORTH_VIEW, name: '查看净值', description: '查看净值记录' },
        { code: PERMISSIONS.NET_WORTH_CREATE, name: '创建净值', description: '创建新的净值记录' },
        { code: PERMISSIONS.NET_WORTH_EDIT, name: '编辑净值', description: '编辑净值信息' },
        { code: PERMISSIONS.NET_WORTH_DELETE, name: '删除净值', description: '删除净值记录' },
        { code: PERMISSIONS.NET_WORTH_APPROVE, name: '审核净值', description: '审核净值变更' },
        { code: PERMISSIONS.NET_WORTH_EXPORT, name: '导出净值', description: '导出净值记录' },
      ],
    },
    {
      name: '贷款管理',
      permissions: [
        { code: PERMISSIONS.LOAN_VIEW, name: '查看贷款', description: '查看贷款记录' },
        { code: PERMISSIONS.LOAN_CREATE, name: '创建贷款', description: '创建新的贷款' },
        { code: PERMISSIONS.LOAN_EDIT, name: '编辑贷款', description: '编辑贷款信息' },
        { code: PERMISSIONS.LOAN_DELETE, name: '删除贷款', description: '删除贷款记录' },
        { code: PERMISSIONS.LOAN_APPROVE, name: '审核贷款', description: '审核贷款申请' },
        { code: PERMISSIONS.LOAN_REPAYMENT, name: '还款操作', description: '执行还款操作' },
      ],
    },
    {
      name: '用户管理',
      permissions: [
        { code: PERMISSIONS.USER_VIEW, name: '查看用户', description: '查看用户列表' },
        { code: PERMISSIONS.USER_CREATE, name: '创建用户', description: '创建新用户' },
        { code: PERMISSIONS.USER_EDIT, name: '编辑用户', description: '编辑用户信息' },
        { code: PERMISSIONS.USER_DELETE, name: '删除用户', description: '删除用户' },
        { code: PERMISSIONS.USER_ROLE_ASSIGN, name: '分配角色', description: '为用户分配角色' },
      ],
    },
    {
      name: '角色管理',
      permissions: [
        { code: PERMISSIONS.ROLE_VIEW, name: '查看角色', description: '查看角色列表' },
        { code: PERMISSIONS.ROLE_CREATE, name: '创建角色', description: '创建新角色' },
        { code: PERMISSIONS.ROLE_EDIT, name: '编辑角色', description: '编辑角色信息' },
        { code: PERMISSIONS.ROLE_DELETE, name: '删除角色', description: '删除角色' },
        { code: PERMISSIONS.ROLE_PERMISSION_ASSIGN, name: '分配权限', description: '为角色分配权限' },
      ],
    },
    {
      name: '财务设置',
      permissions: [
        { code: PERMISSIONS.FINANCE_CONFIG_VIEW, name: '查看配置', description: '查看财务配置' },
        { code: PERMISSIONS.FINANCE_CONFIG_MANAGE, name: '管理配置', description: '管理财务配置' },
        { code: PERMISSIONS.FINANCE_REPORT_VIEW, name: '查看报表', description: '查看财务报表' },
        { code: PERMISSIONS.FINANCE_REPORT_MANAGE, name: '管理报表', description: '管理财务报表' },
        { code: PERMISSIONS.FINANCE_REPORT_APPROVE, name: '审核报表', description: '审核财务报表' },
      ],
    },
    {
      name: '品牌管理',
      permissions: [
        { code: PERMISSIONS.BRAND_VIEW, name: '查看品牌', description: '查看品牌列表' },
        { code: PERMISSIONS.BRAND_CREATE, name: '创建品牌', description: '创建新品牌' },
        { code: PERMISSIONS.BRAND_EDIT, name: '编辑品牌', description: '编辑品牌信息' },
        { code: PERMISSIONS.BRAND_DELETE, name: '删除品牌', description: '删除品牌' },
      ],
    },
    {
      name: '管理人管理',
      permissions: [
        { code: PERMISSIONS.MANAGER_VIEW, name: '查看管理人', description: '查看管理人列表' },
        { code: PERMISSIONS.MANAGER_CREATE, name: '创建管理人', description: '创建新管理人' },
        { code: PERMISSIONS.MANAGER_EDIT, name: '编辑管理人', description: '编辑管理人信息' },
        { code: PERMISSIONS.MANAGER_DELETE, name: '删除管理人', description: '删除管理人' },
      ],
    },
    {
      name: '系统设置',
      permissions: [
        { code: PERMISSIONS.SYSTEM_CONFIG_VIEW, name: '查看配置', description: '查看系统配置' },
        { code: PERMISSIONS.SYSTEM_CONFIG_MANAGE, name: '管理配置', description: '管理系统配置' },
        { code: PERMISSIONS.SYSTEM_BACKUP_VIEW, name: '查看备份', description: '查看系统备份' },
        { code: PERMISSIONS.SYSTEM_BACKUP_MANAGE, name: '管理备份', description: '管理系统备份' },
      ],
    },
  ];

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-2xl font-bold text-gray-800">角色管理</h1>
        <button className="flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          添加角色
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* 角色列表 */}
        <div className="lg:col-span-1">
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="mb-4">
              <div className="flex items-center rounded-lg border border-gray-300 px-3 py-2">
                <Search className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索角色..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="ml-2 w-full border-none bg-transparent outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role)}
                  className={`flex w-full items-center justify-between rounded-lg p-3 text-left transition-colors ${
                    selectedRole?.id === role.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div>
                    <h3 className="font-medium">{role.name}</h3>
                    <p className="text-sm text-gray-500">{role.description}</p>
                  </div>
                  <div className="text-sm text-gray-500">{role.userCount}个用户</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 权限设置 */}
        <div className="lg:col-span-2">
          {selectedRole ? (
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">{selectedRole.name}</h2>
                <p className="text-gray-500">{selectedRole.description}</p>
              </div>

              <div className="space-y-6">
                {permissionGroups.map((group) => (
                  <div key={group.name} className="rounded-lg border border-gray-200 p-4">
                    <h3 className="mb-4 text-lg font-medium text-gray-800">{group.name}</h3>
                    <div className="space-y-4">
                      {group.permissions.map((permission) => (
                        <div
                          key={permission.code}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <p className="font-medium text-gray-800">{permission.name}</p>
                            <p className="text-sm text-gray-500">{permission.description}</p>
                          </div>
                          <label className="relative inline-flex cursor-pointer items-center">
                            <input
                              type="checkbox"
                              className="peer sr-only"
                              checked={selectedRole.permissions.includes(permission.code)}
                              onChange={() => {}}
                            />
                            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button className="flex items-center rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50">
                  取消
                </button>
                <button className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                  保存更改
                </button>
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center rounded-lg bg-white p-6 shadow-sm">
              <div className="text-center">
                <Shield className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-800">选择角色</h3>
                <p className="mt-2 text-gray-500">请从左侧选择一个角色来管理其权限</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleManagement;