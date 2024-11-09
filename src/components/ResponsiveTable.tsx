import React from 'react';

interface Column {
  key: string;
  title: string;
  render?: (value: any, record: any) => React.ReactNode;
}

interface ResponsiveTableProps {
  columns: Column[];
  data: any[];
  rowKey: string;
}

export const ResponsiveTable: React.FC<ResponsiveTableProps> = ({ columns, data, rowKey }) => {
  return (
    <div className="overflow-x-auto">
      {/* Desktop View */}
      <table className="hidden w-full min-w-full md:table">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            {columns.map((column) => (
              <th
                key={column.key}
                className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-gray-600"
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((record) => (
            <tr key={record[rowKey]} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4">
                  {column.render
                    ? column.render(record[column.key], record)
                    : record[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile View */}
      <div className="space-y-4 md:hidden">
        {data.map((record) => (
          <div
            key={record[rowKey]}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
          >
            {columns.map((column) => (
              <div key={column.key} className="mb-2 flex justify-between">
                <span className="text-sm font-medium text-gray-500">{column.title}</span>
                <span className="text-sm text-gray-900">
                  {column.render
                    ? column.render(record[column.key], record)
                    : record[column.key]}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};