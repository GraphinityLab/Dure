import React from "react";
import { motion } from "framer-motion";
import { FaSpa, FaSun, FaFeatherAlt, FaLeaf, FaCameraRetro, FaSnowflake } from "react-icons/fa";
import { FaScissors } from "react-icons/fa6";
import { GiFingernail } from "react-icons/gi";
import { Link } from "react-router-dom";

const previewServices = [
  {
    title: "Facials",
    description: "Glow, Anti-Aging, Microneedling & more.",
    icon: <FaLeaf size={28} />,
  },
  {
    title: "Massage Therapy",
    description: "Relaxation, Deep Tissue & Aromatherapy.",
    icon: <FaSpa size={28} />,
  },
  {
    title: "Nails",
    description: "Manicures, Pedicures, Nail Art & Extensions.",
    icon: <GiFingernail size={28} />,
  },
  {
    title: "Makeup",
    description: "Bridal, Event & Photoshoot Ready Looks.",
    icon: <FaSnowflake size={28} />,
  },
  {
    title: "Hair Removal",
    description: "Waxing, Threading & Laser Solutions.",
    icon: <FaFeatherAlt size={28} />,
  },
  {
    title: "Hairstyling",
    description: "Blowouts, Braids & Bridal Hair.",
    icon: <FaScissors size={28} />,
  },
];

const Services = () => {
  return (
    <section id="services" className="relative py-24 px-6 bg-gradient-to-b from-transparent to-[#fdf6f6]/60 text-[#3e2e3d] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-[Soligant] mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What We Offer
        </motion.h2>

        <motion.p
          className="max-w-2xl mx-auto text-base md:text-lg text-[#5f4b5a] mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          A glimpse into our most popular beauty and wellness services.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {previewServices.map((s, idx) => (
            <motion.div
              key={idx}
              className="bg-white/90 border border-[#e6dede] rounded-xl p-6 shadow-sm hover:shadow-md hover:scale-[1.03] transition-all cursor-default"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <div className="text-[#6f5c6b] mb-4">{s.icon}</div>
              <h3 className="text-lg font-semibold mb-1">{s.title}</h3>
              <p className="text-sm text-[#5f4b5a]">{s.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            to="/services"
            className="inline-block px-6 py-3 bg-[#3e2e3d] text-white rounded-full text-sm tracking-wide hover:bg-[#5f4b5a] transition"
          >
            View Full Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
