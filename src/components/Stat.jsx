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
    <div className="stat-card">
      <div className="stat-number">
        {n}
        <span className="stat-symbol">+</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
