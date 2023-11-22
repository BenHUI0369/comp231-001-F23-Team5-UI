import React from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';

const UserDashboard = () => {
  // Replace this data with data fetched from your database
  const userData = {
    id: '1f99e36a-8d5a-4b42-8b61-19d1c4d2960a',
    name: 'Peter Chan2',
    dateOfBirth: '5/15/1980',
    gender: 'M',
    email: 'peterchan@gmail.com',
    phone: '111-1111-1111',
    address: '123 Main St, Anytown, CA A1A1A1',
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        User Dashboard
      </Typography>
      <Box sx={{ bgcolor: 'background.paper', p: 2 }}>
        <Typography variant="h6">ID: {userData.id}</Typography>
        <Divider />
        <Typography variant="h6">Name: {userData.name}</Typography>
        <Divider />
        <Typography variant="h6">Date of Birth: {userData.dateOfBirth}</Typography>
        <Divider />
        <Typography variant="h6">Gender: {userData.gender}</Typography>
        <Divider />
        <Typography variant="h6">Email: {userData.email}</Typography>
        <Divider />
        <Typography variant="h6">Phone: {userData.phone}</Typography>
        <Divider />
        <Typography variant="h6">Address: {userData.address}</Typography>
      </Box>
    </Container>
  );
};

export default UserDashboard;
