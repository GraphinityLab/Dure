import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSpa, FaUserMd, FaSun, FaFeatherAlt, FaHandHoldingHeart, FaLeaf } from "react-icons/fa";

const services = [
  {
    title: "Facial Treatments",
    description: "Rejuvenating facials tailored to your skin type using high-quality, gentle products.",
    icon: <FaLeaf size={32} />,
    detail: "We offer hydrating, anti-aging, and detox facials using premium botanical formulas for visible results."
  },
  {
    title: "Body Massage",
    description: "Relaxing and therapeutic massages designed to release tension and promote wellness.",
    icon: <FaSpa size={32} />,
    detail: "Choose from Swedish, deep tissue, or hot stone therapy to relieve muscle tension and promote blood flow."
  },
  {
    title: "Skin Therapy",
    description: "Targeted treatments for acne, dryness, or uneven tone — personalized to your needs.",
    icon: <FaSun size={32} />,
    detail: "From chemical peels to hydration boosters, our licensed team uses safe and effective techniques."
  },
  {
    title: "Waxing & Hair Removal",
    description: "Smooth, professional waxing services with minimal discomfort and long-lasting results.",
    icon: <FaFeatherAlt size={32} />,
    detail: "We use hypoallergenic wax and soothing aftercare to ensure a clean, smooth finish every time."
  },
  {
    title: "Aesthetic Consultations",
    description: "Meet 1-on-1 with our experts to plan your custom beauty and wellness routine.",
    icon: <FaUserMd size={32} />,
    detail: "Book a consult to evaluate your skin goals, ask questions, and receive personalized care plans."
  },
  {
    title: "Healing Rituals",
    description: "Holistic treatments combining touch, scent, and sound to calm body and mind.",
    icon: <FaHandHoldingHeart size={32} />,
    detail: "Our signature rituals include aromatherapy, warm towels, and mindfulness techniques."
  },
];

const Services = () => {
  const [active, setActive] = useState(null);

  return (
    <section id="services" className="relative py-24 px-6 bg-gradient-to-b from-transparent to-[#fdf6f6] text-[#3e2e3d] overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-serif mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Services
        </motion.h2>

        <motion.p
          className="max-w-2xl mx-auto text-base md:text-lg text-[#5f4b5a] mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Curated treatments designed to renew, restore, and reveal your natural beauty.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((s, idx) => (
            <motion.div
              key={idx}
              className="bg-white/90 border border-[#e6dede] rounded-xl p-6 shadow-sm hover:shadow-md hover:scale-[1.03] transition-all cursor-pointer"
              onClick={() => setActive(s)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <div className="text-[#6f5c6b] mb-4">{s.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-[#5f4b5a]">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="bg-white max-w-md w-full rounded-xl shadow-lg p-8 text-left relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-[#3e2e3d] mb-4">{active.title}</h3>
              <p className="text-[#5f4b5a] text-sm">{active.detail}</p>
              <button
                onClick={() => setActive(null)}
                className="absolute top-3 right-3 text-[#5f4b5a] text-lg hover:text-[#3e2e3d]"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;
