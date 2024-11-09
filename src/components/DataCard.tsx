import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DataCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  icon: LucideIcon;
  iconColor?: string;
  valueColor?: string;
}

export const DataCard: React.FC<DataCardProps> = ({
  title,
  value,
  subValue,
  icon: Icon,
  iconColor = 'blue',
  valueColor = 'gray',
}) => {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className={`mt-2 text-xl font-bold text-${valueColor}-900 sm:text-3xl`}>
            {value}
          </p>
          {subValue && (
            <p className="mt-1 text-sm text-gray-600">{subValue}</p>
          )}
        </div>
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-${iconColor}-100 sm:h-12 sm:w-12`}>
          <Icon className={`h-5 w-5 text-${iconColor}-600 sm:h-6 sm:w-6`} />
        </div>
      </div>
    </div>
  );
};