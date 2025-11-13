import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Lazy load all pages for code splitting
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/ServicesPage"));
const Contact = lazy(() => import("./pages/Contact"));
const FaqPage = lazy(() => import("./pages/FaqPage"));
const Book = lazy(() => import("./pages/Book"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Iridescence = lazy(() => import("./components/Iridescence"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#f9f4ef]">
    <div className="w-16 h-16 border-4 border-[#e8dbc9] border-t-[#6b4b3e] rounded-full animate-spin" />
  </div>
);

function App() {
  const [loadIridescence, setLoadIridescence] = useState(false);

  // Defer Iridescence loading until after initial render for better LCP
  useEffect(() => {
    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        setLoadIridescence(true);
      }, { timeout: 2000 });
    } else {
      setTimeout(() => {
        setLoadIridescence(true);
      }, 100);
    }
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Global Iridescence Background - Lazy loaded and deferred for performance */}
      {loadIridescence && (
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          <Suspense fallback={null}>
            <Iridescence
              color={[0.88, 0.76, 0.50]}  // warm pastel beige-pink base
              amplitude={0.18}
              speed={0.25}
              mouseReact={true}
            />
          </Suspense>
        </div>
      )}

      {/* UI Layout */}
      <Navbar />
      <ScrollToTop />
      <main className="flex-grow relative w-full" style={{ backgroundColor: 'transparent' }}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book-now" element={<Book />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/faq/:category" element={<FaqPage />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
