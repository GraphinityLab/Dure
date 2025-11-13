import { motion } from "framer-motion";
import { FaShieldAlt, FaLock, FaUserShield, FaEye, FaDatabase, FaCookie } from "react-icons/fa";
import SEO from "../components/SEO";

const Privacy = () => {
  const sections = [
    {
      icon: <FaShieldAlt />,
      title: "Information We Collect",
      content: [
        "We collect information that you provide directly to us, including your name, email address, phone number, and appointment preferences when you book a service or contact us.",
        "We automatically collect certain information about your device when you visit our website, including your IP address, browser type, and pages you visit.",
        "We may use cookies and similar tracking technologies to enhance your experience and analyze website traffic."
      ]
    },
    {
      icon: <FaEye />,
      title: "How We Use Your Information",
      content: [
        "To provide, maintain, and improve our services and website functionality.",
        "To process your appointments and send you appointment confirmations and reminders.",
        "To communicate with you about our services, promotions, and updates.",
        "To analyze website usage and trends to improve user experience.",
        "To comply with legal obligations and protect our rights."
      ]
    },
    {
      icon: <FaLock />,
      title: "Information Sharing",
      content: [
        "We do not sell, trade, or rent your personal information to third parties.",
        "We may share your information with trusted service providers who assist us in operating our website and conducting our business, subject to strict confidentiality agreements.",
        "We may disclose your information if required by law or to protect our rights, property, or safety."
      ]
    },
    {
      icon: <FaDatabase />,
      title: "Data Security",
      content: [
        "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
        "However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.",
        "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy."
      ]
    },
    {
      icon: <FaUserShield />,
      title: "Your Rights",
      content: [
        "You have the right to access, update, or delete your personal information at any time.",
        "You may opt-out of receiving promotional communications from us by following the unsubscribe instructions in our emails.",
        "You can request a copy of your personal data or request that we restrict or object to certain processing activities.",
        "To exercise these rights, please contact us using the information provided below."
      ]
    },
    {
      icon: <FaCookie />,
      title: "Cookies and Tracking",
      content: [
        "We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.",
        "You can control cookie preferences through your browser settings, though disabling cookies may affect website functionality.",
        "We may use third-party analytics services that use cookies and similar technologies to collect and analyze information about website usage."
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
        title="Privacy Policy - Your Data Protection & Privacy Rights"
        description="Learn how Dure Aesthetics protects your personal information. Our comprehensive privacy policy outlines data collection, usage, security measures, and your rights."
        keywords="privacy policy, data protection, personal information, GDPR, privacy rights, data security, cookie policy"
        url="/privacy"
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
                Privacy Policy
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
                At Dure Aesthetics, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
                or use our services. By using our services, you agree to the collection and use of information in accordance with this policy.
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
                If you have any questions about this Privacy Policy or wish to exercise your rights regarding your personal information, 
                please contact us:
              </p>
              <div className="space-y-2 text-[#5f4b5a]">
                <p><strong className="text-[#3e2e3d]">Email:</strong> privacy@dureaesthetics.com</p>
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
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Privacy;

