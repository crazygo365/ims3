import React, { useState } from 'react';
import { FileText, Download, Lock, Eye, Calendar, Plus } from 'lucide-react';
import { Modal } from '../modals/Modal';
import { FinancialReportForm } from './FinancialReportForm';

interface FinancialReport {
  id: number;
  title: string;
  type: string;
  date: string;
  fileSize: string;
  url: string;
}

interface FinancialReportsProps {
  reports: FinancialReport[];
  hasAccess: boolean;
}

export const FinancialReports: React.FC<FinancialReportsProps> = ({ reports, hasAccess }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAllReports, setShowAllReports] = useState(false);

  const handleAddReport = (data: any) => {
    console.log('Adding report:', data);
    setShowAddModal(false);
  };

  if (!hasAccess) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Lock className="h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-semibold text-gray-800">需要权限访问</h3>
          <p className="mt-2 text-sm text-gray-500">
            只有持股10%以上的投资者可以查看财务报表
          </p>
        </div>
      </div>
    );
  }

  const displayReports = showAllReports ? reports : reports.slice(0, 3);

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">财务报表</h2>
        <div className="flex items-center gap-2">
          {reports.length > 3 && (
            <button
              onClick={() => setShowAllReports(!showAllReports)}
              className="flex items-center text-sm text-blue-600 hover:text-blue-700"
            >
              查看全部报表
              <Eye className="ml-1 h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center rounded-lg border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
          >
            <Plus className="mr-1 h-4 w-4" />
            上传报表
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {displayReports.map((report) => (
          <div
            key={report.id}
            className="flex flex-col justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50 md:flex-row md:items-center"
          >
            <div className="flex items-start space-x-3">
              <FileText className="h-5 w-5 text-blue-500" />
              <div>
                <h3 className="text-base font-medium text-gray-800">{report.title}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    {report.date}
                  </span>
                  <span>•</span>
                  <span>{report.type}</span>
                  <span>•</span>
                  <span>{report.fileSize}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex space-x-3 md:mt-0">
              <button className="flex items-center rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Eye className="mr-2 h-4 w-4" />
                预览
              </button>
              <a
                href={report.url}
                download
                className="flex items-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                <Download className="mr-2 h-4 w-4" />
                下载
              </a>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="上传财务报表"
        size="lg"
      >
        <FinancialReportForm onSubmit={handleAddReport} />
      </Modal>
    </div>
  );
};