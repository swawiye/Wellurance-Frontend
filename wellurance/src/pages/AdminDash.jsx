import { useContext, useEffect } from 'react'; //useState
import { AuthContext } from './AuthContext';
import axios from 'axios';
import bgImg from '../assets/Wellurance Landing image.png';

function AdminDash() {
  const { token, user, loading } = useContext(AuthContext);

  // const [reports, setReports] = useState([]);
  // const [teams, setTeams] = useState([]);
  // const [vehicles, setVehicles] = useState([]);
  // const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (token && user?.role === 'DISPATCHER') {
      const headers = { Authorization: `Token ${token}` };
      
      axios.get('http://127.0.0.1:8000/api/reports/', { headers })
        .then(res => {
          const data = Array.isArray(res.data) ? res.data : res.data.results;
          setReports(data || [])
        })
        .catch(err => console.error('Reports fetch failed:', err));

      axios.get('http://127.0.0.1:8000/api/teams/', { headers })
        .then(res => setTeams(res.data))
        .catch(err => console.error('Teams fetch failed:', err));

      axios.get('http://127.0.0.1:8000/api/vehicles/', { headers })
        .then(res => setVehicles(res.data))
        .catch(err => console.error('Vehicles fetch failed:', err));

      axios.get('http://127.0.0.1:8000/api/notifications/', { headers })
        .then(res => setNotifications(res.data))
        .catch(err => console.error('Notifications fetch failed:', err));
    }
  }, [token, user]);

  if (loading) return <CenteredMessage text="Loading..." />;
  if (!user || !token) return <CenteredMessage text="Unauthorized. Please log in." />;
  if (user.role !== 'DISPATCHER') return <CenteredMessage text="You are not authorized to view this page." />;

  return (
    <div className="min-h-screen bg-cover bg-center p-8 text-white" style={{ backgroundImage: `url(${bgImg})` }}>
      <div className="bg-gray-900 bg-opacity-60 rounded-lg p-6 max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold mb-4 text-amber-400">Emergency Reports Dashboard</h1>
        <p className="mb-6">Welcome, {user.username}</p>

        {/* Emergency Reports */}
        <Section title="Emergency Reports">
        {/* 
          {reports.length > 0 ? reports.map(r => (
            <Card key={r.id}>
              <h2>{r.emergency_type || '—'}: {r.description}</h2>
              <Detail label="Address" value={r.address} />
              <Detail label="Reported at" value={new Date(r.time_stamp).toLocaleString()} />
              <Detail label="Status" value={r.status} />
              <Detail label="Reported by (user ID)" value={r.reporter || '—'} />
            </Card>
          )) : <p>No emergency reports found.</p>}
        */}
        <div className="mb-8">
          <div className="bg-white text-black p-4 rounded-sm text-md shadow-sm min-w-[300px]">
            <p className="mb-2"><strong>Full Name:</strong> John Doe</p>
            <p className="mb-2"><strong>Location:</strong> 123, Miami Park Lane</p>
            <p className="mb-2"><strong>Emergency:</strong> Fire Outbreak</p>
            <p><strong>Description:</strong> The entire house is on fire!!!</p>
          </div>
        </div>
        </Section>

        {/* Responder Teams */}
        <Section title="Responder Teams">
          {/* 
          {teams.length > 0 ? teams.map(t => (
            <Card key={t.id}>
              <h2>{t.team} — {t.name}</h2>
              <Detail label="Contact" value={t.contact} />
              <Detail label="Active" value={t.is_active ? 'Yes' : 'No'} />
              <Detail label="Members" value={Array.isArray(t.members) ? t.members.map(m => m.username || m).join(', ') : '—'} />
            </Card>
          )) : <p>No teams available.</p>}
           */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-4">
              {/* Firefighter Team */}
              <div className="bg-white text-black p-4 rounded-sm text-md flex-1 min-w-[300px]">
                <h2 className="font-semibold text-lg mb-2">Firefighter Team</h2>
                <p><strong>Location:</strong> Station 12</p>
                <p><strong>Respondents:</strong> 6</p>
              </div>

              {/* Ambulance Team */}
              <div className="bg-white text-black p-4 rounded-sm text-md flex-1 min-w-[300px]">
                <h2 className="font-semibold text-lg mb-2">Ambulance Team</h2>
                <p><strong>Location:</strong> Medical Center B</p>
                <p><strong>Respondents:</strong> 4</p>
              </div>

              {/* Firefighter Team */}
              <div className="bg-white text-black p-4 rounded-sm text-md flex-1 min-w-[300px]">
                <h2 className="font-semibold text-lg mb-2">Firefighter Team</h2>
                <p><strong>Location:</strong> Station 8</p>
                <p><strong>Respondents:</strong> 5</p>
              </div>

              {/* Ambulance Team */}
              <div className="bg-white text-black p-4 rounded-sm text-md flex-1 min-w-[300px]">
                <h2 className="font-semibold text-lg mb-2">Ambulance Team</h2>
                <p><strong>Location:</strong> Emergency Hub A</p>
                <p><strong>Respondents:</strong> 3</p>
              </div>

              {/* Firefighter Team */}
              <div className="bg-white text-black p-4 rounded-sm text-md flex-1 min-w-[300px]">
                <h2 className="font-semibold text-lg mb-2">Firefighter Team</h2>
                <p><strong>Location:</strong> Station 3</p>
                <p><strong>Respondents:</strong> 7</p>
              </div>

              {/* Ambulance Team */}
              <div className="bg-white text-black p-4 rounded-sm text-md flex-1 min-w-[300px]">
                <h2 className="font-semibold text-lg mb-2">Ambulance Team</h2>
                <p><strong>Location:</strong> Emergency Hub B</p>
                <p><strong>Respondents:</strong> 9</p>
              </div>
            </div>
          </div>
        </Section>

        {/* Vehicles */}
        <Section title="Vehicles">
          {/*
          {vehicles.length > 0 ? vehicles.map(v => (
            <Card key={v.id}>
              <h2>{v.vehicle_type} — {v.license_plate}</h2>
              <Detail label="Team ID" value={v.team || '—'} />
              <Detail label="Capacity" value={v.capacity} />
              <Detail label="Active" value={v.is_active ? 'Yes' : 'No'} />
            </Card>
          )) : <p>No vehicles registered.</p>}
          */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-4">
              {/* Support Vehicles */}
              <div className="bg-white text-black p-4 rounded-sm text-md flex-1 min-w-[300px]">
                <h2 className="font-semibold text-lg mb-2">Support Vehicles</h2>
                <p><strong>ID:</strong> KOS 001</p>
                <p><strong>ID:</strong> KOS 002</p>
              </div>

              {/* Fire Trucks */}
              <div className="bg-white text-black p-4 rounded-sm text-md flex-1 min-w-[300px]">
                <h2 className="font-semibold text-lg mb-2">Fire Trucks</h2>
                <p><strong>ID:</strong> KAG 001</p>
                <p><strong>ID:</strong> KAG 002</p>
              </div>

              {/* Ambulances */}
              <div className="bg-white text-black p-4 rounded-sm text-md flex-1 min-w-[300px]">
                <h2 className="font-semibold text-lg mb-2">Ambulances</h2>
                <p><strong>ID:</strong> KMG 001</p>
                <p><strong>ID:</strong> KMG 002</p>
              </div>
            </div>
          </div>
        </Section>

        {/* Notifications */}
        <Section title="Recent Notifications">
          {/* 
          {notifications.length > 0 ? notifications.map(n => (
            <Card key={n.id}>
              <h2>{n.title}</h2>
              <p>{n.message}</p>
              <Detail label="Type" value={n.notification_type} />
              <Detail label="Incident ID" value={n.related_incident || '—'} />
              <Detail label="Read?" value={n.is_read ? 'Yes' : 'No'} />
              <Detail label="Sent at" value={new Date(n.created_at).toLocaleString()} />
            </Card>
          )) : <p>No notifications yet.</p>}
          */}
        </Section>
      </div>
    </div>
  );
}

const CenteredMessage = ({ text }) => (
  <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
    <p>{text}</p>
  </div>
);

const Section = ({ title, children }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-semibold text-amber-300">{title}</h2>
    {children}
  </div>
);

const Card = ({ children }) => (
  <div className="border border-amber-600 p-4 rounded-lg bg-white bg-opacity-10 space-y-1">
    {children}
  </div>
);

const Detail = ({ label, value }) => (
  <p className="text-sm">
    <span className="font-medium">{label}:</span> {value}
  </p>
);

export default AdminDash;
