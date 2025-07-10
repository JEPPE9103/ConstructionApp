// src/pages/Logbook/LogbookView.tsx
import { FiMapPin, FiFileText, FiClock } from 'react-icons/fi';

const mockLogbook = [
  {
    id: 'log1',
    type: 'Check In',
    location: 'Tunnelbygge Öst',
    project: 'Stockholm',
    note: 'Började kl 07:00',
    date: '2025-05-15 07:03',
  },
  {
    id: 'log2',
    type: 'Check Out',
    location: 'Tunnelbygge Öst',
    project: 'Stockholm',
    note: 'Slutade 16:00, allt klart',
    date: '2025-05-15 16:04',
  },
  {
    id: 'log3',
    type: 'Check In',
    location: 'Renovering Skola',
    project: 'Göteborg',
    note: 'Lite försenad pga trafik',
    date: '2025-05-14 07:20',
  },
];

const LogbookView = () => {
  return (
    <div className="w-full bg-gradient-to-br from-[#f8fbff] to-[#f0f4ff] rounded-2xl shadow-xl p-2 sm:p-4 md:p-8 animate-fade-in max-w-full sm:max-w-2xl mx-auto">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <FiClock size={24} className="sm:hidden text-blue-500" />
        <FiClock size={28} className="hidden sm:inline text-blue-500" />
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Logbook</h1>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {mockLogbook.map((log) => (
          <div
            key={log.id}
            className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition hover:scale-[1.01]"
          >
            <div className="flex justify-between items-center mb-1 sm:mb-2">
              <span
                className={`text-xs sm:text-sm font-medium ${
                  log.type === 'Check In' ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {log.type}
              </span>
              <span className="text-xs text-gray-500">{log.date}</span>
            </div>
            <div className="text-xs sm:text-sm text-gray-700 flex items-center gap-1 sm:gap-2">
              <FiMapPin className="text-blue-400" />
              {log.location} – <span className="text-gray-500">{log.project}</span>
            </div>
            <div className="text-xs sm:text-sm text-gray-600 mt-1 flex items-center gap-1 sm:gap-2">
              <FiFileText className="text-gray-400" />
              {log.note}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogbookView;
