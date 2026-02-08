"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Load user from localStorage on first load
  useEffect(() => {
    const saved = localStorage.getItem("taskmate-user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem("taskmate-user");
      }
    }
    setLoading(false);
  }, []);

  // ✅ FIXED LOGIN (cookie + profile fetch)
  const login = async (email, password) => {
    setLoading(true);

    try {
      // 1️⃣ Login (sets cookie)
      const res = await api.login({ email, password });

      if (!res?.ok || res?.data?.status !== "success") {
        return res;
      }

      // 2️⃣ Fetch FULL profile (single source of truth)
      const profileRes = await api.getProfile();

      if (!profileRes?.ok || profileRes?.data?.status !== "Success") {
        throw new Error("Profile fetch failed");
      }

      // 3️⃣ Store full user
      setUser(profileRes.data.data);
      localStorage.setItem(
        "taskmate-user",
        JSON.stringify(profileRes.data.data)
      );

      return res;
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (data) => {
    setLoading(true);
    try {
      return await api.signup(data);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch {}
    setUser(null);
    localStorage.removeItem("taskmate-user");
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, signup, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
