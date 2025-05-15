// ✅ TimeReportCard.tsx
import React, { useState } from 'react';
import { Calendar, Clock, Folder, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';

const TimeReportCard: React.FC = () => {
  const [date, setDate] = useState('');
  const [hours, setHours] = useState('');
  const [project, setProject] = useState('');
  const [description, setDescription] = useState('');
  const [user] = useAuthState(auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return alert('You must be logged in');

    try {
      await addDoc(collection(db, 'timereports'), {
        id: uuidv4(),
        userId: user.uid,
        date,
        hours: parseFloat(hours),
        project,
        description,
        createdAt: new Date().toISOString()
      });

      // Reset form
      setDate('');
      setHours('');
      setProject('');
      setDescription('');
      alert('Time report submitted!');
    } catch (error) {
      console.error('Error saving report:', error);
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-[#f8fbff] to-[#f0f4ff] rounded-2xl shadow-xl p-4 md:p-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Clock className="text-blue-500" size={32} />
          <h1 className="text-2xl font-bold text-gray-800">Time Report</h1>
        </div>
        <Link
          to="/dashboard/time-report/view"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto"
        >
          <FileText size={20} />
          View Reports
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Calendar size={18} className="text-blue-400" /> Date
            </label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Clock size={18} className="text-blue-400" /> Hours
            </label>
            <input type="number" value={hours} onChange={e => setHours(e.target.value)} min="0" step="0.1" placeholder="Enter hours worked" className="w-full px-4 py-2 border rounded-lg" required />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <Folder size={18} className="text-blue-400" /> Project
          </label>
          <input type="text" value={project} onChange={e => setProject(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <FileText size={18} className="text-blue-400" /> Description
          </label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="Enter work description..." className="w-full px-4 py-2 border rounded-lg resize-none" required />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow">
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default TimeReportCard;