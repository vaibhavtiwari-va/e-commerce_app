import React, { createContext, useContext } from "react";
import { useAuth } from "@/hooks/use-auth";

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, loading, logout } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading: loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
}
