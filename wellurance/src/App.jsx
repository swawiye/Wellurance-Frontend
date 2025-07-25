import {BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import EmergencyServices from './pages/Services';
import About from './pages/About';
import Profile from './pages/Profile';
import Login from './pages/LogIn';
import SignUp from './pages/Register';
import AdminDash from './pages/AdminDash';
// import { AuthContext } from './pages/AuthContext';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/register' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/services' element={<EmergencyServices/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/admindash' element={<AdminDash/>}/>
      </Routes>
    </Router>
  )
}

export default App
