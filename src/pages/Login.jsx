import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, getUserContext } from '../services/authService';
import { useTheme } from '../contexts/ThemeContext';
import Logo from '../assets/Bawwaba logo.svg';

function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const emailToUse = identifier.includes('@')
        ? identifier.trim()
        : `${identifier.trim()}@bawwaba.edu`;

      const user = await login(emailToUse, password);
      if (!user) throw new Error('Authentication failed');

      const userProfile = await getUserContext(user.uid);
      if (!userProfile) {
        setError('Account profile not found in database. Please contact the Academic Office.');
        setLoading(false);
        return;
      }

      if (userProfile.role === 'admin') {
        navigate('/admin/courses');
      } else {
        navigate('/student/profile');
      }
    } catch (err) {
      console.error(err);
      setError('Invalid credentials. Please check your email/ID and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 p-0 d-flex flex-column flex-lg-row bg-page text-color">
      
      {/* Left Navy Branding Panel */}
      <div className="col-lg-5 navy text-white d-flex flex-column justify-content-between p-4 p-md-5">
        {/* Top Logo */}
        <div className="d-flex align-items-center gap-3">
          <img
            src={Logo}
            alt="Bawwaba Logo"
            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
          />
          <div className="lh-sm">
            <div className="fw-bold fs-5">Bawwaba</div>
            <div className="small opacity-75" style={{ fontSize: '0.8rem' }}>بوابة</div>
          </div>
        </div>

        {/* Center Hero Copy */}
        <div className="my-5 my-lg-0">
          <p
            className="text-uppercase fw-semibold mb-3"
            style={{ fontSize: '0.75rem', letterSpacing: '0.08em', opacity: 0.85 }}
          >
            CAIRO COLLEGE OF TECHNOLOGY
          </p>
          <h1 className="font-lora display-5 fw-normal mb-4 lh-sm text-white">
            Your gateway to academic clarity.
          </h1>
          <p className="fs-6 mb-4" style={{ opacity: 0.85, maxWidth: '380px' }}>
            A clearer view of your progress.
            <br />A confident step toward your future.
          </p>

          <hr
            className="my-4"
            style={{ width: '48px', borderTop: '2px solid #3D6E9E', opacity: 1 }}
          />

          <h5 className="font-lora fw-normal mb-2 text-white">
            One portal. Every milestone.
          </h5>
          <p className="small mb-0" style={{ opacity: 0.75, maxWidth: '360px' }}>
            Your record, courses, and college community — all in one place.
          </p>
        </div>

        {/* Bottom Location Footer */}
        <div>
          <p
            className="text-uppercase fw-semibold mb-1"
            style={{ fontSize: '0.7rem', letterSpacing: '0.08em', opacity: 0.8 }}
          >
            HELWAN · GREATER CAIRO
          </p>
          <p className="small mb-0" style={{ opacity: 0.65, fontSize: '0.8rem' }}>
            Bawwaba · Cairo College of Technology
          </p>
        </div>
      </div>

      {/* Right Login Form Panel */}
      <div className="col-lg-7 bg-page position-relative d-flex flex-column justify-content-center align-items-center p-4 p-md-5">
        
        {/* Theme Toggle Button - Top Right */}
        <div className="position-absolute top-0 end-0 p-3 p-md-4">
          <button 
            type="button"
            className="btn border border-card shadow-sm d-flex align-items-center justify-content-center rounded-circle bg-card"
            onClick={toggleTheme}
            style={{ width: '38px', height: '38px' }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <i className="bi bi-sun-fill text-warning fs-5"></i>
            ) : (
              <i className="bi bi-moon-fill fs-5 text-color"></i>
            )}
          </button>
        </div>

        <div className="w-100 mt-4 mt-lg-0" style={{ maxWidth: '520px' }}>
          
          {/* Header outside card */}
          <div className="mb-4">
            <p
              className="color-blue fw-bold text-uppercase mb-1"
              style={{ fontSize: '0.75rem', letterSpacing: '0.08em' }}
            >
              STUDENT PORTAL
            </p>
            <h1 className="font-lora fw-normal text-color mb-2" style={{ fontSize: '2.25rem' }}>
              Welcome back.
            </h1>
            <p className="muted-color mb-0">
              Sign in to continue your academic journey.
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-card border border-card rounded-4 p-4 p-md-5 shadow-sm">
            <h4 className="fw-bold text-color mb-1">Sign in to Bawwaba</h4>
            <p className="muted-color small mb-4">
              Use your college account to access the portal.
            </p>

            {error && (
              <div className="alert alert-danger py-2 px-3 small rounded-3" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Student ID / Email */}
              <div className="mb-3">
                <label className="form-label fw-semibold small text-color">
                  Student ID / Email
                </label>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter your student ID or college email"
                  className="form-control bg-card text-color border-card py-2 px-3 rounded-3"
                />
              </div>

              {/* Password with Show toggle */}
              <div className="mb-3">
                <label className="form-label fw-semibold small text-color">
                  Password
                </label>
                <div className="position-relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="form-control bg-card text-color border-card py-2 px-3 pe-5 rounded-3"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn btn-link position-absolute top-50 end-0 translate-middle-y text-decoration-none color-blue fw-semibold small pe-3"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot password */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label className="form-check-label small text-color" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
                <a
                  href="#forgot"
                  onClick={(e) => e.preventDefault()}
                  className="small text-decoration-none color-blue fw-semibold"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn navy text-white w-100 py-2 fw-semibold rounded-3"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <p className="text-center muted-color small mt-4 mb-0" style={{ fontSize: '0.8rem' }}>
              Need access? Contact the Academic Office.
            </p>
          </div>

          {/* Bottom Security & Links */}
          <div className="text-center mt-4">
            <p className="muted-color small mb-3" style={{ fontSize: '0.8rem' }}>
              Your college credentials are used for secure access.
            </p>
            <div className="d-flex justify-content-center align-items-center gap-3 small">
              <a href="#help" onClick={(e) => e.preventDefault()} className="text-decoration-none color-blue">
                Help &amp; support
              </a>
              <span className="muted-color">·</span>
              <a href="#privacy" onClick={(e) => e.preventDefault()} className="text-decoration-none color-blue">
                Privacy
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;