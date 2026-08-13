import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

/* eslint-disable react-refresh/only-export-components */

/**
 * Single hardcoded admin password. Change this constant to update the password.
 * For a real deployment, move auth to Supabase Auth and remove this constant.
 */
export const ADMIN_PASSWORD = 'admin123';
const SESSION_KEY = 'wedding_admin_session_v1';

interface AuthContextValue {
  authenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(
    () => localStorage.getItem(SESSION_KEY) === '1',
  );

  const login = useCallback((password: string) => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(SESSION_KEY, '1');
      setAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
