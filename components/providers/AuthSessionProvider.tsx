"use client";

import { createContext, useContext, type ReactNode } from "react";

type AuthStatus = {
  isLoggedIn: boolean;
};

const AuthStatusContext = createContext<AuthStatus>({ isLoggedIn: false });

type AuthSessionProviderProps = {
  isLoggedIn: boolean;
  children: ReactNode;
};

export function AuthSessionProvider({ isLoggedIn, children }: AuthSessionProviderProps) {
  return <AuthStatusContext.Provider value={{ isLoggedIn }}>{children}</AuthStatusContext.Provider>;
}

export function useAuthStatus(): AuthStatus {
  return useContext(AuthStatusContext);
}
