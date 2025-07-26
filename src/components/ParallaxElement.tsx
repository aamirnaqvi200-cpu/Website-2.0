import { useEffect, useRef, useState, useCallback } from 'react';

interface ParallaxElementProps {
  children: React.ReactNode;
  speed?: 'slow' | 'medium' | 'fast';
  className?: string;
}

const ParallaxElement: React.FC<ParallaxElementProps> = ({
  children,
  speed = 'medium',
  className = ''
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef<number>();

  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(() => {
      setScrollY(window.scrollY);
    });
  }, []);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const throttledScroll = handleScroll;
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let multiplier = 0;
    switch (speed) {
      case 'slow':
        multiplier = -0.2;
        break;
      case 'medium':
        multiplier = -0.3;
        break;
      case 'fast':
        multiplier = -0.5;
        break;
    }

    const offset = scrollY * multiplier;
    element.style.transform = `translate3d(0, ${offset}px, 0)`;
  }, [scrollY, speed]);

  return (
    <div
      ref={elementRef}
      className={className}
      style={{ willChange: 'transform' }}
    >
      {children}
    </div>
  );
};

export default ParallaxElement;