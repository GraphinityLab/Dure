// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top immediately on every pathname change (page navigation)
    const scrollToTop = () => {
      // Use multiple methods for maximum compatibility
      window.scrollTo(0, 0);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
      });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Also handle smooth scroll wrapper (Lenis) if available
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      }
    };

    // Scroll immediately
    scrollToTop();

    // Also scroll after a microtask to handle lazy-loaded content
    // This ensures scroll happens even if components are still loading
    Promise.resolve().then(() => {
      scrollToTop();
    });

    // Additional scroll after a small delay for any remaining async content
    const timeoutId = setTimeout(() => {
      scrollToTop();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  // Also scroll on initial mount
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return null;
};

export default ScrollToTop;
