import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FaHeart, 
  FaAward, 
  FaUsers, 
  FaHandSparkles, 
  FaLeaf, 
  FaCameraRetro, 
  FaCheckCircle,
  FaArrowRight,
  FaStar,
  FaGem,
} from "react-icons/fa";
import { IoSparklesSharp } from "react-icons/io5";
import Teams from "../components/Teams";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* Premium Background Layers */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply bg-[url('/bg-texture.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#f9f4ef]/50 via-transparent to-[#fdfaf7]/30" />
      
      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute top-20 left-10 w-96 h-96 bg-[#e8dbc9]/8 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-[#d8c7b7]/8 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-20 md:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-24 md:space-y-32"
        >
          {/* Hero Header */}
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <motion.div
              className="relative inline-block mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#6b4b3e] to-transparent" />
            </motion.div>
            
            <motion.h1
              className="text-5xl sm:text-6xl md:text-8xl font-[Soligant] text-center tracking-tight bg-gradient-to-b from-[#3e2e3d] to-[#5f4b5a] bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our Story
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-[#5f4b5a] max-w-3xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Where beauty meets purpose, and every moment is crafted for your radiance
            </motion.p>

            <motion.div
              className="relative inline-block mt-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#6b4b3e] to-transparent" />
            </motion.div>
          </motion.div>

          {/* Story Section - Vertical */}
          <motion.section
            variants={itemVariants}
            className="relative"
          >
            <div className="relative bg-white/95 backdrop-blur-sm border border-[#e6dede]/50 rounded-3xl p-8 md:p-12 shadow-xl overflow-hidden">
              {/* Decorative gradient overlay */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#e8dbc9]/20 to-transparent rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#d8c7b7]/10 to-transparent rounded-tr-full" />
              
              <div className="relative z-10 space-y-6">
                <motion.div
                  className="flex items-center gap-3 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-1 h-12 bg-gradient-to-b from-[#6b4b3e] to-transparent rounded-full" />
                  <h2 className="text-3xl md:text-4xl font-[Soligant] text-[#3e2e3d]">
                    The Beginning
                  </h2>
                </motion.div>

                <motion.div
                  className="space-y-6 text-[#5f4b5a] leading-relaxed text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <p>
                    In a world that constantly tells women how they should look, we created a space where women are reminded of how <strong className="text-[#3e2e3d]">beautiful, powerful, and complete they already are</strong> inside and out.
                  </p>
                  <p>
                    This clinic was built with a purpose that goes far beyond skin-deep beauty. As someone deeply passionate about women's empowerment, I've always dreamt of a place where every woman could feel <strong className="text-[#3e2e3d]">secure, seen, and unapologetically confident</strong>.
                  </p>
                  <motion.blockquote
                    className="border-l-4 border-[#6b4b3e] pl-6 py-4 my-8 bg-[#e8dbc9]/10 rounded-r-xl italic text-xl text-[#3e2e3d]"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    "Every girl deserves to walk into a room like she owns it, because she does."
                  </motion.blockquote>
                  <p>
                    I trained in Medical Aesthetics—skin, massage, and more—but I saw a gap: Markham lacked a space that combined quality, warmth, and soul. <strong className="text-[#3e2e3d]">So I built it.</strong>
                  </p>
                  <p className="text-2xl font-[Soligant] text-[#3e2e3d] pt-4">
                    This is more than a clinic. It's a movement.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Vision Section - Vertical */}
          <motion.section
            variants={itemVariants}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-white/95 to-[#f9f4ef]/50 backdrop-blur-sm border border-[#e6dede]/50 rounded-3xl p-8 md:p-12 shadow-xl overflow-hidden">
              <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#e8dbc9]/20 to-transparent rounded-br-full" />
              
              <div className="relative z-10 space-y-6">
                <motion.div
                  className="flex items-center gap-3 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <IoSparklesSharp className="text-[#6b4b3e] text-2xl" />
                  <h2 className="text-3xl md:text-4xl font-[Soligant] text-[#3e2e3d]">
                    Our Vision
                  </h2>
                </motion.div>

                <motion.div
                  className="space-y-6 text-[#5f4b5a] leading-relaxed text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <p className="text-2xl font-semibold text-[#3e2e3d] mb-4">
                    We don't just provide beauty services. We elevate confidence.
                  </p>
                  <p>
                    Our mission: to help every woman feel <strong className="text-[#3e2e3d]">beautiful, secure, and self-assured</strong>. We celebrate healthy, healing self-worth.
                  </p>
                  <p>
                    From facials and laser to brows and bridal glam, we're here to remind you—<strong className="text-[#3e2e3d]">you are already enough</strong>. We're just the glow-up partner.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Core Values - Vertical Cards */}
          <motion.section
            variants={itemVariants}
            className="relative"
          >
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-[Soligant] text-[#3e2e3d] mb-4 bg-gradient-to-b from-[#3e2e3d] to-[#5f4b5a] bg-clip-text text-transparent">
                Our Core Values
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#6b4b3e] to-transparent mx-auto" />
            </motion.div>

            <div className="space-y-8">
              {[
                {
                  icon: FaHeart,
                  title: "Empowerment First",
                  description: "Every service is designed to build confidence and self-worth. We believe beauty is about feeling powerful in your own skin, not conforming to standards.",
                  gradient: "from-[#e8dbc9]/20 to-[#d8c7b7]/10"
                },
                {
                  icon: FaAward,
                  title: "Excellence Always",
                  description: "Medically trained professionals using top-tier products and techniques. We combine clinical expertise with artistic vision for transformative results.",
                  gradient: "from-[#d8c7b7]/20 to-[#e8dbc9]/10"
                },
                {
                  icon: FaUsers,
                  title: "Community & Connection",
                  description: "More than a clinic—we're a sisterhood. Every client becomes part of a supportive community that celebrates individual beauty and collective strength.",
                  gradient: "from-[#e8dbc9]/20 to-[#d8c7b7]/10"
                }
              ].map((value, idx) => {
                const IconComponent = value.icon;
                return (
                  <motion.div
                    key={idx}
                    className="relative bg-white/95 backdrop-blur-sm border border-[#e6dede]/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="relative z-10 flex items-start gap-6">
                      <motion.div
                        className="p-4 rounded-xl bg-gradient-to-br from-[#e8dbc9]/30 to-[#d8c7b7]/20 text-[#6b4b3e] flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <IconComponent size={32} />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-[#3e2e3d] mb-3 group-hover:text-[#6b4b3e] transition-colors">
                          {value.title}
                        </h3>
                        <p className="text-[#5f4b5a] leading-relaxed text-base">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* What Makes Us Different - Vertical */}
          <motion.section
            variants={itemVariants}
            className="relative"
          >
            <div className="relative bg-white/95 backdrop-blur-sm border border-[#e6dede]/50 rounded-3xl p-8 md:p-12 shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#e8dbc9]/20 to-transparent rounded-bl-full" />
              
              <div className="relative z-10">
                <motion.div
                  className="flex items-center gap-3 mb-8"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <FaGem className="text-[#6b4b3e] text-2xl" />
                  <h2 className="text-3xl md:text-4xl font-[Soligant] text-[#3e2e3d]">
                    What Makes Us Different
                  </h2>
                </motion.div>

                <div className="space-y-6">
                  {[
                    { text: "Soulful + Professional: We don't just treat skin—we uplift spirits.", icon: FaHeart },
                    { text: "Everything Under One Roof: From facials to photography—experience the full journey.", icon: FaHandSparkles },
                    { text: "Empowerment at the Core: Every appointment builds more than beauty—it builds confidence.", icon: FaStar },
                    { text: "Real Expertise: Medically trained, hands-on experience, heart-led service.", icon: FaAward },
                    { text: "Photography Studio: Capture your glow with pro photos—because beauty deserves the spotlight.", icon: FaCameraRetro }
                  ].map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.div
                        key={idx}
                        className="flex items-start gap-4 p-4 rounded-xl bg-[#f9f4ef]/50 hover:bg-[#e8dbc9]/20 transition-colors duration-300 group"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                      >
                        <div className="p-2 rounded-lg bg-white/80 border border-[#e6dede]/50 text-[#6b4b3e] group-hover:scale-110 transition-transform">
                          <IconComponent size={18} />
                        </div>
                        <p className="text-[#5f4b5a] leading-relaxed flex-1 pt-1">
                          <strong className="text-[#3e2e3d]">{item.text.split(':')[0]}:</strong>
                          {item.text.split(':')[1]}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>

                <motion.p
                  className="mt-10 text-[#4a3c3a] text-lg leading-relaxed italic text-center bg-[#e8dbc9]/10 rounded-xl p-6 border border-[#e6dede]/30"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  This is where beauty meets purpose. Where every client becomes part of something lasting. We can't wait to welcome you.
                </motion.p>
              </div>
            </div>
          </motion.section>

          {/* Our Approach - Vertical */}
          <motion.section
            variants={itemVariants}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-white/95 to-[#f9f4ef]/50 backdrop-blur-sm border border-[#e6dede]/50 rounded-3xl p-8 md:p-12 shadow-xl overflow-hidden">
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#d8c7b7]/10 to-transparent rounded-tr-full" />
              
              <div className="relative z-10">
                <motion.div
                  className="flex items-center gap-3 mb-8"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <FaLeaf className="text-[#6b4b3e] text-2xl" />
                  <h2 className="text-3xl md:text-4xl font-[Soligant] text-[#3e2e3d]">
                    Our Approach
                  </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Personalized Consultations",
                      description: "Every journey begins with understanding your unique needs, skin type, and goals. We take time to listen and create a customized treatment plan."
                    },
                    {
                      title: "Holistic Wellness",
                      description: "We address beauty from the inside out, combining advanced treatments with mindful practices that nurture both body and spirit."
                    },
                    {
                      title: "Continuous Education",
                      description: "Our team stays current with the latest techniques, products, and industry standards to ensure you receive cutting-edge care."
                    },
                    {
                      title: "Results-Driven Care",
                      description: "We track your progress and adjust treatments as needed, ensuring you see real, lasting improvements in your skin and confidence."
                    }
                  ].map((approach, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-start gap-4 p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-[#e6dede]/30 hover:bg-white/80 transition-all duration-300 group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="text-[#6b4b3e] mt-1 flex-shrink-0">
                        <FaCheckCircle size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#3e2e3d] mb-2 text-lg group-hover:text-[#6b4b3e] transition-colors">
                          {approach.title}
                        </h4>
                        <p className="text-[#5f4b5a] text-sm leading-relaxed">
                          {approach.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Philosophy - Vertical */}
          <motion.section
            variants={itemVariants}
            className="relative"
          >
            <div className="relative bg-white/95 backdrop-blur-sm border border-[#e6dede]/50 rounded-3xl p-8 md:p-12 shadow-xl overflow-hidden text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[#e8dbc9]/10 via-transparent to-[#d8c7b7]/10" />
              
              <div className="relative z-10 max-w-4xl mx-auto">
                <motion.div
                  className="relative inline-block mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#6b4b3e] to-transparent" />
                </motion.div>
                
                <motion.h2
                  className="text-4xl md:text-5xl font-[Soligant] text-[#3e2e3d] mb-8 bg-gradient-to-b from-[#3e2e3d] to-[#5f4b5a] bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Our Philosophy
                </motion.h2>

                <motion.p
                  className="text-[#4a3c3a] leading-relaxed text-lg md:text-xl space-y-4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  At the heart of everything we do is a belief: <strong className="text-[#3e2e3d]">Every woman deserves to feel radiant, powerful, and at home in her own skin.</strong>
                </motion.p>
                <motion.p
                  className="text-[#4a3c3a] leading-relaxed text-lg md:text-xl mt-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  We don't aim to change you—we aim to reveal what's already there. Our services combine expert care with soulful intention. Every touchpoint—whether a facial or glam—is crafted to make you feel <strong className="text-[#3e2e3d]">seen, valued, and whole</strong>.
                </motion.p>
                <motion.p
                  className="text-2xl md:text-3xl font-[Soligant] text-[#3e2e3d] mt-8 italic"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  Here, beauty isn't forced. It's remembered.
                </motion.p>

                <motion.div
                  className="relative inline-block mt-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#6b4b3e] to-transparent" />
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            variants={itemVariants}
            className="relative"
          >
            <div className="relative bg-gradient-to-r from-[#3e2e3d] to-[#5f4b5a] rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[#3e2e3d]/90 to-[#5f4b5a]/90" />
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <motion.h2
                  className="text-3xl md:text-4xl font-[Soligant] text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  Ready to Begin Your Journey?
                </motion.h2>
                <motion.p
                  className="text-white/90 text-lg mb-8 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Experience the difference of beauty that celebrates who you already are.
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Link to="/book-now">
                    <motion.button
                      className="px-8 py-4 rounded-full bg-white text-[#3e2e3d] font-medium shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Book an Appointment
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                  <Link to="/services">
                    <motion.button
                      className="px-8 py-4 rounded-full border-2 border-white/80 text-white hover:bg-white/10 backdrop-blur-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Explore Services
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>

      {/* Teams Section */}
      <Teams showTeam={true} />
    </div>
  );
};

export default About;
