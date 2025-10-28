"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import MatrixRain from "@/components/MatrixRain";
import SectionTitle from "@/components/SectionTitle";
import Stat from "@/components/Stat";
import NeuralMesh from "@/components/NeuralMesh";
import TypeMotto from "@/components/TypeMotto";
import ChessShowcase from "@/components/ChessShowcase";

/* ---------------- helpers ---------------- */

function onSheenMove(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
}

/* -------- scroll spy (center-of-viewport) -------- */
function useScrollSpy(selectors = [], { offset = "header" } = {}) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const sections = selectors
      .map((s) => document.querySelector(s))
      .filter(Boolean);

    const getOffset = () => {
      if (offset === "header") {
        const v = getComputedStyle(document.documentElement)
          .getPropertyValue("--header-h")
          .trim();
        const n = parseInt(v, 10);
        return Number.isFinite(n) ? n : 64;
      }
      return Number(offset) || 0;
    };

    let ticking = false;
    const recalc = () => {
      const y = window.scrollY + window.innerHeight * 0.5 + getOffset();
      let cur = null;

      for (const el of sections) {
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (y >= top && y < bottom) {
          cur = `#${el.id}`;
          break;
        }
      }

      setActive(cur);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        recalc();
        ticking = false;
      });
    };

    recalc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [JSON.stringify(selectors), offset]);

  return active;
}

function useMatrixFade(headerPx = 64) {
  const [overlay, setOverlay] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = Math.max(200, window.innerHeight - headerPx);
      const y = window.scrollY;
      const v = Math.min(1, Math.max(0, y / (h * 0.75)));
      setOverlay(v * 0.45);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [headerPx]);
  return overlay;
}

/* -------- data -------- */

const bookHighlights = [
  "Unlock the Maximum Game mindset to ship with fearless velocity.",
  "Frameworks for weaving narrative, UI polish, and AI systems together.",
  "Battle-tested rituals from real product sprints — zero fluff, only signal.",
];

const projects = [
  {
    title: "ConsigliereX",
    desc: "Gamified self development app with AI guidance.",
    link: "https://consigliere-x.vercel.app",
    tags: ["Next.js", "SQL", "AI"],
    image: "/images/projects/consigliere-x.png", // put your real path here
    imageOpacity: 0.55, // tweak per-card if you want
  },
  {
    title: "Tarot + Natal AI",
    desc: "AI-powered tarot & natal chart. Structured, multilingual, fast.",
    link: "https://tarot-hrvatska.vercel.app",
    tags: ["Next.js", "AI", "OG/SEO", "Edge"],
    image: "/images/projects/tarot.png",
    imageOpacity: 0.5,
  },
  {
    title: "DollarTrack",
    desc: "Expense tracking app for small personal budgets.",
    link: "https://dollar-track.vercel.app/",
    tags: ["React", "SQL"],
    image: "/images/projects/dollar-track.png",
    imageOpacity: 0.5,
  },
];
const skills = [
  "React / Next.js",
  "React Native",
  "MobX / Zustand",
  "Tailwind / MUI",
  "Supabase",
  "Node.js",
  "SEO / Performance",
  "Product Thinking",
  "Pitch & Storytelling",
];

const aiCaps = [
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
];

/* -------- helper: isMobile for Matrix tuning -------- */
function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const q = matchMedia("(max-width: 768px)");
    const fn = () => setM(q.matches);
    fn();
    q.addEventListener?.("change", fn);
    return () => q.removeEventListener?.("change", fn);
  }, []);
  return m;
}

/* ---------------- animation system (1s tween, smooth) ---------------- */

const ANIMATIONS_ENABLED = true; // set to false to remove all animations
const D = 1; // seconds
const EASE = [0.25, 0.1, 0.25, 1]; // "ease" cubic-bezier

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: D, ease: EASE } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: D, ease: EASE } },
};

/* ---------------- page ---------------- */

