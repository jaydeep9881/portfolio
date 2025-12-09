import { useEffect, useRef } from 'react';

type Theme = 'light' | 'dark';

type Star = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  twinklePhase: number;
};

const BASE_DENSITY = 0.18; // stars per 1000 px^2
const SPEED_MULTIPLIER = 0.08;
const TWINKLE_RATE = 0.0025;

class UniverseEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private stars: Star[] = [];
  private theme: Theme;
  private reduceMotion: boolean;
  private running = false;
  private dpr = Math.min(window.devicePixelRatio || 1, 2);
  private frame: number | null = null;
  private mouse = { x: 0, y: 0, active: false };
  private density = BASE_DENSITY;
  private speed = SPEED_MULTIPLIER;

  constructor(canvas: HTMLCanvasElement, theme: Theme) {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context not available');
    this.canvas = canvas;
    this.ctx = ctx;
    this.theme = theme;
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  init() {
    this.applyTheme(this.theme);
    this.resize();
    this.createStars();
    this.running = true;
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('pointermove', this.handlePointerMove, { passive: true });
    if (this.reduceMotion) {
      this.render();
    } else {
      this.animate();
    }
  }

  destroy() {
    this.running = false;
    if (this.frame) cancelAnimationFrame(this.frame);
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('pointermove', this.handlePointerMove);
  }

  applyTheme(theme: Theme) {
    this.theme = theme;
    this.createStars();
    if (!this.reduceMotion) this.render();
  }

  toggleTheme() {
    this.applyTheme(this.theme === 'dark' ? 'light' : 'dark');
  }

  setReduceMotion(flag: boolean) {
    this.reduceMotion = flag;
    if (this.reduceMotion) {
      if (this.frame) cancelAnimationFrame(this.frame);
      this.render();
    } else {
      this.animate();
    }
  }

  resize = () => {
    const { innerWidth: w, innerHeight: h } = window;
    this.canvas.width = w * this.dpr;
    this.canvas.height = h * this.dpr;
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.createStars();
    console.info('UniverseBackground resize', { w, h, dpr: this.dpr });
  };

  createStars() {
    const area = (window.innerWidth * window.innerHeight) / 1000;
    const count = Math.max(80, Math.floor(area * this.density));
    this.stars = Array.from({ length: count }, () => this.makeStar());
  }

  private makeStar(): Star {
    const darkMode = this.theme === 'dark';
    const palette = darkMode
      ? ['rgba(255,180,255,0.9)','rgba(160,200,255,0.9)','rgba(120,220,255,0.9)','rgba(200,160,255,0.9)','rgba(255,255,255,0.9)']
      : ['rgba(0,0,0,0.85)'];
    const r = darkMode ? Math.random() * 1.4 + 0.4 : Math.random() * 1.0 + 0.3;
    const speed = (Math.random() * 0.6 + 0.4) * this.speed * (darkMode ? 1 : 0.8);
    const dir = Math.random() * Math.PI * 2;
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r,
      vx: Math.cos(dir) * speed,
      vy: Math.sin(dir) * speed,
      alpha: Math.random() * 0.6 + 0.4,
      color: palette[Math.floor(Math.random() * palette.length)],
      twinklePhase: Math.random() * Math.PI * 2,
    };
  }

  private handlePointerMove = (e: PointerEvent) => {
    const { innerWidth: w, innerHeight: h } = window;
    this.mouse.x = (e.clientX / w - 0.5) * 8;
    this.mouse.y = (e.clientY / h - 0.5) * 8;
    this.mouse.active = true;
  };

  private handleResize = () => {
    this.resize();
  };

  render() {
    const ctx = this.ctx;
    const w = window.innerWidth;
    const h = window.innerHeight;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = this.theme === 'dark' ? '#05070a' : '#f7f7fb';
    ctx.fillRect(0, 0, w, h);

    // background glows for dark mode
    if (this.theme === 'dark') {
      const g1 = ctx.createRadialGradient(w * 0.2, h * 0.2, 0, w * 0.2, h * 0.2, Math.max(w, h) * 0.8);
      g1.addColorStop(0, 'rgba(120,80,255,0.12)');
      g1.addColorStop(1, 'rgba(120,80,255,0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);
      const g2 = ctx.createRadialGradient(w * 0.8, h * 0.1, 0, w * 0.8, h * 0.1, Math.max(w, h) * 0.7);
      g2.addColorStop(0, 'rgba(0,200,255,0.10)');
      g2.addColorStop(1, 'rgba(0,200,255,0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);
    }

    for (const s of this.stars) {
      const twinkle = 0.5 + 0.5 * Math.sin(s.twinklePhase);
      const alpha = this.reduceMotion ? s.alpha : s.alpha * (0.6 + twinkle * 0.8);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = s.color;
      const mx = this.mouse.active ? this.mouse.x * 0.5 : 0;
      const my = this.mouse.active ? this.mouse.y * 0.5 : 0;
      ctx.beginPath();
      ctx.arc(s.x + mx, s.y + my, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  private update() {
    if (this.reduceMotion) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    for (const s of this.stars) {
      s.x += s.vx;
      s.y += s.vy;
      s.twinklePhase += TWINKLE_RATE * 60;
      if (s.x < -5) s.x = w + 5;
      if (s.x > w + 5) s.x = -5;
      if (s.y < -5) s.y = h + 5;
      if (s.y > h + 5) s.y = -5;
    }
  }

  animate() {
    if (!this.running) return;
    const step = () => {
      this.update();
      this.render();
      this.frame = requestAnimationFrame(step);
    };
    this.frame = requestAnimationFrame(step);
  }
}

type Props = { theme: Theme };

export default function UniverseBackground({ theme }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<UniverseEngine | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    try {
      engineRef.current = new UniverseEngine(canvas, theme);
      engineRef.current.init();
    } catch (e) {
      console.warn('Universe background disabled:', e);
    }
    return () => {
      engineRef.current?.destroy();
      engineRef.current = null;
    };
  }, []);

  useEffect(() => {
    engineRef.current?.applyTheme(theme);
  }, [theme]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        background: theme === 'dark'
          ? 'radial-gradient(120% 120% at 20% 20%, rgba(120,80,255,0.08), transparent), radial-gradient(90% 90% at 80% 10%, rgba(0,200,255,0.08), transparent), radial-gradient(110% 110% at 30% 80%, rgba(255,80,200,0.06), transparent), #05070a'
          : '#f7f7fb',
      }}
    />
  );
}

