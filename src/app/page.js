"use client";

import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Rocket,
  Sparkles,
  Workflow,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";
import Stat from "@/components/Stat";
import NeuralMesh from "@/components/NeuralMesh";
import TypeMotto from "@/components/TypeMotto";
import ChessShowcase from "@/components/ChessShowcase";

/* -------- scroll spy (center-of-viewport) -------- */
function useScrollSpy(selectors = [], { offset = "header" } = {}) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const sectionEls = selectors
      .map((selector) => document.querySelector(selector))
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

      for (const el of sectionEls) {
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
  }, [selectors, offset]);

  return active;
}

/* -------- data -------- */

const projects = [
  {
    title: "ConsigliereX",
    desc: "Productivty RPG that guides users with adaptive AI quests and live metrics.",
    link: "https://consigliere-x.vercel.app",
    tags: ["Next.js", "Supabase", "AI"],
    image: "/images/projects/consigliere-x.png",
  },
  {
    title: "Tarot + Natal AI",
    desc: "Realtime divination studio with multilingual prompts, SEO automation and share cards.",
    link: "https://tarot-hrvatska.vercel.app",
    tags: ["Next.js", "AI", "Edge"],
    image: "/images/projects/tarot.png",
  },
  {
    title: "DollarTrack",
    desc: "Cashflow dashboard for small budgets with offline sync and receipt parsing.",
    link: "https://dollar-track.vercel.app/",
    tags: ["React", "SQLite", "Automation"],
    image: "/images/projects/dollar-track.png",
  },
];

