import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface TechIcon {
  name: string;
  path: Path2D;
  scale: number;
  offsetX?: number;
  offsetY?: number;
}

export const TechBackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // SVG paths representing common tech logos/symbols
    const icons: TechIcon[] = [
      {
        name: 'github',
        path: new Path2D(
          'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'
        ),
        scale: 1.5,
      },
      {
        name: 'code',
        path: new Path2D(
          'M8.47 4.22a.75.75 0 0 0 0 1.06L11.44 8l-2.97 2.72a.75.75 0 1 0 1.02 1.1l3.5-3.2a.75.75 0 0 0 0-1.06l-3.5-3.2a.75.75 0 0 0-1.02 0zm7.06 0a.75.75 0 0 1 1.02 0l3.5 3.2a.75.75 0 0 1 0 1.06l-3.5 3.2a.75.75 0 1 1-1.02-1.1L18.56 8l-2.97-2.72a.75.75 0 0 1 0-1.06z'
        ),
        scale: 2.0,
      },
      {
        name: 'brackets',
        path: new Path2D(
          'M10.25 4.5A2.25 2.25 0 0 0 8 6.75v1.898c0 .878-.453 1.694-1.196 2.14l-1.341.805a.75.75 0 0 0 0 1.285l1.341.805c.743.446 1.196 1.262 1.196 2.14v1.897a2.25 2.25 0 0 0 2.25 2.25h.5a.75.75 0 0 0 0-1.5h-.5a.75.75 0 0 1-.75-.75v-1.897c0-1.37-1.064-2.607-2.319-3.05l-.462-.164.462-.164c1.255-.443 2.319-1.68 2.319-3.05V6.75a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 0 0-1.5h-.5zm3.5 0a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 1 .75.75v1.898c0 1.37 1.064 2.607 2.319 3.05l.462.164-.462.164c-1.255.443-2.319 1.68-2.319 3.05v1.897a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 0 0 1.5h.5A2.25 2.25 0 0 0 16 17.75v-1.897c0-.878.453-1.694 1.196-2.14l1.341-.805a.75.75 0 0 0 0-1.285l-1.341-.805A2.493 2.493 0 0 1 16 8.648V6.75A2.25 2.25 0 0 0 13.75 4.5h-.5z'
        ),
        scale: 2.0,
      },
      {
        name: 'terminal',
        path: new Path2D(
          'M3.6 4.6a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L7.34 9.4 3.6 5.66a.75.75 0 0 1 0-1.06zM11 13.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75z'
        ),
        scale: 2.5,
      },
      {
        name: 'react',
        path: new Path2D(
          'M11.85 2c-1.63 0-3.16.27-4.48.74-1.31.46-2.4 1.12-3.17 1.95-.78.83-1.2 1.77-1.2 2.81s.42 1.98 1.2 2.81c.77.83 1.86 1.49 3.17 1.95 1.32.47 2.85.74 4.48.74s3.16-.27 4.48-.74c1.31-.46 2.4-1.12 3.17-1.95.78-.83 1.2-1.77 1.2-2.81s-.42-1.98-1.2-2.81c-.77-.83-1.86-1.49-3.17-1.95-1.32-.47-2.85-.74-4.48-.74zm0 1.5c1.45 0 2.76.22 3.86.61 1.1.39 1.96.93 2.49 1.5.53.57.8 1.18.8 1.89s-.27 1.32-.8 1.89c-.53.57-1.39 1.11-2.49 1.5-1.1.39-2.41.61-3.86.61s-2.76-.22-3.86-.61c-1.1-.39-1.96-.93-2.49-1.5-.53-.57-.8-1.18-.8-1.89s.27-1.32.8-1.89c.53-.57 1.39-1.11 2.49-1.5 1.1-.39 2.41-.61 3.86-.61z M5 8a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6.85-6c-1.63 0-3.16.27-4.48.74-1.31.46-2.4 1.12-3.17 1.95-.78.83-1.2 1.77-1.2 2.81s.42 1.98 1.2 2.81c.77.83 1.86 1.49 3.17 1.95 1.32.47 2.85.74 4.48.74s3.16-.27 4.48-.74c1.31-.46 2.4-1.12 3.17-1.95.78-.83 1.2-1.77 1.2-2.81s-.42-1.98-1.2-2.81c-.77-.83-1.86-1.49-3.17-1.95-1.32-.47-2.85-.74-4.48-.74zm0 1.5c1.45 0 2.76.22 3.86.61 1.1.39 1.96.93 2.49 1.5.53.57.8 1.18.8 1.89s-.27 1.32-.8 1.89c-.53.57-1.39 1.11-2.49 1.5-1.1.39-2.41.61-3.86.61s-2.76-.22-3.86-.61c-1.1-.39-1.96-.93-2.49-1.5-.53-.57-.8-1.18-.8-1.89s.27-1.32.8-1.89c.53-.57 1.39-1.11 2.49-1.5 1.1-.39 2.41-.61 3.86-.61z M15 14a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z M11.85 8a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z'
        ),
        scale: 1.2,
        offsetX: -12,
        offsetY: -8,
      },
      {
        name: 'database',
        path: new Path2D(
          'M12 2C7.58 2 4 3.79 4 6v12c0 2.21 3.58 4 8 4s8-1.79 8-4V6c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.3 6 2s-2.13 2-6 2-6-1.3-6-2 2.13-2 6-2zm0 16c-3.87 0-6-1.3-6-2v-2.14c1.55.77 3.65 1.14 6 1.14s4.45-.37 6-1.14V18c0 .7-2.13 2-6 2zm0-5c-3.87 0-6-1.3-6-2v-2.14c1.55.77 3.65 1.14 6 1.14s4.45-.37 6-1.14V13c0 .7-2.13 2-6 2zm0-5c-3.87 0-6-1.3-6-2V5.86c1.55.77 3.65 1.14 6 1.14s4.45-.37 6-1.14V8c0 .7-2.13 2-6 2z'
        ),
        scale: 1.5,
        offsetX: -12,
        offsetY: -12,
      },
    ];

    const config = {
      numParticles: 44,
      speedBase: 0.35,
      speedVariance: 0.7,
      sizeBase: 14,
      sizeVariance: 20,
      colors: isLight 
        ? ['#0f172a', '#334155', '#2563eb', '#16a34a', '#b45309', '#e11d48']
        : ['#ffffff', '#8b949e', '#58a6ff', '#3fb950', '#f0e68c', '#ff7b72'],
      rows: 6,
    };

    class Particle {
      iconTemplate!: TechIcon;
      direction!: number;
      size!: number;
      x!: number;
      y!: number;
      speed!: number;
      color!: string;
      opacity!: number;
      angle!: number;
      angularSpeed!: number;
      amplitude!: number;
      baseY!: number;

      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.iconTemplate = icons[Math.floor(Math.random() * icons.length)];
        const rowHeight = height / config.rows;
        const rowIndex = Math.floor(Math.random() * config.rows);

        // Even rows go right, odd go left
        this.direction = rowIndex % 2 === 0 ? 1 : -1;
        this.size = config.sizeBase + Math.random() * config.sizeVariance;

        // Position in row with subtle vertical variation
        this.y = rowIndex * rowHeight + rowHeight / 2 + (Math.random() * 40 - 20);

        if (initial) {
          this.x = Math.random() * width;
        } else {
          this.x = this.direction === 1 ? -this.size * 3 : width + this.size * 3;
        }

        this.speed = (config.speedBase + Math.random() * config.speedVariance) * this.direction;
        this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
        this.opacity = isLight 
          ? Math.random() * 0.18 + 0.08
          : Math.random() * 0.32 + 0.1;

        const parallaxFactor = this.size / (config.sizeBase + config.sizeVariance);
        this.speed *= 1 + parallaxFactor;
        this.opacity += parallaxFactor * (isLight ? 0.08 : 0.15);

        this.angle = Math.random() * Math.PI * 2;
        this.angularSpeed = 0.01 + Math.random() * 0.02;
        this.amplitude = 8 + Math.random() * 16;
        this.baseY = this.y;
      }

      update() {
        this.x += this.speed;
        this.angle += this.angularSpeed;
        this.y = this.baseY + Math.sin(this.angle) * this.amplitude;

        if (this.direction === 1 && this.x > width + this.size * 4) {
          this.reset();
          this.x = -this.size * 4;
        } else if (this.direction === -1 && this.x < -this.size * 4) {
          this.reset();
          this.x = width + this.size * 4;
        }
      }

      draw(drawCtx: CanvasRenderingContext2D) {
        drawCtx.save();
        drawCtx.translate(this.x, this.y);

        const finalScale = (this.size / 24) * this.iconTemplate.scale;
        drawCtx.scale(finalScale, finalScale);

        if (this.iconTemplate.offsetX || this.iconTemplate.offsetY) {
          drawCtx.translate(this.iconTemplate.offsetX || 0, this.iconTemplate.offsetY || 0);
        }

        drawCtx.globalAlpha = this.opacity;
        drawCtx.shadowBlur = isLight ? 3 : 8;
        drawCtx.shadowColor = isLight ? 'rgba(0,0,0,0.1)' : this.color;
        drawCtx.strokeStyle = this.color;
        drawCtx.fillStyle = this.color;
        drawCtx.lineWidth = 1.4;

        if (this.iconTemplate.name === 'github' || this.iconTemplate.name === 'database') {
          drawCtx.fill(this.iconTemplate.path);
        } else {
          drawCtx.stroke(this.iconTemplate.path);
        }

        drawCtx.restore();
      }
    }

    let particles: Particle[] = [];

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Re-initialize particles if empty
      if (particles.length === 0) {
        particles = [];
        for (let i = 0; i < config.numParticles; i++) {
          particles.push(new Particle());
        }
      }
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle horizontal track lines
      ctx.strokeStyle = isLight ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      const rowHeight = height / config.rows;
      for (let r = 1; r < config.rows; r++) {
        ctx.beginPath();
        ctx.moveTo(0, r * rowHeight);
        ctx.lineTo(width, r * rowHeight);
        ctx.stroke();
      }

      // Update and draw all particles
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [isLight]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Soft gradient vignettes so the text and portrait card remain razor-sharp with no distraction */}
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-950/20 to-neutral-950/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-transparent to-neutral-950 pointer-events-none" />
    </div>
  );
};
