"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { getJwtToken, getStoredToken, removeStoredToken } from "@/lib/api";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  token: string | null;
  logout: () => Promise<void>;
  refreshToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  token: null,
  logout: async () => {},
  refreshToken: async () => null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: sessionData, isPending } = useSession();
  const [token, setToken] = useState<string | null>(null);
  const [isTokenLoading, setIsTokenLoading] = useState<boolean>(true);

  // Sync token whenever session changes
  useEffect(() => {
    let isMounted = true;

    async function syncAuth() {
      if (sessionData?.user?.email) {
        let currentToken = getStoredToken();
        if (!currentToken) {
          currentToken = await getJwtToken(
            sessionData.user.email,
            sessionData.user.name || undefined
          );
        }
        if (isMounted) {
          setToken(currentToken);
          setIsTokenLoading(false);
        }
      } else if (!isPending) {
        removeStoredToken();
        if (isMounted) {
          setToken(null);
          setIsTokenLoading(false);
        }
      }
    }

    if (!isPending) {
      syncAuth();
    }

    return () => {
      isMounted = false;
    };
  }, [sessionData, isPending]);

  const handleLogout = async () => {
    try {
      removeStoredToken();
      setToken(null);
      await signOut();
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  const refreshToken = async (): Promise<string | null> => {
    if (sessionData?.user?.email) {
      const newToken = await getJwtToken(
        sessionData.user.email,
        sessionData.user.name || undefined
      );
      setToken(newToken);
      return newToken;
    }
    return null;
  };

  const user: User | null = sessionData?.user
    ? {
        id: sessionData.user.id,
        name: sessionData.user.name || "Book Lover",
        email: sessionData.user.email,
        image: sessionData.user.image,
      }
    : null;

  const isLoading = isPending || (!!sessionData?.user && isTokenLoading);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        token,
        logout: handleLogout,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
