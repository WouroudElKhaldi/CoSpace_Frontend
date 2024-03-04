"use client";
import { useState, useEffect } from "react";

// Hook
export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
    scrollY: undefined, // New state for scroll position
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
          scrollY: window.scrollY,
        });
      }

      function handleScroll() {
        setWindowSize((prev) => ({
          ...prev,
          scrollY: window.scrollY,
        }));
      }

      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", handleScroll);

      handleResize();
      handleScroll();

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return windowSize;
}
