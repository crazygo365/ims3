import React from 'react';
import { MapPin, Clock, BarChart3, Calendar } from 'lucide-react';

interface ShopHeaderProps {
  shop: {
    name: string;
    image: string;
    address: string;
    openDate: string;
    operatingHours: string;
    brand: string;
    status: string;
    netWorth: number;
  };
}

export const ShopHeader: React.FC<ShopHeaderProps> = ({ shop }) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="relative h-48 md:h-64 w-full overflow-hidden rounded-lg">
        <img
          src={shop.image}
          alt={shop.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute right-2 top-2 rounded bg-green-500 px-2 py-1 text-sm text-white">
          {shop.status}
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-gray-800">{shop.name}</h1>
          <div className="mt-2 md:mt-0 rounded-lg bg-blue-50 px-4 py-2">
            <span className="text-sm text-gray-600">当前净值：</span>
            <span className="text-lg font-semibold text-blue-600">
              ¥{shop.netWorth.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-gray-400" />
            <span className="ml-2 text-gray-600">{shop.address}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-400" />
            <span className="ml-2 text-gray-600">开业时间：{shop.openDate}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-gray-400" />
            <span className="ml-2 text-gray-600">营业时间：{shop.operatingHours}</span>
          </div>
          <div className="flex items-center">
            <BarChart3 className="h-5 w-5 text-gray-400" />
            <span className="ml-2 text-gray-600">经营品牌：{shop.brand}</span>
          </div>
        </div>
      </div>
    </div>
  );
};