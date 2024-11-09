import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { DividendForm } from '../../../components/forms/DividendForm';

const AddDividend = () => {
  const handleSubmit = (data: any) => {
    // Handle dividend creation
    console.log('Creating dividend:', data);
  };

  return (
    <div>
      <div className="mb-6 flex items-center">
        <button className="mr-4 rounded-lg p-2 hover:bg-gray-100">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">添加分红</h1>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <DividendForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default AddDividend;