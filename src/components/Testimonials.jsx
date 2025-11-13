import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight, FaCheckCircle, FaLeaf, FaSpa, FaSnowflake } from "react-icons/fa";
import { FaScissors } from "react-icons/fa6";
import DureText from "./DureText";

const testimonials = [
  {
    name: "Sarah Mitchell",
    initials: "SM",
    rating: 5,
    feedback: "Dure Aesthetic made me feel like the most confident version of myself. The facial and glam session were beyond anything I've experienced. The attention to detail and the way they made me feel seen and valued was incredible.",
    feedbackParts: [
      { text: "Dure", isDure: true },
      { text: " Aesthetic made me feel like the most confident version of myself. The facial and glam session were beyond anything I've experienced. The attention to detail and the way they made me feel seen and valued was incredible." }
    ],
    service: "Facial & Makeup",
    serviceIcon: <FaLeaf size={14} />,
    date: "2 weeks ago",
    verified: true,
  },
  {
    name: "Emma Rodriguez",
    initials: "ER",
    rating: 5,
    feedback: "The space, the energy, the care — all so beautifully intentional. I walked in anxious and walked out empowered. This isn't just a beauty clinic, it's a sanctuary where you rediscover your radiance.",
    feedbackParts: null,
    service: "Massage Therapy",
    serviceIcon: <FaSpa size={14} />,
    date: "1 month ago",
    verified: true,
  },
  {
    name: "Jessica Chen",
    initials: "JC",
    rating: 5,
    feedback: "I've been to many clinics, but Dure is in a league of its own. From the gentle hands to the photography session — luxury meets soul. Every moment felt like a celebration of who I am.",
    feedbackParts: [
      { text: "I've been to many clinics, but " },
      { text: "Dure", isDure: true },
      { text: " is in a league of its own. From the gentle hands to the photography session — luxury meets soul. Every moment felt like a celebration of who I am." }
    ],
    service: "Bridal Package",
    serviceIcon: <FaSnowflake size={14} />,
    date: "3 weeks ago",
    verified: true,
  },
  {
    name: "Amanda Taylor",
    initials: "AT",
    rating: 5,
    feedback:
      "The microneedling treatment transformed my skin completely. The staff's expertise and genuine care made all the difference. I've never felt more beautiful and confident in my own skin.",
    service: "Facial Treatment",
    serviceIcon: <FaLeaf size={14} />,
    date: "1 week ago",
    verified: true,
  },
  {
    name: "Maria Garcia",
    initials: "MG",
    rating: 5,
    feedback:
      "My bridal hair and makeup was absolutely perfect. The team understood my vision and brought it to life beautifully. The photography session captured moments I'll treasure forever.",
    service: "Bridal Services",
    serviceIcon: <FaScissors size={14} />,
    date: "2 months ago",
    verified: true,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="relative bg-gradient-to-b from-[#fdfaf7]/50 via-[#f9f4ef]/40 to-[#fdfaf7]/50 py-32 px-6 overflow-hidden">
      {/* Enhanced decorative background */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#e8dbc9]/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#d8c7b7]/8 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#e8dbc9]/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="relative inline-block mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#6b4b3e] to-transparent" />
          </motion.div>
          
          <motion.h2
            className="text-5xl md:text-6xl font-[Soligant] text-[#3e2e3d] mb-4 bg-gradient-to-b from-[#3e2e3d] to-[#5f4b5a] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Client Testimonials
          </motion.h2>

          <motion.p
            className="text-lg text-[#5f4b5a] max-w-2xl mx-auto mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Real stories from real clients who experienced the <DureText /> difference
          </motion.p>

          {/* Trust Statistics */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-[#eeab54] text-sm" />
                ))}
              </div>
              <span className="text-[#3e2e3d] font-semibold text-lg">5.0</span>
            </div>
            <div className="h-6 w-px bg-[#d8c7b7]" />
            <div className="text-[#5f4b5a]">
              <span className="font-semibold text-[#3e2e3d] text-lg">500+</span> Happy Clients
            </div>
            <div className="h-6 w-px bg-[#d8c7b7]" />
            <div className="text-[#5f4b5a]">
              <span className="font-semibold text-[#3e2e3d] text-lg">98%</span> Satisfaction Rate
            </div>
          </motion.div>

          <motion.div
            className="relative inline-block mt-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#6b4b3e] to-transparent" />
          </motion.div>
        </motion.div>

        <div className="relative h-[500px] md:h-[450px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="bg-white/98 backdrop-blur-md border border-[#e6dede]/60 rounded-3xl p-10 md:p-14 shadow-2xl max-w-4xl w-full relative overflow-hidden group">
                {/* Enhanced decorative quote icon */}
                <motion.div
                  className="absolute top-8 left-8 text-[#e8dbc9] opacity-15"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <FaQuoteLeft size={80} />
                </motion.div>

                {/* Multiple gradient overlays */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#e8dbc9]/15 to-transparent rounded-bl-full" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#d8c7b7]/10 to-transparent rounded-tr-full" />
                
                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-2000" />
                </div>

                <div className="relative z-10">
                  {/* Service Badge */}
                  <motion.div
                    className="flex items-center gap-2 justify-center mb-6"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center gap-1.5 text-[#6b4b3e] bg-[#e8dbc9]/30 px-4 py-1.5 rounded-full text-xs font-medium">
                      {testimonials[currentIndex].serviceIcon}
                      <span>{testimonials[currentIndex].service}</span>
                    </div>
                  </motion.div>

                  {/* Rating Stars */}
                  <motion.div
                    className="flex gap-1.5 mb-8 justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 200 }}
                        whileHover={{ scale: 1.2, rotate: 15 }}
                      >
                        <FaStar className="text-[#eeab54] text-2xl drop-shadow-sm" />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Testimonial Text */}
                  <motion.p
                    className="text-xl md:text-2xl text-[#3e2e3d] italic leading-relaxed mb-10 text-center font-light max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    &ldquo;{testimonials[currentIndex].feedbackParts ? (
                      testimonials[currentIndex].feedbackParts.map((part, idx) => 
                        part.isDure ? <DureText key={idx} /> : part.text
                      )
                    ) : (
                      testimonials[currentIndex].feedback
                    )}&rdquo;
                  </motion.p>

                  {/* Author Section */}
                  <motion.div
                    className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                  >
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full border-[3px] border-[#e8dbc9] bg-gradient-to-br from-[#f9f4ef] via-[#e8dbc9]/40 to-[#d8c7b7]/30 flex items-center justify-center text-[#3e2e3d] font-semibold text-xl shadow-lg">
                        {testimonials[currentIndex].initials}
                      </div>
                      {testimonials[currentIndex].verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#6b4b3e] rounded-full flex items-center justify-center border-2 border-white shadow-md">
                          <FaCheckCircle className="text-white text-xs" />
                        </div>
                      )}
                    </div>
                    <div className="text-center md:text-left">
                      <div className="flex items-center gap-2 justify-center md:justify-start">
                        <p className="text-lg text-[#3e2e3d] font-semibold">
                          {testimonials[currentIndex].name}
                        </p>
                        {testimonials[currentIndex].verified && (
                          <span className="text-xs text-[#6b4b3e] bg-[#e8dbc9]/30 px-2 py-0.5 rounded-full font-medium">
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#77625a] mt-1">{testimonials[currentIndex].date}</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Enhanced Navigation Arrows */}
          <motion.button
            onClick={prevTestimonial}
            className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/95 backdrop-blur-md border-2 border-[#e6dede] shadow-xl flex items-center justify-center text-[#3e2e3d] hover:bg-[#e8dbc9]/30 hover:border-[#e8dbc9] transition-all z-20 group"
            aria-label="Previous testimonial"
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaChevronLeft className="group-hover:scale-125 transition-transform text-lg" />
          </motion.button>
          <motion.button
            onClick={nextTestimonial}
            className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/95 backdrop-blur-md border-2 border-[#e6dede] shadow-xl flex items-center justify-center text-[#3e2e3d] hover:bg-[#e8dbc9]/30 hover:border-[#e8dbc9] transition-all z-20 group"
            aria-label="Next testimonial"
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaChevronRight className="group-hover:scale-125 transition-transform text-lg" />
          </motion.button>
        </div>

        {/* Enhanced Dots Indicator */}
        <motion.div
          className="flex justify-center items-center gap-3 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`relative rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-[#6b4b3e] w-10 h-2"
                  : "bg-[#d8c7b7] w-2 h-2 hover:bg-[#e8dbc9] hover:w-8"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {index === currentIndex && (
                <motion.div
                  className="absolute inset-0 bg-[#6b4b3e] rounded-full"
                  layoutId="activeDot"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Testimonial Counter */}
        <motion.div
          className="text-center mt-8 text-sm text-[#77625a]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          {currentIndex + 1} of {testimonials.length}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
