import { useEffect, useRef } from 'react';

/**
 * Lightweight scroll animation hook using Intersection Observer
 * Replaces Framer Motion's scroll-triggered animations
 * 
 * Usage:
 * const ref = useScrollAnimation();
 * return <div ref={ref} className="animate-on-scroll">Content</div>;
 */
export const useScrollAnimation = (
  options: IntersectionObserverInit = {}
) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('in-view');
          element.classList.add('will-animate');
          
          // Remove will-change after animation completes
          setTimeout(() => {
            element.classList.add('animation-complete');
          }, 600); // Match animation duration
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options]);

  return ref;
};

/**
 * Hook for staggered children animations
 * Replaces Framer Motion's stagger animations
 */
export const useStaggeredAnimation = (
  delay: number = 100
) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const children = Array.from(element.children) as HTMLElement[];
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child, index) => {
            setTimeout(() => {
              child.style.opacity = '1';
              child.style.transform = 'translateY(0)';
            }, index * delay);
          });
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Initialize children styles
    children.forEach((child) => {
      child.style.opacity = '0';
      child.style.transform = 'translateY(30px)';
      child.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [delay]);

  return ref;
};