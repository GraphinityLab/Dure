import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "/icon.png";

const pages = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Faq", href: "/faq" },
  { name: "Contact", href: "/contact" },
  { name: "Book Now", href: "/book-now", isCTA: true },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const observer = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const sectionElements = document.querySelectorAll("section[id]");
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6,
    };

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    sectionElements.forEach((el) => observer.current.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  const isDark = () => ["hero", "gallery"].includes(activeSection) && !scrolled;

  const textColor = isDark() ? "text-white" : "text-[#3e2e3d]";
  const hoverColor = isDark() ? "hover:opacity-80" : "hover:text-[#5e4438]";

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-[#f5eee8]/90 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <motion.img
            src={logo}
            alt="Duré Logo"
            className="h-10 w-10"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <motion.span
            className={`text-2xl font-[Soligant] tracking-wide transition-colors ${textColor}`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Duré Aesthetics
          </motion.span>
        </a>

        {/* Desktop Navigation */}
        <nav className={`hidden md:flex gap-8 items-center text-sm uppercase font-medium ${textColor}`}>
          {pages.map(({ name, href, isCTA }) => (
            <a
              key={name}
              href={href}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${isCTA
                ? "border border-[#3e2e3d] bg-[#3e2e3d] text-white hover:bg-[#5e4438]"
                : hoverColor
              }`}
            >
              {name}
            </a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)} className={`transition-colors ${textColor}`}>
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            className="md:hidden bg-[#f5eee8] border-t border-[#e4d4ca] px-6 py-4 font-medium uppercase"
          >
            <div className="divide-y divide-[#e4d4ca]">
              {pages.map(({ name, href }) => (
                <a
                  key={name}
                  href={href}
                  className="block text-center text-[#5e4438] py-3 hover:text-[#3e2e3d] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
