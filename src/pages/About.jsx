import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="py-24 px-6 text-[#3e2e3d]">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-serif mb-10 text-center"
        >
          Our Story 
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-8 text-base md:text-lg leading-relaxed"
        >
          <p>
            In a world that constantly tells women how they should look, we created a space where women are reminded of how beautiful, powerful, and complete they already are inside and out.
            This clinic was built with a purpose that goes far beyond skin-deep beauty. As someone deeply passionate about women’s empowerment, I’ve always dreamt of a place where every woman could feel secure, seen, and unapologetically confident where she could walk out with her head held high, owning her worth, her beauty, and her identity.
            “Every girl deserves to walk into a room like she owns it, because she does.”
            I’ve always believed that when a woman truly embraces herself not just how she looks, but how she feels, she becomes unstoppable. That belief led me to study Medical Aesthetics, where I trained professionally in skincare, massage therapies, and modern aesthetic treatments. I’ve also spent years learning the art of self-care through experience and practice.
            But even with my training, I saw a gap in Markham a lack of spaces that offer high-quality, all in one beauty services that don’t feel cold or clinical. So I decided to build the kind of place I wish existed: warm, welcoming, professional, empowering where everything from massages and facials to laser, makeup, hairstyling, and even photography lives under one roof.
            This is more than a clinic. It’s a movement.
          </p>

          <h2 className="text-3xl font-serif mt-12">Vision:</h2>

          <p>
            Our Vision:
            We don’t just provide beauty services we elevate confidence.
            Our mission is simple but powerful: to help every girl and woman feel so beautiful, secure, and self-assured that no one and nothing can dim her light. We believe in the kind of self-obsession that’s healthy, healing, and rooted in self-worth.
            Whether you come to us for a relaxing steam facial, precise laser treatment, signature bridal makeover, or just a fresh set of brows we’re here to remind you that you are already enough, and everything we do is just the cherry on top.
          </p>

          <h2 className="text-3xl font-serif mt-12">What Makes Us Different</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>A Soulful Touch to Professional Care<br />We don’t just treat skin we uplift spirits.</li>
            <li>One-Stop Beauty Destination<br />From facials and steaming to nails, waxing, makeup, laser, signature makeup, hairstyling, and more it’s all here.</li>
            <li>Empowerment is Our Foundation<br />We’re building self-esteem, one appointment at a time.</li>
            <li>Medically Trained & Experience-Backed<br />With a degree in Medical Aesthetics and years of hands on care, we deliver real results with genuine heart.</li>
            <li>Photography Studio On-Site<br />Capture your glow with professional photography after your glam because you deserve to see yourself in your best light.</li>
          </ul>

          <p>
            This is where beauty meets purpose, and where every client becomes part of something bigger. We can’t wait to welcome you in.
          </p>

          <h2 className="text-3xl font-serif mt-12">Our Philosophy</h2>
          <p>
            At the heart of everything we do is one simple belief:
            Every woman deserves to feel radiant, powerful, and deeply at home in her own skin.
            We believe that beauty is not about changing who you are, it’s about nurturing what already exists. It’s about elevating confidence, celebrating individuality, and creating a space where self-love comes naturally.
            Our treatments are rooted in care, not just cosmetics. We blend professional expertise with soulful intention, offering not just beauty services, but moments of peace, empowerment, and self discovery. From the glow of a fresh facial to the joy of a signature glam, every touch is designed to make you feel seen, heard, and celebrated.
            Here, beauty is never forced. It’s revealed.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
