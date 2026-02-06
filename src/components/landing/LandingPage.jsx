"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  GlowButton,
  FloatingElement,
  SlideIn,
} from "@/components/animations";
import {
  CheckCircle,
  Users,
  Shield,
  Zap,
  ArrowRight,
  Star,
  BarChart3,
  Clock,
  Globe,
  Layers,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">TaskMate</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-zinc-400 transition-colors hover:text-white">Features</a>
          <a href="#stats" className="text-sm text-zinc-400 transition-colors hover:text-white">Stats</a>
          <a href="#testimonials" className="text-sm text-zinc-400 transition-colors hover:text-white">Testimonials</a>
          <a href="#faq" className="text-sm text-zinc-400 transition-colors hover:text-white">FAQ</a>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link
            href="/login"
            className="hidden sm:inline-flex rounded-lg px-4 py-2 text-sm font-medium text-zinc-300 transition-all hover:bg-white/10 hover:text-white"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-indigo-500/25"
          >
            Get Started
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden rounded-lg p-2 text-zinc-400 hover:bg-white/10 hover:text-white">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-white/5 bg-black/90 md:hidden"
        >
          <div className="flex flex-col gap-2 px-6 py-4">
            <a href="#features" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm text-zinc-400 hover:bg-white/10 hover:text-white">Features</a>
            <a href="#stats" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm text-zinc-400 hover:bg-white/10 hover:text-white">Stats</a>
            <a href="#testimonials" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm text-zinc-400 hover:bg-white/10 hover:text-white">Testimonials</a>
            <a href="#faq" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm text-zinc-400 hover:bg-white/10 hover:text-white">FAQ</a>
            <Link href="/login" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm text-zinc-400 hover:bg-white/10 hover:text-white">Sign In</Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-black" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-3xl"
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <FadeIn delay={0.1}>
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5">
          <div className="h-2 w-2 animate-pulse rounded-full bg-indigo-400" />
          <span className="text-xs font-medium text-indigo-300">Now in Public Beta</span>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <h1 className="max-w-4xl text-center text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
          Manage Tasks.{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Build Teams.
          </span>
          <br />
          Ship Faster.
        </h1>
      </FadeIn>

      <FadeIn delay={0.4}>
        <p className="mt-6 max-w-2xl text-center text-lg text-zinc-400 sm:text-xl">
          TaskMate is the modern project management platform that helps teams collaborate, 
          track progress, and deliver results with powerful tools and real-time updates.
        </p>
      </FadeIn>

      <FadeIn delay={0.6}>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link href="/signup">
            <GlowButton className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-4 text-base font-semibold text-white transition-all">
              Start For Free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </GlowButton>
          </Link>
          <a
            href="#features"
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-base font-medium text-zinc-300 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white"
          >
            Learn More
          </a>
        </div>
      </FadeIn>

      <FadeIn delay={0.8}>
        <div className="mt-16 flex items-center gap-8 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Free forever plan</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>No credit card required</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Instant setup</span>
          </div>
        </div>
      </FadeIn>

      {/* Hero visual */}
      <FadeIn delay={1.0}>
        <div className="relative mt-20 w-full max-w-5xl">
          <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-xl" />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/80 p-1 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs text-zinc-500">TaskMate Dashboard</span>
            </div>
            <div className="grid grid-cols-4 gap-4 p-6">
              <div className="col-span-1 space-y-3">
                {["Dashboard", "Teams", "Tasks", "Profile"].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2 + i * 0.1 }}
                    className={`rounded-lg px-3 py-2 text-xs ${i === 0 ? "bg-indigo-500/20 text-indigo-300" : "text-zinc-500 hover:bg-white/5"}`}
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
              <div className="col-span-3 space-y-3">
                {[
                  { title: "Design Sprint Review", status: "In Progress", color: "bg-yellow-500" },
                  { title: "Backend API Integration", status: "Completed", color: "bg-green-500" },
                  { title: "User Testing Round 2", status: "Pending", color: "bg-zinc-500" },
                ].map((task, i) => (
                  <motion.div
                    key={task.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.3 + i * 0.15 }}
                    className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${task.color}`} />
                      <span className="text-sm text-zinc-300">{task.title}</span>
                    </div>
                    <span className="text-xs text-zinc-500">{task.status}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    { icon: Users, title: "Team Management", desc: "Create and manage teams, assign roles, and collaborate seamlessly across your organization." },
    { icon: CheckCircle, title: "Task Tracking", desc: "Track tasks from creation to completion with real-time status updates and progress monitoring." },
    { icon: Shield, title: "Secure by Design", desc: "Enterprise-grade security with JWT authentication, encrypted passwords, and secure sessions." },
    { icon: Zap, title: "Lightning Fast", desc: "Built with performance in mind. Instant updates, optimistic UI, and zero-latency interactions." },
    { icon: Globe, title: "Access Anywhere", desc: "Fully responsive design works perfectly on desktop, tablet, and mobile devices." },
    { icon: Layers, title: "Smart Organization", desc: "Organize tasks with team keys, descriptions, and intelligent search across all your projects." },
  ];
  return (
    <section id="features" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-indigo-400">Features</span>
            <h2 className="mt-4 text-4xl font-bold text-white sm:text-5xl">Everything you need to ship</h2>
            <p className="mt-4 text-lg text-zinc-400">Powerful features designed for modern teams</p>
          </div>
        </FadeIn>
        <StaggerContainer className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
          {features.map((f, i) => (
            <StaggerItem key={f.title}>
              <motion.div
                whileHover={{ y: -5, borderColor: "rgba(99,102,241,0.3)" }}
                className="group rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-all duration-300 hover:bg-white/[0.04]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-400 transition-colors group-hover:from-indigo-500/30 group-hover:to-purple-500/30">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{f.desc}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "50K+", label: "Tasks Completed" },
    { value: "2K+", label: "Teams Created" },
    { value: "99.9%", label: "Uptime" },
  ];
  return (
    <section id="stats" className="relative py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 p-1">
          <div className="rounded-[22px] bg-black/40 px-8 py-16 backdrop-blur-sm">
            <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.15}>
              {stats.map((s) => (
                <StaggerItem key={s.label} className="text-center">
                  <div className="text-4xl font-bold text-white lg:text-5xl">{s.value}</div>
                  <div className="mt-2 text-sm text-zinc-400">{s.label}</div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    { name: "Sarah Chen", role: "Product Manager", text: "TaskMate transformed how our team works. We shipped 3x faster in the first month.", avatar: "SC" },
    { name: "Alex Rivera", role: "Engineering Lead", text: "The team management features are incredible. Best tool we've adopted this year.", avatar: "AR" },
    { name: "Priya Sharma", role: "Startup Founder", text: "Simple, fast, and effective. TaskMate is exactly what small teams need to stay organized.", avatar: "PS" },
  ];
  return (
    <section id="testimonials" className="py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-indigo-400">Testimonials</span>
            <h2 className="mt-4 text-4xl font-bold text-white sm:text-5xl">Loved by teams everywhere</h2>
          </div>
        </FadeIn>
        <StaggerContainer className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.15}>
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-zinc-300">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-bold text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{t.name}</div>
                    <div className="text-xs text-zinc-500">{t.role}</div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { num: "01", title: "Create Account", desc: "Sign up in seconds with your email. No credit card required." },
    { num: "02", title: "Build Your Team", desc: "Invite members, set roles, and organize your workspace." },
    { num: "03", title: "Track & Deliver", desc: "Create tasks, monitor progress, and ship projects on time." },
  ];
  return (
    <section className="py-32 px-6">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-indigo-400">How It Works</span>
            <h2 className="mt-4 text-4xl font-bold text-white sm:text-5xl">Get started in 3 steps</h2>
          </div>
        </FadeIn>
        <div className="mt-20 space-y-12">
          {steps.map((step, i) => (
            <SlideIn key={step.num} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.15}>
              <div className="flex items-start gap-8">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-2xl font-bold text-indigo-400">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-zinc-400">{step.desc}</p>
                </div>
              </div>
            </SlideIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "Is TaskMate free to use?", a: "Yes! TaskMate offers a generous free plan that includes team creation, task management, and core collaboration features." },
    { q: "How secure is my data?", a: "We use JWT authentication, bcrypt password hashing, and encrypted sessions. Your data is safe with enterprise-grade security." },
    { q: "Can I manage multiple teams?", a: "You can create and admin multiple teams, each with unique team keys for easy member management." },
    { q: "What devices are supported?", a: "TaskMate works on all modern browsers and is fully responsive across desktop, tablet, and mobile devices." },
  ];
  return (
    <section id="faq" className="py-32 px-6">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-indigo-400">FAQ</span>
            <h2 className="mt-4 text-4xl font-bold text-white sm:text-5xl">Frequently Asked Questions</h2>
          </div>
        </FadeIn>
        <div className="mt-16 space-y-4">
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <motion.div
                className="overflow-hidden rounded-xl border border-white/5 bg-white/[0.02]"
                layout
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-sm font-medium text-white">{faq.q}</span>
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    className="ml-4 text-zinc-400"
                  >
                    +
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-sm leading-relaxed text-zinc-400">{faq.a}</p>
                </motion.div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-32 px-6">
      <FadeIn>
        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 p-1">
          <div className="rounded-[22px] bg-black/60 px-8 py-20 text-center backdrop-blur-sm sm:px-16">
            <h2 className="text-4xl font-bold text-white sm:text-5xl">Ready to get started?</h2>
            <p className="mt-4 text-lg text-zinc-400">
              Join thousands of teams already using TaskMate to ship better products, faster.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/signup">
                <GlowButton className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-4 text-base font-semibold text-white">
                  Create Free Account
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </GlowButton>
              </Link>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-white">TaskMate</span>
        </div>
        <div className="flex gap-6">
          <a href="#features" className="text-xs text-zinc-500 hover:text-zinc-300">Features</a>
          <a href="#faq" className="text-xs text-zinc-500 hover:text-zinc-300">FAQ</a>
          <Link href="/login" className="text-xs text-zinc-500 hover:text-zinc-300">Sign In</Link>
          <Link href="/signup" className="text-xs text-zinc-500 hover:text-zinc-300">Sign Up</Link>
        </div>
        <p className="text-xs text-zinc-600">&copy; 2025 TaskMate. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
