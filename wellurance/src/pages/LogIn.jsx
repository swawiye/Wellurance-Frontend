import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bgImg from '../assets/Wellurance Landing image.png';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      role: 'CIVILIAN', // optional for backend filtering or routing
    });

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/login/', formData);

        console.log('Response data: ', response.data);
      
        if (response.data && response.data.token && response.data.user) {
          const {token, user} = response.data;
          // Store token and user info
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          
          if (user.role == 'DISPATCHER') {
            navigate('/admindash')
          } else {
            navigate('/home')
          }
        } else {
          throw new Error('Invalid response structure')
        }
      } catch (err) {
        console.error('Login failed:', err.response?.data || err.message);
        alert('Invalid credentials or unexpected response from the server.');
      }
    };

    const bg = {
      backgroundImage: `url(${bgImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh', 
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      animation: 'fadeIn 1.5s ease-in-out',
    };

    return (
      <div className="relative h-screen w-full bg-gray-900 flex flex-col items-center justify-center space-y-6" style={bg}>
        <h1 className="text-2xl font-bold text-amber-600">
          <a href="/">WELLURANCE</a>
        </h1>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              name="email"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="DISPATCHER">Dispatcher</option>
              <option value="CIVILIAN">Civilian</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 text-white py-2 px-4 rounded hover:bg-amber-700"
          >
            Log In
          </button>
        </form>
      </div>
    );
};  

export default Login;
