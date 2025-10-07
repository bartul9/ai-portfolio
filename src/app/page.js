"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";
import Stat from "@/components/Stat";
import TypeMotto from "@/components/TypeMotto";
import ChessShowcase from "@/components/ChessShowcase";

/* ---------------- helpers ---------------- */

function onSheenMove(e) {
  const r = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - r.left) / r.width) * 100;
  const y = ((e.clientY - r.top) / r.height) * 100;
  e.currentTarget.style.setProperty("--x", `${x}%`);
  e.currentTarget.style.setProperty("--y", `${y}%`);
}

function onSheenLeave(e) {
  e.currentTarget.style.removeProperty("--x");
  e.currentTarget.style.removeProperty("--y");
}

/* -------- scroll spy (center-of-viewport) -------- */
function useScrollSpy(selectors = [], { offset = "header" } = {}) {
  const [active, setActive] = useState(null);
  const selectorKey = useMemo(() => JSON.stringify(selectors), [selectors]);

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
  }, [selectors, selectorKey, offset]);

  return active;
}

/* -------- data -------- */

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

  const sectionIds = useMemo(
    () => ["#about", "#projects", "#ai", "#skills", "#contact"],
    []
  );
  const active = useScrollSpy(sectionIds);
  // if the user prefers reduced motion or animations are disabled, no variants
  const useAnim = ANIMATIONS_ENABLED && !reduceMotion;

  return (
    <main className="relative min-h-screen overflow-x-clip site-bg">
      <header className="header-glass fixed top-0 left-0 right-0 z-20">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#" className="nav-brand">
            Luka<span className="nav-brand-accent">.builds</span>
          </a>

          <nav className="hidden h-full items-center gap-1 md:flex">
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

          <button
            aria-label="Menu"
            className="menu-toggle md:hidden"
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

        {menuOpen && (
          <div className="mobile-sheet">
            <div
              className="absolute inset-0 bg-slate-900/35"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={useAnim ? { y: -12, opacity: 0 } : false}
              animate={useAnim ? { y: 0, opacity: 1 } : false}
              exit={useAnim ? { y: -12, opacity: 0 } : false}
              transition={{ type: "tween", duration: 0.45, ease: EASE }}
              className="mobile-panel"
            >
              <div className="flex items-center justify-between border-b border-slate-200/70 px-5 py-4">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Menu
                </span>
                <button
                  type="button"
                  className="mobile-close"
                  onClick={() => setMenuOpen(false)}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 6l12 12M18 6l-12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="sr-only">Close menu</span>
                </button>
              </div>
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

      <section className="hero-section">
        <div className="container hero-grid items-center py-24 sm:py-28">
          <div className="space-y-8 text-left">
            <motion.div
              variants={fadeUp}
              viewport={{ once: true }}
              className="hero-badge"
            >
              <span className="badge-dot" />
              Senior frontend & product partner · Split, Croatia
            </motion.div>

            <motion.h1
              variants={fadeUp}
              viewport={{ once: true }}
              className="hero-heading"
            >
              Luka <span className="hero-highlight">Bartulović</span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              viewport={{ once: true }}
              className="hero-copy"
            >
              Product-minded frontend engineer helping startups go from idea to
              launch with conviction. I blend motion craft, design systems, and
              AI-assisted workflows to ship interfaces that feel alive, fast,
              and unmistakably premium.
            </motion.p>

            <motion.div
              variants={fadeUp}
              viewport={{ once: true }}
              className="hero-motto"
            >
              <span className="hero-motto-label">Operating mantra</span>
              <TypeMotto />
            </motion.div>

            <motion.div
              variants={fadeUp}
              viewport={{ once: true }}
              className="hero-actions"
            >
              <a
                href="mailto:bartul123@outlook.com"
                className="hero-cta hero-cta--primary"
              >
                Start a project
              </a>
              <a href="#projects" className="hero-cta hero-cta--secondary">
                View case studies
              </a>
            </motion.div>

            <motion.ul
              variants={fadeUp}
              viewport={{ once: true }}
              className="hero-meta"
            >
              <li>⚡ Prototype in 48h — align vision before the week is out.</li>
              <li>🎯 Product partner — UX, storytelling, and polished delivery.</li>
              <li>🤖 AI-first mindset — structured, reliable, production ready.</li>
            </motion.ul>
          </div>

          <motion.div
            variants={fadeIn}
            viewport={{ once: true }}
            className="hero-panel"
            onMouseMove={onSheenMove}
            onMouseLeave={onSheenLeave}
          >
            <div className="panel-header">
              <span>Recent wins</span>
              <span className="panel-dot" />
            </div>

            <p className="panel-intro">
              Partnering with EU startups & founders to design seamless product
              journeys — from napkin sketch to production release.
            </p>

            <div className="panel-grid">
              <div className="panel-card">
                <span className="panel-label">AI Product Design</span>
                <p>Idea → clickable prototype within 48 hours.</p>
              </div>
              <div className="panel-card">
                <span className="panel-label">Performance</span>
                <p>Core Web Vitals & SEO dialed in before launch.</p>
              </div>
              <div className="panel-card">
                <span className="panel-label">Team Velocity</span>
                <p>Lead dev for squads shipping weekly without regressions.</p>
              </div>
            </div>

            <div className="panel-footer">
              <div className="avatar-ring">LB</div>
              <div>
                <p className="panel-footer-title">
                  Let’s build the next breakout product.
                </p>
                <p className="panel-footer-sub">
                  Open to remote-first teams & venture-backed founders in 2024.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <a href="#about" className="hero-scroll">
          Scroll to explore
        </a>
      </section>

      <section id="about" className="section-spacing">
        <div className="container">
          <SectionTitle
            eyebrow="Profile"
            description="Crafting resilient products end-to-end — from concept and UX flows to production releases backed by measurable outcomes."
          >
            About Luka
          </SectionTitle>

          <div className="about-grid">
            <div className="about-copy">
              <p>
                I’m Luka, a frontend specialist who thinks in systems and ships
                like a founder. My focus is on pairing visual finesse with
                technical depth so ambitious ideas feel inevitable. From launch
                marketing to data-heavy product work, I design and build the
                entire journey.
              </p>
              <p>
                I thrive in fast-moving environments — aligning stakeholders,
                clarifying the narrative, and translating insights into shipped
                features. With strong mobile experience and an AI-first toolkit,
                I help teams move from idea to market in weeks, not quarters.
              </p>

              <ul className="about-points">
                <li>Full-stack capable: Next.js, Supabase, edge runtimes.</li>
                <li>Motion-first polish that elevates perceived product quality.</li>
                <li>Story-driven artifacts — decks, demos, and launch playbooks.</li>
              </ul>
            </div>

            <div className="about-panel">
              <div className="about-pill">Principles</div>
              <div className="about-card-grid">
                {[
                  ["Speed", "Prototype in 24–48h. Validate → iterate."],
                  ["Clarity", "One polished path to value. Zero fog."],
                  ["Delivery", "Ship relentlessly. Momentum beats perfection."],
                ].map(([title, desc]) => (
                  <div key={title} className="about-card">
                    <div className="about-card-title">{title}</div>
                    <p>{desc}</p>
                  </div>
                ))}
              </div>

              <div className="about-metrics">
                <Stat to={25} label="Shipped features / month" />
                <Stat to={12} label="Production projects" />
                <Stat to={48} label="Hours to first prototype" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ChessShowcase />

      <section id="projects" className="section-spacing">
        <div className="container">
          <SectionTitle
            eyebrow="Selected Work"
            description="Case studies and live products that blend storytelling with rock-solid engineering."
          >
            Projects
          </SectionTitle>

          <div className="projects-grid">
            {projects.map((p, i) => (
              <a
                key={i}
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="project-card"
                onMouseMove={onSheenMove}
                onMouseLeave={onSheenLeave}
              >
                {p.image && (
                  <span
                    className="project-card__bg"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(6,10,20,0.2), rgba(6,10,20,0.8)), url('${p.image}')`,
                      opacity: p.imageOpacity ?? 0.55,
                    }}
                  />
                )}
                <div className="project-card__content">
                  <h3 className="project-card__title">{p.title}</h3>
                  <p className="project-card__desc">{p.desc}</p>
                  <div className="project-card__tags">
                    {p.tags.map((t) => (
                      <span key={t} className="project-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="project-card__link">
                    View project <span aria-hidden>↗</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="ai" className="section-spacing">
        <div className="container">
          <SectionTitle
            eyebrow="AI Systems"
            description="Designing dependable AI that ships: structured outputs, guardrails, evaluation, and UX that feels magical."
          >
            AI Lab
          </SectionTitle>

          <div className="ai-lab">
            <div className="ai-grid">
              {aiCaps.map((c, i) => (
                <div
                  key={i}
                  className="ai-card"
                  onMouseMove={onSheenMove}
                  onMouseLeave={onSheenLeave}
                >
                  <div className="ai-card-title">{c.title}</div>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="section-spacing">
        <div className="container">
          <SectionTitle
            eyebrow="Tooling"
            description="A curated stack chosen for velocity, quality, and maintainability."
          >
            Skills
          </SectionTitle>

          <div className="skills-cloud">
            {skills.map((s, i) => (
              <span key={i} className="skill-chip">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section-spacing">
        <div className="container">
          <div
            className="contact-panel"
            onMouseMove={onSheenMove}
            onMouseLeave={onSheenLeave}
          >
            <div>
              <SectionTitle
                eyebrow="Collaborate"
                align="center"
                description="Let’s co-create software that feels inevitable. I’m ready for ambitious teams, product-minded founders, and bold roadmaps."
              >
                Let’s Build Something Legendary
              </SectionTitle>
            </div>

            <div className="contact-actions">
              <a href="mailto:bartul123@outlook.com" className="contact-cta">
                <Mail className="h-5 w-5" />
                <span>Email</span>
              </a>
              <a
                href="https://github.com/bartul9"
                target="_blank"
                rel="noreferrer"
                className="contact-cta"
              >
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/luka-bartulović-5b562b200/"
                target="_blank"
                rel="noreferrer"
                className="contact-cta"
              >
                <Linkedin className="h-5 w-5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <p>© {new Date().getFullYear()} Luka Bartulović — Crafted with maximum game.</p>
        </div>
      </footer>
    </main>
  );
}
