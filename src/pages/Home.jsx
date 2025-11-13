import React, { useRef, lazy, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaUsers, FaSpa, FaStar, FaTrophy } from "react-icons/fa";
import DureText from "../components/DureText";

// Lazy load heavy components
const Services = lazy(() => import("../components/Services"));
const Testimonials = lazy(() => import("../components/Testimonials"));

// Optimize image loading
const dureBg = "/dure_bg.png";
const logo = "/icon.png";


const Home = () => {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <main className="relative text-[#3e2e3d] font-sans bg-[#f9f4ef]/0 w-full">
            {/* Hero Section */}
            <section
                ref={heroRef}
                id="hero"
                className="relative min-h-screen flex items-center justify-center text-center bg-cover bg-center px-6 mask-bottom-curve overflow-hidden"
            >
                {/* Optimized background image - critical for LCP */}
                <img
                    src={dureBg}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    width="1920"
                    height="1080"
                    style={{ contentVisibility: "auto", willChange: "auto" }}
                />
                {/* Enhanced gradient overlay with depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#463A2C]/40 via-[#2A1F1A]/35 to-[#1A1A1A]/40 z-0" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#463A2C]/10 to-transparent z-0" />

                {/* Parallax background layer */}
                <motion.div
                    className="absolute inset-0 z-0"
                    style={{ y, opacity }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-[#463A2C]/20 to-transparent" />
                </motion.div>

                {/* Floating particles effect */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    {[...Array(6)].map((_, i) => {
                        const randomX = Math.random() * 100;
                        const randomY = Math.random() * 100;
                        return (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-[#e8dbc9]/30 rounded-full"
                                initial={{
                                    x: `${randomX}%`,
                                    y: `${randomY}%`,
                                }}
                                animate={{
                                    y: [`${randomY}%`, `${(randomY + 30) % 100}%`, `${randomY}%`],
                                    x: [`${randomX}%`, `${(randomX + 20) % 100}%`, `${randomX}%`],
                                    opacity: [0.3, 0.6, 0.3],
                                }}
                                transition={{
                                    duration: 8 + Math.random() * 4,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                }}
                            />
                        );
                    })}
                </div>

                {/* Glassmorphism content container - Optimized for LCP */}
                <motion.div
                    className="relative z-10 flex flex-col items-center justify-center max-w-4xl text-center backdrop-blur-sm bg-white/5 rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ contain: "layout style paint" }}
                >
                    <motion.img
                        src={logo}
                        alt="Duré Aesthetics"
                        className="w-32 md:w-44 h-auto mb-8 drop-shadow-2xl"
                        width="176"
                        height="176"
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        whileHover={{ scale: 1.05, rotate: 2 }}
                    />

                    <motion.h1
                        className="text-5xl md:text-7xl font-[Soligant] leading-tight text-white drop-shadow-2xl mb-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                    >
                        Welcome to <span className="text-[#e8dbc9]"><DureText suffix=" Aesthetics" /></span>
                    </motion.h1>

                    <motion.p
                        className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl font-light leading-relaxed min-h-[3rem]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        style={{ contentVisibility: "auto" }}
                    >
                        Where beauty meets artistry, and every moment is crafted for your radiance
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 items-center justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                    >
                        <motion.a
                            href="#book"
                            className="group relative text-sm inline-block uppercase border-2 border-white/80 hover:border-white text-white hover:text-[#3e2e3d] px-8 py-3 rounded-full shadow-xl transition-all tracking-wider font-medium overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="relative z-10">Book an Appointment</span>
                            <motion.div
                                className="absolute inset-0 bg-white rounded-full"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.a>
                        <motion.a
                            href="#services"
                            className="text-sm inline-block uppercase border-2 border-white/50 hover:border-white/80 text-white/90 hover:text-white px-8 py-3 rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all tracking-wider font-medium"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Explore Services
                        </motion.a>
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                >
                    <motion.div
                        className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center p-2"
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <motion.div
                            className="w-1 h-3 bg-white/60 rounded-full"
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    </motion.div>
                </motion.div>
            </section>

            {/* Statistics Section */}
            <section className="py-20 px-6 bg-gradient-to-b from-[#fdfaf7]/0 to-[#f9f4ef]/30">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                        {[
                            { number: "500+", label: "Happy Clients", icon: FaUsers },
                            { number: "50+", label: "Expert Services", icon: FaSpa },
                            { number: "98%", label: "Satisfaction Rate", icon: FaStar },
                            { number: "5+", label: "Years of Excellence", icon: FaTrophy },
                        ].map((stat, idx) => {
                            const IconComponent = stat.icon;
                            return (
                            <motion.div
                                key={idx}
                                className="text-center group"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.6 }}
                            >
                                <motion.div 
                                    className="text-[#6f5c6b] mb-3 group-hover:scale-110 transition-transform flex justify-center"
                                    whileHover={{ rotate: [0, -10, 10, 0] }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <IconComponent size={40} />
                                </motion.div>
                                <motion.div
                                    className="text-4xl md:text-5xl font-[Soligant] text-[#3e2e3d] mb-2"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                                >
                                    {stat.number}
                                </motion.div>
                                <p className="text-sm md:text-base text-[#5f4b5a] font-medium">
                                    {stat.label}
                                </p>
                            </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section id="philosophy" className="py-24 px-6 bg-[#fdfaf7]/0 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-[#e8dbc9]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#d8c7b7]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.h2
                        className="text-4xl md:text-5xl font-[Soligant] text-[#3e2e3d] mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Our Philosophy
                    </motion.h2>
                    <motion.div
                        className="relative inline-block mb-8"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#6b4b3e] to-transparent mx-auto" />
                    </motion.div>
                    <motion.p
                        className="text-lg md:text-xl text-[#4a3c3a] leading-relaxed max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        At the heart of everything we do is one belief:{" "}
                        <span className="font-semibold text-[#3e2e3d] relative">
                            every woman deserves to feel radiant, powerful, and at home in her skin.
                        </span>
                        <br /><br />
                        Beauty isn't about changing who you are — it's about nurturing what already exists.
                        We offer not just cosmetic care but soulful moments of peace, confidence, and self-discovery.
                        From the glow of a fresh facial to the joy of glam, every touch is meant to make you feel seen, celebrated, and unstoppable.
                    </motion.p>
                </div>
            </section>

            {/* Services Section - Lazy loaded */}
            <section id="services" className="relative z-10 bg-transparent">
                <Suspense fallback={
                    <div className="min-h-[400px] flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-[#e8dbc9] border-t-[#6b4b3e] rounded-full animate-spin" />
                    </div>
                }>
                    <Services />
                </Suspense>
            </section>
            
            {/* Testimonials Section - Lazy loaded */}
            <Suspense fallback={
                <div className="min-h-[500px] flex items-center justify-center bg-gradient-to-b from-[#fdfaf7]/50 via-[#f9f4ef]/40 to-[#fdfaf7]/50">
                    <div className="w-12 h-12 border-4 border-[#e8dbc9] border-t-[#6b4b3e] rounded-full animate-spin" />
                </div>
            }>
                <Testimonials />
            </Suspense>

            {/* Booking Policy Note */}
            <section className="relative py-16 px-6 text-center text-[#3e2e3d] bg-gradient-to-b from-[#efe7dd] to-[#e8dbc9]/30 border-t border-[#d8c7b7]/50 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-[#d8c7b7]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#e8dbc9]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

                <motion.div
                    className="max-w-3xl mx-auto relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-8 h-px bg-[#6b4b3e]/30" />
                        <span className="text-[#6b4b3e] text-sm font-medium uppercase tracking-wider">Important</span>
                        <div className="w-8 h-px bg-[#6b4b3e]/30" />
                    </div>
                    <p className="text-base md:text-lg leading-relaxed">
                        Please review our{" "}
                        <a
                            href="/policies"
                            className="underline underline-offset-4 decoration-2 decoration-[#6b4b3e] hover:text-[#6b4b3e] transition-colors font-medium relative group"
                        >
                            booking & cancellation policies
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#6b4b3e] group-hover:w-full transition-all duration-300" />
                        </a>{" "}
                        before scheduling your service.
                    </p>
                </motion.div>
            </section>
        </main>
    );
};

export default Home;
