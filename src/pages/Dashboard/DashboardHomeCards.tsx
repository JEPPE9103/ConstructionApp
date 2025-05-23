import {
  FiClock,
  FiMapPin,
  FiDollarSign,
  FiMap,
  FiUpload,
  FiBriefcase
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

const DashboardHomeCards = () => (
  <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-8 px-4">
    {/* Time Report */}
    <Link
      to="/dashboard/time-report"
      className="flex flex-col sm:flex-row items-start sm:items-center bg-[#f0f4ff] rounded-xl p-6 shadow-xl hover:scale-105 transition duration-200 gap-4"
    >
      <div className="bg-white p-3 rounded-full shadow"><FiClock size={28} className="text-blue-500" /></div>
      <div>
        <div className="font-semibold text-lg">Time Report</div>
        <div className="text-gray-500 text-sm">Submit your working hours and project details</div>
      </div>
    </Link>

    {/* Check In/Out */}
    <Link
      to="/dashboard/check-in"
      className="flex flex-col sm:flex-row items-start sm:items-center bg-[#e8fef1] rounded-xl p-6 shadow-xl hover:scale-105 transition duration-200 gap-4"
    >
      <div className="bg-white p-3 rounded-full shadow"><FiMapPin size={28} className="text-green-500" /></div>
      <div>
        <div className="font-semibold text-lg">Check In/Out</div>
        <div className="text-gray-500 text-sm">Record your work attendance</div>
      </div>
    </Link>

    {/* Map Check-In */}
    <Link
      to="/dashboard/map-checkin"
      className="flex flex-col sm:flex-row items-start sm:items-center bg-[#e0f7ff] rounded-xl p-6 shadow-xl hover:scale-105 transition duration-200 gap-4"
    >
      <div className="bg-white p-3 rounded-full shadow"><FiMap size={28} className="text-cyan-500" /></div>
      <div>
        <div className="font-semibold text-lg">Map Check-In</div>
        <div className="text-gray-500 text-sm">Use GPS to check in at worksites</div>
      </div>
    </Link>

    {/* Salary Overview */}
    <Link
      to="/dashboard/salary"
      className="flex flex-col sm:flex-row items-start sm:items-center bg-[#fff9e5] rounded-xl p-6 shadow-xl hover:scale-105 transition duration-200 gap-4"
    >
      <div className="bg-white p-3 rounded-full shadow"><FiDollarSign size={28} className="text-yellow-500" /></div>
      <div>
        <div className="font-semibold text-lg">Salary Overview</div>
        <div className="text-gray-500 text-sm">View salary and bonus hours</div>
      </div>
    </Link>

    {/* Upload Photo */}
    <Link
      to="/dashboard/upload"
      className="flex flex-col sm:flex-row items-start sm:items-center bg-[#f5f0ff] rounded-xl p-6 shadow-xl hover:scale-105 transition duration-200 gap-4"
    >
      <div className="bg-white p-3 rounded-full shadow"><FiUpload size={28} className="text-purple-500" /></div>
      <div>
        <div className="font-semibold text-lg">Upload Photo</div>
        <div className="text-gray-500 text-sm">Upload project photos with comments</div>
      </div>
    </Link>

    {/* Admin Panel */}
    <Link
      to="/dashboard/admin-panel"
      className="flex flex-col sm:flex-row items-start sm:items-center bg-[#fef2f2] rounded-xl p-6 shadow-xl hover:scale-105 transition duration-200 gap-4"
    >
      <div className="bg-white p-3 rounded-full shadow"><FiBriefcase size={28} className="text-red-500" /></div>
      <div>
        <div className="font-semibold text-lg">Admin Panel</div>
        <div className="text-gray-500 text-sm">Manage users and reports</div>
      </div>
    </Link>
  </div>
);

export default DashboardHomeCards;
