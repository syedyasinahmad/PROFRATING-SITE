import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('profpulse_token') || null;
    } catch (e) {
      return null;
    }
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');

  useEffect(() => {
    if (token) {
      api.getMe()
        .then(data => {
          setUser(data.user);
        })
        .catch(() => {
          try {
            localStorage.removeItem('profpulse_token');
          } catch (e) {}
          setToken(null);
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await api.login({ email, password });
    try {
      localStorage.setItem('profpulse_token', res.token);
    } catch (e) {}
    setToken(res.token);
    setUser(res.user);
    setAuthModalOpen(false);
    return res;
  };

  const register = async (name, email, password) => {
    const res = await api.register({ name, email, password });
    try {
      localStorage.setItem('profpulse_token', res.token);
    } catch (e) {}
    setToken(res.token);
    setUser(res.user);
    setAuthModalOpen(false);
    return res;
  };

  const logout = () => {
    try {
      localStorage.removeItem('profpulse_token');
    } catch (e) {}
    setToken(null);
    setUser(null);
  };

  const openAuth = (mode = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuth = () => {
    setAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      register,
      logout,
      authModalOpen,
      authModalMode,
      setAuthModalMode,
      openAuth,
      closeAuth,
      setUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
