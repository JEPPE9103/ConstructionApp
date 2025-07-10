import React, { useEffect, useState } from 'react';
import { DollarSign, Clock, ArrowRightCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SalaryCard: React.FC = () => {
  const { t } = useTranslation();
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
    <div className="w-full bg-gradient-to-br from-[#fff9f9] to-[#f0f8ff] rounded-2xl shadow-xl p-2 sm:p-4 md:p-8 animate-fade-in max-w-full sm:max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <DollarSign className="text-green-500" size={24} />
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{t('salary_overview')}</h1>
      </div>

      {/* Salary box */}
      <div className="p-3 sm:p-6 bg-white rounded-xl shadow flex flex-col md:flex-row items-center justify-between mb-4 sm:mb-6 max-w-full sm:max-w-full mx-auto">
        <div className="flex items-center gap-2 sm:gap-4">
          <DollarSign className="text-green-500" size={28} />
          <div>
            <p className="text-gray-600 text-xs sm:text-sm">{t('monthly_salary')}</p>
            <p className="text-xl sm:text-2xl font-bold">{monthlySalary.toLocaleString('sv-SE')} {t('kr')}</p>
          </div>
        </div>
        <div className="mt-3 sm:mt-0 flex items-center gap-2 sm:gap-4">
          <Clock className="text-blue-500" size={22} />
          <div>
            <p className="text-gray-600 text-xs sm:text-sm">{t('overtime_balance')}</p>
            <p className="font-semibold text-base sm:text-lg">{overtimeBalance} {t('hours')}</p>
          </div>
        </div>
      </div>

      {/* Summary list */}
      <ul className="bg-white rounded-xl shadow divide-y divide-gray-200">
        <li className="p-3 sm:p-4 flex justify-between">
          <span className="text-gray-600">{t('atf')}</span>
          <span className="font-medium">{atf} {t('hours')}</span>
        </li>
        <li className="p-3 sm:p-4 flex justify-between">
          <span className="text-gray-600">{t('upcoming_payouts')}</span>
          <span className="font-medium">{upcomingPayout} {t('pcs')}</span>
        </li>
      </ul>

      {/* View details */}
      <div className="flex justify-end mt-4 sm:mt-6">
        <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow transition hover:scale-105 text-sm sm:text-base">
          {t('view_details')} <ArrowRightCircle size={18} />
        </button>
      </div>
    </div>
  );
};

export default SalaryCard;
