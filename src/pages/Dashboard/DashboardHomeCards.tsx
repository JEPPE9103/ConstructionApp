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
  <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-8">
    
    {/* Time Report */}
    <Link to="/dashboard/time-report" className="...">
      <div><FiClock size={32} className="text-blue-500" /></div>
      <div>
        <div className="font-semibold text-lg">Time Report</div>
        <div className="text-gray-500 text-sm">Submit your working hours and project details</div>
      </div>
    </Link>

    {/* Check In/Out */}
    <Link to="/dashboard/check-in" className="...">
      <div><FiMapPin size={32} className="text-green-500" /></div>
      <div>
        <div className="font-semibold text-lg">Check In/Out</div>
        <div className="text-gray-500 text-sm">Record your work attendance</div>
      </div>
    </Link>

    {/* ✅ FIXED Map Check-In */}
    <Link to="/dashboard/check-in/map" className="...">
      <div><FiMap size={32} className="text-cyan-500" /></div>
      <div>
        <div className="font-semibold text-lg">Map Check-In</div>
        <div className="text-gray-500 text-sm">Use GPS to check in at worksites</div>
      </div>
    </Link>

    {/* Salary Overview */}
    <Link to="/dashboard/salary" className="...">
      <div><FiDollarSign size={32} className="text-yellow-500" /></div>
      <div>
        <div className="font-semibold text-lg">Salary Overview</div>
        <div className="text-gray-500 text-sm">View salary and bonus hours</div>
      </div>
    </Link>

    {/* Upload Photo */}
    <Link to="/dashboard/upload" className="...">
      <div><FiUpload size={32} className="text-purple-500" /></div>
      <div>
        <div className="font-semibold text-lg">Upload Photo</div>
        <div className="text-gray-500 text-sm">Upload project photos with comments</div>
      </div>
    </Link>

    {/* ✅ FIXED Admin Panel */}
    <Link to="/dashboard/admin" className="...">
      <div><FiBriefcase size={32} className="text-red-500" /></div>
      <div>
        <div className="font-semibold text-lg">Admin Panel</div>
        <div className="text-gray-500 text-sm">Manage users and reports</div>
      </div>
    </Link>
  </div>
);

export default DashboardHomeCards;
