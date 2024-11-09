import React, { useState, useEffect } from 'react';
import { Store, MapPin, Calendar, DollarSign, Building2, User, Upload, Plus, X, Trash2 } from 'lucide-react';

interface Investor {
  id: number;
  name: string;
  investment: number;
  shares: number;
}

interface ShopFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  isEdit?: boolean;
}

export const ShopForm: React.FC<ShopFormProps> = ({ onSubmit, initialData, isEdit }) => {
  const [investors, setInvestors] = useState<Investor[]>([
    { id: Date.now(), name: '', investment: 0, shares: 0 }
  ]);

  const [totalInvestment, setTotalInvestment] = useState(initialData?.totalInvestment || '');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(initialData?.image || '');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInvestorChange = (index: number, field: 'name' | 'investment', value: string) => {
    const newInvestors = [...investors];
    if (field === 'investment') {
      const investmentAmount = Number(value) || 0;
      newInvestors[index].investment = investmentAmount;
      
      if (Number(totalInvestment) > 0) {
        newInvestors[index].shares = Number(((investmentAmount / Number(totalInvestment)) * 100).toFixed(2));
      }
    } else {
      newInvestors[index][field] = value;
    }
    setInvestors(newInvestors);
  };

  const addInvestor = () => {
    setInvestors([...investors, { id: Date.now(), name: '', investment: 0, shares: 0 }]);
  };

  const removeInvestor = (index: number) => {
    if (investors.length > 1) {
      const newInvestors = investors.filter((_, i) => i !== index);
      setInvestors(newInvestors);
    }
  };

  const calculateTotalShares = () => {
    return investors.reduce((sum, investor) => sum + investor.shares, 0);
  };

  const calculateTotalInvestments = () => {
    return investors.reduce((sum, investor) => sum + investor.investment, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    formData.append('investors', JSON.stringify(investors));
    if (selectedImage) {
      formData.append('image', selectedImage);
    }
    onSubmit(Object.fromEntries(formData));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">店铺名称 *</label>
          <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
            <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
              <Store className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              name="name"
              required
              defaultValue={initialData?.name}
              className="block w-full rounded-r-lg border-0 py-2 pl-3"
              placeholder="输入店铺名称"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">品牌 *</label>
          <select
            name="brand"
            required
            defaultValue={initialData?.brand}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="">选择品牌</option>
            <option value="星巴克">星巴克</option>
            <option value="肯德基">肯德基</option>
            <option value="必胜客">必胜客</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">地址 *</label>
          <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
            <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
              <MapPin className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              name="address"
              required
              defaultValue={initialData?.address}
              className="block w-full rounded-r-lg border-0 py-2 pl-3"
              placeholder="输入店铺地址"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">所属区域 *</label>
          <select
            name="district"
            required
            defaultValue={initialData?.district}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="">选择区域</option>
            <option value="华东区">华东区</option>
            <option value="华北区">华北区</option>
            <option value="华南区">华南区</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">开业时间 *</label>
          <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
            <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
              <Calendar className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="date"
              name="openDate"
              required
              defaultValue={initialData?.openDate}
              className="block w-full rounded-r-lg border-0 py-2 pl-3"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">管理人 *</label>
          <select
            name="manager"
            required
            defaultValue={initialData?.manager}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="">选择管理人</option>
            <option value="张经理">张经理</option>
            <option value="李经理">李经理</option>
            <option value="王经理">王经理</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">投资总额 *</label>
          <div className="mt-1 flex rounded-lg border border-gray-300 shadow-sm">
            <span className="inline-flex items-center rounded-l-lg border-r border-gray-300 bg-gray-50 px-3">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="number"
              name="totalInvestment"
              required
              value={totalInvestment}
              onChange={(e) => setTotalInvestment(e.target.value)}
              className="block w-full rounded-r-lg border-0 py-2 pl-3"
              placeholder="输入投资总额"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">状态 *</label>
          <select
            name="status"
            required
            defaultValue={initialData?.status || '营业中'}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="营业中">营业中</option>
            <option value="已闭店">已闭店</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">店铺图片</label>
          <div className="mt-1">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                {imagePreview ? (
                  <div className="relative w-full h-full">
                    <img
                      src={imagePreview}
                      alt="店铺预览"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedImage(null);
                        setImagePreview('');
                      }}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                    >
                      <X className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">点击上传</span> 或拖拽图片至此处
                    </p>
                    <p className="text-xs text-gray-500">支持 PNG, JPG 格式（最大 2MB）</p>
                  </div>
                )}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">投资人信息</h3>
          <button
            type="button"
            onClick={addInvestor}
            className="flex items-center rounded-lg border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50"
          >
            <Plus className="mr-1 h-4 w-4" />
            添加投资人
          </button>
        </div>
        
        <div className="rounded-lg border border-gray-200">
          <table className="min-w-full table-fixed divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-[5%] px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">序号</th>
                <th className="w-[20%] px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">投资人</th>
                <th className="w-[30%] px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">投资金额</th>
                <th className="w-[15%] px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">股份占比</th>
                <th className="w-[20%] px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">备注</th>
                <th className="w-[10%] px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {investors.map((investor, index) => (
                <tr key={investor.id}>
                  <td className="px-4 py-3 text-sm text-gray-500">{index + 1}</td>
                  <td className="px-4 py-3">
                    <select
                      value={investor.name}
                      onChange={(e) => handleInvestorChange(index, 'name', e.target.value)}
                      className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                      required
                    >
                      <option value="">选择投资人</option>
                      <option value="张三">张三</option>
                      <option value="李四">李四</option>
                      <option value="王五">王五</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      value={investor.investment}
                      onChange={(e) => handleInvestorChange(index, 'investment', e.target.value)}
                      className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-right text-sm"
                      required
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-right text-sm">
                      {investor.shares}%
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                      placeholder="备注"
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      type="button"
                      onClick={() => removeInvestor(index)}
                      className="text-red-600 hover:text-red-900"
                      disabled={investors.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan={2} className="px-4 py-3 text-sm font-medium text-gray-900">合计</td>
                <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">
                  ¥{calculateTotalInvestments().toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">
                  {calculateTotalShares().toFixed(2)}%
                </td>
                <td colSpan={2}></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => onSubmit(null)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
        >
          取消
        </button>
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          disabled={calculateTotalShares() !== 100 || calculateTotalInvestments() !== Number(totalInvestment)}
        >
          {isEdit ? '保存更改' : '创建店铺'}
        </button>
      </div>
    </form>
  );
};

export default ShopForm;