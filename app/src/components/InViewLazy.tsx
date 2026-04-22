import { useState, useEffect, useRef, type ReactNode } from 'react';

interface InViewLazyProps {
  children: ReactNode;
  rootMargin?: string;
  threshold?: number | number[];
  minHeight?: string;
}

/**
 * A wrapper that only renders its children once it enters the viewport.
 * Useful for delaying the loading of heavy components (like Contact forms)
 * until the user scrolls near them.
 */
const InViewLazy = ({ 
  children, 
  rootMargin = '200px', 
  threshold = 0.01,
  minHeight = '100px'
}: InViewLazyProps) => {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div ref={containerRef} style={{ minHeight: isInView ? 'auto' : minHeight }}>
      {isInView ? children : null}
    </div>
  );
};

export default InViewLazy;
