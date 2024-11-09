import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { FinancialReportForm } from '../../../components/shop/FinancialReportForm';

const AddReport = () => {
  const handleSubmit = (data: any) => {
    // Handle report creation
    console.log('Creating report:', data);
  };

  return (
    <div>
      <div className="mb-6 flex items-center">
        <button className="mr-4 rounded-lg p-2 hover:bg-gray-100">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">上传财务报表</h1>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <FinancialReportForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default AddReport;