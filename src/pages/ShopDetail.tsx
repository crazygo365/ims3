import React from 'react';
import { useParams } from 'react-router-dom';
import { ShopHeader } from '../components/shop/ShopHeader';
import { DividendHistory } from '../components/shop/DividendHistory';
import { NetWorthHistory } from '../components/shop/NetWorthHistory';
import { ShopUpdates } from '../components/shop/ShopUpdates';
import { FinancialReports } from '../components/shop/FinancialReports';

const ShopDetail = () => {
  const { id } = useParams();
  
  const shop = {
    id: 1,
    name: '星巴克咖啡 - 中关村店',
    image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&q=80&w=1000',
    address: '北京市海淀区中关村大街1号',
    openDate: '2022-01-15',
    investment: 500000,
    shares: '15%',
    status: '营业中',
    monthlyRevenue: 85000,
    operatingHours: '07:00-22:00',
    brand: '星巴克',
    netWorth: 2800000,
  };

  const dividends = [
    {
      id: 1,
      period: '2024年2月',
      amount: 25800,
      paymentDate: '2024-02-15',
      status: '已发放',
    },
    {
      id: 2,
      period: '2024年1月',
      amount: 23500,
      paymentDate: '2024-01-15',
      status: '已发放',
    },
    {
      id: 3,
      period: '2024年3月',
      amount: 26000,
      paymentDate: '2024-03-15',
      status: '待发放',
    },
  ];

  const netWorthHistory = [
    { date: '2022-01', value: 2000000 },
    { date: '2022-06', value: 2200000 },
    { date: '2022-12', value: 2400000 },
    { date: '2023-06', value: 2600000 },
    { date: '2023-12', value: 2800000 },
  ];

  const updates = [
    {
      id: 1,
      date: '2024-02-15',
      type: '店铺翻新',
      title: '完成室内装修升级',
      content: '对店铺进行了全面翻新，更换了座椅和照明系统，提升了整体用餐体验。',
    },
    {
      id: 2,
      date: '2024-01-20',
      type: '促销活动',
      title: '新年特别促销活动',
      content: '举办为期两周的新年特惠活动，推出多款限定产品，日均销售额提升30%。',
    },
    {
      id: 3,
      date: '2023-12-10',
      type: '设备更新',
      title: '更换咖啡设备',
      content: '引入新一代咖啡机设备，提升产品品质和制作效率。',
    },
  ];

  const reports = [
    {
      id: 1,
      title: '2024年2月财务报表',
      type: '月度报表',
      date: '2024-02-28',
      fileSize: '2.5MB',
      url: '#',
    },
    {
      id: 2,
      title: '2024年1月财务报表',
      type: '月度报表',
      date: '2024-01-31',
      fileSize: '2.3MB',
      url: '#',
    },
    {
      id: 3,
      title: '2023年度财务报告',
      type: '年度报告',
      date: '2024-01-15',
      fileSize: '5.8MB',
      url: '#',
    },
  ];

  // 假设当前投资者持股15%
  const hasAccess = parseFloat(shop.shares) >= 10;

  return (
    <div className="space-y-6">
      <ShopHeader shop={shop} />
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DividendHistory dividends={dividends} />
        <NetWorthHistory history={netWorthHistory} />
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ShopUpdates updates={updates} />
        <FinancialReports reports={reports} hasAccess={hasAccess} />
      </div>
    </div>
  );
};

export default ShopDetail;