export type UserRole = 'admin' | 'finance' | 'investor';

export interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  email: string;
  phone?: string;
  permissions: string[];
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin?: string;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  code: string;
}

export const PERMISSIONS = {
  // 数据中心权限
  DATA_CENTER_VIEW: 'data_center:view',
  DATA_CENTER_EXPORT: 'data_center:export',
  DATA_CENTER_MANAGE: 'data_center:manage',

  // 店铺管理权限
  SHOP_VIEW: 'shop:view',
  SHOP_CREATE: 'shop:create',
  SHOP_EDIT: 'shop:edit',
  SHOP_DELETE: 'shop:delete',
  SHOP_HISTORY_VIEW: 'shop:history:view',
  SHOP_FINANCE_VIEW: 'shop:finance:view',
  SHOP_FINANCE_MANAGE: 'shop:finance:manage',

  // 投资人管理权限
  INVESTOR_VIEW: 'investor:view',
  INVESTOR_CREATE: 'investor:create',
  INVESTOR_EDIT: 'investor:edit',
  INVESTOR_DELETE: 'investor:delete',
  INVESTOR_ACCOUNT_VIEW: 'investor:account:view',
  INVESTOR_ACCOUNT_MANAGE: 'investor:account:manage',

  // 分红管理权限
  DIVIDEND_VIEW: 'dividend:view',
  DIVIDEND_CREATE: 'dividend:create',
  DIVIDEND_EDIT: 'dividend:edit',
  DIVIDEND_DELETE: 'dividend:delete',
  DIVIDEND_APPROVE: 'dividend:approve',
  DIVIDEND_EXPORT: 'dividend:export',

  // 净值管理权限
  NET_WORTH_VIEW: 'net_worth:view',
  NET_WORTH_CREATE: 'net_worth:create',
  NET_WORTH_EDIT: 'net_worth:edit',
  NET_WORTH_DELETE: 'net_worth:delete',
  NET_WORTH_APPROVE: 'net_worth:approve',
  NET_WORTH_EXPORT: 'net_worth:export',

  // 贷款管理权限
  LOAN_VIEW: 'loan:view',
  LOAN_CREATE: 'loan:create',
  LOAN_EDIT: 'loan:edit',
  LOAN_DELETE: 'loan:delete',
  LOAN_APPROVE: 'loan:approve',
  LOAN_REPAYMENT: 'loan:repayment',

  // 系统设置权限
  USER_VIEW: 'user:view',
  USER_CREATE: 'user:create',
  USER_EDIT: 'user:edit',
  USER_DELETE: 'user:delete',
  USER_ROLE_ASSIGN: 'user:role:assign',

  ROLE_VIEW: 'role:view',
  ROLE_CREATE: 'role:create',
  ROLE_EDIT: 'role:edit',
  ROLE_DELETE: 'role:delete',
  ROLE_PERMISSION_ASSIGN: 'role:permission:assign',

  FINANCE_CONFIG_VIEW: 'finance:config:view',
  FINANCE_CONFIG_MANAGE: 'finance:config:manage',
  FINANCE_REPORT_VIEW: 'finance:report:view',
  FINANCE_REPORT_MANAGE: 'finance:report:manage',
  FINANCE_REPORT_APPROVE: 'finance:report:approve',

  BRAND_VIEW: 'brand:view',
  BRAND_CREATE: 'brand:create',
  BRAND_EDIT: 'brand:edit',
  BRAND_DELETE: 'brand:delete',

  MANAGER_VIEW: 'manager:view',
  MANAGER_CREATE: 'manager:create',
  MANAGER_EDIT: 'manager:edit',
  MANAGER_DELETE: 'manager:delete',

  SYSTEM_CONFIG_VIEW: 'system:config:view',
  SYSTEM_CONFIG_MANAGE: 'system:config:manage',
  SYSTEM_BACKUP_VIEW: 'system:backup:view',
  SYSTEM_BACKUP_MANAGE: 'system:backup:manage',
} as const;