import { FiClock, FiMapPin, FiUpload, FiHome, FiLogOut } from 'react-icons/fi';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';

// If you haven't installed react-icons, run: npm install react-icons

// Dummy user data (replace with real auth/user context if available)
const user = {
  name: 'Jesper',
  email: 'jespe9103@gmail.com',
};

const navLinks = [
  { name: 'Dashboard', to: '/dashboard', icon: <FiHome size={20} /> },
  { name: 'Time Report', to: '/dashboard/time-report', icon: <FiClock size={20} /> },
  { name: 'Check In/Out', to: '/dashboard/check-in', icon: <FiMapPin size={20} /> },
  { name: 'Upload Photo', to: '/dashboard/upload', icon: <FiUpload size={20} /> },
];

const Sidebar = () => (
  <aside className="w-64 min-h-screen bg-white border-r flex flex-col">
    <div className="flex items-center gap-2 px-6 py-6 border-b">
      <span className="text-blue-600"><FiHome size={28} /></span>
      <span className="text-xl font-bold">Byggappen</span>
    </div>
    <nav className="flex-1 px-2 py-4 space-y-1">
      {navLinks.map((link) => (
        <NavLink
          key={link.name}
          to={link.to}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 transition font-medium ${isActive ? 'bg-blue-50 text-blue-600' : ''}`
          }
          end={link.to === '/dashboard'}
        >
          {link.icon}
          {link.name}
        </NavLink>
      ))}
    </nav>
  </aside>
);

const Topbar = () => {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      alert('Failed to log out.');
    }
  };

  return (
    <header className="flex justify-end items-center h-16 px-8 border-b bg-white">
      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="font-semibold text-gray-800">{user.name}</div>
          <div className="text-xs text-gray-500">{user.email}</div>
        </div>
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">
          {user.name[0]}
        </div>
        <button
          onClick={handleSignOut}
          title="Log out"
          className="ml-4 p-2 rounded-full hover:bg-gray-100 transition text-blue-600"
        >
          <FiLogOut size={22} />
        </button>
      </div>
    </header>
  );
};

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 p-8 flex flex-col items-center bg-white">
          <div className="w-full max-w-5xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage; 