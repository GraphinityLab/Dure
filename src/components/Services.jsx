import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSpa, FaFeatherAlt, FaLeaf, FaCameraRetro, FaSnowflake, FaStar, FaClock } from "react-icons/fa";
import { FaScissors } from "react-icons/fa6";
import { GiFingernail } from "react-icons/gi";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const previewServices = [
  {
    title: "Facials",
    description: "Glow, Anti-Aging, Microneedling & more.",
    icon: FaLeaf,
    categoryMatch: "Facials & Skin Treatments",
    popular: true,
  },
  {
    title: "Massage Therapy",
    description: "Relaxation, Deep Tissue & Aromatherapy.",
    icon: FaSpa,
    categoryMatch: "Massage Therapy",
    popular: false,
  },
  {
    title: "Nails",
    description: "Manicures, Pedicures, Nail Art & Extensions.",
    icon: GiFingernail,
    categoryMatch: "Nail Services",
    popular: true,
  },
  {
    title: "Makeup",
    description: "Bridal, Event & Photoshoot Ready Looks.",
    icon: FaSnowflake,
    categoryMatch: "Makeup Services",
    popular: true,
  },
  {
    title: "Hair Removal",
    description: "Waxing, Threading & Laser Solutions.",
    icon: FaFeatherAlt,
    categoryMatch: "Waxing & Hair Removal",
    popular: false,
  },
  {
    title: "Hairstyling",
    description: "Blowouts, Braids & Bridal Hair.",
    icon: FaScissors,
    categoryMatch: "Hairstyling",
    popular: false,
  },
];

const Services = () => {
  const [serviceCounts, setServiceCounts] = useState({});

  useEffect(() => {
    const fetchServiceCounts = async () => {
      try {
        const response = await axiosInstance.get('/services');
        const services = response.data;
        
        // Count services by category
        const counts = {};
        services.forEach(service => {
          const category = service.category || "Uncategorized";
          counts[category] = (counts[category] || 0) + 1;
        });
        
        setServiceCounts(counts);
      } catch (error) {
        console.error("Error fetching service counts:", error);
      }
    };

    fetchServiceCounts();
  }, []);

  const getServiceCount = (categoryMatch) => {
    const count = serviceCounts[categoryMatch] || 0;
    return count > 0 ? count : null;
  };

  return (
    <section id="services" className="relative bg-[#f9f4ef] py-24 px-6 text-[#3e2e3d] overflow-hidden mask-top-curve">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#e8dbc9]/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#d8c7b7]/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-6xl font-[Soligant] mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          What We Offer
        </motion.h2>

        <motion.div
          className="relative inline-block mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#6b4b3e] to-transparent mx-auto" />
        </motion.div>

        <motion.p
          className="max-w-2xl mx-auto text-base md:text-lg text-[#5f4b5a] mb-16 font-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          A glimpse into our most popular beauty and wellness services, crafted with precision and care.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {previewServices.map((s, idx) => {
            const IconComponent = s.icon;
            const serviceCount = getServiceCount(s.categoryMatch);
            return (
              <motion.div
                key={idx}
                className="group relative bg-white/95 backdrop-blur-sm border border-[#e6dede]/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-default"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6, type: "spring" }}
                whileHover={{ y: -4 }}
              >
                {/* Simple gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#e8dbc9]/0 to-[#d8c7b7]/0 group-hover:from-[#e8dbc9]/10 group-hover:to-[#d8c7b7]/5 transition-all duration-300 rounded-2xl" />

                {/* Popular badge */}
                {s.popular && (
                  <motion.div
                    className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-gradient-to-r from-[#6b4b3e] to-[#8b6b5e] text-white text-xs px-2.5 py-1 rounded-full shadow-md"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + 0.2, type: "spring" }}
                  >
                    <FaStar size={9} />
                    <span className="font-medium">Popular</span>
                  </motion.div>
                )}

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className="text-[#6f5c6b] mb-4 inline-block p-4 rounded-xl bg-[#f9f4ef] group-hover:bg-[#e8dbc9]/30 transition-colors duration-300"
                    whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconComponent size={28} />
                  </motion.div>

                  {/* Service count badge */}
                  {serviceCount && (
                    <div className="flex items-center gap-1.5 text-[#6b4b3e] bg-[#e8dbc9]/20 px-2.5 py-1 rounded-full text-xs font-medium mb-3 inline-flex">
                      <FaClock size={9} />
                      <span>{serviceCount} Services</span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-2 text-[#3e2e3d] group-hover:text-[#6b4b3e] transition-colors">
                    {s.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#5f4b5a] leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link
            to="/services"
            className="group relative inline-block px-8 py-4 bg-[#3e2e3d] text-white rounded-full text-sm tracking-wider font-medium hover:bg-[#5f4b5a] transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Full Services
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#5f4b5a] to-[#6b4b3e] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
