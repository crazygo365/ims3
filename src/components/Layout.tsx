import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Store,
  Receipt,
  Wallet2,
  LogOut,
  Database,
  Users,
  PiggyBank,
  TrendingUp,
  Settings,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Menu,
  X
} from 'lucide-react';

const investorMenuItems = [
  {
    name: '投资概览',
    path: '/',
    icon: LayoutDashboard
  },
  {
    name: '我的店铺',
    path: '/shops',
    icon: Store
  },
  {
    name: '资金往来',
    path: '/transactions',
    icon: Receipt
  },
  {
    name: '我的贷款',
    path: '/loans',
    icon: CreditCard
  }
];

const systemMenuItems = [
  {
    name: '数据中心',
    path: '/admin/dashboard',
    icon: Database
  },
  {
    name: '投资人管理',
    path: '/admin/investors',
    icon: Users
  },
  {
    name: '店铺管理',
    path: '/admin/shops',
    icon: Store
  },
  {
    name: '分红管理',
    path: '/admin/dividends',
    icon: PiggyBank
  },
  {
    name: '净值管理',
    path: '/admin/net-worth',
    icon: TrendingUp
  },
  {
    name: '贷款管理',
    path: '/admin/loans',
    icon: Wallet2
  },
  {
    name: '系统设置',
    path: '/settings',
    icon: Settings,
    subItems: [
      { name: '用户管理', path: '/settings/users' },
      { name: '财务管理', path: '/settings/finance' },
      { name: '角色管理', path: '/settings/roles' },
      { name: '品牌管理', path: '/settings/brands' },
      { name: '管理人管理', path: '/settings/managers' },
      { name: '系统设置', path: '/settings/system' }
    ]
  }
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSubMenu = (path: string) => {
    setOpenMenus(prev =>
      prev.includes(path)
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

  const renderMenuItem = (item: any) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.path;
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isOpen = openMenus.includes(item.path);

    return (
      <div key={item.path}>
        <Link
          to={hasSubItems ? '#' : item.path}
          onClick={hasSubItems ? () => toggleSubMenu(item.path) : undefined}
          className={`flex items-center justify-between px-6 py-3 text-sm ${
            isActive
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <div className="flex items-center">
            <Icon className="mr-3 h-5 w-5" />
            <span>{item.name}</span>
          </div>
          {hasSubItems && (
            isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )
          )}
        </Link>
        {hasSubItems && isOpen && (
          <div className="ml-4 space-y-1 border-l border-gray-200 pl-4">
            {item.subItems.map((subItem: any) => (
              <Link
                key={subItem.path}
                to={subItem.path}
                className={`block px-6 py-2 text-sm ${
                  location.pathname === subItem.path
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {subItem.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <div className="fixed left-0 right-0 top-0 z-20 flex items-center justify-between bg-white px-4 py-3 shadow-sm lg:hidden">
        <h1 className="text-lg font-bold text-gray-800">投资管理系统</h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded-lg p-2 hover:bg-gray-100"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-600" />
          ) : (
            <Menu className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-30 h-full w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="hidden p-6 lg:block">
          <h1 className="text-xl font-bold text-gray-800">投资管理系统</h1>
        </div>

        {/* Navigation */}
        <div className="flex h-full flex-col overflow-y-auto pt-16 lg:pt-0">
          <div className="mb-6">
            <h2 className="px-6 py-2 text-xs font-semibold uppercase text-gray-400">
              投资人查询
            </h2>
            <nav>
              {investorMenuItems.map(renderMenuItem)}
            </nav>
          </div>

          <div>
            <h2 className="px-6 py-2 text-xs font-semibold uppercase text-gray-400">
              系统管理
            </h2>
            <nav>
              {systemMenuItems.map(renderMenuItem)}
            </nav>
          </div>

          {/* Logout Button */}
          <div className="mt-auto border-t border-gray-200 p-6">
            <button className="flex w-full items-center text-gray-600 hover:text-gray-900">
              <LogOut className="h-5 w-5" />
              <span className="ml-3">退出登录</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="pt-16 lg:ml-64 lg:pt-0">
        <div className="p-4 md:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
};

export default Layout;