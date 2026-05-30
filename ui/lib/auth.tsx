"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api, setApiToken } from "@/lib/api";

type AuthUser = {
  id: number;
  name: string;
  email: string;
} | null;

type AuthContextValue = {
  token: string | null;
  user: AuthUser;
  loading: boolean;
  signIn: (token: string, user: AuthUser) => void;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = "sentinal_token";

export function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return window.localStorage.getItem(TOKEN_KEY);
  });
  const [user, setUser] = useState<AuthUser>(null);

  useEffect(() => {
    setApiToken(token);
  }, [token]);

  const refreshUser = useCallback(async () => {
    if (!token) {
      setUser(null);
      return;
    }

    const response = await api.get("/auth/me");
    setUser(response.data.user);
  }, [token]);

  const signOut = useCallback(async () => {
    if (token) {
      try {
        await api.post("/auth/logout");
      } catch {
        // Ignore logout failures; local state still clears.
      }
    }

    window.localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
    setApiToken(null);
  }, [token]);

  const signIn = useCallback((nextToken: string, nextUser: AuthUser) => {
    window.localStorage.setItem(TOKEN_KEY, nextToken);
    setToken(nextToken);
    setUser(nextUser);
    setApiToken(nextToken);
  }, []);

  return <AuthContext.Provider value={{ token, user, loading: false, signIn, signOut, refreshUser }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}