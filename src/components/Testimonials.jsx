import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Alpha A.",
    initials: "AA",
    rating: 5,
    feedback:
      "Duré Aesthetic made me feel like the most confident version of myself. The facial and glam session were beyond anything I’ve experienced.",
  },
  {
    name: "Bravo B.",
    initials: "BB",
    rating: 5,
    feedback:
      "The space, the energy, the care — all so beautifully intentional. I walked in anxious and walked out empowered.",
  },
  {
    name: "Charlie C.",
    initials: "CC",
    rating: 5,
    feedback:
      "I've been to many clinics, but Duré is in a league of its own. From the gentle hands to the photography session — luxury meets soul.",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="bg-[#fdfaf7]/50 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-3xl md:text-4xl font-[Soligant] text-[#3e2e3d] mb-12">
          Client Testimonials
        </h2>

        <div className="divide-y divide-[#3e2e3d]">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              className="py-8 flex flex-col md:flex-row items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Avatar Circle */}
              <div className="w-12 h-12 rounded-full border border-[#3e2e3d] flex items-center justify-center text-[#3e2e3d] font-semibold text-lg shadow-sm">
                {t.initials}
              </div>

              {/* Testimonial Content */}
              <div className="flex-1">
                <p className="text-lg text-[#3e2e3d] italic leading-relaxed mb-3">
                  “{t.feedback}”
                </p>

                {/* Name + Rating */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-sm text-[#77625a] font-medium">— {t.name}</span>
                  <div className="flex gap-[2px]">
                    {[...Array(t.rating)].map((_, i) => (
                      <FaStar key={i} className="text-[#eeab54] text-sm" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
