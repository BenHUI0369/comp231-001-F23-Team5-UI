// PatientInformation.js

import React, { useState, useEffect } from 'react';

const PatientInformation = () => {
  const [patientData, setPatients] = useState([]);

  useEffect(() => {
    // Simulating fetching data from a mock API endpoint
    fetch('https://localhost:7146/patientrecords/1f99e36a-8d5a-4b42-8b61-19d1c4d2960a') // Replace this URL with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        setPatients(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="patient-information">
      <h2>Patient Information</h2>
      {patientData ? (
        <div>
          <p><strong>ID:</strong> {patientData.id}</p>
          <p><strong>Name:</strong> {patientData.firstName} {patientData.lastName}</p>
          <p><strong>Date of Birth:</strong> {new Date(patientData.dateOfBirth).toLocaleDateString()}</p>
          <p><strong>Gender:</strong> {patientData.gender}</p>
          <p><strong>Email:</strong> {patientData.contactEmail}</p>
          <p><strong>Phone:</strong> {patientData.contactPhone}</p>
          <p><strong>Address:</strong> {patientData.contactStreet}, {patientData.contactCity}, {patientData.contactState} {patientData.contactPostalCode}</p>
        </div>
      ) : (
        <p>Loading patient information...</p>
      )}
    </div>
  );
};

export default PatientInformation;
