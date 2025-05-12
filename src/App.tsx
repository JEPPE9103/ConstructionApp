import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import Register from './pages/Register';
import DashboardPage from './pages/DashboardPage';
import TimeReportCard from './pages/TimeReportCard';
import CheckInCard from './pages/CheckInCard';
import UploadPhotoCard from './pages/UploadPhotoCard';
import DashboardHomeCards from './pages/DashboardHomeCards';
// (You will also need UploadPhotoCard import when that is created)
import { ProtectedRoute } from './components/ProtectedRoute';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
          <Route path="check-in" element={<CheckInCard />} />
          <Route path="upload" element={<UploadPhotoCard />} />
          {/* <Route path="upload" element={<UploadPhotoCard />} /> */}
        </Route>
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
