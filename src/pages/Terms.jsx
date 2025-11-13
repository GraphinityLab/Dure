import { motion } from "framer-motion";
import { FaFileContract, FaHandshake, FaExclamationTriangle, FaCheckCircle, FaGavel, FaBan } from "react-icons/fa";
import SEO from "../components/SEO";

const Terms = () => {
  const sections = [
    {
      icon: <FaHandshake />,
      title: "Acceptance of Terms",
      content: [
        "By accessing and using the Dure Aesthetics website and services, you accept and agree to be bound by these Terms of Service.",
        "If you do not agree to these terms, please do not use our website or services.",
        "We reserve the right to modify these terms at any time, and such modifications shall be effective immediately upon posting."
      ]
    },
    {
      icon: <FaFileContract />,
      title: "Services and Appointments",
      content: [
        "We provide beauty and wellness services including facials, massages, nail services, and related treatments.",
        "Appointments must be booked in advance through our website or by contacting us directly.",
        "We reserve the right to refuse service to anyone for any reason at any time.",
        "Service prices are subject to change without notice, but will be confirmed at the time of booking.",
        "Cancellations must be made at least 24 hours in advance to avoid cancellation fees."
      ]
    },
    {
      icon: <FaCheckCircle />,
      title: "User Responsibilities",
      content: [
        "You are responsible for providing accurate and complete information when booking appointments.",
        "You must be at least 18 years old to book services, or have parental consent if under 18.",
        "You agree to arrive on time for your appointments and to notify us immediately if you need to reschedule or cancel.",
        "You are responsible for informing us of any allergies, medical conditions, or other relevant health information before receiving services."
      ]
    },
    {
      icon: <FaExclamationTriangle />,
      title: "Limitation of Liability",
      content: [
        "Dure Aesthetics shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.",
        "Our total liability for any claims arising from our services shall not exceed the amount you paid for the specific service in question.",
        "We are not responsible for any allergic reactions or adverse effects that may result from our services, provided we have followed standard safety protocols.",
        "You acknowledge that beauty and wellness services may have varying results and that individual experiences may differ."
      ]
    },
    {
      icon: <FaGavel />,
      title: "Intellectual Property",
      content: [
        "All content on this website, including text, graphics, logos, images, and software, is the property of Dure Aesthetics and is protected by copyright and trademark laws.",
        "You may not reproduce, distribute, modify, or create derivative works from any content on this website without our express written permission.",
        "You may use our website for personal, non-commercial purposes only."
      ]
    },
    {
      icon: <FaBan />,
      title: "Prohibited Uses",
      content: [
        "You may not use our website or services for any unlawful purpose or to solicit others to perform unlawful acts.",
        "You may not violate any local, state, national, or international law or regulation.",
        "You may not transmit any viruses, malware, or other harmful code through our website.",
        "You may not attempt to gain unauthorized access to any portion of our website or any systems or networks connected to our website."
      ]
    }
  ];

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
    <>
      <SEO
        title="Terms of Service - Legal Agreement & User Guidelines"
        description="Review the Terms of Service for Dure Aesthetics. Understand your rights and responsibilities when using our beauty and wellness services and website."
        keywords="terms of service, user agreement, legal terms, service terms, booking terms, cancellation policy"
        url="/terms"
      />
      
      <section className="relative w-full min-h-screen py-20 md:py-32 px-4 sm:px-6 text-[#3e2e3d] pb-40">
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
        
        {/* Additional subtle gradient accents */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#e8dbc9]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#d8c7b7]/5 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-16"
          >
            {/* Header */}
            <motion.div
              variants={itemVariants}
              className="text-center mb-16"
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
                className="text-4xl sm:text-5xl md:text-7xl font-[Soligant] text-center tracking-tight bg-gradient-to-b from-[#3e2e3d] to-[#5f4b5a] bg-clip-text text-transparent mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Terms of Service
              </motion.h1>
              
              <motion.p
                className="text-lg text-[#5f4b5a] max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
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

            {/* Introduction */}
            <motion.div
              variants={itemVariants}
              className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-[#e6dede]/50 shadow-xl"
            >
              <p className="text-[#5f4b5a] leading-relaxed text-lg">
                Welcome to Dure Aesthetics. These Terms of Service ("Terms") govern your access to and use of our website 
                and services. Please read these Terms carefully before using our services. By accessing or using our website 
                or services, you agree to be bound by these Terms.
              </p>
            </motion.div>

            {/* Sections */}
            {sections.map((section, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-[#e6dede]/50 shadow-xl hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="flex items-start gap-6 mb-6">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#e8dbc9] to-[#d8c7b7] text-[#6b4b3e] text-2xl group-hover:scale-110 transition-transform duration-300">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-[Soligant] text-[#3e2e3d] flex-1">
                    {section.title}
                  </h2>
                </div>
                <ul className="space-y-4 ml-20">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <span className="text-[#6b4b3e] mt-1.5">•</span>
                      <span className="text-[#5f4b5a] leading-relaxed flex-1">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Contact Information */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-[#f9f4ef] to-[#f5f0eb] rounded-3xl p-8 md:p-12 border border-[#e6dede]/50 shadow-xl"
            >
              <h2 className="text-2xl md:text-3xl font-[Soligant] text-[#3e2e3d] mb-6">
                Contact Us
              </h2>
              <p className="text-[#5f4b5a] leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-[#5f4b5a]">
                <p><strong className="text-[#3e2e3d]">Email:</strong> legal@dureaesthetics.com</p>
                <p><strong className="text-[#3e2e3d]">Phone:</strong> +1 (123) 456-7890</p>
                <p><strong className="text-[#3e2e3d]">Address:</strong> Toronto, ON, Canada</p>
              </div>
            </motion.div>

            {/* Updates Notice */}
            <motion.div
              variants={itemVariants}
              className="text-center text-[#5f4b5a] text-sm"
            >
              <p>
                We reserve the right to update, change, or replace any part of these Terms of Service by posting updates 
                and changes to our website. It is your responsibility to check our website periodically for changes.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Terms;

