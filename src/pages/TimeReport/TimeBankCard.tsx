import React from 'react';
import { Clock, DollarSign, ArrowDownCircle } from 'lucide-react';

const TimeBankCard: React.FC = () => {
  const availableHours = 40; // ex. hårdkodat, byt till backend-data senare
  const totalHours = 60;
  const atfHours = 4.5;
  const overtimeHours = 15;
  const withdrawals = 2;

  return (
    <div className="w-full bg-gradient-to-br from-[#f8fbff] to-[#f0f4ff] rounded-2xl shadow-xl p-4 md:p-8 animate-fade-in">
      <div className="flex items-center mb-6 gap-3">
        <Clock className="text-blue-500" size={32} />
        <h1 className="text-2xl font-bold text-gray-800">Time Bank</h1>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded-lg shadow flex items-center gap-4">
          <Clock className="text-blue-500" size={24} />
          <div>
            <p className="text-sm text-gray-500">Available for time off</p>
            <p className="font-bold text-lg">{availableHours} h</p>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow flex items-center gap-4">
          <DollarSign className="text-green-500" size={24} />
          <div>
            <p className="text-sm text-gray-500">Available for payout</p>
            <p className="font-bold text-lg">{totalHours} h</p>
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow flex items-center gap-4">
          <ArrowDownCircle className="text-purple-500" size={24} />
          <div>
            <p className="text-sm text-gray-500">Withdrawals made</p>
            <p className="font-bold text-lg">{withdrawals}</p>
          </div>
        </div>
      </div>

      {/* Detailed history */}
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Details</h2>
      <ul className="bg-white rounded-lg shadow divide-y divide-gray-200">
        <li className="p-4 flex justify-between">
          <span className="text-gray-600">ATF (Arbetstidsförkortning)</span>
          <span className="font-medium">{atfHours} h</span>
        </li>
        <li className="p-4 flex justify-between">
          <span className="text-gray-600">Overtime saved</span>
          <span className="font-medium">{overtimeHours} h</span>
        </li>
        <li className="p-4 flex justify-between">
          <span className="text-gray-600">Withdrawals (this year)</span>
          <span className="font-medium">{withdrawals} st</span>
        </li>
      </ul>

      {/* Future: Request button */}
      <div className="flex justify-end mt-6">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition hover:scale-105">
          Request Withdrawal
        </button>
      </div>
    </div>
  );
};

export default TimeBankCard;
