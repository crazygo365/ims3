import React from 'react';
import { Mail, Phone, User, Shield } from 'lucide-react';

interface UserFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  isEdit?: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({ onSubmit, initialData, isEdit }) => {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      // Handle form submission
    }} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">用户名</label>
          <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
            <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
              <User className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              defaultValue={initialData?.username}
              className="block w-full rounded-r-lg border-0 py-2 pl-3 focus:ring-2 focus:ring-blue-600"
              placeholder="输入用户名"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">姓名</label>
          <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
            <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
              <User className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              defaultValue={initialData?.name}
              className="block w-full rounded-r-lg border-0 py-2 pl-3 focus:ring-2 focus:ring-blue-600"
              placeholder="输入姓名"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">邮箱</label>
          <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
            <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
              <Mail className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="email"
              defaultValue={initialData?.email}
              className="block w-full rounded-r-lg border-0 py-2 pl-3 focus:ring-2 focus:ring-blue-600"
              placeholder="输入邮箱"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">手机号</label>
          <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
            <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
              <Phone className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="tel"
              defaultValue={initialData?.phone}
              className="block w-full rounded-r-lg border-0 py-2 pl-3 focus:ring-2 focus:ring-blue-600"
              placeholder="输入手机号"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">角色</label>
          <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
            <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
              <Shield className="h-5 w-5 text-gray-400" />
            </span>
            <select
              defaultValue={initialData?.role}
              className="block w-full rounded-r-lg border-0 py-2 pl-3 focus:ring-2 focus:ring-blue-600"
            >
              <option value="admin">管理员</option>
              <option value="finance">财务人员</option>
              <option value="investor">投资者</option>
            </select>
          </div>
        </div>

        {!isEdit && (
          <div>
            <label className="block text-sm font-medium text-gray-700">初始密码</label>
            <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
              <input
                type="password"
                className="block w-full rounded-lg border-0 py-2 pl-3 focus:ring-2 focus:ring-blue-600"
                placeholder="输入初始密码"
              />
            </div>
          </div>
        )}
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
          {isEdit ? '保存更改' : '创建用户'}
        </button>
      </div>
    </form>
  );
};