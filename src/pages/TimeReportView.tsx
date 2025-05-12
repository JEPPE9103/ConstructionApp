import React, { useState } from 'react';
import { Calendar, Clock, FileText, Filter } from 'lucide-react';

interface TimeReport {
  id: string;
  date: string;
  hours: number;
  project: string;
  description: string;
}

const TimeReportView: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'all'>('week');
  const [reports, setReports] = useState<TimeReport[]>([]); // This would be populated from your backend
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
    <div className="w-full bg-gradient-to-br from-[#f8fbff] to-[#f0f4ff] rounded-2xl shadow-xl p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <FileText className="text-blue-500" size={32} />
          <h1 className="text-2xl font-bold text-gray-800">Time Reports</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowCalendar(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>
      </div>

      {selectedDate && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
          <span className="text-blue-700">
            Showing reports for: {new Date(selectedDate).toLocaleDateString()}
          </span>
          <button
            onClick={() => setSelectedDate('')}
            className="text-blue-600 hover:text-blue-800"
          >
            Clear date filter
          </button>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {getFilteredReports().map((report) => (
              <tr key={report.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(report.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.project}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.hours}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{report.description}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td colSpan={2} className="px-6 py-4 text-sm font-medium text-gray-900">Total Hours</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{totalHours}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Calendar Modal */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
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