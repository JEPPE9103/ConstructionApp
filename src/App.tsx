import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import DashboardPage from './pages/Dashboard/DashboardPage';
import DashboardHomeCards from './pages/Dashboard/DashboardHomeCards';
import TimeReportCard from './pages/TimeReport/TimeReportCard';
import TimeReportView from './pages/TimeReport/TimeReportView';
import CheckInCard from './pages/CheckIn/CheckInCard';
import UploadPhotoCard from './pages/Upload/UploadPhotoCard';
import SalaryOverview from './pages/Salary/SalaryOverview';
import ProjectList from './pages/Projects/ProjectList';
import LogbookView from './pages/Logbook/LogbookView';
import MapCheckIn from './pages/CheckIn/MapCheckIn';
import ProjectInfo from './pages/Projects/ProjectInfo';
import AdminPanel from './pages/Admin/AdminPanel';
import { ProtectedRoute } from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected dashboard routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHomeCards />} />
          <Route path="time-report" element={<TimeReportCard />} />
          <Route path="time-report/view" element={<TimeReportView />} />
          <Route path="check-in" element={<CheckInCard />} />
          <Route path="check-in/map" element={<MapCheckIn />} /> {/* ✅ FIX: matchar /dashboard/check-in/map */}
          <Route path="upload" element={<UploadPhotoCard />} />
          <Route path="salary" element={<SalaryOverview />} />
          <Route path="projects" element={<ProjectList />} />
          <Route path="logbook" element={<LogbookView />} />
          <Route path="project-info/:id" element={<ProjectInfo />} />
          <Route path="admin" element={<AdminPanel />} /> {/* ✅ FIX: matchar /dashboard/admin */}
        </Route>

        {/* Redirect all unmatched to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
