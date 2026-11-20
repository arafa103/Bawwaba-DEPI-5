import { Link, useLocation } from 'react-router-dom';

import logo from "../assets/Bawwaba logo.svg"

 function Sidebar() {
  const { pathname } = useLocation();


  const getPathFromClass = (path) =>
    `nav-link text-white d-flex align-items-center gap-2 ${pathname === path ? 'active active-blue ' : ''}`


  return (
    <aside
      className="d-none d-lg-flex flex-column justify-content-between flex-shrink-0 p-4 text-white vh-100 sticky-top navy"
      style={{ width: '250px'}}
    >
      <div>

        <div className="d-flex mb-4 pb-3 border-bottom border-secondary">
          <div className=" rounded p-1 text-white fw-bold">
            <img
              src={logo}
              alt="Bawwaba Logo"
              style={{ width: '36px', height: '36px' }}
            />
          </div>
          <div className="d-flex flex-column justify-content-center">
            <h5 className=" fw-bold">Bawwaba</h5>
            <span className="text-white-50">بوابة</span>
          </div>
        </div>


        <div className="mb-4">
          <p className="text-uppercase text-white-50 fw-bold small mb-2">
            Student Workspace
          </p>
          <ul className="nav  flex-column gap-1">
            <li className="nav-item">
              <Link to="/student" className={getPathFromClass("/student")}>
                <i className="bi bi-grid-1x2-fill"></i> Overview
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/student/record" className={getPathFromClass("/student/record")}>
                <i className="bi bi-file-earmark-text fs-5"></i> Academic record
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/student/analytics" className={getPathFromClass("/student/analytics")}>
                <i className="bi bi-bar-chart-fill"></i> Academic analytics
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/student/courses" className={getPathFromClass("/student/courses")}>
                <i className="bi bi-calendar-week-fill"></i> Courses & schedule
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/student/profile" className={getPathFromClass("/student/profile")}>
                <i className="bi bi-person-fill"></i> My profile
              </Link>
            </li>
          </ul>
        </div>


        <div className="p-3 rounded border mb-4">
          <div className="text-white-50 mb-1 small">ACADEMIC YEAR 2026 / 27</div>
          <div className="fw-bold fs-6 mb-1">Fall semester 2026</div>
          <div className="fw-bold">Week 04 of 15</div>
        </div>
      </div>


      <div>
        <a href="#help" className="text-white text-decoration-none d-flex align-items-center gap-2 mb-3">
          <i className="bi bi-question-circle"></i> Help & support
        </a>
        <div className="text-white-50" style={{ fontSize: '11px' }}>
          <p className="mb-1">DEPI V5 - Capstone Project</p>
          <p className="mb-0">Your gateway to academic clarity.</p>
        </div>
      </div>
    </aside>
  );
}
export default Sidebar
