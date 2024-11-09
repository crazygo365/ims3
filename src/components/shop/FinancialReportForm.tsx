import React from 'react';
import { Calendar, FileText, Store } from 'lucide-react';

interface FinancialReportFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  isEdit?: boolean;
}

export const FinancialReportForm: React.FC<FinancialReportFormProps> = ({
  onSubmit,
  initialData,
  isEdit,
}) => {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      onSubmit(Object.fromEntries(formData));
    }} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">店铺</label>
          <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
            <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
              <Store className="h-5 w-5 text-gray-400" />
            </span>
            <select
              name="shopId"
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
          <label className="block text-sm font-medium text-gray-700">报表类型</label>
          <select
            name="type"
            defaultValue={initialData?.type}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="monthly">月度报表</option>
            <option value="quarterly">季度报表</option>
            <option value="annual">年度报表</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">报表期间</label>
          <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
            <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
              <Calendar className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="month"
              name="period"
              defaultValue={initialData?.period}
              className="block w-full rounded-r-lg border-0 py-2 pl-3"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">报表标题</label>
          <input
            type="text"
            name="title"
            defaultValue={initialData?.title}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="输入报表标题"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">报表文件</label>
          <div className="mt-1">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FileText className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">点击上传</span> 或拖拽文件至此处
                  </p>
                  <p className="text-xs text-gray-500">支持Excel、PDF格式（最大20MB）</p>
                </div>
                <input 
                  type="file" 
                  name="file" 
                  className="hidden" 
                  accept=".xlsx,.xls,.pdf" 
                />
              </label>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">备注说明</label>
          <textarea
            name="notes"
            rows={4}
            defaultValue={initialData?.notes}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="输入备注说明"
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
          {isEdit ? '保存更改' : '上传报表'}
        </button>
      </div>
    </form>
  );
};