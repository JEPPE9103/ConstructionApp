import React, { useEffect, useState } from 'react';
import { DollarSign, Clock, ArrowRightCircle } from 'lucide-react';

const SalaryCard: React.FC = () => {
  const [monthlySalary, setMonthlySalary] = useState(0);

  const overtimeBalance = 6.5;
  const atf = 4.5;
  const upcomingPayout = 2;

  useEffect(() => {
    const saved = localStorage.getItem('userBaseSalary');
    if (saved) {
      setMonthlySalary(parseInt(saved));
    } else {
      setMonthlySalary(35200); // fallback default
    }
  }, []);

  return (
    <div className="w-full bg-gradient-to-br from-[#fff9f9] to-[#f0f8ff] rounded-2xl shadow-xl p-4 md:p-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <DollarSign className="text-green-500" size={32} />
        <h1 className="text-2xl font-bold text-gray-800">Salary Overview</h1>
      </div>

      {/* Salary box */}
      <div className="p-6 bg-white rounded-xl shadow flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <DollarSign className="text-green-500" size={36} />
          <div>
            <p className="text-gray-600 text-sm">Monthly Salary</p>
            <p className="text-2xl font-bold">{monthlySalary.toLocaleString('sv-SE')} kr</p>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-4">
          <Clock className="text-blue-500" size={28} />
          <div>
            <p className="text-gray-600 text-sm">Overtime Balance</p>
            <p className="font-semibold text-lg">{overtimeBalance} h</p>
          </div>
        </div>
      </div>

      {/* Summary list */}
      <ul className="bg-white rounded-xl shadow divide-y divide-gray-200">
        <li className="p-4 flex justify-between">
          <span className="text-gray-600">ATF (Arbetstidsförkortning)</span>
          <span className="font-medium">{atf} h</span>
        </li>
        <li className="p-4 flex justify-between">
          <span className="text-gray-600">Upcoming Payouts</span>
          <span className="font-medium">{upcomingPayout} st</span>
        </li>
      </ul>

      {/* View details */}
      <div className="flex justify-end mt-6">
        <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow transition hover:scale-105">
          View Details <ArrowRightCircle size={20} />
        </button>
      </div>
    </div>
  );
};

export default SalaryCard;
