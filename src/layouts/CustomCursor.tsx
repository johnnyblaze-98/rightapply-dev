import { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const points = useRef<{ x: number; y: number }[]>([]);
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Constants for professional feel
  const MAX_POINTS = 12; // Length of the trail
  const SMOOTHNESS = 0.45; // Fluidity factor

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouse.current = { x: clientX, y: clientY };

      if (dotRef.current && outlineRef.current) {
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
        outlineRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }
    };

    // Initialize points
    for (let i = 0; i < MAX_POINTS; i++) {
      points.current.push({ x: 0, y: 0 });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update points sequence (each point follows the one before it)
      let head = points.current[0];
      head.x += (mouse.current.x - head.x) * SMOOTHNESS;
      head.y += (mouse.current.y - head.y) * SMOOTHNESS;

      for (let i = 1; i < MAX_POINTS; i++) {
        const p = points.current[i];
        const prev = points.current[i - 1];
        p.x += (prev.x - p.x) * SMOOTHNESS;
        p.y += (prev.y - p.y) * SMOOTHNESS;
      }

      // Draw the fluid trail
      if (!isHidden) {
        ctx.beginPath();
        ctx.moveTo(points.current[0].x, points.current[0].y);

        for (let i = 1; i < MAX_POINTS - 1; i++) {
          const xc = (points.current[i].x + points.current[i + 1].x) / 2;
          const yc = (points.current[i].y + points.current[i + 1].y) / 2;
          ctx.quadraticCurveTo(points.current[i].x, points.current[i].y, xc, yc);
        }

        // Professional styling: thin, glowing, gradient line
        const gradient = ctx.createLinearGradient(
          points.current[MAX_POINTS - 1].x, points.current[MAX_POINTS - 1].y,
          points.current[0].x, points.current[0].y
        );
        gradient.addColorStop(0, 'rgba(99, 102, 241, 0)'); // Fade out (Indigo)
        gradient.addColorStop(0.5, 'rgba(20, 184, 166, 0.2)'); // Subtle mid (Teal)
        gradient.addColorStop(1, 'rgba(20, 184, 166, 0.4)'); // Stronger head

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Subtle outer glow
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(20, 184, 166, 0.3)';

        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const onMouseEnter = () => setIsHidden(false);
    const onMouseLeave = () => setIsHidden(true);
    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll('a, button, input, textarea, .hover-lift-modern, select');
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    resizeCanvas();
    animate();
    addHoverListeners();
    const interval = setInterval(addHoverListeners, 2000);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animationFrameId);
      clearInterval(interval);
    };
  }, [isHidden]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998] opacity-60"
      />
      <div
        ref={dotRef}
        className={`cursor-dot-new ${isHidden ? 'opacity-0' : 'opacity-100'} ${isHovering ? 'scale-[2] bg-teal-500' : 'scale-100'} ${isClicking ? 'scale-75' : ''}`}
      />
      <div
        ref={outlineRef}
        className={`cursor-outline-new ${isHidden ? 'opacity-0' : 'opacity-100'} ${isHovering ? 'scale-[2.5] border-teal-500 bg-teal-500/5' : 'scale-100 border-teal-500/20'} ${isClicking ? 'scale-90' : ''}`}
      />
      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 768px) {
          canvas, .cursor-dot-new, .cursor-outline-new {
            display: none !important;
          }
        }

        .cursor-dot-new {
          width: 4px;
          height: 4px;
          background: #14b8a6;
          border-radius: 50%;
          position: fixed;
          top: -2px;
          left: -2px;
          pointer-events: none;
          z-index: 10000;
          transition: opacity 0.3s ease, background 0.3s ease, transform 0.2s ease;
          box-shadow: 0 0 10px rgba(20, 184, 166, 0.5);
        }

        .cursor-outline-new {
          width: 40px;
          height: 40px;
          border: 1px solid rgba(20, 184, 166, 0.2);
          border-radius: 50%;
          position: fixed;
          top: -20px;
          left: -20px;
          pointer-events: none;
          z-index: 9999;
          transition: transform 0.25s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s ease, border-color 0.3s ease;
        }
      `}} />
    </>
  );
};

export default CustomCursor;