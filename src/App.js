import logo from './logo.svg';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import PatientInformation from './Components/PatientInformation/PatientInformation';
import AppointmentWaitList from './Components/AppointmentWaitList/AppointmentWaitList';
import SignInSide from './Components/SignInSide/SignInSide';
import Dashboard from './Components/Dashboard/Dashboard';
import UserDashboard from './Components/Dashboard/UserDashboard';
import AppointmentForm from './Components/AppointmentForm/AppointmentForm';
import { Router } from '@mui/icons-material';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import { isAuthenticated } from './Components/SignInSide/SignInSide';




function App() {

  const isLogined = localStorage.getItem("token");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<SignInSide/>}/>
          <Route path='/patients' element={isLogined? <PatientInformation /> : <Navigate to="/"/>} />
          <Route path='/user' element={isLogined? <Dashboard /> : <Navigate to="/"/>} />
          <Route path='/appointment' element={isLogined? <AppointmentForm /> : <Navigate to="/"/>} />
        </Routes>
      </BrowserRouter>

      <div className="content">
      </div>
    </div>
  );
}

export default App;
