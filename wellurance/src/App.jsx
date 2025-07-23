import {BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import EmergencyServices from './pages/Services';
import About from './pages/About';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/services' element={<EmergencyServices/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </Router>
  )
}

export default App
