import {useState, useEffect} from 'react';
import axios from 'axios';
import {AuthContext} from './AuthContext';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('token') || '');

    useEffect(() => {
        if (token) {
            axios.get('http://127.0.0.1:8000/auth/users/me/', {
                headers: { Authorization: `Token ${token}` }
            })
            .then(res => {
                setUser(res.data);
            })
            .catch(() => {
                setUser(null);
                setToken('');
                localStorage.removeItem('token');
            });
        }
    }, [token]);

    const login = async (email, password) => {
        try {
            const res = await axios.post('http://127.0.0.1:8000/auth/token/login/', { username: email, password });
            setToken(res.data.auth_token);
            localStorage.setItem('token', res.data.auth_token);
        } catch {
            throw new Error('Login failed. Please check your credentials.');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
    };

    const role = user?.role || null;
    const isAdmin = role === 'admin';

    return (
        <AuthContext.Provider value={{ user, token, role, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
