"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle";

/* --------- small util to reset animations --------- */
function useReplayKey() {
  const [key, setKey] = useState(0);
  const replay = () => setKey((k) => k + 1);
  return { key, replay };
}

export default function ChessShowcase() {
  const [open, setOpen] = useState(false);

  // close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="chess" className="section-scrim relative z-10 py-16 md:py-24">
      <div className="container">
        <SectionTitle>The Chess Challenge</SectionTitle>

        <div className="mt-6 md:mt-10 space-y-6 md:space-y-8">
          {/* Story (collapsible) */}
          <div className="md:order-1">
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="story"
                  initial={{ opacity: 0, y: -6, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -6, height: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="prose prose-invert max-w-none text-base md:text-lg leading-relaxed text-gray-200 p-2 rounded-xl border border-white/10 bg-white/5"
                >
                  <p>
                    When I first started learning programming, I listened to a
                    podcast with <b>Marin Šarić</b>, a Croatian engineer who
                    worked at Google and later co-founded OptimoRoute. In that
                    podcast he said something that burned into my mind:{" "}
                    <i>
                      “I don’t care what languages you know. I don’t care what
                      you’ve learned. Show me what you’ve built with that
                      knowledge. Show me your version of chess — that’s what I
                      want to see.”
                    </i>
                  </p>
                  <p>
                    That was it. I promised myself: one day, I will build chess
                    from scratch. Fast forward about a year. I had roughly one
                    year of dev experience, my first job behind me, and enough
                    confidence to take on something bigger. I didn’t know how
                    exactly, but I knew I could figure it out.
                  </p>
                  <p>
                    One night I sat down — no frameworks, no degree, no advanced
                    math. Just plain JavaScript and determination. For 6–8 hours
                    I wrestled with the problem: how to structure the board,
                    move pieces, calculate paths and steps, handle pawns,
                    captures, promotions. Piece by piece, it clicked. By
                    sunrise, chess was <b>playable</b>.
                  </p>
                  <p>
                    That night taught me this: programming isn’t about how many
                    technologies you’ve memorized — it’s about what you can{" "}
                    <b>build</b> with them. Languages and frameworks are tools.
                    The value is solving hard problems and shipping.
                  </p>
                  <p>
                    Repo:{" "}
                    <a
                      href="https://github.com/bartul9/chess"
                      target="_blank"
                      className="text-cyan-400 hover:underline"
                    >
                      github.com/bartul9/chess
                    </a>
                  </p>

                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => setOpen(false)}
                      className="rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white/80 hover:bg-white/10"
                    >
                      Hide story
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!open && (
              <button
                onClick={() => setOpen(true)}
                className="mt-1 inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white/80 hover:bg-white/10"
              >
                Read the story
                <span aria-hidden>↘</span>
              </button>
            )}
          </div>
          {/* Board (click opens story) */}
          <BoardCard onOpenStory={() => setOpen(true)} />
        </div>
      </div>
    </section>
  );
}

/* ===================== Board Card ===================== */

function BoardCard({ onOpenStory }) {
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
        transition={{ duration: 0.6 }}
        className="relative card overflow-hidden p-0 cursor-pointer max-w-xl "
        onClick={onOpenStory}
        title="Click to read the story"
      >
        {/* Make board square */}
        <div className="relative w-full aspect-square bg-black/40">
          <div className="absolute inset-4 rounded-xl overflow-hidden ring-1 ring-white/10 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.25)]">
            <BoardGrid />
            <BoardCoords />

            {/* Pieces */}
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
                  x: ["0%", "200%"],
                  y: ["0%", "-200%"],
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
                  x: ["-300%", "0%"],
                  y: ["0%", "0%"],
                  delay: 0.45,
                },
              })}
            />
          </div>

          {/* vignette */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent,rgba(0,0,0,.6))]" />
        </div>

        {/* overlay hint */}
        <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center">
          <div className="rounded-full bg-black/40 px-3 py-1 text-[11px] text-white/80 ring-1 ring-white/15">
            Click board to read the story
          </div>
        </div>
      </motion.div>
    </div>
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
      ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]"
      : "text-black [text-shadow:0_0_1px_rgba(255,255,255,0.65)]";

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
          : { opacity: 1, scale: 1 }
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
