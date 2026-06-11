"use client";

import {
  Component,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

/* ---------------------------------------------------------------- */
/* GLSL helpers                                                      */
/* ---------------------------------------------------------------- */

// Simplex 2D noise — Ian McEwan / Ashima Arts (MIT)
const NOISE_GLSL = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                      -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`;

const TERRAIN_VERTEX = /* glsl */ `
${NOISE_GLSL}
uniform float uTime;
uniform float uPixelRatio;
uniform vec3 uNear;
uniform vec3 uFar;
attribute float aRandom;
varying vec3 vColor;
varying float vAlpha;

void main() {
  vec3 pos = position;

  // Ridged fractal terrain scrolling toward the camera, with a slow
  // sideways crawl so the ridges keep morphing
  vec2 nc = vec2(pos.x * 0.016 + uTime * 0.014, (pos.z - uTime * 13.0) * 0.016);
  float n = snoise(nc) + 0.5 * snoise(nc * 2.1) + 0.25 * snoise(nc * 4.2);
  n /= 1.75;
  float ridge = 1.0 - abs(n);

  // Keep a flat corridor down the middle so the eye travels to the horizon
  float corridor = smoothstep(5.0, 58.0, abs(pos.x));
  float h = ridge * ridge * 19.0 * corridor + n * 1.4;
  pos.y += h;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;

  float dist = max(-mv.z, 0.001);
  gl_PointSize = max(
    uPixelRatio * (2.1 + h * 0.08 + aRandom * 0.7) * clamp(160.0 / dist, 0.4, 4.0),
    1.0
  );

  float depthT = clamp(dist / 300.0, 0.0, 1.0);
  vec3 col = mix(uNear, uFar, smoothstep(0.18, 0.78, depthT));
  // Ridge crests glow hotter in their own hue
  col += col * smoothstep(7.0, 15.0, h) * 0.8;
  vColor = col;

  float dim = mix(1.0, 0.45, smoothstep(0.25, 0.95, depthT));
  // Per-point shimmer so the field always feels alive
  float twinkle = 0.8 + 0.2 * sin(uTime * 1.7 + aRandom * 120.0);
  vAlpha = dim * (0.5 + 0.5 * aRandom) * twinkle;
}
`;

const TERRAIN_FRAGMENT = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.08, d) * vAlpha;
  if (a < 0.01) discard;
  gl_FragColor = vec4(vColor * a, a);
}
`;

const SUN_VERTEX = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const SUN_FRAGMENT = /* glsl */ `
uniform float uTime;
uniform vec3 uCore;
uniform vec3 uHalo;
varying vec2 vUv;

void main() {
  vec2 p = (vUv - 0.5) * 2.0;
  float d = length(p);

  // Soft edge waver so the disc rim never sits still
  float waver = 0.012 * sin(uTime * 0.8 + p.y * 6.0);
  float disc = smoothstep(0.6 + waver, 0.55 + waver, d);
  // Drifting horizontal interference bands across the disc
  float stripePos = abs(fract(vUv.y * 7.0 - uTime * 0.05) - 0.5);
  float stripe = smoothstep(0.46, 0.5, stripePos);
  disc *= 1.0 - 0.45 * stripe;

  // Slow breathing of the halo + faster electric flicker
  float breath = 0.86 + 0.14 * sin(uTime * 0.45);
  float halo = exp(-d * 2.4) * smoothstep(1.05, 0.5, d) * breath;
  float flicker = 0.9 + 0.1 * sin(uTime * 6.0 + sin(uTime * 17.0) * 2.0);

  vec3 col = (uCore * disc * 1.15 + uHalo * halo) * flicker;
  float alpha = clamp(disc + halo * 0.85, 0.0, 1.0);
  gl_FragColor = vec4(col, alpha);
}
`;

const DUST_VERTEX = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
attribute float aRandom;
attribute float aMix;
varying float vAlpha;
varying float vMix;

void main() {
  vec3 pos = position;
  float speed = 0.5 + aRandom * 1.1;
  pos.y = mod(pos.y + uTime * speed, 30.0);
  pos.x += sin(uTime * (0.2 + aRandom * 0.3) + aRandom * 40.0) * 2.2;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;

  float dist = max(-mv.z, 0.001);
  gl_PointSize = max(
    uPixelRatio * (0.9 + aRandom * 1.6) * clamp(90.0 / dist, 0.3, 2.5),
    1.0
  );

  float twinkle = 0.55 + 0.45 * sin(uTime * (1.0 + aRandom * 2.0) + aRandom * 80.0);
  vAlpha = twinkle * (1.0 - smoothstep(60.0, 120.0, dist)) * 0.8;
  vMix = aMix;
}
`;

const DUST_FRAGMENT = /* glsl */ `
uniform vec3 uBlue;
uniform vec3 uRed;
varying float vAlpha;
varying float vMix;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.05, d) * vAlpha;
  if (a < 0.01) discard;
  vec3 col = mix(uBlue, uRed, vMix);
  gl_FragColor = vec4(col * a, a);
}
`;

/* ---------------------------------------------------------------- */
/* Scene pieces                                                      */
/* ---------------------------------------------------------------- */

function buildTerrain(cols: number, rows: number) {
  const count = cols * rows;
  const positions = new Float32Array(count * 3);
  const randoms = new Float32Array(count);
  const width = 260;
  const depth = 330;
  const zStart = 24;
  let i = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      positions[i * 3] =
        (c / (cols - 1) - 0.5) * width + (Math.random() - 0.5) * 1.2;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] =
        zStart - (r / (rows - 1)) * depth + (Math.random() - 0.5) * 1.6;
      randoms[i] = Math.random();
      i++;
    }
  }
  return { positions, randoms };
}

function Terrain({ cols, rows }: { cols: number; rows: number }) {
  const dpr = useThree((s) => s.viewport.dpr);
  const { positions, randoms } = useMemo(
    () => buildTerrain(cols, rows),
    [cols, rows],
  );
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: 1 },
      uNear: { value: new THREE.Color("#4cb2ff") },
      uFar: { value: new THREE.Color("#ff2b3d") },
    }),
    [],
  );

  useEffect(() => {
    uniforms.uPixelRatio.value = dpr;
  }, [dpr, uniforms]);

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry key={`${cols}x${rows}`}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={TERRAIN_VERTEX}
        fragmentShader={TERRAIN_FRAGMENT}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function HorizonSun() {
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uCore: { value: new THREE.Color("#ff3b47") },
      uHalo: { value: new THREE.Color("#ff1f30") },
    }),
    [],
  );

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
  });

  return <mesh position={[42, 10, -290]} frustumCulled={false}></mesh>;
}

function Dust({ count }: { count: number }) {
  const dpr = useThree((s) => s.viewport.dpr);
  const { positions, randoms, mixes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count);
    const mixes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = Math.random() * 30;
      positions[i * 3 + 2] = -8 - Math.random() * 110;
      randoms[i] = Math.random();
      mixes[i] = Math.random() < 0.16 ? 1 : 0;
    }
    return { positions, randoms, mixes };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: 1 },
      uBlue: { value: new THREE.Color("#a8d8ff") },
      uRed: { value: new THREE.Color("#ff5a4f") },
    }),
    [],
  );

  useEffect(() => {
    uniforms.uPixelRatio.value = dpr;
  }, [dpr, uniforms]);

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry key={count}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
        <bufferAttribute attach="attributes-aMix" args={[mixes, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={DUST_VERTEX}
        fragmentShader={DUST_FRAGMENT}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Rig() {
  useFrame((state, delta) => {
    const { camera, pointer, clock } = state;
    const t = Math.min(1, delta * 1.8);
    const time = clock.getElapsedTime();
    // Idle drift keeps the camera breathing even without a pointer
    const driftX = Math.sin(time * 0.12) * 1.6;
    const driftY = Math.sin(time * 0.23) * 0.45;
    camera.position.x += (pointer.x * 4.5 + driftX - camera.position.x) * t;
    camera.position.y += (7 + pointer.y * 1.8 + driftY - camera.position.y) * t;
    camera.lookAt(0, 6, -200);
  });
  return null;
}

/**
 * Drives rendering in `demand` mode: requests a frame per rAF while the
 * hero is on screen. Keeping the frameloop fixed avoids renderer state
 * glitches from toggling the prop at runtime.
 */
function FrameDriver({ active }: { active: boolean }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const loop = () => {
      invalidate();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active, invalidate]);
  return null;
}

/* ---------------------------------------------------------------- */
/* Entry                                                             */
/* ---------------------------------------------------------------- */

class SceneErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function HeroScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    setReady(true);

    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className={`absolute inset-0 transition-opacity duration-[1800ms] ease-out ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    >
      {ready && (
        <SceneErrorBoundary>
          <Canvas
            camera={{ position: [0, 7, 26], fov: 55, near: 0.1, far: 700 }}
            dpr={[1, 1.75]}
            gl={{
              antialias: false,
              powerPreference: "high-performance",
              alpha: true,
            }}
            frameloop="demand"
            style={{ background: "transparent" }}
            onCreated={({ camera }) => camera.lookAt(0, 6, -200)}
          >
            <FrameDriver active={inView} />
            <Terrain cols={isMobile ? 110 : 220} rows={isMobile ? 80 : 140} />
            <HorizonSun />
            <Dust count={isMobile ? 140 : 320} />
            <Rig />
          </Canvas>
        </SceneErrorBoundary>
      )}
    </div>
  );
}
