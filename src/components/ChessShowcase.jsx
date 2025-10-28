"use client";

import { motion, useInView, AnimatePresence, easeInOut } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle";

/* --------- small util to reset animations --------- */
function useReplayKey() {
  const [key, setKey] = useState(0);
  const replay = () => setKey((k) => k + 1);
  return { key, replay };
}

export default function ChessShowcase() {
  return (
    <section id="chess" className="section-scrim relative z-10 py-16 md:py-24">
      <div className="container">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-left sm:text-center">
          <SectionTitle>The Chess Challenge</SectionTitle>
        </div>

        <div className="mt-6 md:mt-10 flex flex-col items-center gap-6 md:gap-8">
          <BoardCard />
        </div>
      </div>
    </section>
  );
}
function BoardCard() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { key, replay } = useReplayKey();
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });

  return (
    <div className="relative mx-auto w-full max-w-[420px] md:max-w-[480px] lg:max-w-[560px]">
      <motion.div
        key={key}
        ref={ref}
        initial={{ opacity: 0, scale: 0.98, y: 8 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="relative card overflow-hidden p-0 max-w-xl"
        title="Click to toggle the story"
      >
        <div className="relative w-full aspect-square bg-black/40">
          <div className="absolute inset-4 rounded-xl overflow-hidden ring-1 ring-white/10 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.25)]">
            <BoardGrid />
            <BoardCoords />

            <TypeInBoard active={open} />
          </div>

          {!open && (
            <>
              <SquarePiece
                code="wQ"
                file={3}
                rank={5}
                glow
                {...(inView && {
                  animatePath: {
                    x: ["0%", "0%", "-100%", "-100%"],
                    y: ["0%", "-200%", "-200%", "-100%"],
                    delay: 0.6,
                  },
                })}
              />
              <SquarePiece
                code="bB"
                file={5}
                rank={6}
                {...(inView && {
                  animatePath: {
                    x: ["0%", "90%"],
                    y: ["0%", "-95%"],
                    delay: 0.25,
                  },
                })}
              />
              <SquarePiece
                code="wN"
                file={2}
                rank={2}
                {...(inView && {
                  animatePath: {
                    x: ["0%", "100%", "100%", "200%"],
                    y: ["0%", "-200%", "-100%", "-100%"],
                    delay: 0.0,
                  },
                })}
              />
              <SquarePiece
                code="bR"
                file={6}
                rank={1}
                {...(inView && {
                  animatePath: {
                    x: ["-100%", "0%"],
                    y: ["0%", "0%"],
                    delay: 0.45,
                  },
                })}
              />
            </>
          )}

          {/* vignette */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent,rgba(0,0,0,.6))]" />

          {/* Show/Hide toggle button (on board) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // prevent board click toggle twice
              setOpen((v) => !v);
            }}
            className="absolute cursor-pointer bottom-2 right-2 rounded-md border border-emerald-300/30 bg-black/40
                       px-2.5 py-1 text-[11px] text-emerald-100/90 hover:bg-green-400/10
                       ring-1 ring-white/10"
          >
            {open ? "Hide text" : "Show text"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function TypeInBoard({ active }) {
  const LINES = [
    "When I first started learning programming, I listened to a podcast with Marin Šarić, a Croatian engineer who worked at Google and later co-founded OptimoRoute.",
    "In that podcast he said something that burned into my mind: I don’t care what languages you know. I don’t care what you’ve learned.",
    "Show me what you’ve built with that knowledge. Show me your version of chess — that’s what I want to see.”",

    "That was it. I promised myself: one day, I will build chess from scratch.",
    "Fast forward about a year. I had roughly one year of dev experience,",
    "my first job behind me, and enough confidence to take on something bigger.",
    "I didn’t know how exactly, but I knew I could figure it out.",

    "One night I sat down — no frameworks, no degree, no advanced math, just plain JavaScript and determination.",
    "For 13,14 hours I wrestled with the problem: how to structure the board, move pieces, calculate paths and steps, handle pawns, captures, promotions.",
    "Piece by piece, it clicked. By sunrise, chess was playable.",

    "That night taught me this: programming isn’t about how many technologies you’ve memorized — it’s about what you can build with them.",
    "Languages and frameworks are tools.",
    "The value is solving hard problems and shipping.",
  ];

  const FULL_TEXT = LINES.join("\n");
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);

  // reset when active toggles
  useEffect(() => {
    if (!active) {
      setShown("");
      setDone(false);
      return;
    }

    let i = 0;
    let cancelled = false;

    function tick() {
      if (cancelled) return;
      if (i >= FULL_TEXT.length) {
        setDone(true);
        return;
      }

      const ch = FULL_TEXT[i];
      const next = i + 1;

      // base speed
      let delay = 18;

      // slightly slower on spaces after punctuation and newlines
      if (/[.,!?]/.test(ch)) delay = 160;
      if (ch === "\n") delay = 220;
      if (ch === " ") delay = 22;

      setShown((s) => s + ch);
      i = next;
      setTimeout(tick, delay);
    }

    setTimeout(tick, 250); // small boot-up delay

    return () => {
      cancelled = true;
    };
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <div key="crt" className="absolute inset-0">
          {/* glass/scanlines */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_0%,rgba(0,0,0,.35)_100%)]" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.25] mix-blend-overlay"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, rgba(0,0,0,.25) 0px, rgba(0,0,0,.25) 1px, transparent 2px, transparent 4px)",
            }}
          />
          {/* text area */}
          <div className="absolute inset-2 md:inset-3 p-2 md:p-3 rounded-lg bg-black/35 ring-1 ring-emerald-300/10 overflow-hidden">
            <pre
              className="h-full w-full whitespace-pre-wrap break-word text-start overflow-y-auto
                         font-mono text-[11px] md:text-[12px] leading-relaxed
                         text-emerald-200/90 drop-shadow-[0_0_6px_rgba(0,255,180,.25)]"
              style={{ textShadow: "0 0 6px rgba(0,255,180,.25)" }}
            >
              {shown}
              <span
                className={`ml-0.5 ${done ? "opacity-0" : "animate-pulse"}`}
              >
                ▌
              </span>
            </pre>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- board bits ---------------- */

