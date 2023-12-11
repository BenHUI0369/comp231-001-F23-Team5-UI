import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import background from './medical.jpg';
import RegisterPopup from '../Register/RegisterPopup';
import { Navigate, useNavigate } from 'react-router-dom';
import { signal } from '@preact/signals-react';
import SimpleSnackbar from '../Snackbar/Snackbar';

export const userEmail = signal('');
export const userId = signal('');
export const isAuthenticated = signal(null);

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        BenHUI - PatientRecord
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();



export default function SignInSide() {
  const nav = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  

  const handleRegisterClick = () => {
    setShowRegisterPopup(true);
  };

  const handleClosePopup = () => {
    setShowRegisterPopup(false);
    if (showSnackbar)
    {
      setShowSnackbar(false);
    }
    else
    {
      setShowSnackbar(true);
    }
  };

  
  const handleRegister = (userData) => {
    // Perform registration logic with userData
    console.log('Registering user:', userData);
    // You can integrate this with your backend for registration

    // Close the popup after registration
    setShowRegisterPopup(false);
    if (showSnackbar)
    {
      setShowSnackbar(false);
    }
    else
    {
      setShowSnackbar(true);
    }
  };

  const findUserIdFromDB = async (event) => {
    event.preventDefault();
    console.log('Finding Id......');
    try {
      const response = await fetch('https://localhost:7146/api/Auth/findId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        console.log('Found!');
        userId.value = await response.text();
        //const authToken = data.token; // Assuming the token is provided in the response
        // You may want to redirect the user or perform additional actions upon successful login
        localStorage.setItem('userID', userId.value);
        console.log(userId.value);
      } else {
        // Handle login error - display a message to the user, etc.
        console.log('not good');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.log('error', error);
    }
    
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Logging in with:', username, password);
    findUserIdFromDB(event);
    // You can integrate this with your authentication logic
    try {
      const response = await fetch('https://localhost:7146/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log('all good', username, password);
        userEmail.value = username;
        const token = await response.text();
        //const authToken = data.token; // Assuming the token is provided in the response
        localStorage.setItem('token', token);
        isAuthenticated.value = localStorage.getItem('token');
        // You may want to redirect the user or perform additional actions upon successful login
        console.log(userEmail.value);
        nav("/user");
      } else {
        // Handle login error - display a message to the user, etc.
        console.log('not good');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.log('error', error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Email Address"
                name="username"
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <SimpleSnackbar 
                message={"Account Created!"}
                showSnackbar={showSnackbar}
              />
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?      
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" onClick={handleRegisterClick} sx={{marginLeft: '90px'}}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box>
      {showRegisterPopup && (
      <div className="overlay">
        <div className="register-popup">
          <div className="popup-content">
              <RegisterPopup onClose={handleClosePopup} onRegister={handleRegister} />
          </div>
          <button onClick={handleClosePopup}>Close</button>
        </div>
      </div>
    )}
      </Box>
    </ThemeProvider>

  );
}