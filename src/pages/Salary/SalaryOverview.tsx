// src/pages/Salary/SalaryOverview.tsx
import { FiDollarSign, FiCalendar } from 'react-icons/fi';

const SalaryOverview = () => {
  const salaryInfo = {
    baseSalary: 34000,
    overtimeHours: 12,
    timeBankHours: 8,
    atfHours: 5,
  };

  const payouts = [
    { id: 1, month: 'April 2025', salary: 34000, overtime: 2200 },
    { id: 2, month: 'March 2025', salary: 34000, overtime: 1800 },
    { id: 3, month: 'February 2025', salary: 34000, overtime: 900 },
  ];

  return (
    <div className="w-full bg-gradient-to-br from-[#fdfdfd] to-[#f0f7ff] rounded-2xl shadow-xl p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <FiDollarSign size={28} className="text-green-500" />
        <h1 className="text-2xl font-bold text-gray-800">Salary Overview</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl border p-4 shadow-sm">
          <div className="text-sm text-gray-500">Base Salary</div>
          <div className="text-xl font-semibold text-green-600">{salaryInfo.baseSalary.toLocaleString()} kr</div>
        </div>
        <div className="bg-white rounded-xl border p-4 shadow-sm">
          <div className="text-sm text-gray-500">Overtime Hours</div>
          <div className="text-xl font-semibold text-blue-600">{salaryInfo.overtimeHours} h</div>
        </div>
        <div className="bg-white rounded-xl border p-4 shadow-sm">
          <div className="text-sm text-gray-500">Time Bank (Comp)</div>
          <div className="text-xl font-semibold text-purple-600">{salaryInfo.timeBankHours} h</div>
        </div>
        <div className="bg-white rounded-xl border p-4 shadow-sm">
          <div className="text-sm text-gray-500">ATF Hours</div>
          <div className="text-xl font-semibold text-yellow-600">{salaryInfo.atfHours} h</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
        <table className="w-full table-auto">
          <thead className="bg-gray-50 text-left text-sm text-gray-500 uppercase">
            <tr>
              <th className="p-4"><FiCalendar className="inline mr-1" />Month</th>
              <th className="p-4">Salary</th>
              <th className="p-4">Overtime</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {payouts.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition">
                <td className="p-4">{row.month}</td>
                <td className="p-4">{row.salary.toLocaleString()} kr</td>
                <td className="p-4">{row.overtime.toLocaleString()} kr</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalaryOverview;
