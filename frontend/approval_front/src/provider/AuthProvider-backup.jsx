import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { requestAPI } from '../api/requestAPI';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // sessionStorage에서 초기 상태 가져오기
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const navigate = useNavigate();

  // user 상태가 변경될 때마다 sessionStorage 업데이트
  useEffect(() => {
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('user');
    }
  }, [user]);

  const login = useCallback(
    async (formData) => {
      const userData = await requestAPI('/emp/login', {
        method: 'POST',
        data: formData,
      });
      setUser(userData);
      navigate('/approvalList');
    },
    [navigate]
  );

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem('user');
    navigate('/');
  }, [navigate]);

  const isLoggedIn = !!user;

  const value = useMemo(
    () => ({
      user,
      isLoggedIn,
      login,
      logout,
    }),
    [user, isLoggedIn, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}
