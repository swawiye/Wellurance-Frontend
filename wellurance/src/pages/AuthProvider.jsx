import { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token && !user) {
      axios
        .get('http://127.0.0.1:8000/auth/users/me/', {
          headers: { Authorization: `Token ${token}` },
        })
        .then((res) => {
          setUser(res.data);
          localStorage.setItem('user', JSON.stringify(res.data));
        })
        .catch(() => {
          setUser(null);
          setToken('');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await axios.post('http://127.0.0.1:8000/auth/token/login/', {
        username: email,
        password,
      });

      const newToken = res.data.auth_token;
      setToken(newToken);
      localStorage.setItem('token', newToken);

      // Fetch user info after login
      const userRes = await axios.get('http://127.0.0.1:8000/auth/users/me/', {
        headers: { Authorization: `Token ${newToken}` },
      });

      setUser(userRes.data);
      localStorage.setItem('user', JSON.stringify(userRes.data));
    } catch {
      throw new Error('Login failed. Please check your credentials.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken('');
    setUser(null);
  };

  const role = user?.role || null;
  const isAdmin = role === 'DISPATCHER'; 

  return (
    <AuthContext.Provider value={{ user, token, role, isAdmin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
