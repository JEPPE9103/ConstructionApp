import { Calendar, Clock, Folder, FileText } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const TimeReportCard: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-br from-[#f8fbff] to-[#f0f4ff] rounded-2xl shadow-xl p-4 md:p-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Clock className="text-blue-500" size={32} />
          <h1 className="text-2xl font-bold text-gray-800">Time Report</h1>
        </div>
        <Link
          to="/dashboard/time-report/view"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto"
        >
          <FileText size={20} />
          View Reports
        </Link>
      </div>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Calendar size={18} className="text-blue-400" /> Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Clock size={18} className="text-blue-400" /> Hours
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              placeholder="Enter hours worked"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-colors"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <Folder size={18} className="text-blue-400" /> Project
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-colors"
            required
          >
            <option value="">Select a project</option>
            <option value="Project 1">Project 1</option>
            <option value="Project 2">Project 2</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <FileText size={18} className="text-blue-400" /> Description
          </label>
          <textarea
            rows={3}
            placeholder="Enter work description..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-colors resize-none"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default TimeReportCard; 