export default function Home() {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const active = useScrollSpy([
    "#about",
    "#projects",
    "#ai",
    "#skills",
    "#book",
    "#contact",
  ]);
  const matrixOverlay = useMatrixFade(64);

  // if the user prefers reduced motion or animations are disabled, no variants
  const useAnim = ANIMATIONS_ENABLED && !reduceMotion;

  return (
    <main className="relative min-h-screen overflow-x-clip site-bg">
      {/* BACKGROUND */}
      <MatrixRain
        fontBase={isMobile ? 20 : 16}
        speedMin={0.45}
        speedMax={isMobile ? 0.95 : 1.1}
        opacity={isMobile ? 0.22 : 0.28}
      />
      <div
        className="fixed inset-0 z-0 bg-black pointer-events-none"
        style={{ opacity: matrixOverlay, transition: "opacity 600ms ease" }}
      />

      <div className="fixed inset-0 -z-[1] bg-noise opacity-60" />

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-20 h-16 backdrop-blur-sm bg-black/40 border-b border-white/5">
        <div className="mx-auto max-w-6xl h-full px-4 sm:px-6 flex items-center justify-between">
          <a
            href="#"
            className="text-white text-lg font-semibold transition-opacity duration-1000 ease-in-out"
          >
            LB<span className="opacity-60">.portfolio</span>
          </a>

          <nav className="hidden md:flex h-full items-center gap-1">
            <a
              className={`nav-link ${active === "#about" ? "active" : ""}`}
              href="#about"
            >
              About
            </a>
            <a
              className={`nav-link ${active === "#projects" ? "active" : ""}`}
              href="#projects"
            >
              Projects
            </a>
            <a
              className={`nav-link ${active === "#ai" ? "active" : ""}`}
              href="#ai"
            >
              AI Lab
            </a>
            <a
              className={`nav-link ${active === "#skills" ? "active" : ""}`}
              href="#skills"
            >
              Skills
            </a>
            <a
              className={`nav-link ${active === "#contact" ? "active" : ""}`}
              href="#contact"
            >
              Contact
            </a>
          </nav>

          {/* mobile hamburger */}
          <button
            aria-label="Menu"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/15 hover:border-white/30 transition-all duration-1000 ease-in-out"
            onClick={() => setMenuOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* mobile sheet */}
        {menuOpen && (
          <div className="mobile-sheet">
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={useAnim ? { y: -12, opacity: 0 } : false}
              animate={useAnim ? { y: 0, opacity: 1 } : false}
              exit={useAnim ? { y: -12, opacity: 0 } : false}
              transition={{ type: "tween", duration: 0.5, ease: EASE }}
              className="mobile-panel"
            >
              <div className="p-2">
                {[
                  ["About", "#about"],
                  ["Projects", "#projects"],
                  ["AI Lab", "#ai"],
                  ["Skills", "#skills"],
                  ["Contact", "#contact"],
                ].map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    className="mobile-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative h-[calc(100svh-var(--header-h))] overflow-hidden">
        {/* glow */}
        <div className="pointer-events-none absolute inset-0 -z-[1] flex items-center justify-center">
          <div
            className="h-[44vh] w-[90vw] md:w-[82vw] max-w-6xl rounded-full blur-3xl opacity-35"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(34,255,136,.22), transparent 60%)",
              transition: "opacity 1000ms ease",
            }}
          />
        </div>

        <div className="container h-full flex flex-col items-center justify-center text-center">
          <div>
            <motion.h1
              variants={fadeUp}
              viewport={{ once: true }}
              className="hero-title text-balance mx-auto font-extrabold tracking-tight text-white leading-[0.98]
                         text-[clamp(2.2rem,8.5vw,5.6rem)]"
            >
              Luka <span className="text-[--color-neon-500]">Bartulović</span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              viewport={{ once: true }}
              className="mt-3 text-[clamp(1rem,3.2vw,1.35rem)] text-[--color-neon-200] max-w-[80ch]"
            >
              Turning Ideas into{" "}
              <span className="text-[--color-neon-500]">Scalable</span>,
              Beautiful Apps
            </motion.p>

            <motion.div
              variants={fadeUp}
              viewport={{ once: true }}
              className="mt-15 w-full text-sm text-white/90 "
            >
              <TypeMotto />
            </motion.div>
          </div>

          <a
            href="#about"
            className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-70 hover:opacity-100 transition-opacity duration-1000 ease-in-out text-sm"
          >
            ↓ Scroll
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative z-10 py-16 md:py-20">
        <div className="container">
          <div
            className="rounded-2xl"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty(
                "--mx",
                `${e.clientX - r.left}px`
              );
              e.currentTarget.style.setProperty(
                "--my",
                `${e.clientY - r.top}px`
              );
            }}
          >
            <SectionTitle>About Me</SectionTitle>

            <div className="mt-6 md:mt-8 grid md:grid-cols-2 gap-6 md:gap-8">
              <p className="text-base md:text-lg leading-relaxed text-gray-200 p-2">
                I’m Luka — a frontend engineer and product builder. I create{" "}
                <b>fast</b>, <b>beautifully designed</b> web and mobile apps.
                I’m also interested in the <b>backend</b> side — so I can own
                the full vertical slice. My mindset is
                <b> Maximum Game</b>: focus, speed, problem-solving and
                delivery.
              </p>

              <ul className="grid gap-3">
                {[
                  ["Speed", "Prototype in 24–48h. Fast → validate → iterate."],
                  ["Clarity", "One clean path to value. No friction."],
                  ["Delivery", "No excuses. Shipped > perfect."],
                ].map(([t, d], i) => (
                  <li key={i} className="card p-4">
                    <div className="font-semibold text-emerald-200">{t}</div>
                    <div className="text-sm opacity-80 mt-1">{d}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
              <Stat to={25} label="Shipped features / month" />
              <Stat to={12} label="Production projects" />
              <Stat to={48} label="Hours to first prototype" />
            </div>
          </div>
        </div>
      </section>

      {/* CHESS */}
      <ChessShowcase />

      {/* PROJECTS */}
      <section id="projects" className="relative z-10 py-16 md:py-20">
        <div className="container">
          <SectionTitle>Projects</SectionTitle>
          <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {projects.map((p, i) => (
              <a
                key={i}
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="group card ambient-neon sheen-static p-5 transition-transform duration-1000 ease-in-out project-card"
                onMouseMove={(e) => {
                  const el = e.currentTarget;
                  const r = el.getBoundingClientRect();
                  el.style.setProperty("--x", `${e.clientX - r.left}px`);
                  el.style.setProperty("--y", `${e.clientY - r.top}px`);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.setProperty("--r", `0px`);
                }}
              >
                {p.image && (
                  <span
                    className="reveal"
                    style={{ backgroundImage: `url('${p.image}')` }}
                  />
                )}

                <div className="content">
                  <h3 className="text-lg md:text-xl font-semibold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm opacity-85">{p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-2 py-0.5 rounded-full border border-white/15 bg-black/30 backdrop-blur-[2px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-[--color-neon-500]">
                    <span>Open</span>
                    <span aria-hidden>↗</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* AI LAB */}
      <section id="ai" className="py-16 md:py-20">
        <div className="container relative z-10 ">
          <SectionTitle>AI Lab</SectionTitle>

          <p className="max-w-3xl text-md mt-8">
            I build AI features that serve the user: structured outputs, stable
            chains, evaluation, and real product value. No fog — only results.
          </p>
          <div className="relative z-10 ai-section px-6 pt-4 pb-12  rounded-xl mt-8">
            <NeuralMesh />

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {aiCaps.map((c, i) => (
                <div
                  key={i}
                  className="ai-card p-5 backdrop-blur-lg bg-black/40"
                  onMouseMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty(
                      "--x",
                      `${e.clientX - r.left}px`
                    );
                    e.currentTarget.style.setProperty(
                      "--y",
                      `${e.clientY - r.top}px`
                    );
                  }}
                >
                  <div className="font-semibold text-white">{c.title}</div>
                  <div className="mt-2 text-sm opacity-85">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="relative z-10 py-16 md:py-24">
        <div className="container">
          <SectionTitle>Skills</SectionTitle>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {skills.map((s, i) => (
              <span
                key={i}
                className="skill-chip text-[11px] px-2 py-0.5 rounded-full border chip-glow"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* BOOK */}
      <section id="book" className="relative z-10 py-20 md:py-28">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 via-white/2 to-transparent p-[1px]">
            <div className="book-wrap">
              <motion.div
                variants={fadeUp}
                viewport={{ once: true, amount: 0.35 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/60">
                  <span className="inline-block h-2 w-2 rounded-full bg-[--color-neon-500] animate-ping-slow" />
                  Field Notes
                </div>
                <SectionTitle>The Maximum Game Playbook</SectionTitle>
                <p className="max-w-2xl text-base md:text-lg leading-relaxed text-gray-200/90">
                  Dive into my personal operating system for product craftsmanship: stories from the frontier,
                  frameworks for momentum, and exercises that turn curiosity into legendary shipping power. Learn
                  the rituals, mindsets, and AI-assisted workflows that keep me moving at hyperspeed.
                </p>
                <ul className="grid gap-3 text-sm md:text-base text-gray-200/90">
                  {bookHighlights.map((line, i) => (
                    <li key={i} className="book-bullet">
                      {line}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="https://drive.google.com/file/d/1g9qB5-b_9f6VB0LsngXlClE_68OF7DHw/view?usp=drive_link"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary btn-glow btn-lg"
                  >
                    Read the Book ↗
                  </a>
                  <span className="text-xs uppercase tracking-[0.3em] text-white/50">
                    Want to learn more about me?
                  </span>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.1 }}
                className="book-display"
              >
                <div className="book-card">
                  <div className="book-cover">
                    <div className="book-grid" />
                    <span className="book-title">Maximum Game</span>
                    <span className="book-sub">Playbook for High-Velocity Makers</span>
                    <span className="book-author">by Luka Bartulović</span>
                  </div>
                  <div className="book-spine" aria-hidden />
                </div>
                <div className="book-orb" aria-hidden />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative z-10 py-20 md:py-28">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            Let’s Build Something Legendary
          </h2>

          <p className="mt-4 opacity-90">
            Open to frontend / React / RN roles and ambitious AI products.
          </p>

          <div
            className="cta-wrap mx-auto mt-8 w-fit  max-w-3xl"
            onMouseMove={onSheenMove}
          >
            <div className="flex items-stretch justify-center gap-2">
              <a
                title="Send Email"
                href="mailto:bartul123@outlook.com"
                className="cta-btn transition-all duration-1000 ease-in-out"
              >
                <Mail className="w-5 h-5" />
              </a>
              <span className="cta-sep" />
              <a
                href="https://github.com/bartul9"
                target="_blank"
                rel="noreferrer"
                title="GitHub"
                className="cta-btn transition-all duration-1000 ease-in-out"
              >
                <Github className="w-5 h-5" />
              </a>
              <span className="cta-sep" />
              <a
                href="https://www.linkedin.com/in/luka-bartulović-5b562b200/"
                target="_blank"
                rel="noreferrer"
                className="cta-btn transition-all duration-1000 ease-in-out"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 py-6 border-t border-white/10 bg-black/40 backdrop-blur-sm">
        <div className="container flex flex-col sm:flex-row items-center justify-center gap-3">
          <p className="text-xs opacity-60">
            © {new Date().getFullYear()} Luka Bartulović — MP13
          </p>
        </div>
      </footer>
    </main>
  );
}
