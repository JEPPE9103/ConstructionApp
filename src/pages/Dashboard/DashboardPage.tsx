import { FiClock, FiDollarSign, FiMap, FiMapPin, FiUpload, FiHome, FiLogOut, FiMenu } from 'react-icons/fi';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

// Dummy user data (byt ut med riktig auth i framtiden)
const user = {
  name: 'Jesper',
  email: 'jespe9103@gmail.com',
  isAdmin: true, // Byt till roll från backend sen
};

const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  const { t } = useTranslation();
  const [firebaseUser] = useAuthState(auth);
  const isAdmin = firebaseUser?.email === 'jespe9103@gmail.com';
  const navLinks = [
    { key: 'dashboard', name: 'Dashboard', to: '/dashboard', icon: <FiHome size={20} /> },
    { key: 'time_report', name: 'Time Report', to: '/dashboard/time-report', icon: <FiClock size={20} /> },
    { key: 'check_in_out', name: 'Check In/Out', to: '/dashboard/check-in', icon: <FiMapPin size={20} /> },
    { key: 'map_check_in', name: 'Map Check-In', to: '/dashboard/check-in/map', icon: <FiMap size={20} /> },
    { key: 'salary', name: 'Salary', to: '/dashboard/salary', icon: <FiDollarSign size={20} /> },
    { key: 'upload_photo', name: 'Upload Photo', to: '/dashboard/upload', icon: <FiUpload size={20} /> },
    ...(isAdmin ? [{ key: 'admin_panel', name: 'Admin Panel', to: '/dashboard/admin', icon: <FiHome size={20} /> }] : []),
  ];
  return (
    <aside className="w-64 min-h-screen bg-white border-r flex flex-col">
      <div className="flex items-center gap-2 px-6 py-6 border-b">
        <span className="text-blue-600"><FiHome size={28} /></span>
        <span className="text-xl font-bold">{t('app_name')}</span>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navLinks.map((link) => (
          <NavLink
            key={link.key}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 transition font-medium ${
                isActive ? 'bg-blue-50 text-blue-600' : ''
              }`
            }
            end={link.to === '/dashboard'}
            onClick={onClose}
          >
            {link.icon}
            {t(link.key)}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

const MobileDrawer = ({ open, onClose }: { open: boolean; onClose: () => void }) => (
  <div className={`fixed inset-0 z-40 ${open ? '' : 'pointer-events-none'}`}> 
    {/* Overlay */}
    <div
      className={`fixed inset-0 bg-black transition-opacity duration-200 ${open ? 'opacity-40' : 'opacity-0'}`}
      onClick={onClose}
      aria-hidden="true"
    />
    {/* Drawer */}
    <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <Sidebar onClose={onClose} />
    </div>
  </div>
);

const Topbar = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [firebaseUser] = useAuthState(auth);
  const [profile, setProfile] = useState<{ firstName?: string; lastName?: string; email?: string } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setProfile(userDoc.data() as any);
        }
      }
    };
    fetchProfile();
  }, [firebaseUser]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      alert('Failed to log out.');
    }
  };

  const displayName = profile?.firstName && profile?.lastName
    ? `${profile.firstName} ${profile.lastName}`
    : profile?.email || firebaseUser?.email || '';

  return (
    <header className="flex justify-between items-center h-16 px-4 md:px-8 border-b bg-white w-full">
      {/* Hamburger for mobile */}
      <button className="md:hidden p-2 rounded hover:bg-gray-100" onClick={onMenuClick} aria-label="Öppna meny">
        <FiMenu size={26} />
      </button>
      <div className="flex items-center gap-3 ml-auto">
        <div className="text-right">
          <div className="font-semibold text-gray-800">{displayName}</div>
          <div className="text-xs text-gray-500">{profile?.email || firebaseUser?.email || ''}</div>
        </div>
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">
          {displayName[0]}
        </div>
        <button
          onClick={handleSignOut}
          title="Log out"
          className="ml-4 p-2 rounded-full hover:bg-gray-100 transition text-blue-600"
        >
          <FiLogOut size={22} />
        </button>
        {/* Språkväxlare */}
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => i18n.changeLanguage('sv')}
            className="px-2 py-1 rounded border border-gray-300 text-xs hover:bg-gray-100"
          >
            SV
          </button>
          <button
            onClick={() => i18n.changeLanguage('en')}
            className="px-2 py-1 rounded border border-gray-300 text-xs hover:bg-gray-100"
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
};

const DashboardPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      {/* Drawer for mobile */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <div className="flex-1 flex flex-col min-h-screen">
        <Topbar onMenuClick={() => setDrawerOpen(true)} />
        <main className="flex-1 flex flex-col items-center bg-white container mx-auto px-4 py-4">
          <div className="w-full max-w-5xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
