import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, TrendingUp } from 'lucide-react';

const ShopList = () => {
  // 模拟当前登录的投资人信息
  const currentInvestor = {
    name: '张三'
  };

  const shops = [
    {
      id: 1,
      name: '星巴克咖啡 - 中关村店',
      image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&q=80&w=1000',
      address: '北京市海淀区中关村大街1号',
      manager: '张经理',
      openDate: '2022-01-15',
      investment: 500000,
      shares: '15%',
      status: '营业中',
      totalRevenue: 850000,
    },
    {
      id: 2,
      name: '肯德基 - 望京店',
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1000',
      address: '北京市朝阳区望京南湖中园201号',
      manager: '李经理',
      openDate: '2023-03-20',
      investment: 800000,
      shares: '20%',
      status: '营业中',
      totalRevenue: 1200000,
    },
    {
      id: 3,
      name: '必胜客 - 三里屯店',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000',
      address: '北京市朝阳区三里屯路19号',
      manager: '王经理',
      openDate: '2023-08-10',
      investment: 600000,
      shares: '12%',
      status: '装修中',
      totalRevenue: 0,
    },
    {
      id: 4,
      name: '麦当劳 - 西单店',
      image: 'https://images.unsplash.com/photo-1619454016518-697bc231e7cb?auto=format&fit=crop&q=80&w=1000',
      address: '北京市西城区西单北大街176号',
      manager: '赵经理',
      openDate: '2021-06-01',
      investment: 750000,
      shares: '18%',
      status: '营业中',
      totalRevenue: 950000,
    },
    {
      id: 5,
      name: '奈雪的茶 - 国贸店',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=1000',
      address: '北京市朝阳区建国门外大街1号国贸商城',
      manager: '钱经理',
      openDate: '2023-12-25',
      investment: 450000,
      shares: '25%',
      status: '营业中',
      totalRevenue: 650000,
    }
  ];

  // 按状态排序：营业中的店铺排在前面
  const sortedShops = [...shops].sort((a, b) => {
    if (a.status === '营业中' && b.status !== '营业中') return -1;
    if (a.status !== '营业中' && b.status === '营业中') return 1;
    return 0;
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">{currentInvestor.name}的店铺</h1>
        <div className="flex gap-4">
          <select className="rounded-lg border border-gray-300 px-4 py-2">
            <option>全部店铺</option>
            <option>营业中</option>
            <option>装修中</option>
            <option>已闭店</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {sortedShops.map((shop) => (
          <Link
            key={shop.id}
            to={`/shops/${shop.id}`}
            className="group rounded-xl bg-white p-4 shadow-sm transition-all hover:shadow-md"
          >
            <div className="relative h-48 w-full overflow-hidden rounded-lg">
              <img
                src={shop.image}
                alt={shop.name}
                className="h-full w-full object-cover"
              />
              <div className={`absolute right-2 top-2 rounded px-2 py-1 text-sm text-white ${
                shop.status === '营业中' ? 'bg-green-500' : 
                shop.status === '装修中' ? 'bg-orange-500' : 'bg-red-500'
              }`}>
                {shop.status}
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">{shop.name}</h3>
                <ExternalLink className="h-5 w-5 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <p className="mt-1 text-sm text-gray-500">管理人：{shop.manager}</p>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">投资金额</p>
                  <p className="text-lg font-semibold text-gray-800">
                    ¥{shop.investment.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">持股比例</p>
                  <p className="text-lg font-semibold text-gray-800">{shop.shares}</p>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between rounded-lg bg-green-50 p-3">
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="ml-2 text-sm text-green-700">累计收益</span>
                </div>
                <span className="font-semibold text-green-700">
                  ¥{shop.totalRevenue.toLocaleString()}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShopList;