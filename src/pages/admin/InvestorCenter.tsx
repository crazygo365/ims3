import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Search, 
  Building2,
  Wallet,
  TrendingUp,
  Plus,
  Edit2,
  Trash2
} from 'lucide-react';
import { Modal } from '../../components/modals/Modal';
import { InvestorForm } from '../../components/forms/InvestorForm';
import { AccountOperationForm } from '../../components/forms/AccountOperationForm';
import { BankCardManagement } from '../../components/investor/BankCardManagement';

const InvestorCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvestor, setSelectedInvestor] = useState<any | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [accountOperationType, setAccountOperationType] = useState<'withdraw' | 'income' | 'expense' | 'bank'>('withdraw');

  // 使用之前提供的投资人数据
  const investors = [
    {
      id: 1,
      name: '张三',
      phone: '13800138000',
      shopCount: 4,
      totalInvestment: 1004000,
      currentNetWorth: 22222,
      totalDividends: -925194.6,
      investmentYears: 4.9,
      accountBalance: 393797,
      email: 'zhangsan@example.com',
      idNumber: '110101199001011234',
      investmentStartDate: '2020-01-01',
      type: 'individual',
      status: 'active',
      bankCards: [
        { id: 1, bank: '工商银行', number: '****5888', name: '张三' },
        { id: 2, bank: '建设银行', number: '****6666', name: '张三' },
      ]
    },
  ];

  const handleAddInvestor = (data: any) => {
    console.log('Adding investor:', data);
    setIsAddModalOpen(false);
  };

  const handleEditInvestor = (data: any) => {
    console.log('Editing investor:', data);
    setIsEditModalOpen(false);
  };

  const handleDeleteInvestor = () => {
    console.log('Deleting investor:', selectedInvestor?.id);
    setIsDeleteModalOpen(false);
  };

  const handleAccountOperation = (data: any) => {
    console.log('Account operation:', data);
    setIsAccountModalOpen(false);
  };

  const handleAddBankCard = (cardData: any) => {
    console.log('Adding bank card:', { ...cardData, investorId: selectedInvestor?.id });
    // 在实际应用中，这里应该调用API来添加银行卡
    // 添加成功后更新投资人的银行卡列表
  };

  const handleUnbindBankCard = (card: any) => {
    console.log('Unbinding bank card:', { cardId: card.id, investorId: selectedInvestor?.id });
    // 在实际应用中，这里应该调用API来解绑银行卡
    // 解绑成功后更新投资人的银行卡列表
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold text-gray-800">投资人管理中心</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            添加投资人
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="搜索投资人..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="rounded-xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-gray-600">
                  投资人信息
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-gray-600">
                  投资店铺数量
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-gray-600">
                  投资总金额
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-gray-600">
                  当前净值总额
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-gray-600">
                  分红总金额
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-gray-600">
                  投资年限
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center font-semibold text-gray-600">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {investors
                .filter(
                  (investor) =>
                    investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    investor.phone.includes(searchTerm)
                )
                .map((investor) => (
                  <tr key={investor.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-800">{investor.name}</p>
                        <p className="text-sm text-gray-500">{investor.phone}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-semibold text-blue-600">
                        {investor.shopCount}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-semibold text-blue-600">
                        ¥{investor.totalInvestment.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-semibold text-blue-600">
                        ¥{investor.currentNetWorth.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-semibold text-blue-600">
                        ¥{investor.totalDividends.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {investor.investmentYears} 年
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center space-x-3">
                        <Link
                          to={`/investor/${investor.id}`}
                          className="rounded p-1 text-blue-600 hover:bg-blue-50"
                        >
                          <TrendingUp className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => {
                            setSelectedInvestor(investor);
                            setIsAccountModalOpen(true);
                          }}
                          className="rounded p-1 text-green-600 hover:bg-green-50"
                        >
                          <Wallet className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedInvestor(investor);
                            setIsEditModalOpen(true);
                          }}
                          className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-blue-600"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedInvestor(investor);
                            setIsDeleteModalOpen(true);
                          }}
                          className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 添加投资人弹窗 */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="添加投资人"
        size="lg"
      >
        <InvestorForm onSubmit={handleAddInvestor} />
      </Modal>

      {/* 编辑投资人弹窗 */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="编辑投资人"
        size="lg"
      >
        {selectedInvestor && (
          <InvestorForm
            onSubmit={handleEditInvestor}
            initialData={selectedInvestor}
            isEdit
          />
        )}
      </Modal>

      {/* 删除确认弹窗 */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="确认删除"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            确定要删除投资人 "{selectedInvestor?.name}" 吗？此操作无法撤销。
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              取消
            </button>
            <button
              onClick={handleDeleteInvestor}
              className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              确认删除
            </button>
          </div>
        </div>
      </Modal>

      {/* 账户操作弹窗 */}
      <Modal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        title={`${selectedInvestor?.name || ''} - 账户操作`}
        size="lg"
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
            <div>
              <p className="text-sm text-gray-500">当前账户余额</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                ¥{selectedInvestor?.accountBalance?.toLocaleString() || '0'}
              </p>
            </div>
            <Wallet className="h-8 w-8 text-gray-400" />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => setAccountOperationType('withdraw')}
              className={`flex-1 rounded-lg px-4 py-2 ${
                accountOperationType === 'withdraw'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              提现
            </button>
            <button
              onClick={() => setAccountOperationType('income')}
              className={`flex-1 rounded-lg px-4 py-2 ${
                accountOperationType === 'income'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              收入
            </button>
            <button
              onClick={() => setAccountOperationType('expense')}
              className={`flex-1 rounded-lg px-4 py-2 ${
                accountOperationType === 'expense'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              支出
            </button>
            <button
              onClick={() => setAccountOperationType('bank')}
              className={`flex-1 rounded-lg px-4 py-2 ${
                accountOperationType === 'bank'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              银行卡
            </button>
          </div>

          {accountOperationType === 'bank' ? (
            <BankCardManagement
              investorName={selectedInvestor?.name || ''}
              bankCards={selectedInvestor?.bankCards || []}
              onAddCard={handleAddBankCard}
              onUnbindCard={handleUnbindBankCard}
            />
          ) : (
            <AccountOperationForm
              type={accountOperationType}
              investor={selectedInvestor}
              onSubmit={handleAccountOperation}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default InvestorCenter;