import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import CourseDashboard from './pages/admin/CourseDashboard';
import StudentProfile from './pages/student/StudentProfile';
import Sidebar from './components/Sidebar';

function App() {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';

    return (
        <>
            {!isLoginPage && <Sidebar />}

            <Routes>
                {/* Public route */}
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Admin routes */}
                <Route element={<ProtectedRoute allowedRole="admin" />}>
                    <Route
                        path="/admin/courses"
                        element={<CourseDashboard />}
                    />
                </Route>

                {/* Student routes */}
                <Route element={<ProtectedRoute allowedRole="student" />}>
                    <Route
                        path="/student/profile"
                        element={<StudentProfile />}
                    />
                </Route>
            </Routes>
        </>
    );
}

export default App;