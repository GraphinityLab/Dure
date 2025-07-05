import React from "react";
import { motion } from "framer-motion";
import logo from "/icon.png";
import dureBg from "/candle2.gif";


import Services from "../components/Services";
import Philosophy from "../components/Philosophy";


const Home = () => {
    return (
        <main className="relative text-[#3e2e3d] overflow-hidden">
            

            <section
                id="hero"
                className="relative min-h-screen flex items-center justify-center text-center bg-cover bg-center px-6 mask-bottom-curve"
                style={{
                    backgroundImage: `url(${dureBg})`,
                }}
            >
                {/* Backdrop overlay */}
                <div className="absolute inset-0 bg-[#1a1a1a]/30 backdrop-blur-sm z-0" />

                {/* Foreground content */}
                <div className="relative z-10 flex flex-col items-center justify-center max-w-3xl text-center">
                    <motion.img
                        src={logo}
                        alt="Duré Aesthetics"
                        className="w-28 md:w-42 h-auto mb-6"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    />

                    <motion.h1
                        className="text-4xl md:text-5xl font-[Soligant] leading-tight text-white drop-shadow-md"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        Welcome to <span className="text-[#3e2e3d]">Duré Aesthetics</span>
                    </motion.h1>

                    <motion.a
                        href="#book"
                        className="mt-5 text-sm inline-block border uppercase border-white hover:bg-white text-white hover:text-[#3e2e3d] px-6 py-2 rounded-2xl shadow-md transition-all"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                    >
                        Book an Appointment
                    </motion.a>
                </div>
        
            </section>
            <section className="bg-transparent z-1" id="services">
                <Services />
            </section>
            <section className="bg-transparent z-1" id="philosophy">
                <Philosophy />
            </section>
            
        </main>
    );
};

export default Home;
