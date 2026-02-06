"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { FadeIn, GlowButton } from "@/components/animations";
import { Zap, Eye, EyeOff, Sun, Moon, ArrowLeft, Loader2 } from "lucide-react";

function SignupForm() {
  const { theme, toggleTheme } = useTheme();
  const { signup } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", designation: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(form.password)) {
      setError("Password must be 8+ chars with uppercase, lowercase, number, and special character.");
      return;
    }
    setLoading(true);
    try {
      const res = await signup({ ...form, role: "user" });
      if (res.ok) {
        router.push("/login");
      } else {
        setError(res.data?.message || "Signup failed. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-black">
      {/* Left side */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-indigo-600/20" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">TaskMate</span>
          </Link>
        </div>
        <div className="relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-white leading-tight"
          >
            Start your journey.<br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Build something great.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-4 text-zinc-400 max-w-md">
            Create your free account and start managing tasks with your team in seconds.
          </motion.p>
        </div>
        <div className="relative z-10 text-xs text-zinc-600">&copy; 2025 TaskMate</div>
      </div>

      {/* Right side */}
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center px-6 py-12">
        <div className="absolute top-6 right-6">
          <button onClick={toggleTheme} className="rounded-full p-2 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>

        <FadeIn className="w-full max-w-sm">
          <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 text-sm">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>

          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">TaskMate</span>
          </div>

          <h1 className="text-2xl font-bold text-white">Create account</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Already have an account? <Link href="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors">Sign in</Link>
          </p>

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Full Name</label>
              <input type="text" value={form.name} onChange={update("name")} required placeholder="John Doe" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Email</label>
              <input type="email" value={form.email} onChange={update("email")} required placeholder="you@example.com" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Designation</label>
              <input type="text" value={form.designation} onChange={update("designation")} placeholder="e.g. Developer, Designer" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Password</label>
              <div className="relative">
                <input type={showPass ? "text" : "password"} value={form.password} onChange={update("password")} required placeholder="Min 8 chars, mixed case, number, special" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-10 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white">
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <GlowButton type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 text-sm font-semibold text-white disabled:opacity-50 mt-2">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Account"}
            </GlowButton>
          </form>
        </FadeIn>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SignupForm />
      </AuthProvider>
    </ThemeProvider>
  );
}
