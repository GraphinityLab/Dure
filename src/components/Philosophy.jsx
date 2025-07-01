import React from "react";
import { motion } from "framer-motion";

const Philosophy = () => {
    return (
        <section id="philosophy" className="relative py-24 px-6 bg-gradient-to-t from-[#fdf6f6]/0 to-[#fdf6f6] text-[#3e2e3d] overflow-hidden">


            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <motion.h2
                    className="text-3xl md:text-4xl font-serif mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Our Philosophy
                </motion.h2>

                <motion.p
                    className="text-lg md:text-xl text-[#5f4b5a] font-light max-w-2xl mx-auto leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    At Duré Aesthetics, we see beauty as something deeper than appearance, it's a sense of balance, confidence, and calm. Every treatment we offer is more than a service; it's a thoughtful ritual created to ease tension, restore clarity, and bring you closer to your natural self.
                </motion.p>


                <motion.blockquote
                    className="italic text-[#8a7485] mt-10 text-sm md:text-base"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    “Balance is not something you find, it's something you create.”
                </motion.blockquote>
            </div>
        </section>
    );
};

export default Philosophy;
