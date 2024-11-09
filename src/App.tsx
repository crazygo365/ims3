import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// 投资人查询板块
import Dashboard from './pages/Dashboard';
import ShopList from './pages/ShopList';
import ShopDetail from './pages/ShopDetail';
import Transactions from './pages/Transactions';
import Loans from './pages/Loans';

// 系统管理板块
import DataCenter from './pages/admin/Dashboard';
import InvestorCenter from './pages/admin/InvestorCenter';
import InvestorDetail from './pages/admin/InvestorDetail';
import DividendManagement from './pages/admin/DividendManagement';
import NetWorthManagement from './pages/admin/NetWorthManagement';
import LoanManagement from './pages/admin/LoanManagement';
import ShopManagement from './pages/settings/ShopManagement';

// 设置页面
import UserManagement from './pages/settings/UserManagement';
import FinanceManagement from './pages/settings/FinanceManagement';
import SystemSettings from './pages/settings/SystemSettings';
import RoleManagement from './pages/settings/RoleManagement';
import BrandManagement from './pages/settings/BrandManagement';
import ManagerManagement from './pages/settings/ManagerManagement';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* 投资人查询板块 */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/shops" element={<ShopList />} />
          <Route path="/shops/:id" element={<ShopDetail />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/loans" element={<Loans />} />
          
          {/* 系统管理板块 */}
          <Route path="/admin/dashboard" element={<DataCenter />} />
          <Route path="/admin/investors" element={<InvestorCenter />} />
          <Route path="/investor/:id" element={<InvestorDetail />} />
          <Route path="/admin/dividends" element={<DividendManagement />} />
          <Route path="/admin/net-worth" element={<NetWorthManagement />} />
          <Route path="/admin/loans" element={<LoanManagement />} />
          <Route path="/admin/shops" element={<ShopManagement />} />
          
          {/* 设置路由 */}
          <Route path="/settings/users" element={<UserManagement />} />
          <Route path="/settings/finance" element={<FinanceManagement />} />
          <Route path="/settings/system" element={<SystemSettings />} />
          <Route path="/settings/roles" element={<RoleManagement />} />
          <Route path="/settings/brands" element={<BrandManagement />} />
          <Route path="/settings/managers" element={<ManagerManagement />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;