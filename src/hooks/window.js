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
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        scrollY: window.scrollY, // Update scroll position
      });
    }

    function handleScroll() {
      setWindowSize((prev) => ({
        ...prev,
        scrollY: window.scrollY, // Update scroll position
      }));
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll); // Add scroll event listener

    if (typeof window !== "undefined") {
      handleResize(); // Call handleResize initially
      handleScroll(); // Call handleScroll initially
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll); // Remove scroll event listener on cleanup
    };
  }, []);

  return windowSize;
}
