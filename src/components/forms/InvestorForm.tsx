import React from 'react';
import { User, Phone, Lock, Building2, Calendar } from 'lucide-react';

interface InvestorFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  isEdit?: boolean;
}

export const InvestorForm: React.FC<InvestorFormProps> = ({ onSubmit, initialData, isEdit }) => {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      onSubmit(Object.fromEntries(formData));
    }} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">姓名 *</label>
          <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
            <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
              <User className="h-5 w-5 text-gray-400" />
            </span>
            <input
              name="name"
              type="text"
              required
              defaultValue={initialData?.name}
              className="block w-full rounded-r-lg border-0 py-2 pl-3 focus:ring-2 focus:ring-blue-600"
              placeholder="输入投资人姓名"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">手机号 *</label>
          <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
            <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
              <Phone className="h-5 w-5 text-gray-400" />
            </span>
            <input
              name="phone"
              type="tel"
              required
              defaultValue={initialData?.phone}
              className="block w-full rounded-r-lg border-0 py-2 pl-3 focus:ring-2 focus:ring-blue-600"
              placeholder="输入手机号"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {isEdit ? '修改密码' : '登录密码 *'}
          </label>
          <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
            <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
              <Lock className="h-5 w-5 text-gray-400" />
            </span>
            <input
              name="password"
              type="password"
              required={!isEdit}
              className="block w-full rounded-r-lg border-0 py-2 pl-3 focus:ring-2 focus:ring-blue-600"
              placeholder={isEdit ? '不修改请留空' : '输入登录密码'}
            />
          </div>
          {!isEdit && (
            <p className="mt-1 text-sm text-gray-500">密码长度至少8位，包含字母和数字</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">身份证号 *</label>
          <input
            name="idNumber"
            type="text"
            required
            defaultValue={initialData?.idNumber}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-600"
            placeholder="输入身份证号"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">开始投资日期 *</label>
          <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
            <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
              <Calendar className="h-5 w-5 text-gray-400" />
            </span>
            <input
              name="investmentStartDate"
              type="date"
              required
              defaultValue={initialData?.investmentStartDate}
              className="block w-full rounded-r-lg border-0 py-2 pl-3 focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">投资人类型</label>
          <select
            name="type"
            defaultValue={initialData?.type}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-600"
          >
            <option value="individual">个人投资者</option>
            <option value="company">企业投资者</option>
            <option value="institution">机构投资者</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">备注</label>
        <textarea
          name="notes"
          rows={4}
          defaultValue={initialData?.notes}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-600"
          placeholder="输入备注信息"
        />
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
          {isEdit ? '保存更改' : '添加投资人'}
        </button>
      </div>
    </form>
  );
};

export default InvestorForm;