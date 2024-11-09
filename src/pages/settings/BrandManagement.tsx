import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Store } from 'lucide-react';
import { Modal } from '../../components/modals/Modal';

interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  shopCount: number;
  status: 'active' | 'inactive';
}

const BrandManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  const brands: Brand[] = [
    {
      id: '1',
      name: '星巴克',
      logo: 'https://example.com/starbucks-logo.png',
      description: '全球最大的咖啡连锁品牌',
      shopCount: 3,
      status: 'active',
    },
    {
      id: '2',
      name: '肯德基',
      logo: 'https://example.com/kfc-logo.png',
      description: '全球知名快餐连锁品牌',
      shopCount: 2,
      status: 'active',
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log('Form data:', data);
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  const BrandForm = ({ brand }: { brand?: Brand }) => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">品牌名称 *</label>
          <input
            type="text"
            name="name"
            defaultValue={brand?.name}
            required
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">品牌Logo</label>
          <input
            type="file"
            name="logo"
            accept="image/*"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">品牌描述</label>
          <textarea
            name="description"
            rows={4}
            defaultValue={brand?.description}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">状态</label>
          <select
            name="status"
            defaultValue={brand?.status || 'active'}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="active">启用</option>
            <option value="inactive">禁用</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => {
            setIsAddModalOpen(false);
            setIsEditModalOpen(false);
          }}
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
        >
          取消
        </button>
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          {brand ? '保存更改' : '添加品牌'}
        </button>
      </div>
    </form>
  );

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-2xl font-bold text-gray-800">品牌管理</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索品牌..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            添加品牌
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {brands
          .filter((brand) =>
            brand.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((brand) => (
            <div
              key={brand.id}
              className="rounded-lg bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <Store className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-800">{brand.name}</h3>
                    <p className="text-sm text-gray-500">{brand.shopCount} 家门店</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setSelectedBrand(brand);
                      setIsEditModalOpen(true);
                    }}
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-blue-600"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedBrand(brand);
                      setIsDeleteModalOpen(true);
                    }}
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="mb-4 text-sm text-gray-600">{brand.description}</p>

              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    brand.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {brand.status === 'active' ? '启用' : '禁用'}
                </span>
              </div>
            </div>
          ))}
      </div>

      {/* Add Brand Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="添加品牌"
        size="md"
      >
        <BrandForm />
      </Modal>

      {/* Edit Brand Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="编辑品牌"
        size="md"
      >
        {selectedBrand && <BrandForm brand={selectedBrand} />}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="确认删除"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            确定要删除品牌 "{selectedBrand?.name}" 吗？此操作无法撤销。
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              取消
            </button>
            <button
              onClick={() => {
                console.log('Deleting brand:', selectedBrand?.id);
                setIsDeleteModalOpen(false);
              }}
              className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              确认删除
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BrandManagement;