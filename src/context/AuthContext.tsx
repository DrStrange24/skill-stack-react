import React, { createContext, useState, useContext, ReactNode } from "react";

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  emailConfirmed: boolean;
}

interface AuthContextType {
  token: string | null;
  user: IUser | null;
  login: (result: { token: string; user: IUser }) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );
  const [user, setUser] = useState<IUser | null>(
    token ? JSON.parse(localStorage.getItem("user") || "null") : null
  );

  const login = (result: { token: string; user: IUser }) => {
    const { token: newToken, user: userData } = result;
    setToken(newToken);
    setUser(userData);
    localStorage.setItem("authToken", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
