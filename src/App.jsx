import { useEffect, useState } from 'react';
import { getPublicRankings } from './services/analyticsService';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import CourseDashboard from './pages/admin/CourseDashboard';
import StudentProfile from './pages/student/StudentProfile';
import Sidebar from './components/Sidebar';


function App() {


  return (
    <>

      {/* Throwaway ranking table for validating services */}
      {/* <table className="table">
        <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">name</th>
            <th scope="col">id</th>
            <th scope="col">gpa</th>
          </tr>
        </thead>
        <tbody>
          {
            ranking.map(r => {
              return (
                <tr key={r.id}>
                  <td></td>
                  <td>{r.name}</td>
                  <td>{r.id}</td>
                  <td>{r.cumulativeGpa}</td>
                </tr>
              )
            })

          }
        </tbody>
      </table> */}


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