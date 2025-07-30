import {BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom'
import { Suspense, lazy } from 'react';
import AuthProvider from './pages/AuthProvider';

const Dashboard = lazy(() => ('./pages/Dashboard'));
const Home = lazy(() => ('./pages/Home'));
const EmergencyServices = lazy(() => ('./pages/Services'));
const About = lazy(() => ('./pages/About'));
const Profile = lazy(() => ('./pages/Profile'));
const Login = lazy(() => ('./pages/LogIn'));
const SignUp = lazy(() => ('./pages/Register'));
const AdminDash = lazy(() => ('./pages/AdminDash'));
const EmergencyForm = lazy(() => ('./pages/EForm'));

const Loading = () => <div>Loading ...</div>;




function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<Loading/>}>
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/register' element={<SignUp/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/services' element={<EmergencyServices/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/admindash' element={<AdminDash/>}/>
            <Route path='/emergency' element={<EmergencyForm/>}/>
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  )
}

export default App
