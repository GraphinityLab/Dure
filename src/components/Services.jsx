import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSpa, FaUserMd, FaSun, FaFeatherAlt, FaHandHoldingHeart, FaLeaf, FaCameraRetro, FaSnowflake } from "react-icons/fa";
import { FaScissors  } from "react-icons/fa6"; // ✅ Valid scissors icon
import { GiFingernail } from "react-icons/gi";

const services = [
  {
    title: "Facials & Skin Treatments",
    description: "Express, Hydrating, Acne, Glow, Anti-Aging, Microneedling, Chemical Peels, and more.",
    icon: <FaLeaf size={32} />,
    detail:
      "Explore our complete range including Express Facial, Glow with Steam, Collagen Boost Anti-Aging, Microneedling, Dermaplaning, Chemical Peels, HydraFacial, and LED Therapy. Tailored for every skin type."
  },
  {
    title: "Massage Therapy",
    description: "Relaxation, Deep Tissue, Aromatherapy, Prenatal, and Foot Reflexology treatments.",
    icon: <FaSpa size={32} />,
    detail:
      "Choose from Swedish, Deep Tissue, Hot Stone, Aromatherapy, Prenatal, Head/Shoulder massage, Foot Reflexology, or Cupping Therapy. Crafted to soothe, heal, and restore."
  },
  {
    title: "Nail Services",
    description: "Manicures, Pedicures, Extensions, Nail Art, Paraffin, and French Tips.",
    icon: <GiFingernail size={32} />,
    detail:
      "Classic or Shellac Mani/Pedi, Gel or Acrylic Extensions, Luxury Nail Art, French Tips, and Hydrating Paraffin Wax add-ons. Nails that express your style."
  },
  {
    title: "Makeup Services",
    description: "Event, Bridal, Photoshoots, Soft Glam, Airbrush & Male Grooming.",
    icon: <FaSnowflake size={32} />,
    detail:
      "Signature Bridal, Engagement, Mehndi Looks, Graduation/Prom, Photoshoots, Airbrush techniques, and tailored Male Grooming sessions. Designed to highlight your best self."
  },
  {
    title: "Waxing & Hair Removal",
    description: "Full-body waxing for men and women using gentle, effective methods.",
    icon: <FaFeatherAlt size={32} />,
    detail:
      "Threading, Facial, Arm, Leg, Bikini, Brazilian, Chest, and Full Body Wax available. Clean, smooth, and safe with minimal discomfort."
  },
  {
    title: "Laser Hair Removal",
    description: "Advanced sessions for permanent, pain-minimized results across all skin types.",
    icon: <FaUserMd size={32} />,
    detail:
      "Upper Lip to Full Body options. Safe for all skin tones using medical-grade equipment. Sessions recommended for long-term results."
  },
  {
    title: "Hairstyling",
    description: "From event updos to kids’ styling, blowouts, and braid designs.",
    icon: <FaScissors size={32} />,
    detail:
      "Blow-dry, Curls, Braids, Updos, Bridal Styles, Kids Hair, Extensions Installation, Oil Treatments, and Scalp Detox available. Styled to perfection."
  },
  {
    title: "Photography Add-On",
    description: "Capture your glow post-glam with our in-house studio.",
    icon: <FaCameraRetro size={32} />,
    detail:
      "Post-Makeup Glam Shoots, Bridal Photography, Influencer Reels, Before & Afters, and Seasonal Backdrops. See yourself in your best light."
  }
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
