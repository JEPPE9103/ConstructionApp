// src/pages/TimeReport/TimeReportView.tsx
import React, { useEffect, useState } from 'react';
import { Calendar, FileText, Filter } from 'lucide-react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

interface TimeReport {
  id: string;
  date: string;
  hours: number;
  project: string;
  description: string;
  userId: string;
}

const TimeReportView: React.FC = () => {
  const [user] = useAuthState(auth);
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'all'>('week');
  const [reports, setReports] = useState<TimeReport[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  useEffect(() => {
    const fetchReports = async () => {
      if (!user) return;

      const q = query(collection(db, 'timereports'), where('userId', '==', user.uid));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as TimeReport[];
      setReports(data);
    };

    fetchReports();
  }, [user]);

  const getFilteredReports = () => {
    const now = new Date();
    return reports.filter((report) => {
      const reportDate = new Date(report.date);
      if (selectedDate) return report.date === selectedDate;

      if (timeFilter === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return reportDate >= weekAgo;
      }
      if (timeFilter === 'month') {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return reportDate >= monthAgo;
      }
      return true;
    });
  };

  const totalHours = getFilteredReports().reduce((sum, r) => sum + r.hours, 0);

  return (
    <div className="w-full bg-gradient-to-br from-[#f8fbff] to-[#f0f4ff] rounded-2xl shadow-xl p-4 md:p-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <FileText className="text-blue-500" size={32} />
          <h1 className="text-2xl font-bold text-gray-800">Time Reports</h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setShowCalendar(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Calendar size={20} /> Select Date
          </button>
          <div className="flex items-center gap-2">
            <Filter className="text-blue-400" size={20} />
            <select
              value={timeFilter}
              onChange={(e) => {
                setTimeFilter(e.target.value as 'week' | 'month' | 'all');
                setSelectedDate('');
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>
      </div>

      {selectedDate && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg flex justify-between items-center">
          <span className="text-blue-700">Showing reports for: {new Date(selectedDate).toLocaleDateString()}</span>
          <button onClick={() => setSelectedDate('')} className="text-blue-600 hover:text-blue-800">Clear</button>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs text-gray-500">Date</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500">Project</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500">Hours</th>
              <th className="px-6 py-3 text-left text-xs text-gray-500">Description</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredReports().map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{new Date(r.date).toLocaleDateString()}</td>
                <td className="px-6 py-4">{r.project}</td>
                <td className="px-6 py-4">{r.hours}</td>
                <td className="px-6 py-4">{r.description}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td colSpan={2} className="px-6 py-4 font-medium">Total Hours</td>
              <td className="px-6 py-4 font-medium">{totalHours}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {showCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Select Date</h2>
              <button onClick={() => setShowCalendar(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setShowCalendar(false);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeReportView;
