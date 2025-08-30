"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionTitle from "./SectionTitle";

export default function ChessShowcase() {
  return (
    <section id="chess" className="section-scrim relative z-10 py-20 md:py-28">
      <div className="container">
        <SectionTitle>The Chess Challenge</SectionTitle>

        <div className="mt-8 md:mt-12 grid md:grid-cols-2 gap-6 md:gap-10 items-start">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-invert max-w-none text-base md:text-lg leading-relaxed text-gray-200 p-2"
          >
            <p>
              Four years ago, with only around one year of dev experience, I
              decided to build <b>chess from scratch</b>. No frameworks, no
              advanced math, no degree — just plain JavaScript and
              determination.
            </p>
            <p>
              Until then I never did any heavy calculations or tough algorithmic
              thinking. This was a completely different beast: I had to figure
              out <i>everything</i> myself — how to structure the board as
              objects, how to move pieces, how to calculate available paths, how
              to handle pawn rules, captures, promotions… all without copying
              anything.
            </p>
            <p>
              I started one night and didn’t stop until morning. By sunrise,
              chess was <b>playable</b>. That moment changed me: I realized
              programming isn’t about how many technologies you know — it’s
              about what you <b>build</b> with them. Languages and frameworks
              are just tools.
            </p>
            <p>
              After that night, I knew I was ready to build <i>anything</i>.
              Just say what you want — and let me create it.
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
          </motion.div>

          <ChessShowcaseBoard />
        </div>
      </div>
    </section>
  );
}

/* map piece codes to Unicode glyphs (white = w*, black = b*) */
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

/* absolute square (file 0–7, rank 0–7); centers the glyph */
function SquarePiece({
  code = "wQ",
  file = 0,
  rank = 0, // 0 is bottom rank; 7 is top
  sizeClass = "text-4xl md:text-5xl",
  glow = false,
  animatePath = null, // e.g. { x: ["0%","100%"], y: ["0%","-100%"], delay: 0.2 }
}) {
  const baseLeft = `${file * 12.5}%`;
  const baseTop = `${(7 - rank) * 12.5}%`;

  const common =
    "absolute w-[12.5%] h-[12.5%] flex items-center justify-center select-none";

  const colorClasses =
    code[0] === "w"
      ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]"
      : // black piece: dark body + subtle light outline so it reads on dark squares
        "text-black [text-shadow:0_0_1px_rgba(255,255,255,0.65)]";

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

function ChessShowcaseBoard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.98, y: 8 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative card overflow-hidden p-0"
    >
      <div className="relative h-[340px] md:h-[420px] w-full bg-black/40">
        {/* inner board */}
        <div className="absolute inset-4 rounded-xl overflow-hidden ring-1 ring-white/10">
          {/* 8×8 squares */}
          <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
            {Array.from({ length: 64 }).map((_, i) => {
              const x = i % 8;
              const y = Math.floor(i / 8);
              const light = (x + y) % 2 === 0;
              return (
                <div
                  key={i}
                  className={light ? "bg-emerald-200/10" : "bg-emerald-900/35"}
                  style={{
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
                  }}
                />
              );
            })}
          </div>

          {/* coordinates */}
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

          {/* PIECES (white + black) — perfectly centered on squares */}
          {/* Positions are real squares: file a=0..h=7, rank 1=0..8=7 */}
          <SquarePiece
            code="wQ"
            file={3}
            rank={5} // d6
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
            rank={6} // f7
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
            rank={2} // c3
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
            rank={1} // g2
            {...(inView && {
              animatePath: { x: ["-300%", "0%"], y: ["0%", "0%"], delay: 0.45 },
            })}
          />
        </div>

        {/* vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent,rgba(0,0,0,.6))]" />
      </div>
    </motion.div>
  );
}
