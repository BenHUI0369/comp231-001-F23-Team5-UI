// Login.js

import React, { useState } from 'react';
import './Login.css'; // Import your CSS file for styling
import RegisterPopup from '../Register/RegisterPopup';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic
    console.log('Logging in with:', username, password);
    // You can integrate this with your authentication logic
  };

  const handleRegisterClick = () => {
    setShowRegisterPopup(true);
  };

  const handleClosePopup = () => {
    setShowRegisterPopup(false);
  };

  const handleRegister = (userData) => {
    // Perform registration logic with userData
    console.log('Registering user:', userData);
    // You can integrate this with your backend for registration

    // Close the popup after registration
    setShowRegisterPopup(false);
  };

  return (
    <div className="login-container">
      <div className="image-container">
        <img src="./Login/medical.jpg" alt="Login Image" />
      </div>
      <div className="login-form">
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="button-container">
            <button type="submit">Login</button>
            <button onClick={handleRegisterClick}>Register</button>
          </div>
        </form>
      </div>
        {showRegisterPopup && (
        <div className="overlay">
          <div className="register-popup">
            <div className="popup-content">
                <RegisterPopup onClose={handleClosePopup} onRegister={handleRegister} />
            </div>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
