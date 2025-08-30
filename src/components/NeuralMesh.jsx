"use client";
import { useEffect, useRef } from "react";

export default function NeuralMesh({
  color = "rgba(225, 232, 228,",
  density = 0.00013, // nodes per pixel (auto scales with width/height)
  maxLinks = 3, // how many connections each node can draw
  speed = 0.3, // px per frame
  className = "",
}) {
  const ref = useRef(null);
  const mouse = useRef({ x: null, y: null, active: false });

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let dpr = Math.max(1, window.devicePixelRatio || 1);
    let W = 0,
      H = 0,
      nodes = [],
      anim = 0;
    let reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      W = Math.floor(rect.width);
      H = Math.floor(rect.height);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // rebuild nodes based on area
      const n = Math.max(20, Math.floor(W * H * density));
      nodes = new Array(n).fill(0).map(() => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        r: 1.2 + Math.random() * 1.4,
      }));
    }

    function step() {
      ctx.clearRect(0, 0, W, H);

      // slight vignette / depth
      const g = ctx.createRadialGradient(
        W / 2,
        H / 2,
        Math.min(W, H) * 0.15,
        W / 2,
        H / 2,
        Math.max(W, H) * 0.8
      );
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(1, "rgba(0,0,0,0.35)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      // update nodes
      for (const p of nodes) {
        // tiny mouse attraction
        if (mouse.current.active && mouse.current.x != null) {
          const dx = mouse.current.x - p.x;
          const dy = mouse.current.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 140 * 140) {
            p.vx += (dx / Math.sqrt(d2 + 0.001)) * 0.002;
            p.vy += (dy / Math.sqrt(d2 + 0.001)) * 0.002;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // wrap edges softly
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;
      }

      // connections
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        let linked = 0;
        for (let j = i + 1; j < nodes.length && linked < maxLinks; j++) {
          const b = nodes[j];
          const dx = a.x - b.x,
            dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < 120) {
            const alpha = 0.28 * (1 - d / 120);
            ctx.strokeStyle = `${color}${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            linked++;
          }
        }
      }

      // nodes (glow)
      for (const p of nodes) {
        ctx.fillStyle = `${color}0.9)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowColor = `${color}0.55)`;
        ctx.shadowBlur = 8;
        ctx.fillStyle = `${color}0.35)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      anim = requestAnimationFrame(step);
    }

    resize();
    if (!reduced) anim = requestAnimationFrame(step);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
      mouse.current.active = true;
    }
    function onLeave() {
      mouse.current.active = false;
    }

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", onLeave, { passive: true }); // avoid sticking

    return () => {
      cancelAnimationFrame(anim);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onLeave);
    };
  }, [color, density, maxLinks, speed]);

  return (
    <canvas
      ref={ref}
      className={`absolute inset-0 -z-[1] [mix-blend-mode:screen] ${className}`}
      aria-hidden
    />
  );
}
