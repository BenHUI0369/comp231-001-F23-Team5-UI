import React, { useState } from 'react';
import { Box, Typography, Grid, Divider, Button, TextField } from '@mui/material'; // Import necessary Material-UI components
import userIcon from '../../img/icon.jpg';

const UserProfile = ({ toggleVariable }) => {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    dateOfBirth: '01/01/1990',
    phone: '123-456-7890',
    gender: 'Male',
    email: 'john@example.com',
    address: '123 Main St, City, Country'
  });

  const [updatedUserData, setUpdatedUserData] = useState({}); // State to hold updated user data

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData({ ...updatedUserData, [name]: value });
  };

  const handleUpdate = () => {
    // Update userData with updatedUserData (you might want to implement logic for this)
    setUserData({ ...userData, ...updatedUserData });
    setUpdatedUserData({}); // Clear updated data after update
    toggleVariable();
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={userIcon} alt="User Icon" width="200" height="200" />
      </Box>
      <Typography variant="h4" align="center" gutterBottom>
        Updating Profile
      </Typography>
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
              value={updatedUserData.name || userData.name}
              onChange={handleInputChange}
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
              value={updatedUserData.dateOfBirth || userData.dateOfBirth}
              onChange={handleInputChange}
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
              value={updatedUserData.phone || userData.phone}
              onChange={handleInputChange}
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
              value={updatedUserData.gender || userData.gender}
              onChange={handleInputChange}
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
              value={updatedUserData.email || userData.email}
              onChange={handleInputChange}
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
              value={updatedUserData.address || userData.address}
              onChange={handleInputChange}
            />
            <Divider />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
          <Button
            variant="contained"
            onClick={handleUpdate}
            // Use CloudUpload icon as startIcon
          >
            Save
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default UserProfile;