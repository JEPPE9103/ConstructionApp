import React, { useState } from 'react';
import { Calendar, FileText, Filter } from 'lucide-react';

interface TimeReport {
  id: string;
  date: string;
  hours: number;
  project: string;
  description: string;
}

const TimeReportView: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'all'>('week');
  const [reports] = useState<TimeReport[]>([]);// This would be populated from your backend
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  const getFilteredReports = () => {
    const now = new Date();
    const filtered = reports.filter(report => {
      const reportDate = new Date(report.date);
      if (selectedDate) {
        return report.date === selectedDate;
      }
      if (timeFilter === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return reportDate >= weekAgo;
      } else if (timeFilter === 'month') {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return reportDate >= monthAgo;
      }
      return true;
    });
    return filtered;
  };

  const totalHours = getFilteredReports().reduce((sum, report) => sum + report.hours, 0);

  return (
    <div className="w-full bg-gradient-to-br from-[#f8fbff] to-[#f0f4ff] rounded-2xl shadow-xl p-4 md:p-8 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <FileText className="text-blue-500" size={32} />
          <h1 className="text-2xl font-bold text-gray-800">Time Reports</h1>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <button
            onClick={() => setShowCalendar(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
          >
            <Calendar size={20} />
            Select Date
          </button>
          <div className="flex items-center gap-2">
            <Filter className="text-blue-400" size={20} />
            <select
              value={timeFilter}
              onChange={(e) => {
                setTimeFilter(e.target.value as 'week' | 'month' | 'all');
                setSelectedDate(''); // Reset selected date when changing filter
              }}
              className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Date Filter Banner */}
      {selectedDate && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span className="text-blue-700">
            Showing reports for: {new Date(selectedDate).toLocaleDateString()}
          </span>
          <button
            onClick={() => setSelectedDate('')}
            className="text-blue-600 hover:text-blue-800 whitespace-nowrap"
          >
            Clear date filter
          </button>
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {getFilteredReports().map((report) => (
              <tr key={report.id} className="hover:bg-gray-50">
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(report.date).toLocaleDateString()}
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.project}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.hours}</td>
                <td className="px-4 md:px-6 py-4 text-sm text-gray-900">{report.description}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td colSpan={2} className="px-4 md:px-6 py-4 text-sm font-medium text-gray-900">Total Hours</td>
              <td className="px-4 md:px-6 py-4 text-sm font-medium text-gray-900">{totalHours}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Calendar Modal */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Select Date</h2>
              <button
                onClick={() => setShowCalendar(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setShowCalendar(false);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeReportView; 