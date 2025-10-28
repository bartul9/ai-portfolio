"use client";
import { useEffect, useRef } from "react";

/**
 * Filmski Matrix rain
 * - kolone s različitim brzinama
 * - svijetli "head" + fade trag
 * - sporiji tempo kao u filmu
 */
export default function MatrixRain({
  fontBase = 16, // osnovna veličina fonta (skalira se po širini)
  speedMin = 0.6, // minimalna brzina pada (px/frame)
  speedMax = 1.8, // maksimalna brzina pada (px/frame)
  opacity = 0.32, // ukupna jačina kiše
}) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let width, height, fontSize, cols;
    let drops = []; // po koloni: {y, speed}
    let rafId;
    let running = true;

    // malo “matrix” set znakova (brojevi + kana + MP13)
    const chars = "01アサタナハマヤラワ0123456789MP13カナマ".split("");

    const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * DPR);
      canvas.height = Math.floor(height * DPR);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      // font malo veći na širim ekranima
      fontSize = Math.max(fontBase, Math.round(width / 95));
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      cols = Math.floor(width / fontSize);
      drops = Array.from({ length: cols }, () => ({
        y: Math.random() * -height, // start iznad ekrana
        speed: rand(speedMin, speedMax), // različite brzine po koloni
      }));
    };

    const rand = (a, b) => a + Math.random() * (b - a);

    // 30 fps cap → mekši i sporiji kao u filmu
    let last = 0;
    const frame = (t) => {
      if (!running) return;
      if (t - last < 1000 / 30) {
        rafId = requestAnimationFrame(frame);
        return;
      }
      last = t;

      // translucent crni “fade” da ostane trag
      ctx.fillStyle = `rgba(0,0,0,${1 - opacity})`;
      ctx.fillRect(0, 0, width, height);

      // crtamo svaku kolonu
      for (let i = 0; i < cols; i++) {
        const d = drops[i];
        const x = i * fontSize;
        const y = d.y;

        // “head” znak (svjetliji)
        ctx.fillStyle = "rgba(34,255,136,1)";
        ctx.fillText(chars[(Math.random() * chars.length) | 0], x, y);

        // trag ispod “head”-a (par koraka unatrag, sve tamnije)
        ctx.fillStyle = "rgba(34,255,136,0.30)";
        ctx.fillText(
          chars[(Math.random() * chars.length) | 0],
          x,
          y - fontSize
        );
        ctx.fillStyle = "rgba(34,255,136,0.22)";
        ctx.fillText(
          chars[(Math.random() * chars.length) | 0],
          x,
          y - fontSize * 2
        );
        ctx.fillStyle = "rgba(34,255,136,0.13)";
        ctx.fillText(
          chars[(Math.random() * chars.length) | 0],
          x,
          y - fontSize * 3
        );

        // pomak prema dolje
        d.y += d.speed * fontSize * 0.3; // 0.6 dodatni slowdown faktor

        // reset kad prođe dno – ponekad kasnije da kolona "diše"
        if (y > height + fontSize * 4) {
          d.y = Math.random() * -height * 0.5;
          d.speed = rand(speedMin, speedMax);
        }
      }
      rafId = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    rafId = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [fontBase, speedMin, speedMax, opacity]);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 z-0 opacity-40 [filter:drop-shadow(0_0_10px_rgba(34,255,136,.35))]"
      aria-hidden
    />
  );
}
