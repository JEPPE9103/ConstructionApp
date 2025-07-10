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
    <div className="w-full px-1 sm:px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mt-2 sm:mt-4 md:mt-8 overflow-x-hidden">
      {/* Time Report */}
      <Link
        to="/dashboard/time-report"
        className="rounded-xl shadow-md p-3 sm:p-4 bg-[#f0f4ff] flex flex-col items-start hover:scale-105 transition duration-200 active:scale-100 min-w-0 w-full text-base sm:text-sm"
      >
        <div className="bg-white p-3 rounded-full shadow mb-2"><FiClock size={28} className="text-blue-500" /></div>
        <div>
          <div className="font-semibold text-sm md:text-lg">{t('time_report')}</div>
          <div className="text-gray-500 text-xs md:text-sm">{t('time_report_desc')}</div>
        </div>
      </Link>

      {/* Check In/Out */}
      <Link
        to="/dashboard/check-in"
        className="rounded-xl shadow-md p-3 sm:p-4 bg-[#e8fef1] flex flex-col items-start hover:scale-105 transition duration-200 active:scale-100 min-w-0 w-full text-base sm:text-sm"
      >
        <div className="bg-white p-3 rounded-full shadow mb-2"><FiMapPin size={28} className="text-green-500" /></div>
        <div>
          <div className="font-semibold text-sm md:text-lg">{t('check_in_out')}</div>
          <div className="text-gray-500 text-xs md:text-sm">{t('check_in_out_desc')}</div>
        </div>
      </Link>

      {/* Map Check-In */}
      <Link
        to="/dashboard/check-in/map"
        className="rounded-xl shadow-md p-3 sm:p-4 bg-[#e0f7ff] flex flex-col items-start hover:scale-105 transition duration-200 active:scale-100 min-w-0 w-full text-base sm:text-sm"
      >
        <div className="bg-white p-3 rounded-full shadow mb-2"><FiMap size={28} className="text-cyan-500" /></div>
        <div>
          <div className="font-semibold text-sm md:text-lg">{t('map_check_in')}</div>
          <div className="text-gray-500 text-xs md:text-sm">{t('map_check_in_desc')}</div>
        </div>
      </Link>

      {/* Salary Overview */}
      <Link
        to="/dashboard/salary"
        className="rounded-xl shadow-md p-3 sm:p-4 bg-[#fff9e5] flex flex-col items-start hover:scale-105 transition duration-200 active:scale-100 min-w-0 w-full text-base sm:text-sm"
      >
        <div className="bg-white p-3 rounded-full shadow mb-2"><FiDollarSign size={28} className="text-yellow-500" /></div>
        <div>
          <div className="font-semibold text-sm md:text-lg">{t('salary_overview')}</div>
          <div className="text-gray-500 text-xs md:text-sm">{t('salary_overview_desc')}</div>
        </div>
      </Link>

      {/* Upload Photo */}
      <Link
        to="/dashboard/upload"
        className="rounded-xl shadow-md p-3 sm:p-4 bg-[#f5f0ff] flex flex-col items-start hover:scale-105 transition duration-200 active:scale-100 min-w-0 w-full text-base sm:text-sm"
      >
        <div className="bg-white p-3 rounded-full shadow mb-2"><FiUpload size={28} className="text-purple-500" /></div>
        <div>
          <div className="font-semibold text-sm md:text-lg">{t('upload_photo')}</div>
          <div className="text-gray-500 text-xs md:text-sm">{t('upload_photo_desc')}</div>
        </div>
      </Link>

      {/* Admin Panel */}
      <Link
        to="/dashboard/admin"
        className="rounded-xl shadow-md p-3 sm:p-4 bg-[#fef2f2] flex flex-col items-start hover:scale-105 transition duration-200 active:scale-100 min-w-0 w-full text-base sm:text-sm"
      >
        <div className="bg-white p-3 rounded-full shadow mb-2"><FiBriefcase size={28} className="text-red-500" /></div>
        <div>
          <div className="font-semibold text-sm md:text-lg">{t('admin_panel')}</div>
          <div className="text-gray-500 text-xs md:text-sm">{t('admin_panel_desc')}</div>
        </div>
      </Link>
    </div>
  );
};

export default DashboardHomeCards;
