import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Suspense, lazy } from 'react';
import AuthProvider from './pages/AuthProvider';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Home = lazy(() => import('./pages/Home'));
const EmergencyServices = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const Profile = lazy(() => import('./pages/Profile'));
const Login = lazy(() => import('./pages/LogIn'));
const SignUp = lazy(() => import('./pages/Register'));
const AdminDash = lazy(() => import('./pages/AdminDash'));
const EmergencyForm = lazy(() => import('./pages/EForm'));

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
