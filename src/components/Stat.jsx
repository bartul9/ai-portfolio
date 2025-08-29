"use client";
import { useEffect, useState } from "react";

export default function Stat({ to = 100, label = "", duration = 1400 }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf, start;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / duration);
      setN(Math.floor(p * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return (
    <div className="card p-5 text-center">
      <div className="text-4xl md:text-5xl font-extrabold text-white">
        {n}
        <span className="opacity-70">+</span>
      </div>
      <div className="mt-2 text-sm text-[--color-neon-200]">{label}</div>
    </div>
  );
}
