import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  email: string;
  atfHours: number;
}

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Jesper Persson',
    email: 'jespetipersson@example.com',
    atfHours: 52.0,
  },
  {
    id: '2',
    name: 'Stina Andersson',
    email: 'stina.andersson@example.com',
    atfHours: 40.0,
  },
];

const AdminPanel: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredEmployees = mockEmployees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 mt-8 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Adminpanel</h1>

      {/* Search field */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Sök anställd"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg pl-10 focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
      </div>

      {/* Employee list */}
      <ul className="space-y-3">
        {filteredEmployees.map((emp) => (
          <li
            key={emp.id}
            className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition cursor-pointer"
          >
            <div>
              <p className="font-medium text-gray-800">{emp.name}</p>
              <p className="text-sm text-gray-500">{emp.email}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">ATF</p>
              <p className="text-lg font-semibold text-blue-600">{emp.atfHours.toFixed(1)} h</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
