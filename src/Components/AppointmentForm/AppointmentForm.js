import React, { useState } from 'react';
import './AppointmentForm.css'; // Make sure the CSS file is in the correct path
import { storedUserId } from '../Dashboard/Profilo';
import { Navigate, useNavigate  } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import { signal } from '@preact/signals-react';
import {createAppointmentRecord} from '../Dashboard/Appointment'

function AppointmentForm() {
  const navigate = useNavigate();
  // Initialize state for the form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: 'M',
    date: '',
    time: '08:00:00',
    message: ''
  });


  // Function to handle changes to each input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Function to handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData); // Here, you can integrate an API call to send the data
    createAppointment();
    createAppointmentRecord.value = true;
  };


    const createAppointment  = async () => {
      try {
        const response = await fetch(`https://localhost:7146/patientrecords/appointment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            UserId: storedUserId,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            gender: formData.gender,
            preferredDate: formData.date,
            preferredTime: formData.time,
            message: formData.message
           }),
        });
        console.log("show from data: " + formData.name);
        console.log(response);
        if (response.ok) {
          console.log('Appointment Created Successfully!');
          navigate('/user');
          createAppointment.value = true;
          //setUserData(userInfo); // Update state with fetched user data
        } else {
          const errorText = await response.text(); // Extract the error message from the response
      console.error('Failed to create appointment:', errorText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


  return (
    <div className="container">
      <div className="appointment-form">
        <h1>Doctor Appointment</h1>
        <form id="appointment-form">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="phone">Phone Number:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
          />

          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            required
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>

          <label htmlFor="date">Preferred Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
          />

          <label htmlFor="time">Preferred Time:</label>
          <select
            type="text"
            id="time"
            name="time"
            required
            value={formData.time}
            onChange={handleChange}
          >
            <option value="08:00:00">08:00 AM</option>
            <option value="10:00:00">10:00 AM</option>
            <option value="14:00:00">02:00 PM</option>
            <option value="16:00:00">04:00 PM</option>
          </select>

          <label htmlFor="message">Message:</label>
          <textarea
            type="text"
            id="message"
            name="message"
            rows="4"
            required
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          <button type="submit" onClick={handleSubmit}>Request Appointment</button>
        </form>
        <div className="bar">
        </div>
      </div>
    </div>
  );
}

export default AppointmentForm;