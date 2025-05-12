import { FiClock, FiMapPin, FiUpload } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const DashboardHomeCards = () => (
  <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
    {/* Time Report Card */}
    <Link
      to="/dashboard/time-report"
      className="flex items-center bg-[#f0f4ff] rounded-xl p-6 shadow transition hover:scale-105 duration-200 cursor-pointer gap-4"
    >
      <div><FiClock size={32} className="text-blue-500" /></div>
      <div>
        <div className="font-semibold text-lg">Time Report</div>
        <div className="text-gray-500 text-sm">Submit your working hours and project details</div>
      </div>
    </Link>
    {/* Check In/Out Card */}
    <Link
      to="/dashboard/check-in"
      className="flex items-center bg-[#e8fef1] rounded-xl p-6 shadow transition hover:scale-105 duration-200 cursor-pointer gap-4"
    >
      <div><FiMapPin size={32} className="text-green-500" /></div>
      <div>
        <div className="font-semibold text-lg">Check In/Out</div>
        <div className="text-gray-500 text-sm">Record your work attendance</div>
      </div>
    </Link>
    {/* Upload Photo Card (full width on md) */}
    <Link
      to="/dashboard/upload"
      className="flex items-center bg-[#f5f0ff] rounded-xl p-6 shadow transition hover:scale-105 duration-200 cursor-pointer gap-4 md:col-span-2"
    >
      <div><FiUpload size={32} className="text-purple-500" /></div>
      <div>
        <div className="font-semibold text-lg">Upload Photo</div>
        <div className="text-gray-500 text-sm">Upload project photos with comments</div>
      </div>
    </Link>
  </div>
);

export default DashboardHomeCards; 