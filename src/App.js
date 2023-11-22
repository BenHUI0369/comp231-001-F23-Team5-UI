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
import {BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<SignInSide/>}/>
          <Route path='/patients' element={<PatientInformation />} />
          <Route path='/user' element={<Dashboard />} />
          <Route path='/appointment' element={<AppointmentForm />} />
        </Routes>

      </BrowserRouter>

      <div className="content">
      </div>
    </div>
  );
}

export default App;
