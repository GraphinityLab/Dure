import React from "react";
import { motion } from "framer-motion";

const placeholderTeam = [
  {
    name: "Amara Leigh",
    title: "Lead Aesthetician",
    image: "https://via.placeholder.com/300x300.png?text=Amara",
  },
  {
    name: "Lena Wells",
    title: "Massage Therapist",
    image: "https://via.placeholder.com/300x300.png?text=Lena",
  },
  {
    name: "Maya Chen",
    title: "Laser Specialist",
    image: "https://via.placeholder.com/300x300.png?text=Maya",
  },
];

const Teams = ({ showTeam = true }) => {
  if (!showTeam) return null;

  return (
    <section id="team" className="py-20 px-6 bg-[#fff8f3]/0">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-[Soligant] text-[#3e2e3d] mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Meet Our Team
        </motion.h2>
        <p className="text-[#5f4b5a] max-w-xl mx-auto mb-12">
          A passionate group of wellness experts dedicated to empowering your natural beauty.
        </p>

        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {placeholderTeam.map((member, idx) => (
            <motion.div
              key={idx}
              className="rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-[Soligant] text-[#3e2e3d] mb-1">{member.name}</h3>
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
