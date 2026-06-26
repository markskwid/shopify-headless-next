"use client";
import { createContext, useContext, useState } from "react";

type AUTH_CONTEXT_TYPE = {
  isLoggedIn: boolean;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  setLoggedOut(): void;
  setLoggedIn(data: {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
  }): void;
};

const AuthContext = createContext<AUTH_CONTEXT_TYPE | undefined>(undefined);

interface AUTH_PROVIDER_PROPS {
  children: React.ReactNode;
  initialState: Omit<AUTH_CONTEXT_TYPE, "setLoggedOut" | "setLoggedIn">;
}

export const AuthProvider = ({
  children,
  initialState,
}: AUTH_PROVIDER_PROPS) => {
  const [auth, setAuth] = useState(initialState);

  const setLoggedOut = () => {
    setAuth({
      isLoggedIn: false,
      firstName: null,
      lastName: null,
      email: null,
    });
  };

  const setLoggedIn = (data: {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
  }) => {
    setAuth({
      isLoggedIn: true,
      ...data,
    });
  };

  return (
    <AuthContext.Provider value={{ ...auth, setLoggedIn, setLoggedOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
