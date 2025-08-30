// TypeMotto.jsx
"use client";
import { useEffect, useRef, useState } from "react";

export default function TypeMotto({
  items = [
    `Speed. Clarity. Delivery.`,
    `Break limits, not focus.`,
    `Chaos is just order waiting for a deadline.`,
    `Build faster than doubt can speak.`,
    `Code is war. Shipping is victory.`,
    `Perfection is procrastination in disguise.`,
    `Ideas die in drafts. Winners ship.`,
    `Fear slows. Action wins.`,
    `Be the bug, fix the world.`,
  ],
  typing = 32, // base ms per character while typing
  deleting = 18, // base ms per character while deleting
  pause = 1300, // pause when a line is completed
  jitter = 0.18, // 0–0.4 recommended (adds human randomness)
}) {
  const [i, setI] = useState(0);
  const [sub, setSub] = useState(0);
  const [del, setDel] = useState(false);
  const mounted = useRef(true);

  useEffect(
    () => () => {
      mounted.current = false;
    },
    []
  );

  useEffect(() => {
    const full = items[i];
    let delay;

    // base speed with a bit of human jitter
    const base = del ? deleting : typing;
    delay = base * (1 + (Math.random() * 2 - 1) * jitter);

    // extra natural pauses while typing on punctuation
    if (!del) {
      const nextChar = full.charAt(sub);
      if (/[,;:]/.test(nextChar)) delay += 220;
      if (/[.!?]/.test(nextChar)) delay += 420;
      if (nextChar === "—") delay += 300;
    } else {
      // slight bursts when deleting over spaces (feels like holding backspace)
      const prev = full.charAt(sub - 1);
      if (prev === " ") delay *= 0.7;
    }

    let id;

    if (!del && sub < full.length) {
      id = setTimeout(() => mounted.current && setSub((s) => s + 1), delay);
    } else if (!del && sub === full.length) {
      id = setTimeout(() => mounted.current && setDel(true), pause);
    } else if (del && sub > 0) {
      id = setTimeout(() => mounted.current && setSub((s) => s - 1), delay);
    } else if (del && sub === 0) {
      setDel(false);
      setI((idx) => (idx + 1) % items.length);
    }

    return () => clearTimeout(id);
    // only depend on the moving parts so we don't restart on re-renders
  }, [sub, del, i, items, typing, deleting, pause, jitter]);

  return (
    <span className="type-line">
      {items[i].slice(0, sub)}
      <span className={`type-caret${del ? " dim" : ""}`} />
    </span>
  );
}
