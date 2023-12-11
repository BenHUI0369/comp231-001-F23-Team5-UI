import React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { Container, Typography, Box, Divider, Grid, Button, TextField } from '@mui/material';
import Title from './Title';
import userIcon from '../../img/icon.jpg';
import { signal } from '@preact/signals-react'; 
import { userId } from '../SignInSide/SignInSide';
import SimpleSnackbar from '../Snackbar/Snackbar';

// Generate Sales Data
function createData(time, amount) {
    return { time, amount };
}

// create signal for each user props
export const userInfos = {
    name: signal('No Data'),
    dateOfBirth: signal('No Data'),
    phone: signal('No Data'),
    gender: signal('No Data'),
    email: signal('No Data'),
    address: signal('No Data')
}

export let storedUserId = localStorage.getItem("userID");

//const userInfo1 = signal('hehe');


//console.log(userInfo);
//console.log(userInfo.value.dateOfBirth);

export default function Profilo({ toggleVariable  }) {
    const theme = useTheme();

    //const [userData, setUserData] = React.useState(userInfo.value); 

    // fetch data from API
    const getUserId = async () => {
      return await userId.value;
    }

    React.useEffect(() => {
      storedUserId = localStorage.getItem("userID");

        const fetchData = async () => {
            try {
                const response = await fetch(`https://localhost:7146/patientrecords/${storedUserId}`);
                if (response.ok) {
                    const data = await response.json();
                    //setUserData(userInfo); // Update state with fetched user data
                    updateUserInfo(data);
                    console.log(userInfos);
                } else {
                  console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Fetch data only on initial component mount

    // update the user signal props
    const updateUserInfo = (data) => {
        userInfos.name.value = `${data.firstName} ${data.lastName}`;
        userInfos.dateOfBirth.value = new Date(data.dateOfBirth).toLocaleDateString();
        userInfos.gender.value = data.gender;
        userInfos.email.value = data.contactEmail;
        userInfos.phone.value = data.contactPhone;
        userInfos.address.value = `${data.contactStreet}, ${data.contactCity}, ${data.contactState} ${data.contactPostalCode}`;
    }

    if (!userInfos) {
        return <p>There is no information in this account</p>; // Display a loading message while fetching data
    }

    return (
        <React.Fragment>
            <SimpleSnackbar message={"OK"}></SimpleSnackbar>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={userIcon} alt="User Icon" width="200" height="200" />
            </Box>
            <Title>My profilo</Title>
            <Box sx={{ bgcolor: 'background.paper', p: 2 }}>
            <Grid container spacing={2}>
          {/* First Row */}
          <Grid item xs={6}>
            <Typography variant="body1">Name:</Typography>
            <TextField
              name="name"
              variant="outlined"
              size="small"
              fullWidth
              value={userInfos.name.value}
              disabled
            />
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">Date of Birth:</Typography>
            <TextField
              name="dateOfBirth"
              variant="outlined"
              size="small"
              fullWidth
              value={userInfos.dateOfBirth.value}
              disabled
            />
            <Divider />
          </Grid>

          {/* Second Row */}
          <Grid item xs={6}>
            <Typography variant="body1">Phone:</Typography>
            <TextField
              name="phone"
              variant="outlined"
              size="small"
              fullWidth
              value={userInfos.phone.value}
              disabled
            />
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">Gender:</Typography>
            <TextField
              name="gender"
              variant="outlined"
              size="small"
              fullWidth
              value={userInfos.gender.value}
              disabled
            />
            <Divider />
          </Grid>

          {/* Third Row */}
          <Grid item xs={12}>
            <Typography variant="body1">Email:</Typography>
            <TextField
              name="email"
              variant="outlined"
              size="small"
              fullWidth
              value={userInfos.email.value}
              disabled
            />
            <Divider />
          </Grid>

          {/* Fourth Row */}
          <Grid item xs={12}>
            <Typography variant="body1">Address:</Typography>
            <TextField
              name="address"
              variant="outlined"
              size="small"
              fullWidth
              value={userInfos.address.value}
              disabled
            />
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