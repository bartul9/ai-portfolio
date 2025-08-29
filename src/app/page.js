"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MatrixRain from "@/components/MatrixRain";
import SectionTitle from "@/components/SectionTitle";
import Stat from "@/components/Stat";

/* -------- scroll spy + matrix fade + magnetic -------- */

function useScrollSpy(selectors = []) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    const els = selectors.map((s) => document.querySelector(s)).filter(Boolean);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selectors]);

  return active;
}

function useMatrixFade(headerPx = 64) {
  const [overlay, setOverlay] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = Math.max(200, window.innerHeight - headerPx);
      const y = window.scrollY;
      const v = Math.min(1, Math.max(0, y / (h * 0.75))); // 0 → 1 as you leave hero
      setOverlay(v * 0.45); // up to 45% black overlay
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [headerPx]);
  return overlay;
}

function magneticMove(e, strength = 0.06) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const mx = e.clientX - r.left - r.width / 2;
  const my = e.clientY - r.top - r.height / 2;
  el.style.transform = `translate(${mx * strength}px, ${my * strength}px)`;
}
function magneticReset(e) {
  e.currentTarget.style.transform = "";
}

/* -------- data -------- */

const projects = [
  {
    title: "PartyGate",
    desc: "Tinder for parties — create, discover, and connect IRL.",
    link: "https://partygate.app",
    tags: ["React", "Supabase", "Realtime", "RLS"],
  },
  {
    title: "Tarot + Natal AI",
    desc: "AI-powered tarot & natal chart. Structured, multilingual, fast.",
    link: "https://tarot-hrvatska.vercel.app",
    tags: ["Next.js", "LLMs", "OG/SEO", "Edge"],
  },
  {
    title: "Te Baca Adem",
    desc: "Simple restoraunt website with SEO, maps, booking. Literally built in 30 minutes using AI :P",
    link: "https://tebaca-adem.vercel.app",
    tags: ["HTML", "CSS", "Maps", "SEO"],
  },
];

const backend = [
  "Node.js",
  "Express",
  "Prisma",
  "Supabase / Postgres",
  "Edge Functions",
  "Webhooks",
  "Redis (basics)",
];

const skills = [
  "React / Next.js",
  "React Native",
  "MobX / Zustand",
  "Tailwind / MUI",
  "Supabase",
  "Node.js",
  "Framer Motion",
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

/* -------- motto typewriter -------- */

function TypeMotto({
  items = [
    `In code, “impossible” just means “not shipped yet.”`,
    `Speed. Clarity. Delivery.`,
    `Ship > Perfect.`,
  ],
  typing = 28,
  pause = 1200,
  deleting = 14,
}) {
  const [i, setI] = useState(0);
  const [sub, setSub] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const full = items[i];
    let id;

    if (!del && sub <= full.length) {
      id = setTimeout(() => setSub((s) => s + 1), typing);
    } else if (!del && sub > full.length) {
      id = setTimeout(() => setDel(true), pause);
    } else if (del && sub > 0) {
      id = setTimeout(() => setSub((s) => s - 1), deleting);
    } else if (del && sub === 0) {
      setDel(false);
      setI((idx) => (idx + 1) % items.length);
    }

    return () => clearTimeout(id); // << important
  }, [sub, del, i, items, typing, pause, deleting]);

  return (
    <span className="type-line">
      {items[i].slice(0, sub)}
      <span className="type-caret" />
    </span>
  );
}

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

/* -------- page -------- */

