import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaLeaf,
    FaSpa,
    FaSun,
    FaFeatherAlt,
    FaUserMd,
    FaHandHoldingHeart,
    FaChevronDown,
    FaChevronUp,
} from "react-icons/fa";

const serviceList = [
    {
        title: "Facial Treatments",
        description: "Rejuvenating facials tailored to your skin type using high-quality, gentle products.",
        icon: <FaLeaf size={28} />,
        detail: "We offer hydrating, anti-aging, and detox facials using premium botanical formulas for visible results."
    },
    {
        title: "Body Massage",
        description: "Relaxing and therapeutic massages designed to release tension and promote wellness.",
        icon: <FaSpa size={28} />,
        detail: "Choose from Swedish, deep tissue, or hot stone therapy to relieve muscle tension and promote blood flow."
    },
    {
        title: "Skin Therapy",
        description: "Targeted treatments for acne, dryness, or uneven tone — personalized to your needs.",
        icon: <FaSun size={28} />,
        detail: "From chemical peels to hydration boosters, our licensed team uses safe and effective techniques."
    },
    {
        title: "Waxing & Hair Removal",
        description: "Smooth, professional waxing services with minimal discomfort and long-lasting results.",
        icon: <FaFeatherAlt size={28} />,
        detail: "We use hypoallergenic wax and soothing aftercare to ensure a clean, smooth finish every time."
    },
    {
        title: "Aesthetic Consultations",
        description: "Meet 1-on-1 with our experts to plan your custom beauty and wellness routine.",
        icon: <FaUserMd size={28} />,
        detail: "Book a consult to evaluate your skin goals, ask questions, and receive personalized care plans."
    },
    {
        title: "Healing Rituals",
        description: "Holistic treatments combining touch, scent, and sound to calm body and mind.",
        icon: <FaHandHoldingHeart size={28} />,
        detail: "Our signature rituals include aromatherapy, warm towels, and mindfulness techniques."
    },
];

const ServiceCard = ({ title, icon, description, detail }) => {
    return (
        <div className="group text-left w-full rounded-3xl bg-white/80 border border-[#e6dede] p-6 shadow-md hover:shadow-xl transition-all backdrop-blur-md flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <div className="text-[#3e2e3d]">{icon}</div>
                    <h3 className="text-lg font-serif text-[#3e2e3d]">{title}</h3>
                </div>

                <p className="text-sm text-[#5f4b5a] leading-relaxed mb-2">{description}</p>
                <p className="text-sm text-[#5f4b5a] leading-relaxed">{detail}</p>
            </div>

            <div className="mt-6">
                <a
                    href="/book-now"
                    className="inline-block px-5 py-2 rounded-full border border-[#3e2e3d] text-[#3e2e3d] hover:bg-[#3e2e3d] hover:text-white transition-all duration-300 text-sm tracking-wide uppercase"
                >
                    Book Now
                </a>
            </div>
        </div>
    );
};




const Services = () => {
    return (
        <section
            id="services"
           className="relative overflow-hidden py-24 px-6 bg-gradient-to-b from-[#fdf6f6]/100 to-transparent  text-[#3e2e3d]"
      >
            {/* Decorative Blurs */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-[15%] left-[10%] w-[300px] h-[300px] bg-rose-100/40 blur-[100px] rounded-full" />
                <div className="absolute bottom-[10%] right-[10%] w-[250px] h-[250px] bg-pink-200/30 blur-[80px] rounded-full" />
            </div>

            {/* Header */}
            <motion.div
                className="max-w-6xl mx-auto text-center mb-16"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl md:text-5xl font-serif mb-4 tracking-tight relative">
                    <span className="relative z-10">Our Services</span>
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-[2px] bg-[#3e2e3d] rounded-full opacity-40" />
                </h2>
                <p className="max-w-2xl mx-auto text-base md:text-lg text-[#5f4b5a]">
                    Explore our curated treatments designed to enhance your natural beauty and inner balance.
                </p>
            </motion.div>

            {/* Services Grid */}
            <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {serviceList.map((service, index) => (
                    <ServiceCard key={index} {...service} />
                ))}
            </div>


            {/* CTA */}
            <div className="text-center mt-20">
                <a
                    href="/book"
                    className="inline-block bg-[#3e2e3d] text-white hover:bg-[#5f4b5a] transition-colors px-6 py-3 rounded-full text-sm uppercase tracking-wide shadow-md"
                >
                    Book Your Appointment
                </a>
            </div>
        </section>
    );
};

export default Services;