const heroHighlights = [
  {
    title: "Design-led engineering",
    desc: "I architect flows, craft UI and sweat the micro-interactions before I touch code.",
    Icon: Sparkles,
  },
  {
    title: "Launch velocity",
    desc: "24–48h from concept to working prototype. Shipping cadence beats slide decks.",
    Icon: Rocket,
  },
  {
    title: "Systems thinking",
    desc: "From data to DX — predictable pipelines, guardrails and reliable delivery.",
    Icon: Workflow,
  },
];

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "AI Lab", href: "#ai" },
  { label: "Process", href: "#process" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const navAnchors = navItems.map((item) => item.href);

const aiCaps = [
  {
    title: "AI Product Design",
    desc: "Idea → prototype in under 48h. UX flows, positioning and storytelling that converts.",
  },
  {
    title: "LLM Orchestration",
    desc: "Structured outputs, multi-step agents, evals and failure recovery baked in.",
  },
  {
    title: "RAG + Vector Search",
    desc: "pgvector, embeddings strategy, hybrid search and caching for low latency.",
  },
  {
    title: "Realtime & Edge",
    desc: "Supabase realtime, edge functions and webhooks powering reactive experiences.",
  },
];

const skills = [
  "Next.js",
  "React Native",
  "TypeScript",
  "Tailwind & CSS Architecture",
  "Supabase",
  "Node.js",
  "MobX / Zustand",
  "Product Strategy",
  "Pitch & Storytelling",
  "SEO & Performance",
  "LLM Evaluation",
  "Growth Experimentation",
];

const process = [
  {
    title: "Discover & Frame",
    desc: "Clarify value, map the user moments that matter and frame success metrics.",
  },
  {
    title: "Design the System",
    desc: "Design flows, component structure and data contracts so build moves fast.",
  },
  {
    title: "Build & Validate",
    desc: "Ship the prototype, instrument it and iterate with qualitative & quantitative feedback.",
  },
];

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
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const active = useScrollSpy(navAnchors);

  // if the user prefers reduced motion or animations are disabled, no variants
  const useAnim = ANIMATIONS_ENABLED && !reduceMotion;

  return (
    <main className="relative min-h-screen overflow-x-clip bg-canvas text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-48 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(129,140,248,0.25),_transparent_65%)] blur-3xl" />
        <div className="absolute bottom-[-28rem] left-[-18rem] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.22),_transparent_68%)] blur-3xl" />
        <div className="absolute -bottom-24 right-[-12rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.25),_transparent_70%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_55%)]" />
      </div>

      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-30 pt-6">
        <div className="container">
          <div className="nav-shell">
            <a href="#" className="nav-brand">
              <span className="nav-brand-dot" /> Luka Bartulović
            </a>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  className={`nav-link ${active === item.href ? "active" : ""}`}
                  href={item.href}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <button
              aria-label="Menu"
              className="nav-menu-btn md:hidden"
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
        </div>

        {menuOpen && (
          <div className="mobile-sheet">
            <div className="absolute inset-0 bg-slate-950/70" onClick={() => setMenuOpen(false)} />
            <motion.div
              initial={useAnim ? { y: -12, opacity: 0 } : false}
              animate={useAnim ? { y: 0, opacity: 1 } : false}
              exit={useAnim ? { y: -12, opacity: 0 } : false}
              transition={{ type: "tween", duration: 0.5, ease: EASE }}
              className="mobile-panel"
            >
              <div className="p-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="mobile-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative pt-[clamp(7rem,12vw,9rem)] pb-24 md:pb-32">
        <div className="container grid items-center gap-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="space-y-8">
            <motion.span
              variants={fadeUp}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.28em] text-slate-200/80 backdrop-blur"
            >
              Product Engineer &amp; AI partner
            </motion.span>

            <motion.h1
              variants={fadeUp}
              viewport={{ once: true }}
              className="text-balance text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-white"
            >
              Digital products that feel inevitable — built end to end.
            </motion.h1>

            <motion.p
              variants={fadeIn}
              viewport={{ once: true }}
              className="max-w-xl text-base sm:text-lg text-slate-200/80"
            >
              I turn ambitious ideas into elegant, scalable software. Design systems,
              architecture, AI orchestration and go-to-market thinking come together in
              focused delivery sprints.
            </motion.p>

            <motion.div
              variants={fadeUp}
              viewport={{ once: true }}
              className="text-sm text-slate-200/70"
            >
              <TypeMotto />
            </motion.div>

            <motion.div
              variants={fadeUp}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
            >
              <a href="mailto:bartul123@outlook.com" className="btn btn-primary btn-lg btn-glow">
                Start a project
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="#projects" className="btn btn-outline btn-lg">
                View case studies
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              viewport={{ once: true }}
              className="grid gap-4 pt-10 sm:grid-cols-2 lg:grid-cols-3"
            >
              {heroHighlights.map(({ title, desc, Icon }) => (
                <div key={title} className="glass-tile">
                  <div className="glass-icon">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="text-sm font-semibold text-white">{title}</div>
                  <p className="text-xs leading-relaxed text-slate-200/70">{desc}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="hero-card">
              <div className="flex items-center justify-between gap-4">
                <span className="badge-soft">Currently shipping</span>
                <span className="text-sm font-medium text-slate-100/90">ConsigliereX</span>
              </div>
              <p className="mt-4 text-sm text-slate-200/75">
                Gamified personal growth platform. AI quests, real-time progress, community loops.
                Designed the brand language, product narrative and engineered the launch.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="stat-tile">
                  <span className="stat-value">48h</span>
                  <span className="stat-label">from concept to live prototype</span>
                </div>
                <div className="stat-tile">
                  <span className="stat-value">92%</span>
                  <span className="stat-label">retention across first 3 cohorts</span>
                </div>
                <div className="stat-tile">
                  <span className="stat-value">3x</span>
                  <span className="stat-label">increase in challenge completion</span>
                </div>
                <div className="stat-tile">
                  <span className="stat-value">0→1</span>
                  <span className="stat-label">strategy, design, build &amp; launch</span>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-xs text-slate-200/70">
                <span>Toolchain: Next.js · Supabase · Tailwind · LLM Agents</span>
                <span className="hidden sm:inline-flex items-center gap-1 text-slate-100/80">
                  Live <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative py-24">
        <div className="container grid items-start gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="space-y-6">
            <SectionTitle>About</SectionTitle>
            <p className="text-base sm:text-lg leading-relaxed text-slate-200/80">
              I’m Luka, a product engineer who moves from vision to launch without losing the
              craft. I design the experience, build the stack and translate every sprint into
              outcomes the business can feel. No waiting on handoffs — just clarity, velocity and
              ownership.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [
                  "Speed",
                  "Prototype, validate and iterate in compressed cycles so teams can learn fast.",
                ],
                [
                  "Clarity",
                  "Give every feature a narrative and a north star metric. Design isn’t decoration.",
                ],
                [
                  "Delivery",
                  "Ship the slice end-to-end — from data layer to the micro-interactions.",
                ],
                [
                  "Story",
                  "Translate the product into pitches, demos and launch-ready assets.",
                ],
              ].map(([title, desc]) => (
                <div key={title} className="about-tile">
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="about-panel">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Lead the build, own the finish</h3>
                <p className="mt-2 text-sm text-slate-200/70">
                  I join teams as the person who can see the product, tell the story and implement
                  the solution. Whether it’s a greenfield app or rebuilding a core flow, I align the
                  design, data model, AI strategy and release plan.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Stat to={25} label="Shipped features / month" />
                <Stat to={12} label="Production launches" />
                <Stat to={48} label="Hours to first prototype" />
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200/75">
                <p>
                  &ldquo;Luka is the builder you want when there’s no room for bloated timelines. He
                  designs, codes and communicates like a founder.&rdquo; — <span className="text-white">Stef, CEO @ ConsigliereX</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHESS */}
      <ChessShowcase />

      {/* PROJECTS */}
      <section id="projects" className="relative py-24">
        <div className="container space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle>Selected builds</SectionTitle>
            <p className="max-w-2xl text-sm text-slate-200/70">
              Each project blends strategy, systems design and relentless iteration. These are the
              shipped pieces I’d show a founder when they ask how I work.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="project-card"
              >
                <div
                  className="project-media"
                  style={{ backgroundImage: `url('${project.image}')` }}
                />

                <div className="project-body">
                  <div className="flex items-center justify-between gap-4">
                    <h3>{project.title}</h3>
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                  <p>{project.desc}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* AI LAB */}
      <section id="ai" className="relative py-24">
        <div className="container">
          <div className="ai-shell">
            <div className="ai-overlay" />
            <NeuralMesh />

            <div className="ai-content">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <SectionTitle>AI Studio</SectionTitle>
                <p className="max-w-xl text-sm text-slate-200/70">
                  Production-ready AI features with predictable outputs and clear guardrails. I
                  connect the model, UX and measurement into a cohesive system.
                </p>
              </div>

              <div className="grid gap-4 pt-8 sm:grid-cols-2 lg:grid-cols-4">
                {aiCaps.map((cap) => (
                  <div key={cap.title} className="ai-card">
                    <h3>{cap.title}</h3>
                    <p>{cap.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="process" className="relative py-24">
        <div className="container space-y-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle>Workflow</SectionTitle>
            <p className="max-w-2xl text-sm text-slate-200/70">
              Every engagement moves through a tight loop: align on value, design the system,
              deliver the experience. This keeps momentum high and decisions clear.
            </p>
          </div>

          <div className="process-grid">
            {process.map((step, index) => (
              <div key={step.title} className="process-card">
                <span className="process-step">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="relative z-10 py-24">
        <div className="container">
          <SectionTitle>Skills</SectionTitle>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {skills.map((skill) => (
              <span key={skill} className="skill-chip">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative py-24">
        <div className="container">
          <div className="contact-card">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-semibold text-white">
                Let’s build the product your investors can’t stop demoing.
              </h2>
              <p className="text-sm sm:text-base text-slate-200/75">
                I’m open to senior frontend roles, product engineering mandates and AI ventures
                that need a builder who can own the narrative and the code.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="mailto:bartul123@outlook.com" className="btn btn-primary btn-lg btn-glow">
                Drop me a line
                <Mail className="h-4 w-4" />
              </a>
              <div className="flex items-center gap-2 text-slate-200/70">
                <a
                  href="https://github.com/bartul9"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-link"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/luka-bartulović-5b562b200/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-link"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-20 border-t border-white/5 bg-slate-950/70 backdrop-blur">
        <div className="container flex flex-col items-center justify-between gap-3 py-8 text-xs text-slate-400/80 sm:flex-row">
          <span>© {new Date().getFullYear()} Luka Bartulović. Built with intention in Split, HR.</span>
          <span className="flex items-center gap-1 text-slate-400/70">
            v2 portfolio refresh · <span className="font-medium text-slate-200/80">Maximum Game</span>
          </span>
        </div>
      </footer>
    </main>
  );
}
