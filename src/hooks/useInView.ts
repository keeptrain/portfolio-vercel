import { useEffect, useRef, useState } from "react";

interface UseInViewOptions extends IntersectionObserverInit {
  once?: boolean;
}

export function useInView(options: UseInViewOptions = {}) {
  const { once = true, ...observerOptions } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (once) observer.disconnect();
      } else if (!once) {
        setIsInView(false);
      }
    }, observerOptions);

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, observerOptions.rootMargin, observerOptions.threshold]);

  return { ref, isInView };
}