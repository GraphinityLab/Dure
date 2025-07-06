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

    const sections = document.querySelectorAll("section[id]");
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((el) => observer.current.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  const isDark = () => ["hero", "gallery"].includes(activeSection) && !scrolled;
  const textColor = isDark() ? "text-white" : "text-[#3e2e3d]";
  const hoverColor = isDark()
    ? "hover:opacity-80"
    : "hover:text-[#5e4438] transition-colors";

  const leftPages = pages.slice(0, 2);
  const rightPages = pages.slice(2);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-[#f5eee8]/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between relative">
        {/* Mobile Centered Logo */}
        <a
          href="/"
          className="md:hidden absolute left-1/2 -translate-x-1/2 flex items-center gap-1"
        >
          <img src={logo} alt="Duré Logo" className="h-8 w-8" />
          <span className="text-2xl font-[Soligant] text-white">Duré Aesthetics</span>
        </a>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden z-50">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`transition-colors ${textColor}`}
          >
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex w-full items-center justify-between">
          {/* Left Nav */}
          <div
            className={`flex gap-6 text-sm uppercase font-[CaviarDreams] ${textColor}`}
          >
            {leftPages.map(({ name, href }) => (
              <a key={name} href={href} className={hoverColor}>
                {name}
              </a>
            ))}
          </div>

          {/* Center Logo */}
          <a
            href="/"
            className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2 group"
          >
            <motion.span
              className={`text-2xl font-[Soligant] tracking-wide ${textColor}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Duré
            </motion.span>
            <motion.img
              src={logo}
              alt="Duré Logo"
              className="h-10 w-10"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
            <motion.span
              className={`text-2xl font-[Soligant] tracking-wide ${textColor}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Aesthetics
            </motion.span>
          </a>

          {/* Right Nav */}
          <div
            className={`flex gap-6 text-sm uppercase font-[CaviarDreams] ${textColor}`}
          >
            {rightPages.map(({ name, href, isCTA }) => (
              <a
                key={name}
                href={href}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  isCTA
                    ? "bg-[#5e4438] text-white border border-[#5e4438] hover:bg-[#3e2e3d]"
                    : hoverColor
                }`}
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            className="md:hidden bg-[#f5eee8] border-t border-[#e4d4ca] px-6 py-4 font-[CaviarDreams] uppercase"
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
