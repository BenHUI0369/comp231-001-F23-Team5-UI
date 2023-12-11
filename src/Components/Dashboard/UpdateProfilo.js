import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Divider, Button, TextField } from '@mui/material'; // Import necessary Material-UI components
import userIcon from '../../img/icon.jpg';
import { userInfos } from './Profilo';
import { signal } from '@preact/signals-react';
import { userId } from '../SignInSide/SignInSide';
import Title from './Title';
import moment from 'moment';


let isEditable = signal(false);
let count = 0;

const UserProfile = ({ toggleVariable }) => {
  const storedUserId = localStorage.getItem("userID");

  const [userData, setUserData] = useState({ userInfos });

  const [updatedUserData, setUpdatedUserData] = useState({
    name: userInfos.name.value,
    dateOfBirth: userInfos.dateOfBirth.value,
    phone: userInfos.phone.value,
    gender: userInfos.gender.value,
    email: userInfos.email.value,
    address: userInfos.address.value,
  }); // State to hold updated user data

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
    console.log('show name value');
    console.log(name);
    console.log(value);
    console.log(updatedUserData);
  };
  
  const fetchData = async () => {
    try {
      const response = await fetch(`https://localhost:7146/patientrecords/${storedUserId}`);
      if (response.ok) {
        const data = await response.json();
        //setUserData(userInfo); // Update state with fetched user data
        updateUserInfo(data);
        console.log("show me the update info");
        console.log(updatedUserData);
        console.log(userInfos);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  if (updatedUserData.name === "No Data")
  {
    fetchData();
    count = count + 1;
  }

  const handleUpdate = async () => {
    // Update userData with updatedUserData (you might want to implement logic for this)
    //setUserData({ ...userData, ...updatedUserData });
    //setUpdatedUserData({}); // Clear updated data after update
    console.log("111111111111111111111111111111111111111");
    localStorage.setItem('updatedUserData', JSON.stringify(updatedUserData));
    //console.log(updatedUserData);
    console.log("111111111111111111111111111111111111111");
    let updatedData = convertMySQLToWebsiteFormat(updatedUserData);
    console.log(updatedData);
    try {
      // First API call to register the user
      const registerResponse = await fetch(`https://localhost:7146/patientrecords/${storedUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: updatedData.firstName,
          lastName: updatedData.lastName,
          dateOfBirth: updatedData.dateOfBirth,
          gender: updatedData.gender,
          contactEmail: updatedData.contactEmail,
          contactPhone: updatedData.contactPhone,
          contactStreet: updatedData.contactStreet,
          contactCity: updatedData.contactCity,
          contactState: updatedData.contactState,
          contactPostalCode: updatedData.contactPostalCode
        }),
      });

      if (registerResponse.ok) {
        console.log('user information updated successfully');
        console.log(updatedData.firstName);
        updateProfileData(updatedData);
      }
    }
    catch (error) {
      console.error('An error occurred:', error);
    }
    updateProfileData(updatedData);
    toggleVariable();
    fetchData();
    isEditable = !isEditable;
  };

  const convertDateFormat = (inputDate) => {
    const parts = inputDate.split('/'); // Split the date string
    const day = parts[1];
    const month = parts[0];
    const year = parts[2];

    // Construct the new date string in YYYY-MM-DD format
    const newDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    return newDate;
  };

  const convertMySQLToWebsiteFormat = (data) => {
    const addressParts = data.address.split(',');
    return {
      firstName: data.name.split(' ')[0],
      lastName: data.name.split(' ')[1],
      dateOfBirth: convertDateFormat(data.dateOfBirth),
      gender: data.gender,
      contactEmail: data.email,
      contactPhone: data.phone,
      contactStreet: data.address.split(',')[0],
      contactCity: data.address.split(',')[1].trim(),
      contactState: data.address.split(',')[2].split(' ')[1].trim(),
      contactPostalCode: addressParts[addressParts.length - 1].split(' ')[2]
    };
  };

  const updateProfileData = (updatedData) => {
    userInfos.name.value = `${updatedData.firstName} ${updatedData.lastName}`;
    userInfos.dateOfBirth.value = new Date(updatedData.dateOfBirth).toLocaleDateString();
    userInfos.gender.value = updatedData.gender;
    userInfos.email.value = updatedData.contactEmail;
    userInfos.phone.value = updatedData.contactPhone;
    userInfos.address.value = `${updatedData.contactStreet}, ${updatedData.contactCity}, ${updatedData.contactState} ${updatedData.contactPostalCode}`;
  }

  // update the user signal props
  const updateUserInfo = (data) => {
    updatedUserData.name = `${data.firstName} ${data.lastName}`;
    updatedUserData.dateOfBirth = new Date(data.dateOfBirth).toLocaleDateString();
    updatedUserData.gender = data.gender;
    updatedUserData.email = data.contactEmail;
    updatedUserData.phone = data.contactPhone;
    updatedUserData.address = `${data.contactStreet}, ${data.contactCity}, ${data.contactState} ${data.contactPostalCode}`;
  }

  console.log('test!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  console.log(updatedUserData);
  console.log(count);

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={userIcon} alt="User Icon" width="200" height="200" />
      </Box>
      <Title>Update profilo</Title>
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
              value={updatedUserData.name}
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
              value={updatedUserData.dateOfBirth}
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
              value={updatedUserData.phone}
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
              value={updatedUserData.gender}
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
              value={updatedUserData.email}
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
              value={updatedUserData.address}
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