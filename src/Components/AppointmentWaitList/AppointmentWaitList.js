// AppointmentWaitList.js

import React, { useState } from 'react';

const AppointmentWaitList = ({ loggedInUser }) => {
  const [appointments, setAppointments] = useState([]);

  const handleAppointmentClick = () => {
    // Assuming the user is logged in and their information is available in loggedInUser
    if (loggedInUser) {
      const newAppointment = {
        id: loggedInUser.id, // Assuming the user has an ID
        name: `${loggedInUser.firstName} ${loggedInUser.lastName}`, // Assuming user's first and last name are available
      };

      setAppointments([...appointments, newAppointment]);
    }
  };

  return (
    <div className="appointment-waitlist">
      <h2>Appointment Waitlist</h2>
      <button onClick={handleAppointmentClick}>Make an Appointment</button>
      <ul>
        {appointments.map((appointment, index) => (
          <li key={index}>
            <strong>ID:</strong> {appointment.id}, <strong>Name:</strong> {appointment.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentWaitList;
