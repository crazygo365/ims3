import React, { useState } from 'react';
import { CreditCard, Plus } from 'lucide-react';
import { Modal } from '../modals/Modal';

interface BankCard {
  id: number;
  bank: string;
  number: string;
  name: string;
}

interface BankCardManagementProps {
  investorName: string;
  bankCards: BankCard[];
  onAddCard: (cardData: any) => void;
  onUnbindCard: (card: BankCard) => void;
}

const BANK_LIST = [
  '工商银行',
  '建设银行',
  '农业银行',
  '中国银行',
  '交通银行',
  '招商银行',
  '浦发银行',
  '中信银行',
  '光大银行',
  '民生银行',
  '华夏银行',
  '平安银行',
  '兴业银行',
];

export const BankCardManagement: React.FC<BankCardManagementProps> = ({
  investorName,
  bankCards,
  onAddCard,
  onUnbindCard,
}) => {
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [isUnbindConfirmOpen, setIsUnbindConfirmOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<BankCard | null>(null);
  const [formData, setFormData] = useState({
    bank: '',
    number: '',
    name: investorName,
  });

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCard(formData);
    setIsAddCardModalOpen(false);
    setFormData({ bank: '', number: '', name: investorName });
  };

  const handleUnbindConfirm = () => {
    if (selectedCard) {
      onUnbindCard(selectedCard);
    }
    setIsUnbindConfirmOpen(false);
    setSelectedCard(null);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-800">已绑定银行卡</h3>
        <button
          onClick={() => setIsAddCardModalOpen(true)}
          className="flex items-center rounded-lg border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50"
        >
          <Plus className="mr-1 h-4 w-4" />
          添加银行卡
        </button>
      </div>

      <div className="space-y-4">
        {bankCards.map((card) => (
          <div
            key={card.id}
            className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
          >
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 text-gray-400" />
              <div className="ml-3">
                <p className="font-medium text-gray-800">{card.bank}</p>
                <p className="text-sm text-gray-500">{card.number}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedCard(card);
                setIsUnbindConfirmOpen(true);
              }}
              className="text-sm text-red-600 hover:text-red-700"
            >
              解绑
            </button>
          </div>
        ))}
      </div>

      {/* 添加银行卡弹窗 */}
      <Modal
        isOpen={isAddCardModalOpen}
        onClose={() => setIsAddCardModalOpen(false)}
        title="添加银行卡"
        size="md"
      >
        <form onSubmit={handleAddCard} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">开户银行 *</label>
            <select
              value={formData.bank}
              onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
            >
              <option value="">选择银行</option>
              {BANK_LIST.map((bank) => (
                <option key={bank} value={bank}>{bank}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">银行卡号 *</label>
            <input
              type="text"
              value={formData.number}
              onChange={(e) => setFormData({ ...formData, number: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              placeholder="输入银行卡号"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">开户人姓名 *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              placeholder="输入开户人姓名"
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsAddCardModalOpen(false)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              取消
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              添加银行卡
            </button>
          </div>
        </form>
      </Modal>

      {/* 解绑确认弹窗 */}
      <Modal
        isOpen={isUnbindConfirmOpen}
        onClose={() => {
          setIsUnbindConfirmOpen(false);
          setSelectedCard(null);
        }}
        title="确认解绑银行卡"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            确定要解绑 {selectedCard?.bank} ({selectedCard?.number}) 吗？此操作无法撤销。
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => {
                setIsUnbindConfirmOpen(false);
                setSelectedCard(null);
              }}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              取消
            </button>
            <button
              onClick={handleUnbindConfirm}
              className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              确认解绑
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};