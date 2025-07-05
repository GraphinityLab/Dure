import React from "react";
import { FaSpa, FaFeatherAlt, FaLeaf, FaCameraRetro, FaSnowflake } from "react-icons/fa";
import { FaScissors } from "react-icons/fa6";
import { GiFingernail } from "react-icons/gi";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

// Define services
const allServices = [
  {
    category: "All",
    icon: null,
    items: [] // Populated below
  },
  {
    category: "Facials & Skin Treatments",
    icon: <FaLeaf size={20} />,
    items: [
      { name: "Express Facial (30 mins)", price: "$85" },
      { name: "Hydrating Facial", price: "$140" },
      { name: "Deep Cleansing Facial (Acne/Clogged)", price: "$160" },
      { name: "Signature Glow Facial + Steam", price: "$180" },
      { name: "Micro needling", price: "$220" },
      { name: "Chemical Peel (Light/Medical Grade)", price: "$165" },
      { name: "Hydra facial", price: "$195" },
      { name: "Back Facial", price: "$150" },
      { name: "LED Therapy (Add-On)", price: "$40" },
      { name: "Teen Facial", price: "$95" },
      { name: "Sensitive Skin / Rosacea Facial", price: "$145" },
    ]
  },
  {
    category: "Massage Therapy",
    icon: <FaSpa size={20} />,
    items: [
      { name: "Relaxation Massage (60 min)", price: "$110" },
      { name: "Deep Tissue Massage", price: "$130" },
      { name: "Aromatherapy Massage", price: "$135" },
      { name: "Hot Stone Massage", price: "$140" },
      { name: "Prenatal Massage", price: "$130" },
      { name: "Head, Neck & Shoulder Massage", price: "$85" },
      { name: "Full Body Massage (Customized)", price: "$145" },
    ]
  },
  {
    category: "Nail Services",
    icon: <GiFingernail size={20} />,
    items: [
      { name: "Classic Manicure", price: "$40" },
      { name: "Shellac Manicure", price: "$55" },
      { name: "Gel Manicure", price: "$65" },
      { name: "Classic Pedicure", price: "$55" },
      { name: "Spa Pedicure", price: "$75" },
      { name: "Gel Extensions (Full Set)", price: "$85" },
      { name: "Customized Nail Art (Full Set)", price: "$95–$120" },
      { name: "French Tips / Nail Art (Add-On)", price: "$5–8 per nail" },
      { name: "Paraffin Wax Treatment (Add-On)", price: "$20" },
      { name: "Kids Mani/Pedi", price: "$35" },
    ]
  },
  {
    category: "Makeup Services",
    icon: <FaSnowflake size={20} />,
    items: [
      { name: "Event Makeup", price: "$120" },
      { name: "Soft Glam", price: "$150" },
      { name: "Full Glam", price: "$160" },
      { name: "Signature Bridal Makeup", price: "$250" },
      { name: "Nikkah / Engagement Makeup", price: "$180" },
      { name: "Prom / Photoshoot Makeup", price: "$130" },
      { name: "Airbrush Makeup", price: "$190" },
      { name: "Touch-Up Service (Add-On)", price: "$50" },
    ]
  },
  {
    category: "Waxing & Hair Removal",
    icon: <FaFeatherAlt size={20} />,
    items: [
      { name: "Eyebrow Threading/Waxing", price: "$22" },
      { name: "Upper Lip / Chin", price: "$18" },
      { name: "Full Face", price: "$55" },
      { name: "Underarms", price: "$30" },
      { name: "Full Arms", price: "$65" },
      { name: "Half Legs / Full Legs", price: "$55 / $90" },
      { name: "Bikini Line", price: "$65" },
      { name: "Brazilian Wax", price: "$70" },
      { name: "Full Body Wax", price: "$170" },
    ]
  },
  {
    category: "Hairstyling",
    icon: <FaScissors size={20} />,
    items: [
      { name: "Blowdry (Basic)", price: "$65" },
      { name: "Curls / Waves", price: "$70" },
      { name: "Event Updo", price: "$120" },
      { name: "Bridal Hairstyling (Trial + Day)", price: "$220" },
      { name: "Scalp Oil Massage + Blowdry", price: "$85" },
      { name: "Hair Extensions Install (Clip-in)", price: "$95" },
      { name: "Braiding / Styling (Variety)", price: "$55–75" },
    ]
  },
  {
    category: "Photography Studio Add-On",
    icon: <FaCameraRetro size={20} />,
    items: [
      { name: "Glam Photoshoot (20 mins)", price: "$75" },
      { name: "Bridal Photography Session", price: "$110" },
      { name: "Instagram Content Shoot", price: "$85" },
      { name: "Before & After Shoot", price: "$60" },
    ]
  }
];

// Populate "All"
allServices[0].items = allServices.slice(1).flatMap(s => s.items);

const ServicesPage = () => {
  const location = useLocation();
  const slug = decodeURIComponent(location.pathname.split("/").pop() || "all");
  const activeTab = slug === "services" ? "all" : slug;

  return (
    <section className="relative overflow-hidden py-24 px-6 text-[#3e2e3d]">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-serif mb-10 text-center"
        >
          Our Services
        </motion.h1>
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {allServices.map((s, i) => {
            const categorySlug = s.category.toLowerCase().replace(/\s+/g, "-");
            return (
              <NavLink
                key={i}
                to={`/services/${categorySlug === "all" ? "" : categorySlug}`}
                className={`px-5 py-2 rounded-full text-sm transition font-medium border ${
                  activeTab === categorySlug
                    ? "bg-[#3e2e3d] text-white border-[#3e2e3d]"
                    : "border-[#d9caca] text-[#3e2e3d] hover:bg-[#f3eaea]"
                }`}
              >
                {s.category}
              </NavLink>
            );
          })}
        </div>

        {/* Content */}
        {activeTab === "all" ? (
          allServices.slice(1).map((s, i) => {
            return (
              <div key={i} className="mb-16">
                <h2 className="text-xl font-semibold mb-4">{s.category}</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {s.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between border border-[#eddcdc] px-4 py-3 rounded-xl backdrop-blur-sm bg-white/40"
                    >
                      <span>{item.name}</span>
                      <span className="font-medium">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })
        ) : (
          allServices.map((s, i) => {
            const categorySlug = s.category.toLowerCase().replace(/\s+/g, "-");
            if (activeTab !== categorySlug) return null;
            return (
              <div key={i} className="mb-12">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {s.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between border border-[#eddcdc] px-4 py-3 rounded-xl backdrop-blur-sm bg-white/40"
                    >
                      <span>{item.name}</span>
                      <span className="font-medium">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default ServicesPage;
