import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    role: 'CIVILIAN', // default role
    is_verified: false, // default verified status (can be true based on admin verification)
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
      const response = await axios.post('http://127.0.0.1:8000/api/register/', formData);
      console.log('Registration successful', response.data);
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err.response?.data || err.message);
      alert('Registration failed, please try again.');
    }
  };

  return (
    <div className="relative h-screen w-full bg-gray-900 flex flex-col items-center justify-center space-y-6">
      <h1 className="text-2xl font-bold text-amber-600 mt-5">
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
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            value={formData.phone}
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
          onClick={handleSubmit}
        >
          Register
        </button>
      </form>

      <div className="relative h-screen w-full bg-gray-900 flex flex-col items-center justify-center space-y-6">
        <p className="text-sm text-white mt-2">
          Already have an account?{' '}
          <Link to="/login" className="text-amber-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
