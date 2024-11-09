import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { LoanForm } from '../../../components/forms/LoanForm';

const AddLoan = () => {
  const handleSubmit = (data: any) => {
    // Handle loan creation
    console.log('Creating loan:', data);
  };

  return (
    <div>
      <div className="mb-6 flex items-center">
        <button className="mr-4 rounded-lg p-2 hover:bg-gray-100">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">添加贷款</h1>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <LoanForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default AddLoan;