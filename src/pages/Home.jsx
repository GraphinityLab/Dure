import React from "react";
import { motion } from "framer-motion";
import logo from "/icon.png";
import dureBg from "/dure_bg.png";

import Services from "../components/Services";
import Testimonials from "../components/Testimonials";


const Home = () => {
    return (
        <main className="relative text-[#3e2e3d] overflow-hidden font-sans bg-[#f9f4ef]/0">
            {/* Hero Section */}
            <section
                id="hero"
                className="relative min-h-screen flex items-center justify-center text-center bg-cover bg-center px-6 mask-bottom-curve"
                style={{ backgroundImage: `url(${dureBg})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-[#463A2C]/30 to-[#1A1A1A]/30 z-0" />

                <div className="relative z-10 flex flex-col items-center justify-center max-w-3xl text-center">
                    <motion.img
                        src={logo}
                        alt="Duré Aesthetics"
                        className="w-28 md:w-36 h-auto mb-6"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    />

                    <motion.h1
                        className="text-4xl md:text-5xl font-[Soligant] leading-tight text-white drop-shadow-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        Welcome to <span className="text-[#e8dbc9]">Duré Aesthetics</span>
                    </motion.h1>

                    <motion.a
                        href="#book"
                        className="mt-6 text-sm inline-block uppercase border border-white hover:bg-white text-white hover:text-[#3e2e3d] px-6 py-2 rounded-full shadow-md transition-all tracking-wide"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                    >
                        Book an Appointment
                    </motion.a>
                </div>
            </section>

            {/* Philosophy Section */}
            <section id="philosophy" className="py-24 px-6 bg-[#fdfaf7]/0">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-[Soligant] text-[#3e2e3d] mb-6">
                        Our Philosophy
                    </h2>
                    <p className="text-lg md:text-xl text-[#4a3c3a] leading-relaxed max-w-3xl mx-auto">
                        At the heart of everything we do is one belief:{" "}
                        <span className="font-semibold">
                            every woman deserves to feel radiant, powerful, and at home in her skin.
                        </span>
                        <br /><br />
                        Beauty isn’t about changing who you are — it’s about nurturing what already exists.
                        We offer not just cosmetic care but soulful moments of peace, confidence, and self-discovery.
                        From the glow of a fresh facial to the joy of glam, every touch is meant to make you feel seen, celebrated, and unstoppable.
                    </p>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="relative z-10 bg-transparent">
                <Services />
            </section>
            <Testimonials />

            {/* Booking Policy Note */}
            <section className="py-10 px-6 text-center text-[#3e2e3d] bg-[#efe7dd] border-t border-[#d8c7b7]">
                <div className="max-w-3xl mx-auto">
                    <p className="text-md">
                        Please review our{" "}
                        <a
                            href="/policies"
                            className="underline underline-offset-4 decoration-[#6b4b3e] hover:text-[#6b4b3e] transition"
                        >
                            booking & cancellation policies
                        </a>{" "}
                        before scheduling your service.
                    </p>
                </div>
            </section>
        </main>
    );
};

export default Home;
