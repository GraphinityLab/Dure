import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaClock,
  FaInstagram,
  FaFacebook,
  FaCheckCircle,
  FaSpinner
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: "Email",
      content: "hello@dureaesthetics.com",
      link: "mailto:hello@dureaesthetics.com",
      color: "from-[#6b4b3e] to-[#8b6f5e]"
    },
    {
      icon: <FaPhone className="text-2xl" />,
      title: "Phone",
      content: "+1 (416) 555-0123",
      link: "tel:+14165550123",
      color: "from-[#5a7d5a] to-[#6b9a6b]"
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      title: "Location",
      content: "Markham, ON, Canada",
      link: null,
      color: "from-[#b8866b] to-[#d4a574]"
    },
    {
      icon: <FaClock className="text-2xl" />,
      title: "Hours",
      content: "Tue-Sun: 10AM - 7PM",
      link: null,
      color: "from-[#6b7d9e] to-[#8b9db8]"
    }
  ];

  const socialLinks = [
    { icon: <FaInstagram />, href: "https://instagram.com/dureaesthetics", label: "Instagram" },
    { icon: <FaFacebook />, href: "https://facebook.com/dureaesthetics", label: "Facebook" }
  ];

  return (
    <section
      id="contact"
      className="relative w-full py-20 md:py-32 px-4 sm:px-6 text-[#3e2e3d] pb-40 min-h-screen"
    >
      {/* Premium Background Layers - Enhanced */}
      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none opacity-[0.035] mix-blend-multiply bg-[url('/bg-texture.png')] bg-cover bg-center" />
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-[#f9f4ef]/50 via-transparent to-[#fdfaf7]/30" />
      
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

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Premium Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Get in Touch
          </motion.h1>

          <motion.p
            className="text-base md:text-lg text-[#5f4b5a] max-w-2xl mx-auto mb-8 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We're here to help you book your perfect treatment or answer any questions you may have. Reach out to us and let's create something beautiful together.
          </motion.p>

          <motion.div
            className="relative inline-block mt-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#6b4b3e] to-transparent" />
          </motion.div>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {contactInfo.map((info, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative bg-white/95 backdrop-blur-sm border border-[#e6dede]/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />
              
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#e8dbc9]/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r ${info.color} text-white mb-4 shadow-md group-hover:shadow-lg transition-all`}>
                  {info.icon}
                </div>
                <h3 className="font-semibold text-[#3e2e3d] mb-2 text-lg">{info.title}</h3>
                {info.link ? (
                  <a
                    href={info.link}
                    className="text-[#5f4b5a] hover:text-[#6b4b3e] transition-colors block"
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="text-[#5f4b5a]">{info.content}</p>
                )}
              </div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Form & Additional Info Grid */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Premium Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative"
          >
            <div className="bg-white/95 backdrop-blur-sm border border-[#e6dede]/50 rounded-3xl p-6 md:p-8 shadow-xl">
              <h2 className="text-2xl md:text-3xl font-[Soligant] text-[#3e2e3d] mb-6">
                Send us a Message
              </h2>
              
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 bg-gradient-to-r from-[#5a7d5a]/10 to-[#6b9a6b]/10 border border-[#5a7d5a]/20 rounded-xl flex items-center gap-3"
                  >
                    <FaCheckCircle className="text-[#5a7d5a] text-xl" />
                    <p className="text-[#5a7d5a] font-medium">
                      Thank you! Your message has been sent successfully.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-5 py-3.5 border-2 rounded-full text-sm focus:outline-none transition-all bg-white/80 backdrop-blur-sm ${
                        errors.name 
                          ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-200" 
                          : "border-[#e6dede] focus:border-[#6b4b3e] focus:ring-2 focus:ring-[#e8dbc9]"
                      }`}
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs mt-1 ml-4"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email *"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-5 py-3.5 border-2 rounded-full text-sm focus:outline-none transition-all bg-white/80 backdrop-blur-sm ${
                        errors.email 
                          ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-200" 
                          : "border-[#e6dede] focus:border-[#6b4b3e] focus:ring-2 focus:ring-[#e8dbc9]"
                      }`}
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs mt-1 ml-4"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone (Optional)"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 border-2 border-[#e6dede] rounded-full text-sm focus:outline-none focus:border-[#6b4b3e] focus:ring-2 focus:ring-[#e8dbc9] transition-all bg-white/80 backdrop-blur-sm"
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject (Optional)"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 border-2 border-[#e6dede] rounded-full text-sm focus:outline-none focus:border-[#6b4b3e] focus:ring-2 focus:ring-[#e8dbc9] transition-all bg-white/80 backdrop-blur-sm"
                  />
                </div>
                
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message *"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-5 py-3.5 border-2 rounded-2xl text-sm focus:outline-none transition-all bg-white/80 backdrop-blur-sm resize-none ${
                      errors.message 
                        ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-200" 
                        : "border-[#e6dede] focus:border-[#6b4b3e] focus:ring-2 focus:ring-[#e8dbc9]"
                    }`}
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs mt-1 ml-4"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-[#3e2e3d] to-[#5f4b5a] text-white font-medium text-base shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </>
                    )}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#5f4b5a] to-[#6b4b3e]"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="space-y-6"
          >
            {/* Operating Hours */}
            <div className="bg-white/95 backdrop-blur-sm border border-[#e6dede]/50 rounded-3xl p-6 md:p-8 shadow-xl">
              <h3 className="text-2xl font-[Soligant] text-[#3e2e3d] mb-6 flex items-center gap-3">
                <FaClock className="text-[#6b4b3e]" />
                Operating Hours
              </h3>
              <div className="space-y-4">
                {[
                  { day: "Monday", hours: "Closed" },
                  { day: "Tuesday - Friday", hours: "10:00 AM - 7:00 PM" },
                  { day: "Saturday", hours: "9:00 AM - 6:00 PM" },
                  { day: "Sunday", hours: "11:00 AM - 5:00 PM" }
                ].map((schedule, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-[#e6dede]/30 last:border-0">
                    <span className="font-medium text-[#3e2e3d]">{schedule.day}</span>
                    <span className="text-[#5f4b5a]">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white/95 backdrop-blur-sm border border-[#e6dede]/50 rounded-3xl p-6 md:p-8 shadow-xl">
              <h3 className="text-2xl font-[Soligant] text-[#3e2e3d] mb-6">
                Follow Us
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#3e2e3d] to-[#5f4b5a] text-white shadow-lg hover:shadow-xl transition-all"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <span className="group-hover:scale-110 transition-transform">
                      {social.icon}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Contact CTA */}
            <motion.div
              className="bg-white rounded-3xl p-6 md:p-8 shadow-xl"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-[Soligant] text-[#3e2e3d] mb-3">
                Prefer to Call?
              </h3>
              <p className="text-[#5f4b5a] mb-4">
                Give us a call for immediate assistance or to book an appointment.
              </p>
              <motion.a
                href="tel:+14165550123"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#3e2e3d] to-[#5f4b5a] text-white font-medium hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPhone />
                Call Now
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
