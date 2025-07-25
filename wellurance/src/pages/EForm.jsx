import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

function EmergencyForm() {
    const { token } = useContext(AuthContext);
    const [form, setForm] = useState({
      name: '',
      address: '',
      description: '',
      emergency_type: '',
    });

    const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post('http://127.0.0.1:8000/api/reports/', {
          address: form.address,
          description: form.description,
          emergency_type: form.emergency_type, 
          status: 'REPORTED',
          is_verified: false,
        }, {
          headers: { Authorization: `Token ${token}` }
        });
        alert('Emergency reported!');
        } catch (err) {
          console.error(err);
          alert('Failed to report emergency.');
      }
    };

    return (
      <>
        <form className="space-y-6 w-[500px] text-center" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1 text-left">FULL NAME</label>
            <input 
              type="text" 
              className="w-full p-2 border border-white bg-white" 
              placeholder="John Doe" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-left">LOCATION</label>
            <input 
              type="text" 
              className="w-full p-2 border border-white bg-white" 
              placeholder="123 Main St, City" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-left">EMERGENCY</label>
            <select className="w-full p-2 border border-white bg-white">
              <option>Medical Emergency</option>
              <option>Fire Outbreak</option>
              <option>Accident</option>
              <option>Other</option>
            </select>
          </div>
        <div>
            <label className="block text-sm font-medium mb-1 text-left">DESCRIPTION</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-2 border border-white bg-white"
              placeholder="Describe the situation..."
              required
            />
        </div>
          <button 
            type="submit" 
            className="w-60 bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-amber-600 transition"
          >
            HELP
          </button>
        </form>
      </>
    )
};

export default EmergencyForm;