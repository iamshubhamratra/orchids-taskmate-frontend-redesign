"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard, Users, User, LogOut, Sun, Moon, Zap, Menu, X, ChevronDown,
} from "lucide-react";

function DashboardSidebar({ open, onClose }) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();
  const links = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/teams", label: "Teams", icon: Users },
    { href: "/dashboard/profile", label: "Profile", icon: User },
  ];

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const nav = (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 px-6 py-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">TaskMate</span>
        </div>
        <nav className="mt-4 space-y-1 px-3">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} onClick={onClose}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    active
                      ? "bg-indigo-500/15 text-indigo-300"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <link.icon className="h-5 w-5" />
                  {link.label}
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="px-3 pb-6">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-400 transition-all hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-white/5 bg-black/50 backdrop-blur-xl fixed inset-y-0 left-0 z-40">
        {nav}
      </aside>
      {/* Mobile sidebar */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-64 border-r border-white/5 bg-black lg:hidden"
            >
              <button onClick={onClose} className="absolute top-5 right-4 text-zinc-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
              {nav}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function DashboardHeader({ onMenuClick }) {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/5 bg-black/60 px-6 py-4 backdrop-blur-xl lg:pl-72">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden rounded-lg p-2 text-zinc-400 hover:bg-white/10 hover:text-white">
          <Menu className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-semibold text-white">
          {user ? `Welcome, ${user.name || "User"}` : "Dashboard"}
        </h2>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={toggleTheme} className="rounded-full p-2 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors">
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
        <Link href="/dashboard/profile">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-bold text-white">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
        </Link>
      </div>
    </header>
  );
}

function DashboardLayoutContent({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-black">
      <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
      <main className="lg:pl-64">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-6"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}

export default function DashboardLayout({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DashboardLayoutContent>{children}</DashboardLayoutContent>
      </AuthProvider>
    </ThemeProvider>
  );
}
