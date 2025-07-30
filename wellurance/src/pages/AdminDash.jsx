import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import bgImg from '../assets/Wellurance Landing image.png';

function AdminDash() {
  const { token, user, loading } = useContext(AuthContext);
  const [emergencies, setEmergencies] = useState([]);

  useEffect(() => {
    if (user?.role === 'DISPATCHER' && token) {
      axios
        .get('http://127.0.0.1:8000/api/reports/', {
          headers: { Authorization: `Token ${token}` },
        })
        .then((res) => setEmergencies(res.data))
        .catch((err) => console.error('Failed to fetch reports:', err));
    }
  }, [token, user]);

  if (loading) {
    return (
        <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
          <p>Loading...</p>
        </div>
    );
  }

  if (!user || !token) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Unauthorized. Please log in.</p>
      </div>
    );
  }

  if (user.role !== 'DISPATCHER') {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>You are not authorized to view this page.</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center p-8 text-white"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="bg-black bg-opacity-60 rounded-lg p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-amber-400">Emergency Reports Dashboard</h1>
        <p className="mb-6">Welcome, {user.username}</p>

        {emergencies.length === 0 ? (
          <p>No emergency reports found.</p>
        ) : (
          <div className="space-y-4">
            {emergencies.map((report) => (
              <div
                key={report.id}
                className="border border-amber-600 p-4 rounded-lg bg-white bg-opacity-10"
              >
                <h2 className="text-xl font-semibold text-amber-300">{report.description}</h2>
                <p className="text-sm">Address: {report.address}</p>
                <p className="text-sm">Reported at: {new Date(report.timestamp).toLocaleString()}</p>
                <p className="text-sm">Status: {report.status || 'Pending'}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDash;
