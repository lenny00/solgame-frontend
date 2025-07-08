import React, { useEffect, useRef } from 'react';

const ParticleSystem: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      shape: 'triangle' | 'square' | 'circle';
      color: string;
      rotation: number;
      rotationSpeed: number;
      lineWidth: number;
    }> = [];

    // Squid Game + Tron Game inspired colors - vibrant mix
    const colors = ['#ef4444', '#eab308', '#22c55e', '#8b5cf6', '#ec4899'];
    const shapes = ['triangle', 'square', 'circle'] as const;

    // Reduced particles from 150 to 105 (30% reduction) for better readability
    for (let i = 0; i < 105; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 15 + 8,
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: (Math.random() - 0.5) * 1.5,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
        lineWidth: Math.random() * 2 + 2
      });
    }

    const drawTriangleOutline = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, lineWidth: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(-size * 0.866, size * 0.5);
      ctx.lineTo(size * 0.866, size * 0.5);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    };

    const drawSquareOutline = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, lineWidth: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.lineWidth = lineWidth;
      ctx.strokeRect(-size / 2, -size / 2, size, size);
      ctx.restore();
    };

    const drawCircleOutline = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, lineWidth: number) => {
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      ctx.arc(x, y, size / 2, 0, Math.PI * 2);
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        // Update position with floating motion
        particle.x += particle.speedX;
        particle.y += particle.speedY + Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.5;
        particle.rotation += particle.rotationSpeed;

        // Wrap around screen
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;

        // Set stroke color with varying opacity for depth effect
        const opacity = Math.sin(Date.now() * 0.002 + particle.x * 0.01) * 0.4 + 0.6;
        const alpha = Math.floor(opacity * 255).toString(16).padStart(2, '0');
        ctx.strokeStyle = particle.color + alpha;

        // Draw outline shape only
        switch (particle.shape) {
          case 'triangle':
            drawTriangleOutline(ctx, particle.x, particle.y, particle.size, particle.rotation, particle.lineWidth);
            break;
          case 'square':
            drawSquareOutline(ctx, particle.x, particle.y, particle.size, particle.rotation, particle.lineWidth);
            break;
          case 'circle':
            drawCircleOutline(ctx, particle.x, particle.y, particle.size, particle.lineWidth);
            break;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

export default ParticleSystem;