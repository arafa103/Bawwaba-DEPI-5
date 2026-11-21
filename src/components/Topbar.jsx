
import { useTheme } from '../contexts/ThemeContext';

 function Topbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
    <div className="d-flex justify-content-between align-items-center bg-card py-3 px-4">
      <div className="d-flex align-items-center gap-2 fs-6 ">
        <i className="bi bi-house-door text-color"></i>
        <span className="fw-bold text-color">Cairo College of Technology</span>
        <span className="text-color">/Student portal</span>
      </div>
      
      <div className="d-flex align-items-center gap-3  ">
        
        <button 
          className="btn border shadow-sm d-flex align-items-center justify-content-center rounded-circle bg-card"
          onClick={toggleTheme}
          style={{ width: '38px',height: '38px'}}
        >
          {theme === 'dark' ?<i className="bi bi-sun-fill text-warning fs-5"></i>: 
            <i className="bi bi-moon-fill fs-5 text-color"></i>
            }
        </button>

        <i className="bi bi-search fs-5 text-color"></i>
        <i className="bi bi-bell fs-5 text-color"></i>
        
        <div className="d-flex align-items-center gap-2 px-3 py-1 rounded-pill border shadow-sm bg-card">
          <div className="text-white rounded-circle d-flex align-items-center justify-content-center fw-bold bg-secondary" style={{ width: '32px', height: '32px'}}>
            AM
          </div>
          <div className="text-start">
            <span className="d-block fw-bold fs-6 text-color">Ahmed Mostafa</span>
            <small className="text-color">Student - 20250042</small>
          </div>
          <i className="bi bi-chevron-down fs-7 text-color" ></i>
        </div>
      </div>
    </div>
    </>
  );
}
export default Topbar