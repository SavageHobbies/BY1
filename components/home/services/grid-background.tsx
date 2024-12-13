"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawGrid = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(0, 180, 216, 0.1)';
      ctx.lineWidth = 1;

      const gridSize = 50;
      const offset = performance.now() * 0.05;

      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const distanceToCenter = Math.sqrt(
            Math.pow(x - canvas.width / 2, 2) + Math.pow(y - canvas.height / 2, 2)
          );
          const wave = Math.sin(distanceToCenter * 0.01 + offset * 0.002) * 5;

          ctx.beginPath();
          ctx.arc(x + wave, y + wave, 1, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      requestAnimationFrame(drawGrid);
    };

    resizeCanvas();
    drawGrid();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 pointer-events-none"
    />
  );
}