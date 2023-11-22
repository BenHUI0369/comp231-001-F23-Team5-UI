import React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { Container, Typography, Box, Divider, Grid, Button } from '@mui/material';
import Title from './Title';
import userIcon from '../../img/icon.jpg';

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

export default function Profilo({ toggleVariable  }) {

    
    const theme = useTheme();

    const [userData, setUserData] = React.useState({
        name: 'Peter Chan2',
        dateOfBirth: '5/15/1980',
        gender: 'M',
        email: 'peterchan@gmail.com',
        phone: '111-1111-1111',
        address: '123 Main St, Anytown, CA A1A1A1',
    }); 

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://localhost:7146/patientrecords/a3636f8d-4b4c-4e80-8cda-d694abb4e12e');
                if (response.ok) {
                    const data = await response.json();
                    const formattedData = formatUserData(data);
                    setUserData(formattedData); // Update state with fetched user data
                    console.log(userData);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Fetch data only on initial component mount

    const formatUserData = (data) => {
        // Manipulate the API response to match the desired userData1 format
        return {
            name: `${data.firstName} ${data.lastName}`,
            dateOfBirth: new Date(data.dateOfBirth).toLocaleDateString(),
            gender: data.gender,
            email: data.contactEmail,
            phone: data.contactPhone,
            address: `${data.contactStreet}, ${data.contactCity}, ${data.contactState} ${data.contactPostalCode}`,
        };
    };

    if (!userData) {
        return <p>Loading...</p>; // Display a loading message while fetching data
    }

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={userIcon} alt="User Icon" width="200" height="200" />
            </Box>
            <Title>My profilo</Title>
            <Box sx={{ bgcolor: 'background.paper', p: 2 }}>
                <Grid container spacing={2}>
                    {/* First Row */}
                    <Grid item xs={6}>
                        <Typography variant="p">Name: {userData.name}</Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="p">Date of Birth: {userData.dateOfBirth}</Typography>
                        <Divider />
                    </Grid>

                    {/* Second Row */}
                    <Grid item xs={6}>
                        <Typography variant="p">Phone: {userData.phone}</Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="p">Gender: {userData.gender}</Typography>
                        <Divider />
                    </Grid>

                    {/* Third Row */}
                    <Grid item xs={12}>
                        <Typography variant="p">Email: {userData.email}</Typography>
                        <Divider />
                    </Grid>

                    {/* Fourth Row */}
                    <Grid item xs={12}>
                        <Typography variant="p">Address: {userData.address}</Typography>
                        <Divider />
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
                    <Button
                        variant="contained"
                        component="label"
                        onClick={toggleVariable}
                    >Update</Button>
                </Box>
            </Box>
        </React.Fragment>
    );
}