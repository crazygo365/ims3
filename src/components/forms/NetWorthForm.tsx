import React from 'react';
import { Store, Calendar, TrendingUp, FileText } from 'lucide-react';

interface NetWorthFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  isEdit?: boolean;
}

export const NetWorthForm: React.FC<NetWorthFormProps> = ({ onSubmit, initialData, isEdit }) => {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      onSubmit(Object.fromEntries(formData));
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
              defaultValue={initialData?.shopId}
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
          <label className="block text-sm font-medium text-gray-700">评估日期 *</label>
          <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
            <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
              <Calendar className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="date"
              name="date"
              required
              defaultValue={initialData?.date}
              className="block w-full rounded-r-lg border-0 py-2 pl-3"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">净值金额 *</label>
          <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
            <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="number"
              name="value"
              required
              defaultValue={initialData?.value}
              className="block w-full rounded-r-lg border-0 py-2 pl-3"
              placeholder="输入净值金额"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">评估方法</label>
          <select
            name="method"
            defaultValue={initialData?.method}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="asset">资产评估法</option>
            <option value="income">收益法</option>
            <option value="market">市场法</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">评估说明</label>
          <textarea
            name="notes"
            rows={4}
            defaultValue={initialData?.notes}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="输入评估说明"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">评估报告</label>
          <div className="mt-1">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FileText className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">点击上传</span> 或拖拽文件至此处
                  </p>
                  <p className="text-xs text-gray-500">支持PDF格式（最大20MB）</p>
                </div>
                <input type="file" name="report" accept=".pdf" className="hidden" />
              </label>
            </div>
          </div>
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
          {isEdit ? '保存更改' : '更新净值'}
        </button>
      </div>
    </form>
  );
};