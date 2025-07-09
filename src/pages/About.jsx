import React from "react";
import { motion } from "framer-motion";
import Teams from "../components/Teams";

const About = () => {
  return (
    <>
      <section className="relative py-32 px-6 text-[#3e2e3d]">
        <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-multiply bg-[url('/bg-texture.png')] bg-cover bg-center" />
        <div className="relative max-w-7xl mx-auto z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-[Soligant] mb-20 text-center tracking-tight"
          >
            Our Story
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-28 text-base md:text-lg leading-[1.85] tracking-tight text-[#4a3c3a]"
          >
            {/* Story Intro + Image */}
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div >
                <p>
                  In a world that constantly tells women how they should look, we created a space where women are reminded of how beautiful, powerful, and complete they already are inside and out.
                  This clinic was built with a purpose that goes far beyond skin-deep beauty. As someone deeply passionate about women’s empowerment, I’ve always dreamt of a place where every woman could feel secure, seen, and unapologetically confident.
                  “Every girl deserves to walk into a room like she owns it, because she does.”
                  I trained in Medical Aesthetics—skin, massage, and more—but I saw a gap: Markham lacked a space that combined quality, warmth, and soul. So I built it.
                  This is more than a clinic. It’s a movement.
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src="/interior.png"
                  alt="Clinic interior"
                  className="rounded-3xl shadow-2xl w-full object-cover"
                />
              </motion.div>
            </div>

            <motion.hr
              className="border-t border-[#3e2e3d]/20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />

            {/* Vision + Image */}
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <motion.div
                className="mx-auto w-full max-w-sm rounded-3xl overflow-hidden shadow-xl border border-[#3e2e3d]/10"
                initial={{ opacity: 0, scale: 0.75 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <img src="/women.png" alt="Empowered spa guest" className="w-full object-cover" />
              </motion.div>
              <div className="space-y-8">
                <h2 className="text-4xl font-[Soligant] text-[#3e2e3d]">Vision:</h2>
                <div className="text-[#5f4b5a] space-y-5 leading-relaxed">
                  <p><strong>We don’t just provide beauty services. We elevate confidence.</strong></p>
                  <p>Our mission: to help every woman feel beautiful, secure, and self-assured. We celebrate healthy, healing self-worth.</p>
                  <p>From facials and laser to brows and bridal glam, we’re here to remind you—you are already enough. We're just the glow-up partner.</p>
                </div>
              </div>
            </div>

            <motion.hr
              className="border-t border-[#3e2e3d]/20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />

            {/* What Makes Us Different */}
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-12 shadow-xl">
              <h2 className="text-3xl font-[Soligant] text-[#3e2e3d] mb-8">What Makes Us Different</h2>
              <ul className="list-disc pl-6 space-y-4 marker:text-[#c1a38f] text-[#4a3c3a]">
                <li><strong>Soulful + Professional:</strong> We don’t just treat skin—we uplift spirits.</li>
                <li><strong>Everything Under One Roof:</strong> From facials to photography—experience the full journey.</li>
                <li><strong>Empowerment at the Core:</strong> Every appointment builds more than beauty—it builds confidence.</li>
                <li><strong>Real Expertise:</strong> Medically trained, hands-on experience, heart-led service.</li>
                <li><strong>Photography Studio:</strong> Capture your glow with pro photos—because beauty deserves the spotlight.</li>
              </ul>
              <p className="mt-8 text-[#4a3c3a]">
                This is where beauty meets purpose. Where every client becomes part of something lasting. We can't wait to welcome you.
              </p>
            </div>

            <motion.hr
              className="border-t border-[#3e2e3d]/20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />

            {/* Philosophy */}
            <div className="text-center px-4 md:px-12">
              <h2 className="text-3xl font-[Soligant] text-[#3e2e3d] mb-6">Our Philosophy</h2>
              <p className="max-w-3xl mx-auto text-[#4a3c3a] leading-relaxed">
                At the heart of everything we do is a belief: Every woman deserves to feel radiant, powerful, and at home in her own skin.
                We don’t aim to change you—we aim to reveal what’s already there. Our services combine expert care with soulful intention.
                Every touchpoint—whether a facial or glam—is crafted to make you feel seen, valued, and whole. Here, beauty isn’t forced. It’s remembered.
              </p>
            </div>

            <motion.hr
              className="border-t border-[#3e2e3d]/20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />
          </motion.div>
        </div>
      </section>

      <Teams showTeam={true} />
    </>
  );
};

export default About;
