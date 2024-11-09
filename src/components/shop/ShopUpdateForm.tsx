import React from 'react';
import { Calendar, Tag, FileText } from 'lucide-react';

interface ShopUpdateFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  isEdit?: boolean;
}

export const ShopUpdateForm: React.FC<ShopUpdateFormProps> = ({ onSubmit, initialData, isEdit }) => {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      onSubmit(Object.fromEntries(formData));
    }} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">更新类型</label>
          <select
            name="type"
            defaultValue={initialData?.type}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="renovation">店铺翻新</option>
            <option value="promotion">促销活动</option>
            <option value="equipment">设备更新</option>
            <option value="other">其他</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">日期</label>
          <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
            <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
              <Calendar className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="date"
              name="date"
              defaultValue={initialData?.date}
              className="block w-full rounded-r-lg border-0 py-2 pl-3"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">标题</label>
          <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
            <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
              <Tag className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              name="title"
              defaultValue={initialData?.title}
              className="block w-full rounded-r-lg border-0 py-2 pl-3"
              placeholder="输入更新标题"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">内容</label>
          <div className="mt-1">
            <textarea
              name="content"
              rows={4}
              defaultValue={initialData?.content}
              className="block w-full rounded-lg border border-gray-300 py-2 px-3"
              placeholder="输入更新内容"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">附件</label>
          <div className="mt-1">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FileText className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">点击上传</span> 或拖拽文件至此处
                  </p>
                  <p className="text-xs text-gray-500">支持图片、PDF等文件（最大10MB）</p>
                </div>
                <input type="file" name="attachments" className="hidden" multiple />
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
          {isEdit ? '保存更改' : '发布更新'}
        </button>
      </div>
    </form>
  );
};