import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "/icon.png";

const pages = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
  { name: "Book Now", href: "/book", isCTA: true },
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

  const isDarkBackground = () => {
    return ["hero", "gallery"].includes(activeSection); // customize per section background
  };

  const textColor = isDarkBackground() && !scrolled ? "text-white" : "text-[#3e2e3d]";
  const hoverColor = isDarkBackground() && !scrolled ? "hover:opacity-80" : "hover:text-[#5f4b5a]";

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-[#eae0df] backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo & Brand (Link to "/") */}
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
            className={`text-xl uppercase font-serif transition-colors ${textColor}`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Duré Aesthetics
          </motion.span>
        </a>

        {/* Desktop Navigation */}
        <nav className={`hidden md:flex gap-8 items-center text-sm uppercase font-normal tracking-wide ${textColor}`}>
          {pages.map(({ name, href, isCTA }) => (
            <a
              key={name}
              href={href}
              className={`px-4 py-2 rounded-full transition-colors duration-300 ${isCTA
                ? `${textColor} border ${textColor === "text-white" ? "border-white" : "border-[#3e2e3d]"} hover:bg-[#3e2e3d] hover:text-white`
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
            className="md:hidden bg-[#fdf6f6] border-t border-[#e6dede] px-6 py-4 font-normal uppercase"
          >
            <div className="divide-y divide-[#e6dede]">
              {pages.map(({ name, href }) => (
                <a
                  key={name}
                  href={href}
                  className="block text-center text-[#5f4b5a] py-3 hover:text-[#3e2e3d] transition-colors"
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
