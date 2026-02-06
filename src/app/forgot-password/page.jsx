"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { FadeIn, GlowButton } from "@/components/animations";
import { Zap, ArrowLeft, Loader2, Mail, KeyRound, CheckCircle } from "lucide-react";

function ForgotPasswordContent() {
  const [step, setStep] = useState(1); // 1=email, 2=otp, 3=newpass, 4=done
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.sendOtp({ email, otpType: "email" });
      if (res.ok) setStep(2);
      else setError(res.data?.message || "Failed to send OTP");
    } catch { setError("Network error"); }
    setLoading(false);
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.verifyOtp({ email, otp });
      if (res.ok || res.data?.data?.token) {
        setToken(res.data.data.token);
        setStep(3);
      } else setError(res.data?.message || "Invalid OTP");
    } catch { setError("Network error"); }
    setLoading(false);
  };

  const resetPass = async (e) => {
    e.preventDefault();
    setError("");
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(newPassword)) {
      setError("Password must be 8+ chars with uppercase, lowercase, number, and special character.");
      return;
    }
    setLoading(true);
    try {
      const res = await api.setNewPassword({ token, newPassword });
      if (res.ok) setStep(4);
      else setError(res.data?.message || "Failed to reset password");
    } catch { setError("Network error"); }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 via-transparent to-purple-600/5" />
      <FadeIn className="relative w-full max-w-md">
        <Link href="/login" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 text-sm">
          <ArrowLeft className="h-4 w-4" /> Back to sign in
        </Link>

        <div className="flex items-center gap-2 mb-8">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">TaskMate</span>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= s ? "bg-indigo-500" : "bg-white/10"}`} />
          ))}
        </div>

        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
              <Mail className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-bold text-white">Forgot password?</h1>
            <p className="mt-2 text-sm text-zinc-400">Enter your email and we&apos;ll send you an OTP to reset your password.</p>
            {error && <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>}
            <form onSubmit={sendOtp} className="mt-6 space-y-4">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20" />
              <GlowButton type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 text-sm font-semibold text-white disabled:opacity-50">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send OTP"}
              </GlowButton>
            </form>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
              <KeyRound className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-bold text-white">Enter OTP</h1>
            <p className="mt-2 text-sm text-zinc-400">We sent a code to {email}</p>
            {error && <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>}
            <form onSubmit={verifyOtp} className="mt-6 space-y-4">
              <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required placeholder="Enter 6-digit OTP" maxLength={6} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white text-center tracking-[0.3em] placeholder-zinc-500 outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20" />
              <GlowButton type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 text-sm font-semibold text-white disabled:opacity-50">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify OTP"}
              </GlowButton>
            </form>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-2xl font-bold text-white">Set new password</h1>
            <p className="mt-2 text-sm text-zinc-400">Choose a strong password for your account.</p>
            {error && <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>}
            <form onSubmit={resetPass} className="mt-6 space-y-4">
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required placeholder="New password" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20" />
              <GlowButton type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 text-sm font-semibold text-white disabled:opacity-50">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Reset Password"}
              </GlowButton>
            </form>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Password reset!</h1>
            <p className="mt-2 text-sm text-zinc-400">Your password has been updated successfully.</p>
            <Link href="/login" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white">
              Sign In
            </Link>
          </motion.div>
        )}
      </FadeIn>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ForgotPasswordContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
