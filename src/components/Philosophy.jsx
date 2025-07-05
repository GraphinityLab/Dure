import React from "react";
import { motion } from "framer-motion";

const Philosophy = () => {
    return (
        <section
            id="philosophy"
            className="relative py-24 px-6 bg-gradient-to-t from-[#fdf6f6]/0 to-[#fdf6f6]/60 text-[#3e2e3d] overflow-hidden"
        >
            <div className="relative z-10 max-w-6xl mx-auto text-center">
                <motion.h2
                    className="text-3xl md:text-4xl font-[Soligant] mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Our Philosophy
                </motion.h2>

                <motion.p
                    className="text-lg md:text-xl text-[#5f4b5a] font-light max-w-6xl mx-auto leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    At the heart of everything we do is one simple belief: Every woman deserves to feel radiant, powerful, and deeply at home in her own skin. We believe that beauty is not about changing who you are, it's about nurturing what already exists. It’s about elevating confidence, celebrating individuality, and creating a space where self-love comes naturally.
                </motion.p>

                <motion.p
                    className="text-lg md:text-xl text-[#5f4b5a] font-light max-w-6xl mx-auto leading-relaxed mt-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    Our treatments are rooted in care, not just cosmetics. We blend professional expertise with soulful intention, offering not just beauty services, but moments of peace, empowerment, and self discovery. From the glow of a fresh facial to the joy of a signature glam, every touch is designed to make you feel seen, heard, and celebrated.
                </motion.p>

                <motion.p
                    className="text-lg md:text-xl text-[#5f4b5a] font-light max-w-6xl mx-auto leading-relaxed mt-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    Here, beauty is never forced. It’s revealed.
                </motion.p>
            </div>
        </section>
    );
};

export default Philosophy;
