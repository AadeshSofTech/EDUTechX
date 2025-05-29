import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!userId || !password || !role) {
      alert('Please fill in all fields and select a role');
      return;
    }

    // Simulated login credentials
    const credentials = {
      admin: { userId: 'admin', password: 'admin' },
      faculty: { userId: 'faculty', password: 'faculty' },
      management: { userId: 'management', password: 'management' }
    };

    const user = credentials[role];

    if (user.userId === userId && user.password === password) {
      navigate(`/${role}`);
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <img src="/banner.png" alt="ERP Banner" />
      </div>

      <div className="login-right">
        <div className="logo">🛡️</div>
        <h2>
          <span style={{ color: '#1a237e' }}>{role || 'User'}</span>{' '}
          <span style={{ color: '#ff6f00' }}>Sign-In</span>
        </h2>

        <div className="input-box">
          <span className="icon">👤</span>
          <input
            type="text"
            placeholder="Username"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>

        <div className="input-box">
          <span className="icon">🔒</span>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="toggle" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="role-dropdown"
        >
          <option value="" disabled>Select Role</option>
          <option value="admin">Admin</option>
          <option value="faculty">Faculty</option>
          <option value="management">Management</option>
        </select>

        <div className="links">
          <a href="#">❓ Help</a>
          <a href="#">📺 User Manual</a>
        </div>

        <button className="login-btn" onClick={handleLogin}>SIGN IN</button>

        <div className="bottom-links">
          <a href="#">🔁 Forgot Password?</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
