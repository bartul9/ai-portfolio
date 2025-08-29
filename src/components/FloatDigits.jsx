"use client";
import { useMemo } from "react";

export default function FloatDigits({ count = 20 }) {
  const items = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        left: Math.random() * 200,
        delay: Math.random() * 10, // malo duži random delay
        // dulje trajanje za sporiji efekt
        duration: 40 + Math.random() * 50, // npr. 40–70s
        text:
          Math.random() > 0.5
            ? ((Math.random() * 65535) | 0).toString(16).toUpperCase()
            : ((Math.random() * 1024) | 0).toString(2),
        driftX: Math.random() * 60 - 30 + "px",
        size: 12 + Math.random() * 14,
        opacity: 0.05 + Math.random() * 0.25,
      });
    }
    return arr;
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1]">
      {items.map((it, i) => (
        <span
          key={i}
          style={{
            left: `${it.left}%`,
            animation: `drift ${it.duration}s linear ${it.delay}s infinite`,
            fontSize: `${it.size}px`,
            opacity: it.opacity,
            "--driftX": it.driftX,
          }}
          className="absolute bottom-[-10vh] text-neon-dim select-none"
        >
          {it.text}
        </span>
      ))}
    </div>
  );
}
