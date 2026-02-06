"use client";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import LandingPage from "@/components/landing/LandingPage";

export default function Home() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LandingPage />
      </AuthProvider>
    </ThemeProvider>
  );
}
