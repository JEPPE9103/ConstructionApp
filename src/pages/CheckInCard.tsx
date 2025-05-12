import { MapPin, ClipboardList, Folder, FileText } from 'lucide-react';
import React from 'react';

const CheckInCard: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-br from-[#e8fef1] to-[#f8fbff] rounded-2xl shadow-xl p-8 animate-fade-in">
      <div className="flex items-center mb-8 gap-3">
        <MapPin className="text-green-500" size={32} />
        <h1 className="text-2xl font-bold text-gray-800">Check In/Out</h1>
      </div>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <ClipboardList size={18} className="text-green-400" /> Check Type
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-400 transition-colors"
              required
            >
              <option value="check-in">Check In</option>
              <option value="check-out">Check Out</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Folder size={18} className="text-green-400" /> Project
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-400 transition-colors"
              required
            >
              <option value="">Select a project</option>
              <option value="Project 1">Project 1</option>
              <option value="Project 2">Project 2</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <MapPin size={18} className="text-green-400" /> Location
          </label>
          <input
            type="text"
            placeholder="Enter your location"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-400 transition-colors"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <FileText size={18} className="text-green-400" /> Notes
          </label>
          <textarea
            rows={3}
            placeholder="Add any additional notes..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-400 transition-colors resize-none"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Submit Check In
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckInCard; 