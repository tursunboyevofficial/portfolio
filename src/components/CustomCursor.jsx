import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

// Particle class - outside component
class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = Math.random() * 2 + 1;
    this.vx = (Math.random() - 0.5) * 5;
    this.vy = (Math.random() - 0.5) * 5 - 1.5;
    this.alpha = 1;
    this.decay = Math.random() * 0.02 + 0.02;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.08; // gravity
    this.alpha -= this.decay;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  isDead() {
    return this.alpha <= 0;
  }
}

const CustomCursor = () => {
  const { currentTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const cursorRef = useRef(null);
  const glowRef = useRef(null);
  const particlesRef = useRef([]);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const mouseXRef = useRef(-100);
  const mouseYRef = useRef(-100);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    // Mobile check
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Setup canvas
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Ultra-fast mousemove - direct ref update, no state
    const moveCursor = (e) => {
      mouseXRef.current = e.clientX;
      mouseYRef.current = e.clientY;
    };

    // Hover detection with ref
    const handleMouseEnter = (e) => {
      const target = e.target;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('hoverable') ||
        target.classList.contains('interactive');

      if (isInteractive) {
        isHoveringRef.current = true;
        if (cursorRef.current) cursorRef.current.classList.add('hovering');
      }
    };

    const handleMouseLeave = () => {
      isHoveringRef.current = false;
      if (cursorRef.current) cursorRef.current.classList.remove('hovering');
    };

    // Main animation loop - cursor position update here
    const animate = () => {
      const mouseX = mouseXRef.current;
      const mouseY = mouseYRef.current;
      const isHovering = isHoveringRef.current;

      // Update cursor ring position immediately
      if (cursorRef.current) {
        cursorRef.current.style.left = mouseX + 'px';
        cursorRef.current.style.top = mouseY + 'px';
      }

      // Update glow position and opacity
      if (glowRef.current) {
        glowRef.current.style.left = mouseX + 'px';
        glowRef.current.style.top = mouseY + 'px';
        glowRef.current.style.opacity = isHovering ? '0.4' : '0.15';
      }

      // Create particles
      if (Math.random() > 0.5 && mouseX > 0) {
        const color = isHovering 
          ? currentTheme.colors.accent 
          : currentTheme.colors.primary;
        particlesRef.current.push(
          new Particle(mouseX, mouseY, color)
        );
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(
        (particle) => !particle.isDead()
      );

      particlesRef.current.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Event listeners - minimal
    window.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mouseover', handleMouseEnter, { 
      passive: true, 
      capture: true 
    });
    document.addEventListener('mouseout', handleMouseLeave, { 
      passive: true, 
      capture: true 
    });

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Start animation loop
    animate();

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', checkMobile);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [currentTheme]);

  if (isMobile) return null;

  return (
    <>
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className='fixed top-0 left-0 pointer-events-none z-[9998]'
        style={{ display: 'block' }}
      />

      {/* Cursor ring */}
      <div
        ref={cursorRef}
        className='fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75'
        style={{
          width: '40px',
          height: '40px',
          border: `2px solid ${currentTheme.colors.primary}`,
          borderRadius: '50%',
          left: '-100px',
          top: '-100px',
          boxShadow: `0 0 15px ${currentTheme.glowColor}, inset 0 0 10px ${currentTheme.glowColor}20`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Inner dot */}
        <div
          style={{
            width: '8px',
            height: '8px',
            backgroundColor: currentTheme.colors.secondary,
            borderRadius: '50%',
            boxShadow: `0 0 8px ${currentTheme.colors.secondary}, 0 0 15px ${currentTheme.colors.secondary}50`,
            transition: 'all 0.2s ease',
          }}
          className='scale-100 group-hover:scale-125'
        />
      </div>

      {/* Glow background effect */}
      <div
        ref={glowRef}
        className='fixed pointer-events-none z-[9997] -translate-x-1/2 -translate-y-1/2'
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          left: '-100px',
          top: '-100px',
          background: `radial-gradient(circle, ${currentTheme.colors.primary}30, transparent 70%)`,
          filter: 'blur(15px)',
          opacity: 0.15,
          pointerEvents: 'none',
        }}
      />

      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }

        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
