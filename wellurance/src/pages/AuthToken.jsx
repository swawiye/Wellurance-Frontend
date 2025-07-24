import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('token') || '');

    useEffect(() => {
        if (token) {
            axios.get('/auth/users/me/', {
                headers: { Authorization: `Token ${token}` }
            }).then(res => {
                setUser(res.data);
            }).catch(() => setUser(null));
        }
    }, [token]);

    const login = async (email, password) => {
        const res = await axios.post('/auth/token/login/', { email, password });
        setToken(res.data.auth_token);
        localStorage.setItem('token', res.data.auth_token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
