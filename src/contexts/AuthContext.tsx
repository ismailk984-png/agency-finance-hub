import { createContext, useContext, useState, ReactNode } from 'react';

export type AppRole = 'super_admin' | 'hod' | 'campaign_manager' | 'editor' | 'designer';

interface AuthState {
  isAuthenticated: boolean;
  user: { email: string; name: string } | null;
  roles: AppRole[];
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('demo_auth') === 'true';
  });
  const [user, setUser] = useState<{ email: string; name: string } | null>(() => {
    const saved = localStorage.getItem('demo_user');
    return saved ? JSON.parse(saved) : null;
  });

  const signIn = async (email: string, _password: string): Promise<boolean> => {
    // Demo auth — accepts any credentials
    const u = { email, name: email.split('@')[0] };
    setUser(u);
    setIsAuthenticated(true);
    localStorage.setItem('demo_auth', 'true');
    localStorage.setItem('demo_user', JSON.stringify(u));
    return true;
  };

  const signOut = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('demo_auth');
    localStorage.removeItem('demo_user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, roles: ['super_admin'], signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}
