import React, { useState, useEffect } from 'react';
import './Appointment.css';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Typography, Button, Grid } from '@mui/material';
import { signal } from '@preact/signals-react';
import SimpleSnackbar from '../Snackbar/Snackbar';
import { Navigate } from 'react-router-dom';

const formatDate = dateString => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

function preventDefault(event) {
  event.preventDefault();
}

export const createAppointmentRecord = signal(false);

export default function Appointment() {

  const patientID = localStorage.getItem('userID');
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`https://localhost:7146/patientrecords/appointment/${patientID}`);
        console.log(response);
        
        if (!response.ok) {
          setError('No record found');
        }

        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log("appointment id" + patientID);

  const gotoAppointmentPage = () => {
    console.log(createAppointmentRecord.value);
    window.location.href = '/appointment';
  }

  return (
    <React.Fragment>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h6">Recent Appointment</Typography>
        </Grid>
        <Grid item>
          <Button 
          variant="contained" 
          color="primary"
          style={{ fontSize: '12px', padding: '8px 16px' }}
          onClick={gotoAppointmentPage}
          >
            Create Appointment
          </Button>
        </Grid>
      </Grid>
      <table className="appointment-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Message</th>
            {/* Add other table headers for appointment details */}
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment.id}>
              <td>{formatDate(appointment.preferredDate)}</td>
              <td>{appointment.preferredTime}</td>
              <td>{appointment.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SimpleSnackbar 
                message={"Appointment Created!"}
                showSnackbar={createAppointmentRecord.value}
              />
    </React.Fragment>
  );
}







