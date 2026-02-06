"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("taskmate-user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {}
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await api.login({ email, password });
    if (res.ok) {
      const userData = res.data.data || { email, name: email.split("@")[0] };
      setUser(userData);
      localStorage.setItem("taskmate-user", JSON.stringify(userData));
      const token = res.data?.token || res.data?.data?.token;
      if (token) {
        localStorage.setItem("taskmate-token", token);
      }
    }
    return res;
  };

  const signup = async (data) => {
    const res = await api.signup(data);
    return res;
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
    localStorage.removeItem("taskmate-user");
    localStorage.removeItem("taskmate-token");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
