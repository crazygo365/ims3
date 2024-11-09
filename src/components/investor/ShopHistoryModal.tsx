import React from 'react';
import { Modal } from '../modals/Modal';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingUp, DollarSign } from 'lucide-react';

interface HistoryRecord {
  date: string;
  value: number;
  description?: string;
}

interface ShopHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'dividend' | 'netWorth';
  shopName: string;
  data: HistoryRecord[];
}

export const ShopHistoryModal: React.FC<ShopHistoryModalProps> = ({
  isOpen,
  onClose,
  type,
  shopName,
  data,
}) => {
  const title = type === 'dividend' ? '分红记录' : '净值变化';
  const sortedData = [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // 计算增长率
  const growthRate = data.length > 1
    ? ((data[data.length - 1].value - data[0].value) / data[0].value * 100).toFixed(2)
    : 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${shopName} - ${title}`}
      size="lg"
    >
      <div className="space-y-6">
        {/* 趋势图 */}
        <div className="rounded-lg border border-gray-200 p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-800">趋势图</h3>
            {type === 'netWorth' && (
              <div className="rounded-lg bg-blue-50 px-3 py-1">
                <span className="text-sm text-gray-600">总增长率：</span>
                <span className={`font-semibold ${Number(growthRate) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {growthRate}%
                </span>
              </div>
            )}
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => [`¥${value.toLocaleString()}`, type === 'dividend' ? '分红金额' : '净值']}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={type === 'dividend' ? '#10b981' : '#3b82f6'}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 历史记录列表 */}
        <div className="rounded-lg border border-gray-200">
          <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
            <h3 className="text-lg font-medium text-gray-800">历史记录</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {sortedData.map((record, index) => (
              <div key={index} className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center space-x-4">
                  {type === 'dividend' ? (
                    <DollarSign className="h-5 w-5 text-green-500" />
                  ) : (
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                  )}
                  <div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{record.date}</span>
                    </div>
                    {record.description && (
                      <p className="mt-1 text-sm text-gray-500">{record.description}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-semibold ${
                    type === 'dividend' ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    ¥{record.value.toLocaleString()}
                  </p>
                  {index < sortedData.length - 1 && type === 'netWorth' && (
                    <p className={`text-sm ${
                      record.value >= sortedData[index + 1].value
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}>
                      {((record.value - sortedData[index + 1].value) / sortedData[index + 1].value * 100).toFixed(2)}%
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};