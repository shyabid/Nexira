import { useState, useEffect, useRef } from "react";

const CountUpNumber = ({ target, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const numberEl = elementRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (numberEl) {
      observer.observe(numberEl);
    }

    return () => {
      if (numberEl) {
        observer.unobserve(numberEl);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    // Parse target number (remove non-numeric characters except digits)
    const numericTarget = parseInt(target.toString().replace(/\D/g, "")) || 0;
    const increment = numericTarget / (duration / 16); // ~60fps

    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= numericTarget) {
        setCount(numericTarget);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(interval);
  }, [isVisible, target, duration]);

  return (
    <span ref={elementRef}>
      {count}
      {suffix}
    </span>
  );
};

export default CountUpNumber;
