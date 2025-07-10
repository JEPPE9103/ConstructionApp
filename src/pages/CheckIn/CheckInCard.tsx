import { MapPin, ClipboardList, Folder, FileText } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

const CheckInCard: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full bg-gradient-to-br from-[#e8fef1] to-[#f8fbff] rounded-2xl shadow-xl p-2 sm:p-4 md:p-8 animate-fade-in max-w-full sm:max-w-2xl mx-auto">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-8">
        <MapPin className="text-green-500" size={24} />
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{t('check_in_out')}</h1>
      </div>
      <form className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 flex items-center gap-1 sm:gap-2">
              <ClipboardList size={16} className="text-green-400" /> {t('check_type')}
            </label>
            <select
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-400 transition-colors"
              required
            >
              <option value="check-in">{t('check_in')}</option>
              <option value="check-out">{t('check_out')}</option>
            </select>
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 flex items-center gap-1 sm:gap-2">
              <Folder size={16} className="text-green-400" /> {t('project')}
            </label>
            <select
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-400 transition-colors"
              required
            >
              <option value="">{t('select_project')}</option>
              <option value="Project 1">Project 1</option>
              <option value="Project 2">Project 2</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 flex items-center gap-1 sm:gap-2">
            <MapPin size={16} className="text-green-400" /> {t('location')}
          </label>
          <input
            type="text"
            placeholder={t('enter_location')}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-400 transition-colors"
            required
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 flex items-center gap-1 sm:gap-2">
            <FileText size={16} className="text-green-400" /> {t('notes')}
          </label>
          <textarea
            rows={3}
            placeholder={t('add_notes')}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-400 transition-colors resize-none"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300 text-sm sm:text-base"
          >
            {t('submit_check_in')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckInCard; 