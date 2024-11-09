import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, UserCircle, Phone, Mail } from 'lucide-react';
import { Modal } from '../../components/modals/Modal';
import { UserForm } from '../../components/forms/UserForm';
import type { User, UserRole } from '../../types/auth';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<UserRole | ''>('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const users: User[] = [
    {
      id: '1',
      username: 'admin',
      name: '系统管理员',
      role: 'admin',
      email: 'admin@example.com',
      phone: '13800138000',
      permissions: ['system:settings', 'user:manage', 'shop:manage', 'finance:manage'],
      status: 'active',
      createdAt: '2024-01-01',
      lastLogin: '2024-03-10 10:30:00',
    },
    {
      id: '2',
      username: 'finance1',
      name: '财务主管',
      role: 'finance',
      email: 'finance@example.com',
      phone: '13800138001',
      permissions: ['finance:manage', 'report:view', 'report:manage'],
      status: 'active',
      createdAt: '2024-01-15',
      lastLogin: '2024-03-09 16:45:00',
    },
  ];

  const handleAddUser = (data: any) => {
    console.log('Adding user:', data);
    setIsAddModalOpen(false);
  };

  const handleEditUser = (data: any) => {
    console.log('Editing user:', data);
    setIsEditModalOpen(false);
  };

  const handleDeleteUser = () => {
    console.log('Deleting user:', selectedUser?.id);
    setIsDeleteModalOpen(false);
  };

  const handleStatusChange = (userId: string, newStatus: 'active' | 'inactive') => {
    console.log('Changing status:', userId, newStatus);
  };

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-2xl font-bold text-gray-800">用户管理</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            添加用户
          </button>
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex items-center rounded-lg border border-gray-300 px-3 py-2">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索用户..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ml-2 w-full border-none bg-transparent outline-none"
          />
        </div>

        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value as UserRole | '')}
          className="rounded-lg border border-gray-300 px-3 py-2"
        >
          <option value="">所有角色</option>
          <option value="admin">管理员</option>
          <option value="finance">财务人员</option>
          <option value="investor">投资者</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">用户名</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">姓名</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">角色</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">邮箱</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">手机号</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">状态</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">最后登录</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users
                .filter(user => 
                  (user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
                  (!filterRole || user.role === filterRole)
                )
                .map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600">
                        <div className="flex h-full w-full items-center justify-center text-sm font-semibold">
                          {user.name[0]}
                        </div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-900">
                        {user.username}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.name}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2 py-1 text-xs ${
                      user.role === 'admin'
                        ? 'bg-purple-100 text-purple-800'
                        : user.role === 'finance'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {user.role === 'admin' ? '管理员' : 
                       user.role === 'finance' ? '财务人员' : '投资者'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.phone}</td>
                  <td className="px-6 py-4">
                    <select
                      value={user.status}
                      onChange={(e) => handleStatusChange(user.id, e.target.value as 'active' | 'inactive')}
                      className={`rounded-full px-2 py-1 text-xs ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      <option value="active">正常</option>
                      <option value="inactive">禁用</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.lastLogin}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setIsEditModalOpen(true);
                        }}
                        className="text-gray-600 hover:text-blue-600"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setIsDeleteModalOpen(true);
                        }}
                        className="text-gray-600 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 添加用户弹窗 */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="添加用户"
        size="lg"
      >
        <UserForm onSubmit={handleAddUser} />
      </Modal>

      {/* 编辑用户弹窗 */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="编辑用户"
        size="lg"
      >
        {selectedUser && (
          <UserForm
            onSubmit={handleEditUser}
            initialData={selectedUser}
            isEdit
          />
        )}
      </Modal>

      {/* 删除确认弹窗 */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="确认删除"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            确定要删除用户 "{selectedUser?.name}" 吗？此操作无法撤销。
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              取消
            </button>
            <button
              onClick={handleDeleteUser}
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

export default UserManagement;