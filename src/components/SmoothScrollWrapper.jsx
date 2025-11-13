// main.jsx or App.jsx
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

const SmoothScrollWrapper = ({ children }) => {
  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);
  const anchorsRef = useRef([]);

  useEffect(() => {
    // Initialize Lenis
    lenisRef.current = new Lenis({
      smooth: true,
      duration: 1.2,
      lerp: 0.1,
    });

    let isRunning = true;

    // RAF loop with proper cleanup
    function raf(time) {
      if (lenisRef.current && isRunning) {
        lenisRef.current.raf(time);
        rafIdRef.current = requestAnimationFrame(raf);
      }
    }

    rafIdRef.current = requestAnimationFrame(raf);

    // Scroll to anchors smoothly
    const handleAnchorClick = (e) => {
      const href = e.target.getAttribute("href");
      if (href && href.startsWith("#")) {
        const target = document.querySelector(href);
        if (target && lenisRef.current) {
          e.preventDefault();
          lenisRef.current.scrollTo(target, { offset: -80 });
        }
      }
    };

    // Store anchor references for cleanup
    anchorsRef.current = Array.from(document.querySelectorAll('a[href^="#"]'));
    anchorsRef.current.forEach((anchor) =>
      anchor.addEventListener("click", handleAnchorClick)
    );

    // Cleanup function
    return () => {
      isRunning = false;
      
      // Cancel RAF
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      
      // Destroy Lenis instance
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      
      // Remove event listeners
      anchorsRef.current.forEach((anchor) =>
        anchor.removeEventListener("click", handleAnchorClick)
      );
      anchorsRef.current = [];
    };
  }, []);

  return children;
};

export default SmoothScrollWrapper;
