/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

interface AuthUser {
  login: string;
  role: string;
  token: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoggedIn: boolean;
  isAdmin: () => boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("bookreview_auth");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const login = (userData: AuthUser) => {
    console.log("Login recebido:", userData);
    localStorage.setItem("bookreview_auth", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("bookreview_auth");
    setUser(null);
    window.location.href = "/";
  };

  const isAdmin = () => user?.role === "ADMIN";

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
