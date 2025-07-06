import React from "react";
import { FaInstagram, FaFacebookF, FaPinterestP } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#fdf6f6] border-t border-[#e6dede] text-[#5f4b5a] text-sm font-light">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 relative">

        {/* Subtle radial behind brand name */}
        <div className="absolute inset-0 pointer-events-none z-0 flex justify-start items-start">
          <div className="w-60 h-60 bg-[#e8e0de]/30 blur-3xl rounded-full -top-10 -left-10 absolute" />
        </div>

        {/* Brand Summary */}
        <div className="z-10">
          <h2 className="text-2xl font-[Soligant] text-[#3e2e3d] mb-4">Duré Aesthetics</h2>
          <p className="leading-relaxed text-[#5f4b5a]/90">
            Gentle aesthetics tailored to your natural beauty. Discover our calm, minimalist approach to skincare and self-care.
          </p>
        </div>

        {/* Navigation */}
        <div className="z-10">
          <h3 className="font-[CaviarDreams] mb-4 tracking-wide uppercase text-[#3e2e3d]">Quick Links</h3>
          <ul className="space-y-2 uppercase">
            {["About", "Services", "Gallery", "Contact", "book-now"].map((text, i) => {
              const href = `/${text.toLowerCase().replace(" ", "")}`;
              return (
                <li key={i}>
                  <a
                    href={href}
                    className="hover:text-[#3e2e3d] transition-colors duration-300"
                  >
                    {text}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Contact & Socials */}
        <div className="z-10">
          <h3 className="font-[CaviarDreams] mb-4 tracking-wide uppercase text-[#3e2e3d]">Contact</h3>
          <ul className="space-y-2">
            <li>
              Email:{" "}
              <a
                href="mailto:hello@dureaesthetics.com"
                className="hover:text-[#3e2e3d] transition-colors"
              >
                hello@dureaesthetics.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a
                href="tel:+11234567890"
                className="hover:text-[#3e2e3d] transition-colors"
              >
                +1 (123) 456-7890
              </a>
            </li>
            <li>Location: Toronto, ON</li>
          </ul>

          {/* Social Icons */}
          <div className="mt-6 flex space-x-4">
            {[FaInstagram, FaFacebookF, FaPinterestP].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="p-2 rounded-full border border-[#e6dede] hover:bg-[#3e2e3d] hover:text-white transition-all duration-300"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center border-t border-[#e6dede] py-6 text-xs text-[#998b95] tracking-wide uppercase">
        &copy; {new Date().getFullYear()} Duré Aesthetics. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
