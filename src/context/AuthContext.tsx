import React, { createContext, useState, useContext, ReactNode } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface AuthContextType {
  token: string | null;
  login: (result: { token: string }) => void;
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

  const login = (result: { token: string }) => {
    const { token: newToken } = result;
    setToken(newToken);
    localStorage.setItem("authToken", newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
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

// A custom hook to check if the user is admin
export const useCheckAdminRole = () => {
  const token = localStorage.getItem("authToken");

  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token) as JwtPayload;

    // Check for the role in the payload
    if (decodedToken && decodedToken.sub) {
      // If you have roles in the payload, you can check it
      if (
        decodedToken.aud &&
        Array.isArray(decodedToken.aud) &&
        decodedToken.aud.includes("Admin")
      ) {
        return true;
      }
    }
    return false; // If not an admin, return false
  } catch (error) {
    console.error("Token decoding error:", error);
    return false;
  }
};
