"use client";
import { useState, useEffect } from "react";
import type React from "react";

import {
  ArrowUpRight,
  Mail,
  Github,
  Linkedin,
  Zap,
  Target,
  Rocket,
  Code,
  Sparkles,
  Globe,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import clsx from "clsx";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-neon-pink/30 selection:text-foreground overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-blue rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-neon-purple rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-neon-pink rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, #8882 1px, transparent 1px), linear-gradient(to bottom, #8882 1px, transparent 1px)",
            backgroundSize: "4rem 4rem",
            maskImage:
              "radial-gradient(circle at center, black, transparent 80%)",
          }}
        />
      </div>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b border-border/40">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="group relative">
            <div className="font-black text-2xl tracking-tighter flex items-center gap-1">
              <span className="text-foreground group-hover:text-neon-pink transition-colors duration-300">
                LB
              </span>
              <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
              <span className="text-muted-foreground group-hover:text-neon-blue transition-colors duration-300">
                portfolio
              </span>
            </div>
          </Link>
          <div className="hidden md:flex group items-center gap-1 justify-center leading-relaxed tracking-wide uppercase text-sky-400 text-sm sm:text-base  font-semibold hover:text-sky-300">
            <a href="https://ap13-creative.company/" target="_blank">
              AP13 Creative
            </a>{" "}
            <ArrowRight className="group-hover:scale-125 transition-transform duration-300" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-22 sm:pt-32 sm:pb-20 relative z-10">
        {/* Hero Section */}
        <section className="mb-32 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">
            {/* Main Title Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-1 md:col-span-8 md:row-span-2 bg-card border-2 border-border p-8 rounded-[2rem] shadow-xl relative overflow-hidden group hover:border-neon-blue transition-colors duration-500"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Code size={120} />
              </div>
              <div className="flex flex-col justify-between h-full relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-green/20 text-green-700 dark:text-green-300 w-fit text-xs font-bold uppercase tracking-wide mb-4">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Available for work
                </div>
                <div>
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-4">
                    Luka <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink animate-gradient-x">
                      Bartulović
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-medium text-balance">
                    Turning Ideas into{" "}
                    <span className="text-foreground decoration-wavy underline decoration-neon-pink">
                      Scalable
                    </span>
                    , Beautiful Apps
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="col-span-1 md:col-span-4 bg-neon-yellow rounded-[2rem] p-6 border-2 border-border flex flex-col justify-center items-center text-center relative overflow-hidden group rotate-1 hover:rotate-0 transition-transform duration-300"
            >
              <div className="w-28 h-28 bg-white rounded-full border-4 border-black mb-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue to-neon-pink" />
                <div className="absolute inset-0 flex items-center justify-center text-4xl font-black text-white mix-blend-difference">
                  LB
                </div>
              </div>
              <h3 className="text-2xl font-black text-black mb-1">
                Frontend Eng.
              </h3>
              <p className="text-black/70 font-mono text-sm font-bold uppercase">
                & Product Builder
              </p>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="col-span-1 md:col-span-4 bg-black text-white p-6 rounded-[2rem] flex flex-col justify-between group hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-0" />
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-neon-pink blur-[50px] opacity-30 group-hover:opacity-60 transition-opacity" />
              <div className="relative z-10">
                <span className="text-5xl md:text-6xl font-black text-neon-yellow">
                  5+
                </span>
                <p className="text-gray-400 font-mono text-sm mt-2">
                  Years of experience
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="col-span-1 md:col-span-4 bg-neon-blue text-white p-6 rounded-[2rem] flex flex-col justify-between group hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden"
            >
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative z-10">
                <span className="text-5xl md:text-6xl font-black">10+</span>
                <p className="text-white/70 font-mono text-sm mt-2">
                  Production projects shipped
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="col-span-1 md:col-span-4 bg-neon-purple text-white p-6 rounded-[2rem] flex flex-col justify-between group hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden"
            >
              <div className="absolute -left-10 -top-10 w-32 h-32 bg-neon-pink blur-[50px] opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative z-10">
                <span className="text-5xl md:text-6xl font-black">48h</span>
                <p className="text-white/70 font-mono text-sm mt-2">
                  To first prototype
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-8 text-center">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-pink">
                Me
              </span>
            </h2>
            <div className="bg-card border-2 border-border rounded-[2rem] p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground mb-8 relative z-10">
                I'm Luka — a{" "}
                <span className="text-foreground font-semibold">
                  frontend engineer
                </span>{" "}
                and{" "}
                <span className="text-foreground font-semibold">
                  product builder
                </span>
                . I create{" "}
                <span className="text-neon-blue font-semibold">fast</span>,{" "}
                <span className="text-neon-pink font-semibold">
                  beautifully designed
                </span>{" "}
                web and mobile apps.
              </p>
              <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground relative z-10">
                My mindset is{" "}
                <span className="font-bold text-white bg-neon-yellow/50 px-2 py-1 rounded">
                  Maximum Game
                </span>
                : focus, speed, problem-solving and delivery.
              </p>
            </div>

            {/* Philosophy Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-card border-2 border-border rounded-2xl p-6 hover:border-neon-yellow transition-colors group"
              >
                <Zap className="w-10 h-10 text-neon-yellow mb-4 " />
                <h3 className="text-xl font-black mb-2">Speed</h3>
                <p className="text-muted-foreground">
                  Prototype in 24–48h. Fast → validate → iterate.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-card border-2 border-border rounded-2xl p-6 hover:border-neon-blue transition-colors group"
              >
                <Target className="w-10 h-10 text-neon-blue mb-4" />
                <h3 className="text-xl font-black mb-2">Clarity</h3>
                <p className="text-muted-foreground">
                  One clean path to value. No friction.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-card border-2 border-border rounded-2xl p-6 hover:border-neon-green transition-colors group"
              >
                <Rocket className="w-10 h-10 text-neon-green mb-4 " />
                <h3 className="text-xl font-black mb-2">Delivery</h3>
                <p className="text-muted-foreground">
                  {"No excuses. Shipped > perfect."}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-32">
          <div className="flex items-end justify-between mb-16">
            <h2 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50 tracking-tighter">
              PROJECTS
            </h2>
            <div className="hidden md:block text-right">
              <p className="font-mono text-sm text-muted-foreground">
                SELECTED WORK
              </p>
              <p className="font-mono text-sm text-muted-foreground">
                2025 — 2026
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard
              title="ConsigliereX"
              description="Gamified self development app with AI guidance."
              tags={["Next.js", "SQL", "AI"]}
              color="neon-blue"
              icon={<Sparkles className="w-8 h-8" />}
              href="https://consigliere-x.vercel.app/"
            />
            <ProjectCard
              title="Tarot + Natal AI"
              description="AI-powered tarot & natal chart. Structured, multilingual, fast."
              tags={["Next.js", "AI", "OG/SEO", "Edge"]}
              color="neon-purple"
              icon={<Sparkles className="w-8 h-8" />}
              href="https://www.tarot-hr.cards"
            />
            <ProjectCard
              title="PartyGate"
              description="Event planning app."
              tags={["React", "SQL"]}
              color="neon-green"
              icon={<Sparkles className="w-8 h-8" />}
              href="https://www.partygate.app/"
            />
          </div>
        </section>

        {/* AI Lab Section */}
        <section id="ai-lab" className="mb-32 relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink opacity-20 blur-2xl rounded-[3rem] -z-10" />
          <div className="bg-background/80 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 md:p-16 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-4 py-1 rounded-full border border-neon-purple/50 text-neon-purple text-sm font-bold uppercase tracking-wider mb-6 bg-neon-purple/10">
                  Experimental
                </div>
                <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                  The <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-pink">
                    AI Lab
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  I build AI features that serve the user: structured outputs,
                  stable chains, evaluation, and real product value. No fog —
                  only results.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: "AI Product Design",
                      desc: "Idea → prototype in 24–48h. UX, value props, screen flows.",
                    },
                    {
                      title: "LLM Orchestration",
                      desc: "Structured output, function calling, chains, evals, guardrails.",
                    },
                    {
                      title: "RAG + Vector Search",
                      desc: "Supabase pgvector, embeddings, hybrid queries, caching.",
                    },
                    {
                      title: "Realtime & Edge",
                      desc: "Supabase Realtime, Edge Functions, cron & webhooks.",
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-neon-purple/50 transition-colors"
                    >
                      <h4 className="font-bold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Terminal Visual */}
              <div className="relative h-[400px] bg-black rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="absolute w-64 h-64 bg-neon-blue/30 rounded-full blur-[60px] animate-pulse" />
                <div className="absolute w-40 h-40 bg-neon-pink/40 rounded-full blur-[40px] translate-x-10 translate-y-10 animate-blob" />

                <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl max-w-xs w-full">
                  <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-xs text-white/50 font-mono ml-auto">
                      ai-lab.ts
                    </span>
                  </div>
                  <div className="space-y-2 font-mono text-xs text-neon-green">
                    <p>{">"} Initializing neural interface...</p>
                    <p>{">"} Loading context...</p>
                    <p className="text-white">
                      {">"} "Build something legendary."
                    </p>
                    <p className="animate-pulse">{">"} _</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-32">
          <h2 className="text-4xl md:text-6xl font-black mb-12 text-center">
            Tech{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
              Stack
            </span>
          </h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              "React / Next.js",
              "React Native",
              "MobX / Zustand",
              "Tailwind / MUI",
              "Supabase",
              "Node.js",
              "SEO / Performance",
              "Product Thinking",
              "Pitch & Storytelling",
            ].map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{
                  scale: 1.1,
                  rotate: Math.random() > 0.5 ? 2 : -2,
                }}
                className={`px-5 py-3 rounded-full border-2 text-sm font-bold cursor-default transition-all duration-300 ${
                  i % 4 === 0
                    ? "border-neon-blue bg-neon-blue/10 hover:bg-neon-blue hover:text-white"
                    : i % 4 === 1
                      ? "border-neon-pink bg-neon-pink/10 hover:bg-neon-pink hover:text-white"
                      : i % 4 === 2
                        ? "border-neon-purple bg-neon-purple/10 hover:bg-neon-purple hover:text-white"
                        : "border-neon-green bg-neon-green/10 hover:bg-neon-green hover:text-black"
                }`}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </section>

        {/* Chess Challenge Section */}
        <section className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-black mb-8 text-center">
              The{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-yellow to-neon-pink">
                Chess Challenge
              </span>
            </h2>
            <ChessBoard />
          </motion.div>
        </section>

        {/* Marquee */}
        <section className="mb-25 overflow-hidden py-5 sm:py-10 border-y border-border bg-secondary/30">
          <div className="flex whitespace-nowrap animate-marquee-mobile sm:animate-marquee">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-12 mx-6">
                <span className="text-2xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-foreground/30 to-foreground/10">
                  BE CREATIVE
                </span>
                <StarIcon className="w-10 h-10 text-neon-pink animate-spin-slow" />
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Let's Build Something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">
              Legendary
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Open to frontend / React / RN roles and ambitious AI products.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a
              href="mailto:bartul123@outlook.com"
              className="bg-foreground text-background px-8 py-4 rounded-full text-lg font-bold hover:bg-neon-blue hover:text-white transition-all hover:scale-105 shadow-lg hover:shadow-neon-blue/25 flex items-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Get in touch
            </a>
            <div className="flex gap-2">
              {[
                {
                  icon: Github,
                  href: "https://github.com/bartul9",
                  color: "text-gray-300",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/luka-bartulovi%C4%87-5b562b200",
                  color: "text-blue-400",
                },
                {
                  icon: Globe,
                  href: "https://ap13-creative.company/",
                  color: "text-emerald-400",
                },
              ].map((Social, i) => (
                <a
                  key={i}
                  href={Social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(
                    "w-14 h-14 bg-secondary border border-border rounded-full flex items-center justify-center hover:bg-background  transition-colors hover:scale-110",
                    Social.color,
                    `hover:border-orange-100/20`,
                  )}
                >
                  <Social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground font-mono">
        <p>© 2026 Luka Bartulović</p>
      </footer>
    </div>
  );
}

function ProjectCard({
  title,
  description,
  tags,
  color,
  icon,
  href,
}: {
  title: string;
  description: string;
  tags: string[];
  color: string;
  icon: React.ReactNode;
  href: string;
}) {
  const colorClasses: Record<string, string> = {
    "neon-blue": "hover:border-neon-blue hover:shadow-neon-blue/20",
    "neon-purple": "hover:border-neon-purple hover:shadow-neon-purple/20",
    "neon-green": "hover:border-neon-green hover:shadow-neon-green/20",
    "neon-pink": "hover:border-neon-pink hover:shadow-neon-pink/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className={`bg-card border-2 border-border rounded-2xl p-6 transition-all duration-300 shadow-lg ${colorClasses[color]}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-${color}/20 text-${color}`}>
          {icon}
        </div>
        <a
          href={href}
          target="_blank"
          className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 text-sm font-bold"
        >
          Open <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full bg-secondary text-xs font-bold uppercase tracking-wider"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function ChessBoard() {
  const [showText, setShowText] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const STORY_LINES = [
    "When I first started learning programming, I listened to a podcast with Marin Šarić, a Croatian engineer who worked at Google and later co-founded OptimoRoute.",
    "In that podcast he said something that burned into my mind: I don't care what languages you know. I don't care what you've learned.",
    "Show me what you've built with that knowledge. Show me your version of chess — that's what I want to see.",
    "",
    "That was it. I promised myself: one day, I will build chess from scratch.",
    "Fast forward about a year. I had roughly one year of dev experience,",
    "my first job behind me, and enough confidence to take on something bigger.",
    "I didn't know how exactly, but I knew I could figure it out.",
    "",
    "One night I sat down — no frameworks, no degree, no advanced math, just plain JavaScript and determination.",
    "For 13,14 hours I wrestled with the problem: how to structure the board, move pieces, calculate paths and steps, handle pawns, captures, promotions.",
    "Piece by piece, it clicked. By sunrise, chess was playable.",
    "",
    "That night taught me this: programming isn't about how many technologies you've memorized — it's about what you can build with them.",
    "Languages and frameworks are tools.",
    "The value is solving hard problems and shipping.",
  ];

  const FULL_TEXT = STORY_LINES.join("\n");

  useEffect(() => {
    if (!showText) {
      setDisplayedText("");
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    let i = 0;
    let cancelled = false;

    function tick() {
      if (cancelled) return;
      if (i >= FULL_TEXT.length) {
        setIsTyping(false);
        return;
      }

      const ch = FULL_TEXT[i];
      let delay = 18;

      if (/[.,!?]/.test(ch)) delay = 160;
      if (ch === "\n") delay = 220;
      if (ch === " ") delay = 22;

      setDisplayedText((s) => s + ch);
      i++;
      setTimeout(tick, delay);
    }

    setTimeout(tick, 250);
    return () => {
      cancelled = true;
    };
  }, [showText]);

  const pieces: Record<string, string> = {
    "4-3": "♕",
    "5-2": "♝",
    "6-1": "♘",
    "7-0": "♜",
  };

  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 1px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 3px)",
        }}
      />

      <div className="relative z-10">
        <div className="aspect-square max-w-sm mx-auto mb-6">
          <div className="relative">
            <div
              className={`grid grid-cols-8 gap-0 border border-emerald-500/30 rounded-lg overflow-hidden transition-opacity duration-500 ${showText ? "opacity-20" : "opacity-100"} `}
            >
              {Array.from({ length: 64 }, (_, i) => {
                const row = Math.floor(i / 8);
                const col = i % 8;
                const isLight = (row + col) % 2 === 0;
                const piece = pieces[`${row}-${col}`];

                return (
                  <div
                    key={i}
                    className={`aspect-square flex items-center justify-center text-2xl md:text-3xl transition-colors${
                      isLight ? "bg-emerald-200/10" : "bg-emerald-900/40"
                    }`}
                    style={{
                      boxShadow: "inset 0 0 0 1px rgba(16, 185, 129, 0.1)",
                    }}
                  >
                    {piece && (
                      <motion.span
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 + col * 0.1 }}
                        className={`drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] ${isLight ? "text-white" : "text-emerald-100"}`}
                      >
                        {piece}
                      </motion.span>
                    )}
                  </div>
                );
              })}
            </div>

            {showText && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-lg border border-emerald-500/20 overflow-hidden  px-1 "
              >
                <div className="absolute inset-0 p-3 md:p-4">
                  <div className="h-full overflow-y-auto scrollbar-emerald">
                    <pre
                      className="whitespace-pre-wrap break-words font-mono text-[10px] md:text-xs leading-relaxed text-emerald-300 "
                      style={{ textShadow: "0 0 8px rgba(16, 185, 129, 0.4)" }}
                    >
                      {displayedText}
                      <span
                        className={`ml-0.5 ${!isTyping ? "opacity-0" : "animate-pulse"}`}
                      >
                        ▌
                      </span>
                    </pre>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="absolute inset-0 pointer-events-none text-[9px] md:text-[10px] text-emerald-400/40 font-mono">
              {Array.from({ length: 8 }).map((_, r) => (
                <span
                  key={`r${r}`}
                  className="absolute left-1"
                  style={{
                    top: `calc(${r * 12.5}% + 6.25%)`,
                    transform: "translateY(-50%)",
                  }}
                >
                  {8 - r}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-2 px-1 text-[10px] font-mono text-emerald-400/40">
            {["a", "b", "c", "d", "e", "f", "g", "h"].map((letter) => (
              <span key={letter}>{letter}</span>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => setShowText(!showText)}
            className="px-6 py-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-lg font-mono text-sm hover:bg-emerald-500/30 hover:border-emerald-400/60 transition-all"
          >
            {showText ? "Hide text" : "Show text"}
          </button>
        </div>
      </div>
    </>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" />
    </svg>
  );
}
