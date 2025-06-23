"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// Types for authentication
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    console.log("initializing auth");
    try {
      // Check if user is stored in localStorage (you can replace this with your auth service)
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      console.log("storedUser", storedUser);
      console.log("token", token);

      if (storedUser && token) {
        // Validate token with your backend here
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } else {
        console.log("clearing invalid data");
        // Clear invalid data
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Error initializing auth:", error);
      // Clear invalid data
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);

      const adminEmail = process.env.NEXT_PUBLIC_AUTHENTICATED_EMAIL;
      const adminPassword = process.env.NEXT_PUBLIC_AUTHENTICATED_PASSWORD;

      console.log(adminEmail, adminPassword);
      console.log(email, password);

      if (email === adminEmail && password === adminPassword) {
        localStorage.setItem("user", JSON.stringify({ email }));
        localStorage.setItem("token", "admin-token");
        setUser({ email, id: "1", name: "Admin" });
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      // Clear local storage
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Higher-order component for protected routes
export const withAuth = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        console.log("redirecting to home");
        router.replace("/");
      }
    }, [isAuthenticated, loading]);

    if (loading || !isAuthenticated) return null; // or a loading spinner

    if (loading) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-lg">Loading...</div>
        </div>
      );
    }

    return <Component {...props} />;
  };
};
