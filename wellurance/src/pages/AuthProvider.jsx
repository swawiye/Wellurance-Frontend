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
      // Get user data with role from our custom profile endpoint
      axios
        .get('http://127.0.0.1:8000/api/profiles/me/', {
          headers: { Authorization: `Token ${token}` },
        })
        .then((res) => {
          // Combine basic user data with role from profile
          const userData = {
            id: res.data.id,
            username: res.data.username,
            email: res.data.email,
            role: res.data.role
          };
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
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

      // Fetch user info with role after login
      const userRes = await axios.get('http://127.0.0.1:8000/api/profiles/me/', {
        headers: { Authorization: `Token ${newToken}` },
      });

      const userData = {
        id: userRes.data.id,
        username: userRes.data.username,
        email: userRes.data.email,
        role: userRes.data.role
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
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

  const updateUser = async (updatedData) => {
    try {
      const res = await axios.patch(
        'http://127.0.0.1:8000/auth/users/me/', 
        updatedData,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      
      const updatedUser = { ...user, ...res.data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      console.error('Update failed:', error);
      throw error;
    }
  };

  const role = user?.role || null;
  const isAdmin = role === 'DISPATCHER'; 

  return (
    <AuthContext.Provider value={{ user, token, role, isAdmin, login, logout, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
