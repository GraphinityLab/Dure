import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <section
      id="contact"
     className="relative overflow-hidden py-24 px-6  text-[#3e2e3d]"
      >
      {/* Decorative Background Blurs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[15%] left-[10%] w-[300px] h-[300px] bg-rose-100/40 blur-[100px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[250px] h-[250px] bg-pink-200/30 blur-[80px] rounded-full" />
      </div>

      {/* Header */}
      <motion.div
        className="max-w-6xl mx-auto text-center mb-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-[Soligant] mb-10 text-center">
          <span className="relative z-10">Get in Touch</span>
          <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-[2px] bg-[#3e2e3d] rounded-full opacity-40" />
        </h2>
        <p className="max-w-2xl mx-auto text-base md:text-lg text-[#5f4b5a]">
          We're here to help you book your perfect treatment or answer any questions you may have.
        </p>
      </motion.div>

      {/* Form & Contact Info */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Contact Details */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <FaEnvelope className="text-[#3e2e3d] mt-1" />
            <div>
              <h4 className="font-semibold text-[#3e2e3d] mb-1">Email</h4>
              <a href="mailto:hello@dureaesthetics.com" className="text-[#5f4b5a] hover:text-[#3e2e3d] transition">
                hello@dureaesthetics.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaPhone className="text-[#3e2e3d] mt-1" />
            <div>
              <h4 className="font-semibold text-[#3e2e3d] mb-1">Phone</h4>
              <a href="tel:+11234567890" className="text-[#5f4b5a] hover:text-[#3e2e3d] transition">
                +1 (123) 456-7890
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-[#3e2e3d] mt-1" />
            <div>
              <h4 className="font-semibold text-[#3e2e3d] mb-1">Location</h4>
              <p className="text-[#5f4b5a]">Toronto, ON</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-3 border border-[#e6dede] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#3e2e3d] bg-white/80"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-[#e6dede] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#3e2e3d] bg-white/80"
            />
          </div>
          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full px-4 py-3 border border-[#e6dede] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3e2e3d] bg-white/80"
          ></textarea>
          <button
            type="submit"
            className="px-6 py-3 mt-2 rounded-full bg-[#3e2e3d] text-white hover:bg-[#5f4b5a] transition font-medium text-sm uppercase tracking-wide"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
