import React from "react";
import { motion } from "framer-motion";
import GridMotion from "./GridMotion";

const items = [
  'https://i.imgur.com/EirHeWZ.webp',
  'https://i.imgur.com/LR2IgOo.webp',
  'https://i.imgur.com/V5vFCOe.webp',
  'https://i.imgur.com/AxINo9Z.webp',
  'https://i.imgur.com/cMcfhEA.webp',
  'https://i.imgur.com/004bPXA.jpeg',
  'https://i.imgur.com/w8MNpiZ.webp',
  'https://i.imgur.com/u5kV4dU.webp',
  'https://i.imgur.com/1Q7PpFd.webp',
  'https://i.imgur.com/omBDhTj.webp',
  'https://i.imgur.com/kI3RWeV.webp',
  'https://i.imgur.com/Iut7Vrw.webp',
  'https://i.imgur.com/EB8hOhL.webp',
  'https://i.imgur.com/H3NvTsz.webp',
  'https://i.imgur.com/fTVoEvU.webp',
  'https://i.imgur.com/q9DbF0O.webp',
  'https://i.imgur.com/ys1WZyu.webp',
  'https://i.imgur.com/sPLTrcP.webp',
  'https://i.imgur.com/mWxF1yx.webp',
  'https://i.imgur.com/hEtNnUK.webp',
  'https://i.imgur.com/zSkqYLi.webp',
  'https://i.imgur.com/vqkMGQa.webp',
  'https://i.imgur.com/UBxytnU.webp',
  'https://i.imgur.com/MQsf9Z8.webp',
  'https://i.imgur.com/gHJEFHT.webp',
  'https://i.imgur.com/JLgDCtw.webp',
  'https://i.imgur.com/UwJQqEi.webp',
  'https://i.imgur.com/wgbYg9N.webp',
];

const Gallery = () => {
  return (
    <section
      id="gallery"
      className="relative overflow-hidden py-28 px-6 text-[#3e2e3d] "
    >
      {/* Background Animation & Glow Effects */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[300px] h-[300px] bg-pink-200/30 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[15%] right-[12%] w-[220px] h-[220px] bg-rose-100/20 blur-[100px] rounded-full animate-float" />
        <div className="absolute inset-0 bg-[url('/grain.png')] opacity-[0.04] mix-blend-overlay z-[-1]" />
      </div>

      {/* Section Header */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto text-center mb-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-4 relative">
          <span className="relative z-10">Gallery</span>
          <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-14 h-[2px] bg-[#3e2e3d] rounded-full opacity-30" />
        </h2>
        <p className="max-w-2xl mx-auto text-base md:text-lg text-[#5f4b5a]">
          Step into a curated space of visual calm — where every frame captures the essence of Duré’s gentle elegance and serene rituals.
        </p>
      </motion.div>

      {/* Image Grid */}
      <div className="relative z-10 max-w-[1800px] mx-auto">
        <GridMotion items={items} />
      </div>
    </section>
  );
};

export default Gallery;

