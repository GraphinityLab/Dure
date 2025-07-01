// main.jsx or App.jsx
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const SmoothScrollWrapper = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      duration: 1.2,
      lerp: 0.1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Scroll to anchors smoothly
    const handleAnchorClick = (e) => {
      const href = e.target.getAttribute("href");
      if (href && href.startsWith("#")) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, { offset: -80 }); // adjust offset if needed
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach((anchor) =>
      anchor.addEventListener("click", handleAnchorClick)
    );

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) =>
        anchor.removeEventListener("click", handleAnchorClick)
      );
    };
  }, []);

  return children;
};

export default SmoothScrollWrapper;
