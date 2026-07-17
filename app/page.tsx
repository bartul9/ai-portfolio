"use client";

import { useState, useEffect, type ReactNode } from "react";
import type React from "react";

import {
  ArrowUpRight,
  Mail,
  Github,
  Linkedin,
  Zap,
  Crosshair,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const HeroScene = dynamic(() => import("@/components/hero-scene"), {
  ssr: false,
});

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Corners({ className = "" }: { className?: string }) {
  const base = "absolute h-3 w-3 pointer-events-none";
  return (
    <span aria-hidden className={className}>
      <span
        className={`${base} left-0 top-0 border-l border-t border-current`}
      />
      <span
        className={`${base} right-0 top-0 border-r border-t border-current`}
      />
      <span
        className={`${base} bottom-0 left-0 border-b border-l border-current`}
      />
      <span
        className={`${base} bottom-0 right-0 border-b border-r border-current`}
      />
    </span>
  );
}

function SectionLabel({
  index,
  text,
  right,
}: {
  index: string;
  text: string;
  right?: string;
}) {
  return (
    <div className="mb-10 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em]">
      <span className="text-neon-red">{index}</span>
      <span className="text-neon-blue">// {text}</span>
      <span className="h-px flex-1 bg-gradient-to-r from-neon-blue/40 to-transparent" />
      {right && <span className="text-muted-foreground">{right}</span>}
    </div>
  );
}

/** Scramble-decode text effect for HUD labels */
function Decode({ text, className }: { text: string; className?: string }) {
  const [out, setOut] = useState("");
  useEffect(() => {
    const glyphs = "█▓▒░<>/[]{}|=+*#01";
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      const reveal = Math.floor(frame / 2.5);
      let s = text.slice(0, reveal);
      if (reveal < text.length) {
        for (let i = reveal; i < text.length; i++) {
          s += glyphs[Math.floor(Math.random() * glyphs.length)];
        }
      }
      setOut(s);
      if (reveal >= text.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [text]);
  return (
    <span className={className} aria-label={text}>
      {out || " "}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Portfolio() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground selection:bg-neon-red/40 selection:text-white">
      {/* Global atmosphere */}
      <div className="noise-overlay pointer-events-none fixed inset-0 z-[70] opacity-[0.05]" />
      <div className="scanlines pointer-events-none fixed inset-0 z-[70] opacity-[0.12]" />

      {/* Navigation */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-background/60 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link href="/" className="group flex items-center gap-3">
            <span className="font-mono text-lg font-bold tracking-[0.2em]">
              LB
              <span className="animate-blink text-neon-red">_</span>
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground transition-colors group-hover:text-neon-blue sm:inline">
              portfolio
            </span>
          </Link>

          <nav className="hidden items-center gap-8 font-mono text-[11px] uppercase tracking-[0.25em] md:flex">
            {[
              ["01", "About", "#about"],
              ["02", "Work", "#projects"],
              ["03", "Lab", "#lab"],
              ["04", "Contact", "#contact"],
            ].map(([n, label, href]) => (
              <a
                key={href}
                href={href}
                className="group text-muted-foreground transition-colors hover:text-neon-blue"
              >
                <span className="mr-1 text-neon-red/70 group-hover:text-neon-red">
                  {n}
                </span>
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 border border-neon-blue/30 bg-neon-blue/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-neon-blue">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon-blue" />
            Open to work
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------------- */}
      {/* HERO                                                        */}
      {/* ---------------------------------------------------------- */}
      <section className="relative flex min-h-svh flex-col overflow-hidden">
        {/* Three.js scene */}
        <HeroScene />

        {/* Cinematic overlays on top of the scene */}
        <div className="vignette pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />

        <div className="container relative z-10 mx-auto flex flex-1 flex-col justify-center px-6 pt-28 pb-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 font-mono text-[11px] uppercase tracking-[0.35em] text-neon-blue sm:text-xs"
          >
            <Decode text="FULL-STACK ENGINEER × PRODUCT BUILDER" />
          </motion.div>

          <h1 className="mb-8 uppercase leading-[0.95]">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35 }}
              className="block text-[clamp(2.6rem,8.5vw,7rem)] font-extralight tracking-[0.28em] text-foreground/90"
            >
              Luka
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              data-text="Bartulović"
              className="glitch block text-[clamp(2.6rem,8.5vw,7rem)] font-bold tracking-[0.04em] text-neon-blue text-glow-blue"
            >
              Bartulović
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-10 max-w-xl text-balance text-lg text-muted-foreground md:text-xl"
          >
            I build <span className="font-semibold text-foreground">fast</span>,{" "}
            <span className="font-semibold text-foreground">scalable</span> web
            & mobile products — interfaces with atmosphere, engineering that
            holds under pressure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#projects"
              className="box-glow-red group inline-flex items-center justify-center gap-3 bg-neon-red px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.2em] text-white transition-all hover:brightness-110"
            >
              View projects
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-3 border border-neon-blue/50 bg-neon-blue/5 px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.2em] text-neon-blue transition-all hover:bg-neon-blue/15 hover:box-glow-blue"
            >
              Get in touch
            </a>
          </motion.div>
        </div>

        {/* HUD stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05 }}
          className="container relative z-10 mx-auto w-full px-6 pb-10 md:pb-16"
        >
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              ["Experience", "05+ yrs", "text-neon-blue"],
              ["Products shipped", "10+", "text-foreground"],
              ["Idea → prototype", "48 hrs", "text-neon-red"],
              ["Status", "● Open", "text-neon-blue"],
            ].map(([label, value, accent]) => (
              <div
                key={label}
                className="relative border border-white/10 bg-background/40 px-4 py-3 backdrop-blur-md"
              >
                <Corners className="text-neon-blue/40" />
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground sm:text-[10px]">
                  {label}
                </p>
                <p
                  className={`mt-1 font-mono text-lg font-bold uppercase tracking-wider sm:text-xl ${accent}`}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll cue */}
        <div className="pointer-events-none absolute -bottom-3 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-muted-foreground">
            Scroll
          </span>
          <span className="block h-8 w-px animate-drop-line bg-neon-blue/70" />
        </div>
      </section>

      <main className="container relative z-10 mx-auto px-6">
        {/* -------------------------------------------------------- */}
        {/* ABOUT                                                     */}
        {/* -------------------------------------------------------- */}
        <section id="about" className="scroll-mt-24 py-28 md:py-36">
          <SectionLabel index="01" text="Profile" right="Split, HR" />

          <Reveal>
            <h2 className="mb-14 text-4xl font-bold uppercase tracking-tight md:text-6xl">
              About <span className="text-neon-blue text-glow-blue">me</span>
            </h2>
          </Reveal>

          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
            {/* Bio */}
            <Reveal className="space-y-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
              <p>
                I'm{" "}
                <span className="font-semibold text-foreground">
                  Luka Bartulović
                </span>{" "}
                - a full-stack engineer and product builder based in Split,
                Croatia. For{" "}
                <span className="font-semibold text-neon-blue">5+ years</span>{" "}
                I've been building web and mobile products end-to-end:
                interface, architecture, performance, and the AI layer
                underneath.
              </p>
              <p>
                My work sits where engineering meets product. Frontend is where
                I started and where I'm sharpest -{" "}
                <span className="text-foreground">
                  React, Next.js and React Native
                </span>{" "}
                on the surface, SQL, edge functions and LLM pipelines below.
              </p>
              <p>
                I'm self-taught - nobody ever handed me a roadmap. I learned by
                building, breaking and shipping, and that's still how I operate:{" "}
                <span className="font-semibold text-foreground">
                  focus, speed, problem-solving, delivery
                </span>
                .
              </p>

              {/* Operating principles */}
              <div className="grid gap-4 pt-6 sm:grid-cols-3">
                {[
                  {
                    icon: Zap,
                    title: "Speed",
                    desc: "Prototype in 24–48h. Build fast, validate, iterate.",
                    accent: "group-hover:border-neon-red/50 text-neon-red",
                  },
                  {
                    icon: Crosshair,
                    title: "Clarity",
                    desc: "One clean path to value. No friction, no noise.",
                    accent: "group-hover:border-neon-blue/50 text-neon-blue",
                  },
                  {
                    icon: Rocket,
                    title: "Delivery",
                    desc: "Shipped beats perfect. No excuses.",
                    accent: "group-hover:border-neon-red/50 text-neon-red",
                  },
                ].map((p, i) => (
                  <Reveal key={p.title} delay={i * 0.1}>
                    <div className="group relative h-full border border-white/10 bg-card p-5 transition-colors duration-300 hover:bg-white/[0.03]">
                      <p.icon
                        className={`mb-3 h-6 w-6 ${p.accent.split(" ").pop()}`}
                      />
                      <h3 className="mb-1 font-mono text-sm font-bold uppercase tracking-[0.2em] text-foreground">
                        {p.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {p.desc}
                      </p>
                      <span className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r from-neon-blue via-neon-blue to-neon-red transition-transform duration-500 group-hover:scale-x-100" />
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            {/* Dossier card */}
            <Reveal delay={0.15}>
              <div className="relative overflow-hidden border border-white/10 bg-card">
                <Corners className="text-neon-blue/60" />
                {/* scanning beam */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-16 animate-scan bg-gradient-to-b from-transparent via-neon-blue/10 to-transparent" />

                <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  <span>Personnel file</span>
                  <span className="text-neon-red">v.2026</span>
                </div>

                <div className="p-6">
                  <div className="relative mx-auto mb-6 grid h-36 w-36 place-items-center border border-neon-blue/30 bg-gradient-to-br from-neon-blue/10 to-neon-red/10">
                    <Corners className="text-neon-blue/50" />
                    <span className="font-mono text-5xl font-bold text-neon-blue text-glow-blue">
                      LB
                    </span>
                  </div>

                  <dl className="space-y-0">
                    {[
                      ["Designation", "Full-Stack Engineer"],
                      ["Specialty", "Frontend & Product"],
                      ["Base", "Split, Croatia"],
                      ["Experience", "5+ years"],
                      ["Core", "React · Next.js · RN"],
                      ["Edge", "AI · SQL · SEO"],
                      ["Response", "< 24 hrs"],
                    ].map(([k, v]) => (
                      <div
                        key={k}
                        className="flex items-center justify-between gap-4 border-b border-white/5 py-2.5"
                      >
                        <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                          {k}
                        </dt>
                        <dd className="text-right text-sm text-foreground">
                          {v}
                        </dd>
                      </div>
                    ))}
                    <div className="flex items-center justify-between gap-4 py-2.5">
                      <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                        Status
                      </dt>
                      <dd className="flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider text-neon-blue">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon-blue" />
                        Open to work
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Origin story */}
          <div className="mt-24">
            <Reveal>
              <div className="mb-8 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em]">
                <span className="text-neon-red">{">"}</span>
                <span className="text-neon-blue">Origin story</span>
                <span className="h-px w-24 bg-neon-blue/40" />
              </div>
              <p className="mb-10 max-w-2xl text-lg text-muted-foreground">
                Why chess? Because early on, someone told me the only thing that
                matters is{" "}
                <span className="font-semibold text-foreground">
                  what you can build
                </span>{" "}
                — not what you've memorized. So one night, I built this.
              </p>
            </Reveal>
            <Reveal>
              <div className="mx-auto max-w-2xl">
                <ChessBoard />
              </div>
            </Reveal>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* PROJECTS                                                  */}
        {/* -------------------------------------------------------- */}
        <section id="projects" className="scroll-mt-24 py-28 md:py-36">
          <SectionLabel index="02" text="Selected work" right="2025 — 2026" />

          <Reveal>
            <h2 className="mb-14 text-4xl font-bold uppercase tracking-tight md:text-6xl">
              Pro<span className="text-neon-red text-glow-red">jects</span>
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ProjectCard
              title="ConsigliereX"
              description="Gamified self-development app with AI guidance."
              tags={["Next.js", "SQL", "AI"]}
              accent="blue"
              image="/images/projects/consigliere-x.png"
              href="https://consigliere-x.vercel.app/"
              index="001"
            />
            <ProjectCard
              title="Tarot + Natal AI"
              description="AI-powered tarot & natal chart readings. Structured, multilingual, fast."
              tags={["Next.js", "AI", "Edge", "SEO"]}
              accent="red"
              image="/images/projects/tarot.png"
              href="https://www.tarot-hr.cards"
              index="002"
              delay={0.1}
            />
            <ProjectCard
              title="PartyGate"
              description="Event planning platform — organize, invite, manage."
              tags={["React", "SQL"]}
              accent="blue"
              image="/images/projects/partygate.png"
              href="https://www.partygate.site/"
              index="003"
              delay={0.2}
            />
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* AI LAB                                                    */}
        {/* -------------------------------------------------------- */}
        <section id="lab" className="scroll-mt-24 py-28 md:py-36">
          <SectionLabel index="03" text="Experimental" />

          <div className="relative overflow-hidden border border-white/10 bg-card/60 p-8 backdrop-blur-sm md:p-14">
            <Corners className="text-neon-red/50" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-neon-blue/10 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-neon-red/10 blur-[90px]" />

            <div className="relative grid items-center gap-12 lg:grid-cols-2">
              <div>
                <Reveal>
                  <h2 className="mb-6 text-4xl font-bold uppercase tracking-tight md:text-5xl">
                    The AI{" "}
                    <span className="text-neon-red text-glow-red">lab</span>
                  </h2>
                  <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                    I build AI features that serve the user: structured outputs,
                    stable chains, evaluation, and real product value. No fog —
                    only results.
                  </p>
                </Reveal>

                <div className="grid gap-4 sm:grid-cols-2">
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
                    <Reveal key={item.title} delay={i * 0.08}>
                      <div className="h-full border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-neon-red/40">
                        <h4 className="mb-1 font-bold">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              {/* Terminal visual */}
              <Reveal delay={0.15}>
                <div className="relative flex h-[380px] items-center justify-center overflow-hidden border border-white/10 bg-black/80">
                  <div className="scanlines absolute inset-0 opacity-30" />
                  <div className="absolute h-56 w-56 animate-pulse rounded-full bg-neon-blue/20 blur-[70px]" />
                  <div className="absolute h-40 w-40 translate-x-14 translate-y-10 rounded-full bg-neon-red/25 blur-[50px]" />

                  <div className="relative z-10 w-full max-w-xs border border-white/15 bg-white/5 p-6 backdrop-blur-md">
                    <Corners className="text-neon-blue/50" />
                    <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-4">
                      <span className="h-2.5 w-2.5 rounded-full bg-neon-red/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                      <span className="h-2.5 w-2.5 rounded-full bg-neon-blue/80" />
                      <span className="ml-auto font-mono text-[10px] text-white/50">
                        ai-lab.ts
                      </span>
                    </div>
                    <div className="space-y-2 font-mono text-xs text-neon-blue">
                      <p>{">"} initializing interface...</p>
                      <p>{">"} loading context...</p>
                      <p className="text-white">
                        {">"} "Build something legendary."
                      </p>
                      <p>
                        {">"} <span className="animate-blink">_</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* STACK                                                     */}
        {/* -------------------------------------------------------- */}
        <section id="stack" className="scroll-mt-24 py-28 md:py-36">
          <SectionLabel index="04" text="Capabilities" />

          <Reveal>
            <h2 className="mb-14 text-4xl font-bold uppercase tracking-tight md:text-6xl">
              Tech <span className="text-neon-blue text-glow-blue">stack</span>
            </h2>
          </Reveal>

          <div className="flex max-w-4xl flex-wrap gap-3">
            {[
              "React / React Native / Next.js",
              "AI Integration",
              "MobX / Zustand",
              "Tailwind / MUI",
              "SQL",
              "Supabase / Edge Functions",
              "Design",
              "SEO / Performance",
              "Product Thinking",
              "Pitch & Storytelling",
            ].map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className={`cursor-default border bg-white/[0.02] px-4 py-2.5 font-mono text-xs uppercase tracking-[0.15em] transition-all duration-300 ${
                  i % 2 === 0
                    ? "border-neon-blue/30 text-neon-blue/90 hover:border-neon-blue hover:bg-neon-blue/10 hover:box-glow-blue"
                    : "border-neon-red/30 text-neon-red/90 hover:border-neon-red hover:bg-neon-red/10 hover:box-glow-red"
                }`}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </section>
      </main>

      {/* Marquee */}
      <section className="overflow-hidden border-y border-white/10 bg-white/[0.015] py-6 sm:py-8">
        <div className="flex animate-marquee-mobile whitespace-nowrap sm:animate-marquee">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center">
              {["Build fast", "Ship clean", "Iterate"].map((word) => (
                <span key={word} className="flex items-center">
                  <span className="text-outline mx-6 text-4xl font-bold uppercase tracking-tight md:text-6xl">
                    {word}
                  </span>
                  <span className="text-xl text-neon-red text-glow-red md:text-2xl">
                    ◆
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* CONTACT                                                       */}
      {/* ------------------------------------------------------------ */}
      <section
        id="contact"
        className="container relative z-10 mx-auto scroll-mt-24 px-6 py-28 md:py-36"
      >
        <SectionLabel index="05" text="Contact" />

        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-4xl font-bold uppercase tracking-tight md:text-6xl">
            Let's build something{" "}
            <span className="text-neon-red text-glow-red">legendary</span>
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-lg text-muted-foreground">
            Open to full-stack / frontend / React Native roles and ambitious
            AI products. Based in Split, Croatia — working worldwide.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:bartul123@outlook.com"
              className="box-glow-red inline-flex items-center gap-3 bg-neon-red px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.2em] text-white transition-all hover:scale-[1.03] hover:brightness-110"
            >
              <Mail className="h-4 w-4" />
              Get in touch
            </a>
            <div className="flex gap-3">
              {[
                { icon: Github, href: "https://github.com/bartul9" },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/luka-bartulovi%C4%87-5b562b200",
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-[52px] w-[52px] place-items-center border border-white/15 text-muted-foreground transition-all hover:border-neon-blue/60 hover:text-neon-blue hover:box-glow-blue"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Response time: {"<"} 24 hrs
          </p>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-6 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:flex-row">
          <p>© 2026 Luka Bartulović</p>
          <p>43.5081° N / 16.4402° E — Split, HR</p>
          <p className="flex items-center gap-2">
            System:{" "}
            <span className="flex items-center gap-1.5 text-neon-blue">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon-blue" />
              Online
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Project card                                                        */
/* ------------------------------------------------------------------ */

function ProjectCard({
  title,
  description,
  tags,
  accent,
  image,
  href,
  index,
  delay = 0,
}: {
  title: string;
  description: string;
  tags: string[];
  accent: "blue" | "red";
  image: string;
  href: string;
  index: string;
  delay?: number;
}) {
  const accentColor = accent === "blue" ? "neon-blue" : "neon-red";
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className={`group relative block border border-white/10 bg-card transition-colors duration-300 ${
        accent === "blue"
          ? "hover:border-neon-blue/60 hover:box-glow-blue"
          : "hover:border-neon-red/60 hover:box-glow-red"
      }`}
    >
      <Corners
        className={`z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
          accent === "blue" ? "text-neon-blue" : "text-neon-red"
        }`}
      />

      {/* Screenshot */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10">
        <Image
          src={image}
          alt={`${title} — interface preview`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top brightness-110 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="scanlines absolute inset-0 opacity-20" />
        <div
          className={`absolute inset-0 opacity-10 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-0 ${
            accent === "blue" ? "bg-neon-blue" : "bg-neon-red"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        <span
          className={`absolute left-3 top-3 font-mono text-[10px] tracking-[0.3em] text-${accentColor}`}
        >
          [{index}]
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold tracking-tight">{title}</h3>
          <span
            className={`mt-0.5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
              accent === "blue" ? "text-neon-blue" : "text-neon-red"
            }`}
          >
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="border border-white/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

/* ------------------------------------------------------------------ */
/* Chess origin story                                                  */
/* ------------------------------------------------------------------ */

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

function ChessBoard() {
  const [showText, setShowText] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

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
    <div className="relative">
      <div className="relative z-10">
        <div className="mx-auto mb-6 aspect-square max-w-sm">
          <div className="relative">
            <div
              className={`grid grid-cols-8 gap-0 overflow-hidden border border-neon-blue/30 transition-opacity duration-500 ${
                showText ? "opacity-20" : "opacity-100"
              }`}
            >
              {Array.from({ length: 64 }, (_, i) => {
                const row = Math.floor(i / 8);
                const col = i % 8;
                const isLight = (row + col) % 2 === 0;
                const piece = pieces[`${row}-${col}`];

                return (
                  <div
                    key={i}
                    className={`flex aspect-square items-center justify-center text-2xl md:text-3xl ${
                      isLight ? "bg-neon-blue/15" : "bg-black/50"
                    }`}
                    style={{
                      boxShadow:
                        "inset 0 0 0 1px color-mix(in oklch, var(--neon-blue) 12%, transparent)",
                    }}
                  >
                    {piece && (
                      <motion.span
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + col * 0.1 }}
                        className={`drop-shadow-[0_0_8px_color-mix(in_oklch,var(--neon-blue)_55%,transparent)] ${
                          isLight ? "text-white" : "text-neon-blue"
                        }`}
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
                className="absolute inset-0 overflow-hidden border border-neon-blue/25 bg-black/85 px-1 backdrop-blur-sm"
              >
                <div className="absolute inset-0 p-3 md:p-4">
                  <div className="scrollbar-glow h-full overflow-y-auto">
                    <pre
                      className="whitespace-pre-wrap break-words font-mono text-[10px] leading-relaxed text-neon-blue md:text-xs"
                      style={{
                        textShadow:
                          "0 0 8px color-mix(in oklch, var(--neon-blue) 40%, transparent)",
                      }}
                    >
                      {displayedText}
                      <span
                        className={`ml-0.5 ${
                          !isTyping ? "opacity-0" : "animate-blink"
                        }`}
                      >
                        ▌
                      </span>
                    </pre>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="pointer-events-none absolute inset-0 font-mono text-[9px] text-neon-blue/40 md:text-[10px]">
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

          <div className="mt-2 flex justify-between px-1 font-mono text-[10px] text-neon-blue/40">
            {["a", "b", "c", "d", "e", "f", "g", "h"].map((letter) => (
              <span key={letter}>{letter}</span>
            ))}
          </div>
        </div>

        <div className="pt-4 text-center">
          <button
            onClick={() => setShowText(!showText)}
            className="border border-neon-blue/40 bg-neon-blue/10 px-6 py-2.5 font-mono text-sm uppercase tracking-[0.2em] text-neon-blue transition-all hover:bg-neon-blue/20 hover:box-glow-blue"
          >
            {showText ? "Close file" : "Read the story"}
          </button>
        </div>
      </div>
    </div>
  );
}
