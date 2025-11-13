import React from "react";
import { motion } from "framer-motion";

const placeholderTeam = [
  {
    name: "Amara Leigh",
    title: "Lead Aesthetician",
    image: "/women.png",
  },
  {
    name: "Lena Wells",
    title: "Massage Therapist",
    image: "/women.png",
  },
  {
    name: "Maya Chen",
    title: "Laser Specialist",
    image: "/women.png",
  },
];

const Teams = ({ showTeam = true }) => {
  if (!showTeam) return null;

  return (
    <section id="team" className="relative pb-20 px-6 bg-gradient-to-t from-[#fffaf7] to-transparent overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply bg-[url('/bg-texture.png')] bg-center bg-cover" />
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#e8dbc9]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#d8c7b7]/5 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <motion.div
            className="relative inline-block mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#6b4b3e] to-transparent mx-auto" />
          </motion.div>
          <motion.h2
            className="text-5xl md:text-6xl font-[Soligant] text-[#3e2e3d] mb-6 tracking-tight bg-gradient-to-b from-[#3e2e3d] to-[#5f4b5a] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Meet Our Team
          </motion.h2>
          <motion.div
            className="relative inline-block mt-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#6b4b3e] to-transparent mx-auto" />
          </motion.div>
        </motion.div>
        <motion.p
          className="text-[#5f4b5a] max-w-2xl mx-auto mb-20 text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          A collective of masterful aestheticians, healers, and beauty experts—
          each devoted to crafting your glow with purpose and precision.
        </motion.p>

        <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {placeholderTeam.map((member, idx) => (
            <motion.div
              key={idx}
              className="relative group bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl transition-all duration-500 border border-[#e7dcd4]/50 hover:shadow-2xl hover:border-[#e8dbc9]"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15, type: "spring" }}
              whileHover={{ y: -8 }}
            >
              {/* Decorative gradient overlay */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#e8dbc9]/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              
              {/* Image with hover gradient + quote */}
              <div className="relative w-full h-80 overflow-hidden">
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width="320"
                  height="320"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3e2e3d]/80 via-[#3e2e3d]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <motion.p
                    className="text-[#f5ebe3] text-sm italic font-light"
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    "Empowering beauty through care."
                  </motion.p>
                </div>
                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </div>

              {/* Name + Title */}
              <div className="px-6 py-6 text-left relative z-10 bg-white/50 backdrop-blur-sm">
                <motion.h3
                  className="text-2xl font-[Soligant] text-[#3e2e3d] mb-1 tracking-tight group-hover:text-[#6b4b3e] transition-colors"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  {member.name}
                </motion.h3>
                <p className="text-sm text-[#7a6a71] group-hover:text-[#5f4b5a] transition-colors">{member.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teams;
