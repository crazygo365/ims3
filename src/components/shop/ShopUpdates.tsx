import React, { useState } from 'react';
import { Calendar, Tag, ChevronRight, Plus } from 'lucide-react';
import { Modal } from '../modals/Modal';
import { ShopUpdateForm } from '../forms/ShopUpdateForm';

interface ShopUpdate {
  id: number;
  date: string;
  type: string;
  title: string;
  content: string;
}

interface ShopUpdatesProps {
  updates: ShopUpdate[];
}

export const ShopUpdates: React.FC<ShopUpdatesProps> = ({ updates }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAllUpdates, setShowAllUpdates] = useState(false);

  const handleAddUpdate = (data: any) => {
    console.log('Adding update:', data);
    setShowAddModal(false);
  };

  const displayUpdates = showAllUpdates ? updates : updates.slice(0, 3);

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">店铺动态</h2>
        <div className="flex items-center gap-2">
          {updates.length > 3 && (
            <button
              onClick={() => setShowAllUpdates(!showAllUpdates)}
              className="flex items-center text-sm text-blue-600 hover:text-blue-700"
            >
              {showAllUpdates ? '收起' : '查看全部'}
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center rounded-lg border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
          >
            <Plus className="mr-1 h-4 w-4" />
            添加动态
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {displayUpdates.map((update) => (
          <div key={update.id} className="relative border-l-2 border-blue-200 pl-4">
            <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-blue-200" />
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="mr-1 h-4 w-4" />
                {update.date}
              </div>
              <div className="flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700">
                <Tag className="mr-1 h-3 w-3" />
                {update.type}
              </div>
            </div>
            <h3 className="mb-2 text-base font-semibold text-gray-800">{update.title}</h3>
            <p className="text-sm text-gray-600">{update.content}</p>
          </div>
        ))}
      </div>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="添加店铺动态"
        size="lg"
      >
        <ShopUpdateForm onSubmit={handleAddUpdate} />
      </Modal>
    </div>
  );
};