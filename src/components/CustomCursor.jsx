import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const CustomCursor = () => {
  const { currentTheme } = useTheme();
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cursorRef = useRef(null);
  const trailRef = useRef([]);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('hoverable')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('resize', checkMobile);
    };
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className='fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference'
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
            opacity: isHovering ? 0.8 : 1,
          }}
          transition={{ duration: 0.15 }}
          className='relative -translate-x-1/2 -translate-y-1/2'
        >
          {/* Outer ring */}
          <div
            className='w-10 h-10 rounded-full border-2 flex items-center justify-center'
            style={{
              borderColor: currentTheme.colors.primary,
              boxShadow: `0 0 20px ${currentTheme.glowColor}, 0 0 40px ${currentTheme.glowColor}`,
            }}
          >
            {/* Inner dot */}
            <motion.div
              animate={{
                scale: isHovering ? 1.5 : 1,
              }}
              className='w-2 h-2 rounded-full'
              style={{
                backgroundColor: currentTheme.colors.secondary,
                boxShadow: `0 0 10px ${currentTheme.colors.secondary}`,
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Cursor trail/glow effect */}
      <motion.div
        className='fixed top-0 left-0 pointer-events-none z-[9998]'
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 2.5 : 1.5,
            opacity: isHovering ? 0.3 : 0.15,
          }}
          transition={{ duration: 0.3 }}
          className='w-24 h-24 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl'
          style={{
            background: `radial-gradient(circle, ${currentTheme.colors.primary}40, transparent 70%)`,
          }}
        />
      </motion.div>

      {/* Hover spotlight effect */}
      {isHovering && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className='fixed top-0 left-0 pointer-events-none z-[9997]'
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
          }}
        >
          <div
            className='w-40 h-40 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-20'
            style={{
              background: `radial-gradient(circle, ${currentTheme.colors.accent}, transparent 60%)`,
            }}
          />
        </motion.div>
      )}

      {/* Global cursor style */}
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
