import React, { useState } from 'react';
import './RegisterPopup.css';

const RegisterPopup = ({ onClose, onRegister }) => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    contactEmail: '',
    password: '',
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

  const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleRegister = async () => {
    const {contactEmail} = userData;
    
    if (!isValidEmail(contactEmail)) {
      // If the email is not valid, display a warning message to the user
      alert('Please enter a valid email address.');
      return; // Stop registration process
    }

    try {
      // First API call to register the user
      const registerResponse = await fetch('https://localhost:7146/api/Auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userData.contactEmail,
          password: userData.password,
        }),
      });

      if (registerResponse.ok) {
        // If the registration was successful, proceed to create patient records
        const patientRecordResponse = await fetch('https://localhost:7146/patientrecords', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: userData.firstName,
            lastName: userData.lastName,
            dateOfBirth: userData.dateOfBirth,
            gender: userData.gender,
            contactEmail: userData.contactEmail,
            contactPhone: userData.contactPhone,
            contactStreet: userData.contactStreet,
            contactCity: userData.contactCity,
            contactState: userData.contactState,
            contactPostalCode: userData.contactPostalCode
          }),
        });

        if (patientRecordResponse.ok) {
          // Handle success
          console.log('Registration and patient record creation successful!');
          closeForm();
        } else {
          // Handle error for patient record creation
          console.error('Failed to create patient records');
        }
      } else {
        // Handle error for user registration
        console.error('User registration failed');
      }
    } catch (error) {
      // Handle any unexpected errors during API calls
      console.error('An error occurred:', error);
    }
  };

  // handle the auto close form after user register
  const closeForm = () => {
    const closeButton = document.getElementById('closeBtn');
    if (closeButton) {
      closeButton.click();
    } else {
      console.error('Close button not found');
    }
  }

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
          type="date"
          placeholder="Date Of Birth"
          name="dateOfBirth"
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
          name="contactEmail"
          value={userData.contactEmail}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Phone"
          name="contactPhone"
          value={userData.contactPhone}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Street"
          name="contactStreet"
          value={userData.contactStreet}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="City"
          name="contactCity"
          value={userData.contactCity}
          onChange={handleInputChange}
        />
        <select
          name="contactState"
          value={userData.contactState}
          onChange={handleInputChange}
        >
          <option value="">Select State</option>
          <option value="ON">Ontario</option>
          <option value="QC">Quebec</option>
          <option value="NS">Nova Scotia</option>
          <option value="NB">New Brunswick</option>
          <option value="MB">Manitoba</option>
          <option value="BC">British Columbia</option>
          <option value="PE">Prince Edward Island</option>
          <option value="SK">Saskatchewan</option>
          <option value="AB">Alberta</option>
          <option value="NL">Newfoundland and Labrador</option>
        </select>
        <input
          type="text"
          placeholder="Postal Code"
          name="contactPostalCode"
          value={userData.contactPostalCode}
          onChange={handleInputChange}
        />
        {/* Other input fields for registration */}
      </div>
      <div className="button-container">
        <button onClick={handleRegister}>Register</button>
        <button id='closeBtn' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RegisterPopup;
