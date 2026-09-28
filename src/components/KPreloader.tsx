import React, { useEffect, useRef } from 'react';

interface KPreloaderProps {
  size?: number;
  className?: string;
  isDarkMode?: boolean;
}

export const KPreloader: React.FC<KPreloaderProps> = ({
  size = 72,
  className = '',
  isDarkMode = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let startTime: number | null = null;

    const leftStemPath = [
      { x: 20, y: 10 },
      { x: 35, y: 10 },
      { x: 35, y: 90 },
      { x: 20, y: 90 },
    ];
    const topArmPath = [
      { x: 40, y: 55 },
      { x: 80, y: 10 },
      { x: 95, y: 10 },
      { x: 40, y: 70 },
    ];
    const bottomArmPath = [
      { x: 40, y: 65 },
      { x: 75, y: 95 },
      { x: 90, y: 95 },
      { x: 40, y: 50 },
    ];

    const circuitLines = [
      [
        { x: 25, y: 20 },
        { x: 25, y: 40 },
        { x: 30, y: 45 },
        { x: 30, y: 70 },
      ],
      [
        { x: 25, y: 75 },
        { x: 30, y: 80 },
        { x: 30, y: 85 },
      ],
      [
        { x: 30, y: 15 },
        { x: 30, y: 30 },
      ],
      [
        { x: 50, y: 50 },
        { x: 85, y: 15 },
      ],
      [
        { x: 50, y: 70 },
        { x: 75, y: 90 },
      ],
    ];

    const dots = [
      { x: 25, y: 20 },
      { x: 30, y: 70 },
      { x: 25, y: 75 },
      { x: 85, y: 15 },
      { x: 50, y: 70 },
    ];

    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const logicalWidth = size;
    const logicalHeight = size;

    const mapX = (x: number) => (x / 100) * logicalWidth;
    const mapY = (y: number) => (y / 100) * logicalHeight;

    const lineColor = isDarkMode ? '#a3a3a3' : '#64748b';
    const glowColor = isDarkMode ? 'rgba(255, 255, 255, 0.25)' : 'rgba(100, 116, 139, 0.3)';

    function drawPath(
      pathData: { x: number; y: number }[],
      pathProgress: number,
      lineWidth: number,
      strokeStyle: string,
      isClosed = false
    ) {
      if (!ctx || pathData.length < 2 || pathProgress <= 0) return;
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = strokeStyle;
      ctx.beginPath();
      ctx.moveTo(mapX(pathData[0].x), mapY(pathData[0].y));

      const totalSegments = pathData.length - (isClosed ? 0 : 1);
      let currentDistance = 0;
      let totalLength = 0;
      const segmentLengths: number[] = [];

      for (let i = 0; i < totalSegments; i++) {
        const p1 = pathData[i];
        const p2 = pathData[(i + 1) % pathData.length];
        const dist = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
        totalLength += dist;
        segmentLengths.push(dist);
      }

      const targetDistance = totalLength * pathProgress;
      for (let i = 0; i < totalSegments; i++) {
        const p1 = pathData[i];
        const p2 = pathData[(i + 1) % pathData.length];
        const segLen = segmentLengths[i];
        if (currentDistance + segLen <= targetDistance) {
          ctx.lineTo(mapX(p2.x), mapY(p2.y));
          currentDistance += segLen;
        } else {
          const ratio = (targetDistance - currentDistance) / segLen;
          ctx.lineTo(mapX(p1.x + (p2.x - p1.x) * ratio), mapY(p1.y + (p2.y - p1.y) * ratio));
          break;
        }
      }
      if (isClosed && pathProgress >= 1) ctx.closePath();
      ctx.stroke();
    }

    function animate(timestamp: number) {
      if (!ctx) return;
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const animationDuration = 2000;
      const loopDuration = animationDuration * 1.5;
      const currentLoopTime = elapsed % loopDuration;

      const progress =
        currentLoopTime < animationDuration
          ? 1 - Math.pow(1 - currentLoopTime / animationDuration, 3)
          : 1;
      const globalAlpha =
        currentLoopTime > animationDuration * 1.2
          ? 1 -
            (currentLoopTime - animationDuration * 1.2) /
              (loopDuration - animationDuration * 1.2)
          : 1;

      ctx.clearRect(0, 0, logicalWidth, logicalHeight);
      ctx.globalAlpha = Math.max(0, Math.min(1, globalAlpha));

      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.shadowBlur = isDarkMode ? 5 : 0;
      ctx.shadowColor = isDarkMode ? glowColor : 'transparent';

      const outlineProgress = Math.min(1, progress * 1.5);
      if (outlineProgress > 0.3) {
        ctx.fillStyle = isDarkMode ? 'rgba(30, 30, 30, 0.85)' : 'rgba(220, 220, 220, 0.5)';
        ctx.shadowBlur = 0;
        [leftStemPath, topArmPath, bottomArmPath].forEach((path) => {
          ctx.beginPath();
          ctx.moveTo(mapX(path[0].x), mapY(path[0].y));
          for (let i = 1; i < path.length; i++) ctx.lineTo(mapX(path[i].x), mapY(path[i].y));
          ctx.closePath();
          ctx.fill();
        });
        if (isDarkMode) ctx.shadowBlur = 5;
      }

      drawPath(leftStemPath, outlineProgress, 2, lineColor, true);
      drawPath(topArmPath, outlineProgress, 2, lineColor, true);
      drawPath(bottomArmPath, outlineProgress, 2, lineColor, true);

      circuitLines.forEach((line, index) => {
        drawPath(
          line,
          Math.max(0, Math.min(1, (progress - 0.2 - index * 0.1) * 1.5)),
          1,
          lineColor,
          false
        );
      });

      const dotProgress = Math.max(0, Math.min(1, (progress - 0.6) * 2));
      if (dotProgress > 0) {
        ctx.fillStyle = isDarkMode ? '#ffffff' : lineColor;
        ctx.strokeStyle = isDarkMode ? lineColor : '#ffffff';
        ctx.lineWidth = 1;
        dots.forEach((dot) => {
          ctx.beginPath();
          ctx.arc(mapX(dot.x), mapY(dot.y), 1.5 * dotProgress, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        });
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    }

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [size, isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
      className={`select-none pointer-events-none ${className}`}
    />
  );
};
