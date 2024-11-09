import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Building2, LayoutGrid, LayoutList } from 'lucide-react';
import { Modal } from '../../components/modals/Modal';
import { ShopForm } from '../../components/forms/ShopForm';

interface Shop {
  id: string;
  name: string;
  brand: string;
  address: string;
  openDate: string;
  status: 'active' | 'closed';
  monthlyRevenue: number;
  netWorth: number;
  investorCount: number;
  totalInvestment: number;
  district: string;
  manager: string;
}

const ShopManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [filterManager, setFilterManager] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);

  const shops: Shop[] = [
    {
      id: '1',
      name: '星巴克咖啡 - 中关村店',
      brand: '星巴克',
      address: '北京市海淀区中关村大街1号',
      openDate: '2022-01-15',
      status: 'active',
      monthlyRevenue: 85000,
      netWorth: 2800000,
      investorCount: 3,
      totalInvestment: 500000,
      district: '华东区',
      manager: '张经理',
    },
    {
      id: '2',
      name: '肯德基 - 望京店',
      brand: '肯德基',
      address: '北京市朝阳区望京南湖中园201号',
      openDate: '2023-03-20',
      status: 'active',
      monthlyRevenue: 120000,
      netWorth: 3200000,
      investorCount: 4,
      totalInvestment: 800000,
      district: '华北区',
      manager: '李经理',
    },
  ];

  const handleSubmit = (data: any) => {
    console.log('Form data:', data);
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  const filteredShops = shops.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || shop.status === filterStatus;
    const matchesBrand = !filterBrand || shop.brand === filterBrand;
    const matchesDistrict = !filterDistrict || shop.district === filterDistrict;
    const matchesManager = !filterManager || shop.manager === filterManager;
    return matchesSearch && matchesStatus && matchesBrand && matchesDistrict && matchesManager;
  });

  const GridView = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredShops.map((shop) => (
        <div key={shop.id} className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-gray-800">{shop.name}</h3>
                <p className="text-sm text-gray-500">{shop.brand}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setSelectedShop(shop);
                  setIsEditModalOpen(true);
                }}
                className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-blue-600"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  setSelectedShop(shop);
                  setIsDeleteModalOpen(true);
                }}
                className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">地址</p>
              <p className="text-sm text-gray-800">{shop.address}</p>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">开业时间</p>
                <p className="text-sm text-gray-800">{shop.openDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">状态</p>
                <span className={`rounded-full px-2 py-1 text-xs ${
                  shop.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {shop.status === 'active' ? '营业中' : '已闭店'}
                </span>
              </div>
            </div>
            <div className="flex justify-between border-t pt-3">
              <div>
                <p className="text-sm text-gray-500">月均收入</p>
                <p className="text-base font-semibold text-gray-800">
                  ¥{shop.monthlyRevenue.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">当前净值</p>
                <p className="text-base font-semibold text-blue-600">
                  ¥{shop.netWorth.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const ListView = () => (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                店铺信息
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                所属区域
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                管理人
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                投资总额
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                当前净值
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                状态
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredShops.map((shop) => (
              <tr key={shop.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900">{shop.name}</p>
                    <p className="text-sm text-gray-500">{shop.brand}</p>
                    <p className="text-sm text-gray-500">{shop.address}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {shop.district}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {shop.manager}
                </td>
                <td className="px-6 py-4 text-right">
                  <p className="text-sm font-medium text-gray-900">
                    ¥{shop.totalInvestment.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {shop.investorCount}个投资人
                  </p>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-medium text-blue-600">
                    ¥{shop.netWorth.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <span className={`rounded-full px-2 py-1 text-xs ${
                      shop.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {shop.status === 'active' ? '营业中' : '已闭店'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => {
                        setSelectedShop(shop);
                        setIsEditModalOpen(true);
                      }}
                      className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-blue-600"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedShop(shop);
                        setIsDeleteModalOpen(true);
                      }}
                      className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-600"
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
  );

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-2xl font-bold text-gray-800">店铺管理</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="rounded-lg border border-gray-300 p-2 hover:bg-gray-50"
          >
            {viewMode === 'grid' ? (
              <LayoutList className="h-5 w-5 text-gray-500" />
            ) : (
              <LayoutGrid className="h-5 w-5 text-gray-500" />
            )}
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            添加店铺
          </button>
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <div className="flex items-center rounded-lg border border-gray-300">
          <Search className="ml-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索店铺..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border-none bg-transparent px-3 py-2 outline-none"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2"
        >
          <option value="">所有状态</option>
          <option value="active">营业中</option>
          <option value="closed">已闭店</option>
        </select>

        <select
          value={filterBrand}
          onChange={(e) => setFilterBrand(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2"
        >
          <option value="">所有品牌</option>
          <option value="星巴克">星巴克</option>
          <option value="肯德基">肯德基</option>
        </select>

        <select
          value={filterDistrict}
          onChange={(e) => setFilterDistrict(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2"
        >
          <option value="">所有区域</option>
          <option value="华东区">华东区</option>
          <option value="华北区">华北区</option>
        </select>

        <select
          value={filterManager}
          onChange={(e) => setFilterManager(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2"
        >
          <option value="">所有管理人</option>
          <option value="张经理">张经理</option>
          <option value="李经理">李经理</option>
        </select>
      </div>

      {viewMode === 'grid' ? <GridView /> : <ListView />}

      {/* Add Shop Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="添加店铺"
        size="lg"
      >
        <ShopForm onSubmit={handleSubmit} />
      </Modal>

      {/* Edit Shop Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="编辑店铺"
        size="lg"
      >
        {selectedShop && (
          <ShopForm onSubmit={handleSubmit} initialData={selectedShop} isEdit />
        )}
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
            确定要删除店铺 "{selectedShop?.name}" 吗？此操作无法撤销。
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
                console.log('Deleting shop:', selectedShop?.id);
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

export default ShopManagement;