
import { useState, useEffect } from 'react';

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if admin session exists
    const adminSession = localStorage.getItem('93cars-admin-session');
    if (adminSession) {
      const session = JSON.parse(adminSession);
      // Check if session is still valid (24 hours)
      const isExpired = Date.now() - session.timestamp > 24 * 60 * 60 * 1000;
      if (!isExpired) {
        setIsAdmin(true);
      } else {
        localStorage.removeItem('93cars-admin-session');
      }
    }
  }, []);

  const login = (password) => {
    // Simple password check (in production, this should be more secure)
    if (password === 'cars93@Biz!2025') {
      const session = {
        timestamp: Date.now(),
        isAdmin: true
      };
      localStorage.setItem('93cars-admin-session', JSON.stringify(session));
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('93cars-admin-session');
    setIsAdmin(false);
  };

  return { isAdmin, login, logout };
};
