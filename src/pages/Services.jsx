import React from "react";
import {
  FaSpa,
  FaFeatherAlt,
  FaLeaf,
  FaCameraRetro,
  FaSnowflake,
} from "react-icons/fa";
import { FaScissors } from "react-icons/fa6";
import { GiFingernail } from "react-icons/gi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

// Define services
const allServices = [
  {
    category: "All",
    icon: null,
    items: []
  },
  {
    category: "Facials & Skin Treatments",
    icon: <FaLeaf size={20} />,
    items: [
      { name: "Express Facial (30 mins)", price: "$85" },
      { name: "Hydrating Facial", price: "$140" },
      { name: "Deep Cleansing Facial", price: "$160" },
      { name: "Signature Glow Facial + Steam", price: "$180" },
      { name: "Micro needling", price: "$220" },
      { name: "Chemical Peel", price: "$165" },
      { name: "Hydra facial", price: "$195" },
      { name: "Back Facial", price: "$150" },
      { name: "LED Therapy (Add-On)", price: "$40" },
      { name: "Teen Facial", price: "$95" },
      { name: "Sensitive Skin Facial", price: "$145" },
    ]
  },
  {
    category: "Massage Therapy",
    icon: <FaSpa size={20} />,
    items: [
      { name: "Relaxation Massage", price: "$110" },
      { name: "Deep Tissue Massage", price: "$130" },
      { name: "Aromatherapy Massage", price: "$135" },
      { name: "Hot Stone Massage", price: "$140" },
      { name: "Prenatal Massage", price: "$130" },
      { name: "Head, Neck & Shoulder", price: "$85" },
      { name: "Customized Full Body", price: "$145" },
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
      { name: "Gel Extensions", price: "$85" },
      { name: "Custom Nail Art", price: "$95–$120" },
      { name: "Add-On: French Tips", price: "$5–8 per nail" },
      { name: "Paraffin Wax (Add-On)", price: "$20" },
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
      { name: "Bridal Makeup", price: "$250" },
      { name: "Nikkah / Engagement", price: "$180" },
      { name: "Prom / Photoshoot", price: "$130" },
      { name: "Airbrush Makeup", price: "$190" },
      { name: "Touch-Up (Add-On)", price: "$50" },
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
      { name: "Half / Full Legs", price: "$55 / $90" },
      { name: "Bikini Line", price: "$65" },
      { name: "Brazilian Wax", price: "$70" },
      { name: "Full Body", price: "$170" },
    ]
  },
  {
    category: "Hairstyling",
    icon: <FaScissors size={20} />,
    items: [
      { name: "Blowdry (Basic)", price: "$65" },
      { name: "Curls / Waves", price: "$70" },
      { name: "Event Updo", price: "$120" },
      { name: "Bridal Styling", price: "$220" },
      { name: "Oil Massage + Blowdry", price: "$85" },
      { name: "Hair Extensions Install", price: "$95" },
      { name: "Braiding / Styling", price: "$55–75" },
    ]
  },
  {
    category: "Photography Studio Add-On",
    icon: <FaCameraRetro size={20} />,
    items: [
      { name: "Glam Photoshoot", price: "$75" },
      { name: "Bridal Session", price: "$110" },
      { name: "Instagram Shoot", price: "$85" },
      { name: "Before & After", price: "$60" },
    ]
  }
];

allServices[0].items = allServices.slice(1).flatMap(s => s.items);

const ServicesPage = () => {
  const location = useLocation();
  const slug = decodeURIComponent(location.pathname.split("/").pop() || "all");
  const activeTab = slug === "services" ? "all" : slug;
  const { addService } = useCart();

  const selectedServices = activeTab === "all"
    ? allServices.slice(1)
    : allServices.filter(s => s.category.toLowerCase().replace(/\s+/g, "-") === activeTab);

  return (
    <section className="relative overflow-hidden py-32 px-6 text-[#3e2e3d]">
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply bg-[url('/bg-texture.png')] bg-center bg-cover" />
      <div className="relative max-w-7xl mx-auto z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-[Soligant] mb-20 text-center tracking-tight"
        >
          Our Services
        </motion.h1>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {allServices.map((s, i) => {
            const categorySlug = s.category.toLowerCase().replace(/\s+/g, "-");
            const isActive = activeTab === categorySlug;
            return (
              <NavLink
                key={i}
                to={`/services/${categorySlug === "all" ? "" : categorySlug}`}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-[CaviarDreams] text-sm shadow-sm transition
                ${isActive ? "bg-[#3e2e3d] text-white" : "bg-white text-[#3e2e3d] border border-[#d8c9c9] hover:bg-[#f5eeee]"}`}
              >
                {s.icon}
                {s.category}
              </NavLink>
            );
          })}
        </div>

        {/* Service Lists */}
        {selectedServices.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="mb-20"
          >
            <h2 className="text-2xl font-[Soligant] text-[#3e2e3d] mb-6 border-l-4 pl-4 border-[#c1a38f]">
              {s.category}
            </h2>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {s.items.map((item, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center px-6 py-4 bg-white/60 backdrop-blur-md border border-[#e8dcd4] rounded-2xl shadow-sm hover:shadow-md transition"
                >
                  <div className="flex flex-col">
                    <span className="text-[#3e2e3d] text-[15px]">{item.name}</span>
                    <span className="font-[CaviarDreams] text-[#7e5e54] text-sm">{item.price}</span>
                  </div>
                  <button
                    onClick={() => addService({ name: item.name, price: item.price, category: s.category })}
                    className="ml-4 px-3 py-1 rounded-full text-sm bg-[#3e2e3d] text-white hover:bg-[#5f4b5a] transition font-[CaviarDreams]"
                  >
                    Add
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}

        {/* CTA */}
        <div className="text-center mt-10">
          <NavLink
            to={`/book-now`}
            className="inline-block px-8 py-3 rounded-full bg-[#3e2e3d] text-white font-[CaviarDreams] text-sm shadow-md hover:bg-[#2d1e2c] transition"
          >
            Book Now
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;