export default function Home() {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  const active = useScrollSpy([
    "#about",
    "#projects",
    "#ai",
    "#skills",
    "#contact",
  ]);
  const matrixOverlay = useMatrixFade(64);

  return (
    <main className="relative min-h-screen overflow-x-clip site-bg">
      {/* BACKGROUND (lighter & larger columns on phones for perf) */}
      <MatrixRain
        fontBase={isMobile ? 20 : 16}
        speedMin={0.45}
        speedMax={isMobile ? 0.95 : 1.1}
        opacity={isMobile ? 0.22 : 0.28}
      />
      <div
        className="fixed inset-0 z-0 bg-black pointer-events-none"
        style={{ opacity: matrixOverlay }}
      />

      <div className="fixed inset-0 -z-[1] bg-noise opacity-60" />

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-20 h-16 backdrop-blur-sm bg-black/40 border-b border-white/5">
        <div className="mx-auto max-w-6xl h-full px-4 sm:px-6 flex items-center justify-between">
          <a href="#" className="text-white text-lg font-semibold">
            MP13<span className="opacity-60">.portfolio</span>
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
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/15 hover:border-white/30"
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
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
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

      {/* HERO (100vh minus header, mobile-friendly type sizes) */}
      <section className="relative h-[calc(100svh-var(--header-h))] overflow-hidden">
        {/* glow */}
        <div className="pointer-events-none absolute inset-0 -z-[1] flex items-center justify-center">
          <div
            className="h-[44vh] w-[90vw] md:w-[82vw] max-w-6xl rounded-full blur-3xl opacity-35"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(34,255,136,.22), transparent 60%)",
            }}
          />
        </div>

        <div className="container h-full flex flex-col items-center justify-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-balance mx-auto font-extrabold tracking-tight text-white leading-[0.98]
                       text-[clamp(2.2rem,8.5vw,5.6rem)]"
          >
            Luka <span className="text-[--color-neon-500]">Bartulović</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-3 text-[clamp(1rem,3.2vw,1.35rem)] text-[--color-neon-200] max-w-[80ch]"
          >
            Turning Ideas into{" "}
            <span className="text-[--color-neon-500]">Scalable</span>, Beautiful
            Apps
          </motion.p>

          {/* motto */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-5 px-3 sm:px-4 py-2 rounded-lg ambient-neon text-sm text-white/90 max-w-[92vw] md:max-w-[60ch]"
          >
            <TypeMotto />
          </motion.div>

          {/* scroll cue */}
          <a
            href="#about"
            className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-70 hover:opacity-100 transition text-sm"
          >
            ↓ Scroll
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="section-scrim relative z-10 py-16 md:py-24"
      >
        <div className="container">
          <SectionTitle>About Me</SectionTitle>
          <div className="mt-6 md:mt-8 grid md:grid-cols-2 gap-6 md:gap-8">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-base md:text-lg leading-relaxed text-gray-200"
            >
              I’m Luka — a frontend engineer and product builder. I create{" "}
              <b>fast</b>, <b>beautifully designed</b> web and mobile apps.
              Clean UIs, subtle but powerful animation, and crystal-clear UX.
              I’m also interested in the <b>backend</b> side — Node.js,
              Supabase/Postgres, Prisma, webhooks and Edge functions — so I can
              own the full vertical slice. My mindset is
              <b>Maximal Player 13</b>: focus, speed, problem-solving and
              delivery. Currently pushing <i>PartyGate</i>,{" "}
              <i>Tarot/Natal AI</i>
              and client work (SEO, sales, booking).
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid gap-3"
            >
              {[
                ["Speed", "Prototype in 24–48h. Fast → validate → iterate."],
                ["Clarity", "One clean path to value. No friction."],
                ["Delivery", "No excuses. Shipped > perfect."],
              ].map(([t, d], i) => (
                <li key={i} className="card p-4">
                  <div className="font-semibold text-white">{t}</div>
                  <div className="text-sm opacity-80 mt-1">{d}</div>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Stats */}
          <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            <Stat to={35} label="Shipped features / month" />
            <Stat to={12} label="Production projects" />
            <Stat to={48} label="Hours to first prototype" />
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="relative z-10 py-16 md:py-24">
        <div className="container">
          <SectionTitle>Projects</SectionTitle>
          <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {projects.map((p, i) => (
              <motion.a
                key={i}
                href={p.link}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -6, scale: 1.02 }}
                className="group card ambient-neon sheen-static p-5"
                onMouseMove={(e) => {
                  const el = e.currentTarget,
                    r = el.getBoundingClientRect();
                  el.style.setProperty("--x", e.clientX - r.left + "px");
                  el.style.setProperty("--y", e.clientY - r.top + "px");
                }}
                style={{
                  background:
                    "radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(34,255,136,.10), transparent 40%)",
                }}
              >
                <h3 className="text-lg md:text-xl font-semibold text-white">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm opacity-85">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2 py-0.5 rounded-full border border-white/15 bg-black/30"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-2 text-[--color-neon-500]">
                  <span>Open</span>
                  <span aria-hidden>↗</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* AI LAB */}
      <section id="ai" className="relative z-10 py-16 md:py-24">
        <div className="container">
          <SectionTitle>AI Lab</SectionTitle>
          <p className="mt-6 max-w-3xl opacity-90">
            I build AI features that serve the user: structured outputs, stable
            chains, evaluation, and real product value. No fog — only results.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {aiCaps.map((c, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="card ambient-neon sheen-static p-5"
              >
                <div className="font-semibold text-white">{c.title}</div>
                <div className="mt-2 text-sm opacity-85">{c.desc}</div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              "OpenAI / GPT",
              "Claude",
              "Gemini",
              "Supabase pgvector",
              "Edge Functions",
              "RAG",
              "Prompt Eval",
              "Guardrails",
            ].map((b) => (
              <span
                key={b}
                className="text-[11px] px-2 py-0.5 rounded-full border border-white/15 bg-black/30"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="relative z-10 py-16 md:py-24">
        <div className="container">
          <SectionTitle>Skills</SectionTitle>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {skills.map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="card px-4 py-3 text-sm"
              >
                <span className="text-[11px] px-2 py-0.5 rounded-full border chip-glow">
                  {s}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {backend.map((b) => (
              <span
                key={b}
                className="text-[11px] px-2 py-0.5 rounded-full border border-white/15 bg-black/30"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative z-10 py-20 md:py-28">
        <div className="container text-center">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-semibold text-white"
          >
            Let’s Build Something Legendary
          </motion.h2>
          <p className="mt-4 opacity-90">
            Open to frontend / React / RN roles and ambitious AI products.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4"
          >
            <a
              href="mailto:bartul123@outlook.com"
              className="btn btn-outline btn-lg btn-press btn-glow w-full sm:w-auto min-w-[160px]"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty(
                  "--x",
                  e.clientX - r.left + "px"
                );
              }}
            >
              Email me
            </a>
            <a
              href="https://github.com/bartul9"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline btn-lg btn-press btn-glow w-full sm:w-auto min-w-[160px]"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty(
                  "--x",
                  e.clientX - r.left + "px"
                );
              }}
            >
              GitHub
            </a>
          </motion.div>

          <p className="mt-6 text-xs opacity-60">
            © {new Date().getFullYear()} Luka Bartulović — MP13
          </p>
        </div>
      </section>
    </main>
  );
}
