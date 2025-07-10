import {
  FiClock,
  FiMapPin,
  FiDollarSign,
  FiMap,
  FiUpload,
  FiBriefcase
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DashboardHomeCards = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full px-1 sm:px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 mt-2 sm:mt-4 md:mt-8 overflow-x-hidden">
      {/* Time Report */}
      <Link
        to="/dashboard/time-report"
        className="rounded-xl shadow-md p-2 sm:p-4 md:p-6 bg-[#f0f4ff] flex flex-col items-start hover:scale-105 transition duration-200 active:scale-100 min-w-0 w-full text-base sm:text-sm mb-3"
      >
        <div className="bg-white p-2 sm:p-3 rounded-full shadow mb-2"><FiClock size={24} className="sm:hidden text-blue-500" /><FiClock size={28} className="hidden sm:inline text-blue-500" /></div>
        <div>
          <div className="font-semibold text-sm md:text-lg">{t('time_report')}</div>
          <div className="text-gray-500 text-xs md:text-sm">{t('time_report_desc')}</div>
        </div>
      </Link>

      {/* Check In/Out */}
      <Link
        to="/dashboard/check-in"
        className="rounded-xl shadow-md p-2 sm:p-4 md:p-6 bg-[#e8fef1] flex flex-col items-start hover:scale-105 transition duration-200 active:scale-100 min-w-0 w-full text-base sm:text-sm mb-3"
      >
        <div className="bg-white p-2 sm:p-3 rounded-full shadow mb-2"><FiMapPin size={24} className="sm:hidden text-green-500" /><FiMapPin size={28} className="hidden sm:inline text-green-500" /></div>
        <div>
          <div className="font-semibold text-sm md:text-lg">{t('check_in_out')}</div>
          <div className="text-gray-500 text-xs md:text-sm">{t('check_in_out_desc')}</div>
        </div>
      </Link>

      {/* Map Check-In */}
      <Link
        to="/dashboard/check-in/map"
        className="rounded-xl shadow-md p-2 sm:p-4 md:p-6 bg-[#e0f7ff] flex flex-col items-start hover:scale-105 transition duration-200 active:scale-100 min-w-0 w-full text-base sm:text-sm mb-3"
      >
        <div className="bg-white p-2 sm:p-3 rounded-full shadow mb-2"><FiMap size={24} className="sm:hidden text-cyan-500" /><FiMap size={28} className="hidden sm:inline text-cyan-500" /></div>
        <div>
          <div className="font-semibold text-sm md:text-lg">{t('map_check_in')}</div>
          <div className="text-gray-500 text-xs md:text-sm">{t('map_check_in_desc')}</div>
        </div>
      </Link>

      {/* Salary Overview */}
      <Link
        to="/dashboard/salary"
        className="rounded-xl shadow-md p-2 sm:p-4 md:p-6 bg-[#fff9e5] flex flex-col items-start hover:scale-105 transition duration-200 active:scale-100 min-w-0 w-full text-base sm:text-sm mb-3"
      >
        <div className="bg-white p-2 sm:p-3 rounded-full shadow mb-2"><FiDollarSign size={24} className="sm:hidden text-yellow-500" /><FiDollarSign size={28} className="hidden sm:inline text-yellow-500" /></div>
        <div>
          <div className="font-semibold text-sm md:text-lg">{t('salary_overview')}</div>
          <div className="text-gray-500 text-xs md:text-sm">{t('salary_overview_desc')}</div>
        </div>
      </Link>

      {/* Upload Photo */}
      <Link
        to="/dashboard/upload"
        className="rounded-xl shadow-md p-2 sm:p-4 md:p-6 bg-[#f5f0ff] flex flex-col items-start hover:scale-105 transition duration-200 active:scale-100 min-w-0 w-full text-base sm:text-sm mb-3"
      >
        <div className="bg-white p-2 sm:p-3 rounded-full shadow mb-2"><FiUpload size={24} className="sm:hidden text-purple-500" /><FiUpload size={28} className="hidden sm:inline text-purple-500" /></div>
        <div>
          <div className="font-semibold text-sm md:text-lg">{t('upload_photo')}</div>
          <div className="text-gray-500 text-xs md:text-sm">{t('upload_photo_desc')}</div>
        </div>
      </Link>

      {/* Admin Panel */}
      <Link
        to="/dashboard/admin"
        className="rounded-xl shadow-md p-2 sm:p-4 md:p-6 bg-[#fef2f2] flex flex-col items-start hover:scale-105 transition duration-200 active:scale-100 min-w-0 w-full text-base sm:text-sm mb-3"
      >
        <div className="bg-white p-2 sm:p-3 rounded-full shadow mb-2"><FiBriefcase size={24} className="sm:hidden text-red-500" /><FiBriefcase size={28} className="hidden sm:inline text-red-500" /></div>
        <div>
          <div className="font-semibold text-sm md:text-lg">{t('admin_panel')}</div>
          <div className="text-gray-500 text-xs md:text-sm">{t('admin_panel_desc')}</div>
        </div>
      </Link>
    </div>
  );
};

export default DashboardHomeCards;
