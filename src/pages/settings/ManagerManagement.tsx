import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, UserCircle, Phone, Mail } from 'lucide-react';
import { Modal } from '../../components/modals/Modal';

interface Manager {
  id: string;
  name: string;
  phone: string;
  email: string;
  shopCount: number;
  status: 'active' | 'inactive';
  joinDate: string;
}

const ManagerManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState<Manager | null>(null);

  const managers: Manager[] = [
    {
      id: '1',
      name: '张经理',
      phone: '13800138000',
      email: 'zhang@example.com',
      shopCount: 2,
      status: 'active',
      joinDate: '2023-01-15',
    },
    {
      id: '2',
      name: '李经理',
      phone: '13800138001',
      email: 'li@example.com',
      shopCount: 3,
      status: 'active',
      joinDate: '2023-03-20',
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

  const ManagerForm = ({ manager }: { manager?: Manager }) => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">姓名 *</label>
          <input
            type="text"
            name="name"
            defaultValue={manager?.name}
            required
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">手机号 *</label>
          <input
            type="tel"
            name="phone"
            defaultValue={manager?.phone}
            required
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">邮箱 *</label>
          <input
            type="email"
            name="email"
            defaultValue={manager?.email}
            required
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">入职日期 *</label>
          <input
            type="date"
            name="joinDate"
            defaultValue={manager?.joinDate}
            required
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">状态</label>
          <select
            name="status"
            defaultValue={manager?.status || 'active'}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="active">在职</option>
            <option value="inactive">离职</option>
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
          {manager ? '保存更改' : '添加管理人'}
        </button>
      </div>
    </form>
  );

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-2xl font-bold text-gray-800">管理人管理</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索管理人..."
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
            添加管理人
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {managers
          .filter((manager) =>
            manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            manager.phone.includes(searchTerm) ||
            manager.email.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((manager) => (
            <div
              key={manager.id}
              className="rounded-lg bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <UserCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-800">{manager.name}</h3>
                    <p className="text-sm text-gray-500">管理 {manager.shopCount} 家门店</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setSelectedManager(manager);
                      setIsEditModalOpen(true);
                    }}
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-blue-600"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedManager(manager);
                      setIsDeleteModalOpen(true);
                    }}
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="mr-2 h-4 w-4" />
                  {manager.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="mr-2 h-4 w-4" />
                  {manager.email}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    manager.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {manager.status === 'active' ? '在职' : '离职'}
                </span>
                <span className="text-sm text-gray-500">
                  入职时间：{manager.joinDate}
                </span>
              </div>
            </div>
          ))}
      </div>

      {/* Add Manager Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="添加管理人"
        size="md"
      >
        <ManagerForm />
      </Modal>

      {/* Edit Manager Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="编辑管理人"
        size="md"
      >
        {selectedManager && <ManagerForm manager={selectedManager} />}
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
            确定要删除管理人 "{selectedManager?.name}" 吗？此操作无法撤销。
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
                console.log('Deleting manager:', selectedManager?.id);
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

export default ManagerManagement;