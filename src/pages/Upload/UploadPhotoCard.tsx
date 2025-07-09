import { Upload, Folder, FileText } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

const UploadPhotoCard: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full bg-gradient-to-br from-[#f5f0ff] to-[#f8f5ff] rounded-2xl shadow-xl p-4 md:p-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Upload className="text-purple-500" size={32} />
          <h1 className="text-2xl font-bold text-gray-800">{t('upload_photo')}</h1>
        </div>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Folder size={18} className="text-purple-400" /> {t('project')}
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
              <FileText size={18} className="text-purple-400" /> Description
            </label>
            <input
              type="text"
              placeholder="Enter photo description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-colors"
              required
            />
          </div>
        </div>

        <div className="border-2 border-dashed border-purple-200 rounded-lg p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <Upload className="text-purple-400" size={48} />
            <div className="text-gray-600">
              <p className="font-medium">Drag and drop your photo here</p>
              <p className="text-sm">or</p>
            </div>
            <button
              type="button"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Browse Files
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-300"
          >
            {t('upload_photo')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadPhotoCard; 