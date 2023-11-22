import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { Container, Typography, Box, Divider } from '@mui/material';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00', undefined),
];

const userData = {
  name: 'Peter Chan2',
  dateOfBirth: '5/15/1980',
  gender: 'M',
  email: 'peterchan@gmail.com',
  phone: '111-1111-1111',
  address: '123 Main St, Anytown, CA A1A1A1',
};



export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>User profilo</Title>
      <Box sx={{ bgcolor: 'background.paper', p: 2 }}>
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
    </React.Fragment>
  );
}