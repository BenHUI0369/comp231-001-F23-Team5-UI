import React, { useState } from 'react';
import './RegisterPopup.css';

const RegisterPopup = ({ onClose, onRegister }) => {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        contactEmail: '',
        contactPhone: '',
        contactStreet: '',
        contactCity: '',
        contactState: '',
        contactPostalCode: '',
    });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleRegister = () => {
    // Pass user data to the parent component for registration
    onRegister(userData);
  };

  return (
    <div className="register-popup">
      <div className="popup-content">
        <h2>Register</h2>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={userData.firstName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={userData.lastName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Date Of Birth"
          name="lastName"
          value={userData.dateOfBirth}
          onChange={handleInputChange}
        />
        <select
          name="gender"
          value={userData.gender}
          onChange={handleInputChange}
        >
          <option value="">Select Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="O">Other</option>
        </select>
        <input
          type="text"
          placeholder="Email"
          name="lastName"
          value={userData.contactEmail}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Phone"
          name="lastName"
          value={userData.contactPhone}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Street"
          name="lastName"
          value={userData.contactState}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="City"
          name="lastName"
          value={userData.contactCity}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="State"
          name="lastName"
          value={userData.contactState}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Postal Code"
          name="lastName"
          value={userData.contactPostalCode}
          onChange={handleInputChange}
        />
        {/* Other input fields for registration */}
      </div>
      <div className="button-container">
            <button onClick={handleRegister}>Register</button>
            <button onClick={onClose}>Close</button>
        </div>
    </div>
  );
};

export default RegisterPopup;
