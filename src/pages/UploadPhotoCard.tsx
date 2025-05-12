import { UploadCloud, Folder, FileText, Image } from 'lucide-react';
import React from 'react';

const UploadPhotoCard: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-br from-[#f5f0ff] to-[#f8fbff] rounded-2xl shadow-xl p-8 animate-fade-in">
      <div className="flex items-center mb-8 gap-3">
        <UploadCloud className="text-purple-500" size={32} />
        <h1 className="text-2xl font-bold text-gray-800">Upload Photos</h1>
      </div>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Folder size={18} className="text-purple-400" /> Project
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-colors"
              required
            >
              <option value="">Select a project</option>
              <option value="Project 1">Project 1</option>
              <option value="Project 2">Project 2</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Image size={18} className="text-purple-400" /> Photos
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <FileText size={18} className="text-purple-400" /> Description
          </label>
          <textarea
            rows={3}
            placeholder="Add a description for the photos..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-colors resize-none"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-300"
          >
            Upload Photos
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadPhotoCard; 