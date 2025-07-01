import React from "react";
import { motion } from "framer-motion";
import GridMotion from "./GridMotion";

const items = [
  'Item 1',
  <div key="jsx-1">Custom JSX Content</div>,
  'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Item 2',
  <div key="jsx-2">Premium Product Display</div>,
  'Item 3',
  <div key="jsx-3">Tranquil Scene</div>,
];

const Gallery = () => {
  return (
    <section
      id="gallery"
      className="relative overflow-hidden py-24 px-6 text-[#3e2e3d]"
    >
      {/* Background Visual Enhancement */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[300px] h-[300px] bg-pink-200/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[15%] right-[10%] w-[200px] h-[200px] bg-rose-100/20 blur-[100px] rounded-full" />
      </div>

      {/* Section Header */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto text-center mb-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-4 relative">
          <span className="relative z-10">Gallery</span>
          <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-[2px] bg-[#3e2e3d] rounded-full opacity-40" />
        </h2>
        <p className="max-w-2xl mx-auto text-base md:text-lg text-[#5f4b5a]">
          Step into a curated space of visual calm — where every frame captures the essence of Duré’s gentle elegance.
        </p>
      </motion.div>

      {/* Grid Component */}
      <div className="relative z-10">
        <GridMotion items={items} />
      </div>
    </section>
  );
};

export default Gallery;
