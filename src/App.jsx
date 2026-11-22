import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import CourseDashboard from './pages/admin/CourseDashboard';
import StudentProfile from './pages/student/StudentProfile';
import Sidebar from './components/Sidebar';

function App() {
    return (
        <>
            <Sidebar />

            <Routes>
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