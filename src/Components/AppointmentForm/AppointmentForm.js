import React, { useState } from 'react';
import './AppointmentForm.css'; // Make sure the CSS file is in the correct path

function AppointmentForm() {
  // Initialize state for the form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: 'Male',
    date: '',
    time: '08:00 AM',
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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Here, you can integrate an API call to send the data
  };

  return (
    <div className="container">
      <div className="appointment-form">
        <h1>Doctor Appointment</h1>
        <form id="appointment-form" onSubmit={handleSubmit}>
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
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="phone">Phone Number:</label>
          <input 
            type="tel"
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
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
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
            id="time"
            name="time"
            required
            value={formData.time}
            onChange={handleChange}
          >
            <option value="08:00 AM">08:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="02:00 PM">02:00 PM</option>
            <option value="04:00 PM">04:00 PM</option>
          </select>

          <label htmlFor="message">Message:</label>
          <textarea 
            id="message"
            name="message"
            rows="4"
            required
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Request Appointment</button>
        </form>
      </div>
    </div>
  );
}

export default AppointmentForm;