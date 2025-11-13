import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import DureText from "./DureText";
import { 
  FaInstagram, 
  FaFacebookF, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaClock,
  FaArrowRight,
  FaHeart
} from "react-icons/fa";

const Footer = () => {

  const quickLinks = [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
    { name: "Book Now", href: "/book-now" },
  ];

  const socialLinks = [
    { 
      icon: FaInstagram, 
      href: "https://instagram.com/dureaesthetics", 
      label: "Instagram",
      color: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600"
    },
    { 
      icon: FaFacebookF, 
      href: "https://facebook.com/dureaesthetics", 
      label: "Facebook",
      color: "hover:bg-blue-600"
    },
  ];

  const contactInfo = [
    {
      icon: FaEnvelope,
      text: "hello@dureaesthetics.com",
      href: "mailto:hello@dureaesthetics.com",
    },
    {
      icon: FaPhone,
      text: "+1 (123) 456-7890",
      href: "tel:+11234567890",
    },
    {
      icon: FaMapMarkerAlt,
      text: "Toronto, ON",
      href: "#",
    },
  ];

  const operatingHours = [
    { day: "Monday - Friday", time: "9:00 AM - 7:00 PM" },
    { day: "Saturday", time: "10:00 AM - 6:00 PM" },
    { day: "Sunday", time: "Closed" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#fdfaf7] via-[#f9f4ef] to-[#f5f0eb] border-t border-[#e6dede]/50 text-[#5f4b5a] overflow-hidden">
      {/* Premium Background Layers */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply bg-[url('/bg-texture.png')] bg-cover bg-center" />
      
      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute top-0 left-0 w-96 h-96 bg-[#e8dbc9]/8 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#d8c7b7]/8 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand Section - Enhanced */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-[Soligant] text-[#3e2e3d] mb-4 bg-gradient-to-r from-[#3e2e3d] to-[#5f4b5a] bg-clip-text text-transparent">
                <DureText suffix=" Aesthetics" />
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#6b4b3e] to-transparent mb-4" />
            </motion.div>
            <p className="leading-relaxed text-[#5f4b5a] mb-6 text-sm md:text-base">
              Gentle aesthetics tailored to your natural beauty. Discover our calm, minimalist approach to skincare and self-care.
            </p>
            
            {/* Social Media - Premium */}
            <div className="flex gap-3">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`group relative p-3 rounded-full bg-white/80 backdrop-blur-sm border border-[#e6dede] text-[#5f4b5a] ${social.color} hover:text-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-lg`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                >
                  <social.icon size={16} className="relative z-10" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#e8dbc9]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-[CaviarDreams] mb-6 tracking-wide uppercase text-[#3e2e3d] text-sm font-semibold flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-[#6b4b3e] to-transparent" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <Link
                    to={link.href}
                    className="group flex items-center gap-2 text-[#5f4b5a] hover:text-[#3e2e3d] transition-all duration-300 text-sm"
                  >
                    <motion.span
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                      whileHover={{ x: 4 }}
                    >
                      <FaArrowRight size={10} />
                    </motion.span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info - Premium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-[CaviarDreams] mb-6 tracking-wide uppercase text-[#3e2e3d] text-sm font-semibold flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-[#6b4b3e] to-transparent" />
              Contact
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((info, idx) => (
                <motion.li
                  key={idx}
                  className="group"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                >
                  <a
                    href={info.href}
                    className="flex items-start gap-3 text-[#5f4b5a] hover:text-[#3e2e3d] transition-colors duration-300 group"
                  >
                    <div className="p-2 rounded-lg bg-white/60 backdrop-blur-sm border border-[#e6dede]/50 group-hover:bg-[#e8dbc9]/20 group-hover:border-[#6b4b3e]/30 transition-all duration-300 mt-0.5">
                      <info.icon size={14} className="text-[#6b4b3e]" />
                    </div>
                    <span className="text-sm leading-relaxed pt-1">{info.text}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Operating Hours & Newsletter - Premium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-[CaviarDreams] mb-6 tracking-wide uppercase text-[#3e2e3d] text-sm font-semibold flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-[#6b4b3e] to-transparent" />
              Hours
            </h3>
            <ul className="space-y-3 mb-8">
              {operatingHours.map((schedule, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-center gap-2 text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                >
                  <FaClock size={12} className="text-[#6b4b3e] flex-shrink-0" />
                  <div className="flex-1">
                    <span className="text-[#3e2e3d] font-medium">{schedule.day}</span>
                    <span className="text-[#5f4b5a] ml-2">{schedule.time}</span>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar - Enhanced */}
        <motion.div
          className="border-t border-[#e6dede]/50 pt-8 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#998b95]">
            <div className="flex items-center gap-2">
              <span>&copy; {new Date().getFullYear()} <DureText suffix=" Aesthetics" />.</span>
              <span className="hidden sm:inline">All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="hover:text-[#3e2e3d] transition-colors">
                Privacy Policy
              </Link>
              <span className="text-[#e6dede]">|</span>
              <Link to="/terms" className="hover:text-[#3e2e3d] transition-colors">
                Terms of Service
              </Link>
            </div>
            <div className="flex items-center gap-1 text-[#998b95]">
              <span>Made with</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              >
                <FaHeart className="text-red-400" size={10} />
              </motion.span>
              <span>by</span>
              <motion.a
                href="https://graphinitylab.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3e2e3d] hover:text-[#6b4b3e] font-medium transition-colors duration-300 relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Graphinity Lab</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#6b4b3e] to-[#8b6f5e] group-hover:w-full transition-all duration-300" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
