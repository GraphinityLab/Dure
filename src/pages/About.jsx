import React from "react";
import { motion } from "framer-motion";
import aboutBg from "/candle2.gif";
import Gallery from "../components/Gallery";

const About = () => {
  return (
    <>
      <section
        id="about"
        className="relative overflow-hidden py-24 px-6 bg-gradient-to-b from-[#fdf6f6]/100 to-transparent  text-[#3e2e3d]"
      >
        {/* Blurred Decorative Backgrounds */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[10%] left-[15%] w-[300px] h-[300px] bg-rose-100/40 blur-[100px] rounded-full" />
          <div className="absolute bottom-[10%] right-[10%] w-[250px] h-[250px] bg-pink-200/30 blur-[80px] rounded-full" />
        </div>

        {/* Section Header */}
        <motion.div
          className="max-w-6xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-4 tracking-tight relative">
            <span className="relative z-10">About Us</span>
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-[2px] bg-[#3e2e3d] rounded-full opacity-40" />
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-[#5f4b5a]">
            Learn more about our philosophy, team, and commitment to elegant, mindful beauty.
          </p>
        </motion.div>

        {/* Content Section */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="rounded-3xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <img
              src={aboutBg}
              alt="Duré Aesthetics Interior"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-serif mb-4">Our Essence</h3>
            <p className="text-[#5f4b5a] leading-relaxed mb-4">
              Duré Aesthetics is more than a studio — it’s a retreat for those seeking balance,
              tranquility, and refined self-care. Our approach blends timeless techniques with modern
              sensibilities to provide experiences that rejuvenate both body and soul.
            </p>
            <p className="text-[#5f4b5a] leading-relaxed">
              Every detail, from our interior design to our curated treatments, is guided by the
              principle of gentle luxury. We believe beauty flourishes in stillness, and our space
              reflects that — calm, elegant, and deeply personal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Integrated Gallery Section */}
      <section className="relative z-10" id="philosophy">
        <Gallery />
      </section>
    </>
  );
};

export default About;
