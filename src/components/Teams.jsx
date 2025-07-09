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
    <section id="team" className="relative pb-10 px-6 bg-gradient-to-t from-[#fffaf7] to-transparent">
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply bg-[url('/bg-texture.png')] bg-center bg-cover" />
      <div className="relative max-w-7xl mx-auto z-10 text-center">
        <motion.h2
          className="text-5xl font-[Soligant] text-[#3e2e3d] mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Meet Our Team
        </motion.h2>
        <p className="text-[#5f4b5a] max-w-2xl mx-auto mb-20 text-lg leading-relaxed">
          A collective of masterful aestheticians, healers, and beauty experts—
          each devoted to crafting your glow with purpose and precision.
        </p>

        <div className="grid gap-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {placeholderTeam.map((member, idx) => (
            <motion.div
              key={idx}
              className="relative group bg-white rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.05)] transition-all duration-300 border border-[#e7dcd4]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              {/* Image with hover gradient + quote */}
              <div className="relative w-full h-80 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3e2e3d]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-[#f5ebe3] text-sm italic font-light">
                    “Empowering beauty through care.”
                  </p>
                </div>
              </div>

              {/* Name + Title */}
              <div className="px-6 py-5 text-left">
                <h3 className="text-2xl font-[Soligant] text-[#3e2e3d] mb-1 tracking-tight">
                  {member.name}
                </h3>
                <p className="text-sm text-[#7a6a71]">{member.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teams;
