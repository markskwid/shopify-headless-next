"use client";
import { createContext, useContext } from "react";

type AUTH_CONTEXT_TYPE = {
  isLoggedIn: boolean;
  firstName: string | null;
  lastName: string | null;
};

const AuthContext = createContext<AUTH_CONTEXT_TYPE | undefined>(undefined);

interface AUTH_PROVIDER_PROPS {
  children: React.ReactNode;
  initialState: AUTH_CONTEXT_TYPE;
}

export const AuthProvider = ({
  children,
  initialState,
}: AUTH_PROVIDER_PROPS) => {
  return (
    <AuthContext.Provider value={initialState}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