function BoardGrid() {
  return (
    <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
      {Array.from({ length: 64 }).map((_, i) => {
        const x = i % 8;
        const y = Math.floor(i / 8);
        const light = (x + y) % 2 === 0;
        return (
          <div
            key={i}
            className={light ? "bg-emerald-200/10" : "bg-emerald-900/35"}
            style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)" }}
          />
        );
      })}
    </div>
  );
}

function BoardCoords() {
  return (
    <div className="pointer-events-none absolute inset-0 text-[10px] md:text-xs text-emerald-300/35">
      {Array.from({ length: 8 }).map((_, f) => (
        <span
          key={`f${f}`}
          className="absolute bottom-1"
          style={{
            left: `calc(${f * 12.5}% + 6.25%)`,
            transform: "translateX(-50%)",
          }}
        >
          {"abcdefgh"[f]}
        </span>
      ))}
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
  );
}

/* glyphs + square piece */
const GLYPH = {
  wK: "♔",
  wQ: "♕",
  wR: "♖",
  wB: "♗",
  wN: "♘",
  wP: "♙",
  bK: "♚",
  bQ: "♛",
  bR: "♜",
  bB: "♝",
  bN: "♞",
  bP: "♟",
};

function SquarePiece({
  code = "wQ",
  file = 0,
  rank = 0,
  sizeClass = "text-4xl md:text-5xl",
  glow = false,
  animatePath = null,
}) {
  const baseLeft = `${file * 12.5}%`;
  const baseTop = `${(7 - rank) * 12.5}%`;
  const common =
    "absolute w-[12.5%] h-[12.5%] flex items-center justify-center select-none";
  const colorClasses =
    code[0] === "w"
      ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
      : "text-black drop-shadow-[0px_0px_8px_rgba(255,255,255,1)]";

  return (
    <motion.div
      className={common}
      style={{ left: baseLeft, top: baseTop }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={
        animatePath
          ? {
              opacity: [0, 1, 1],
              scale: [0.92, 1, 1],
              x: animatePath.x || ["0%"],
              y: animatePath.y || ["0%"],
              transition: {
                duration: 1.6,
                ease: "easeOut",
                delay: animatePath.delay || 0,
              },
            }
          : { opacity: 0, scale: 1 }
      }
    >
      <span
        className={`${sizeClass} ${colorClasses} ${
          glow ? "drop-shadow-[0_0_12px_rgba(0,255,180,0.55)]" : ""
        }`}
      >
        {GLYPH[code]}
      </span>
    </motion.div>
  );
}
