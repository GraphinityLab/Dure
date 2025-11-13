import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiChevronDown, FiSearch, FiX } from "react-icons/fi";
import { 
  FaQuestionCircle, 
  FaHandSparkles, 
  FaSpa, 
  FaLeaf, 
  FaHeart, 
  FaSnowflake,
  FaStar
} from "react-icons/fa";
import { GiFingernail } from "react-icons/gi";

const faqCategories = [
  {
    slug: "general",
    category: "General Services",
    icon: <FaSpa className="text-xl" />,
    color: "from-[#6b4b3e] to-[#8b6f5e]",
    items: [
      {
        question: "What services do you offer?",
        answer:
          "We offer a wide range of beauty and wellness services including facials, massages, laser hair removal, waxing, eyebrows, customized nail art, makeup, hairstyling, and signature bridal packages. We also feature a photography room for glam sessions and transformations.",
        popular: true
      },
      {
        question: "Are walk-ins allowed, or do I need an appointment?",
        answer:
          "Appointments are highly recommended to ensure your preferred time and specialist are available. Walk-ins are welcome but subject to availability. You can book online through our website or call us directly.",
        popular: true
      },
      {
        question: "What products do you use?",
        answer:
          "We use top-tier, professional-grade products approved by dermatologists and trusted globally. Our skincare lines are tailored for all skin types, including sensitive and acne-prone. All products are carefully selected for their quality, safety, and effectiveness.",
        popular: false
      },
      {
        question: "What's different about your clinic?",
        answer:
          "We offer all-in-one services under one roof in a warm, empowering environment. We focus on beauty with purpose, making clients feel seen, beautiful, and confident from the inside out. Our team is dedicated to personalized care and creating a luxurious experience for every client.",
        popular: false
      },
      {
        question: "What are your operating hours?",
        answer:
          "Our hours vary by day. Please check our booking system for current availability or contact us directly. We typically operate Tuesday through Sunday with extended hours on weekends.",
        popular: false
      },
      {
        question: "Do you offer gift cards?",
        answer:
          "Yes! Gift cards are available for purchase in any amount and make perfect gifts for birthdays, holidays, or special occasions. They can be used for any service or product we offer.",
        popular: false
      },
      {
        question: "What is your cancellation policy?",
        answer:
          "We require at least 24 hours notice for cancellations or rescheduling. Late cancellations or no-shows may be subject to a fee. We understand emergencies happen, so please contact us as soon as possible.",
        popular: true
      }
    ]
  },
  {
    slug: "skincare",
    category: "Skin Care & Facials",
    icon: <FaLeaf className="text-xl" />,
    color: "from-[#5a7d5a] to-[#6b9a6b]",
    items: [
      {
        question: "Do you offer facials for sensitive or acne-prone skin?",
        answer:
          "Yes. We provide customized facials for sensitive, acne-prone, and rosacea-prone skin. Our team performs a skin analysis before every treatment to ensure safety and results. We use gentle, non-irritating products specifically formulated for sensitive skin types.",
        popular: true
      },
      {
        question: "How often should I get a facial?",
        answer:
          "Ideally every 4-6 weeks. For specific issues like acne or hyperpigmentation, a series of targeted treatments may be recommended. Your esthetician will create a personalized treatment plan based on your skin's needs.",
        popular: true
      },
      {
        question: "Can I book a facial before a big event or makeup session?",
        answer:
          "Absolutely! We recommend booking your facial 3-5 days before any big event to allow your skin to glow and settle beautifully. This timing ensures optimal results without any redness or sensitivity on your special day.",
        popular: false
      },
      {
        question: "What should I expect during my first facial?",
        answer:
          "Your first facial includes a comprehensive skin analysis, cleansing, exfoliation, extraction (if needed), mask application, and moisturizing. The entire process takes about 60-90 minutes. Your esthetician will discuss your skin concerns and recommend products and treatments.",
        popular: false
      },
      {
        question: "Can I wear makeup after a facial?",
        answer:
          "We recommend waiting at least 6-8 hours before applying makeup to allow your skin to fully absorb the treatment benefits. If you must wear makeup sooner, use mineral-based products and avoid heavy foundations.",
        popular: false
      },
      {
        question: "Do you offer chemical peels?",
        answer:
          "Yes, we offer various types of chemical peels tailored to your skin type and concerns. These treatments can help with acne, fine lines, hyperpigmentation, and overall skin texture. A consultation is required to determine the best peel for you.",
        popular: false
      }
    ]
  },
  {
    slug: "bridal",
    category: "Bridal & Special Event Services",
    icon: <FaHeart className="text-xl" />,
    color: "from-[#b8866b] to-[#d4a574]",
    items: [
      {
        question: "Do you offer bridal makeup and hairstyling?",
        answer:
          "Yes! We specialize in signature bridal makeup, hairstyling, and pre-wedding treatments. Our bridal packages can include facials, waxing, nails, trial sessions, and photoshoots. We work closely with you to create your perfect wedding day look.",
        popular: true
      },
      {
        question: "How early should I book for my wedding or special event?",
        answer:
          "For bridal clients, we recommend booking at least 6-8 weeks in advance. Trials and consultations can be scheduled earlier to plan the look and treatments in advance. Popular dates book up quickly, so early booking is encouraged.",
        popular: true
      },
      {
        question: "Do you travel for bridal appointments?",
        answer:
          "Yes, we offer on-location bridal services within Markham and surrounding areas for an additional travel fee. This includes full bridal party services. Contact us to discuss your location and requirements.",
        popular: false
      },
      {
        question: "What's included in a bridal trial session?",
        answer:
          "A bridal trial includes a consultation to discuss your vision, a full makeup and hairstyling application, and time to make any adjustments. Photos are taken for reference. Trials typically last 2-3 hours and are essential for ensuring your perfect wedding day look.",
        popular: false
      },
      {
        question: "Can you accommodate bridal parties?",
        answer:
          "Absolutely! We can accommodate bridal parties of any size. We offer group packages and can coordinate multiple stylists to ensure everyone is ready on time. Early booking is essential for large parties.",
        popular: false
      },
      {
        question: "Do you offer pre-wedding skincare packages?",
        answer:
          "Yes! We offer comprehensive pre-wedding skincare packages that include facials, treatments, and home care recommendations. These packages are designed to ensure your skin looks its absolute best on your wedding day.",
        popular: false
      }
    ]
  },
  {
    slug: "laser",
    category: "Laser Hair Removal",
    icon: <FaSnowflake className="text-xl" />,
    color: "from-[#6b7d9e] to-[#8b9db8]",
    items: [
      {
        question: "Is laser hair removal safe for all skin tones?",
        answer:
          "Yes! We use advanced, medical-grade laser systems that are safe for a wide range of skin tones and hair types. Our technology includes different wavelengths to effectively treat various skin and hair combinations safely.",
        popular: true
      },
      {
        question: "How many sessions are needed for permanent results?",
        answer:
          "On average, 6-8 sessions are recommended for best results, with occasional maintenance depending on the area and hair type. Hair grows in cycles, so multiple sessions ensure all hair follicles are treated during their active growth phase.",
        popular: true
      },
      {
        question: "Does laser hair removal hurt?",
        answer:
          "Most clients describe the sensation as a mild snapping feeling, similar to a rubber band. We offer numbing creams and use advanced cooling systems to make the process as comfortable as possible. Discomfort varies by individual and treatment area.",
        popular: true
      },
      {
        question: "Can I wax or shave between laser sessions?",
        answer:
          "You should avoid waxing or plucking between sessions, as these methods remove the hair follicle that the laser needs to target. Shaving is allowed and often encouraged to maintain results without disrupting the follicle.",
        popular: false
      },
      {
        question: "How long do I need to wait between sessions?",
        answer:
          "Typically, sessions are spaced 4-6 weeks apart for facial areas and 6-8 weeks for body areas. Your technician will create a personalized schedule based on your hair growth cycle and treatment area.",
        popular: false
      },
      {
        question: "What should I avoid before and after treatment?",
        answer:
          "Before treatment: avoid sun exposure, tanning beds, and self-tanners for at least 2 weeks. After treatment: avoid hot showers, saunas, and intense exercise for 24 hours. Always use SPF 30+ on treated areas when exposed to sun.",
        popular: false
      },
      {
        question: "Can I get laser hair removal if I'm pregnant?",
        answer:
          "We do not perform laser hair removal on pregnant clients as a precautionary measure. We recommend waiting until after pregnancy and breastfeeding. Please consult with your healthcare provider if you have questions.",
        popular: false
      }
    ]
  },
  {
    slug: "nails",
    category: "Nails & Customization",
    icon: <GiFingernail className="text-xl" />,
    color: "from-[#c99a8e] to-[#d4a99d]",
    items: [
      {
        question: "Do you offer customized nail art?",
        answer:
          "Yes! From subtle elegance to full themed nail sets, our artists specialize in custom nail designs tailored to your taste, season, or event. Bring in inspiration photos or describe your vision, and we'll bring it to life.",
        popular: true
      },
      {
        question: "How long do gel extensions or nail art last?",
        answer:
          "Typically 3-4 weeks with proper care. We also offer refill and repair services if needed. The longevity depends on your daily activities, nail growth rate, and how well you maintain them.",
        popular: true
      },
      {
        question: "What's the difference between gel and acrylic nails?",
        answer:
          "Gel nails are more flexible and natural-looking, cured under UV light, and generally easier to remove. Acrylic nails are stronger and more durable, better for those with weak nails. Your technician can help you choose based on your lifestyle and preferences.",
        popular: false
      },
      {
        question: "Can I get nail art on natural nails?",
        answer:
          "Absolutely! We offer beautiful nail art on natural nails, whether you prefer a simple design or something more elaborate. We can also do gel polish on natural nails for longer-lasting color.",
        popular: false
      },
      {
        question: "How do I maintain my nail extensions?",
        answer:
          "Keep your nails dry for the first 24 hours after application. Use cuticle oil daily, wear gloves when doing dishes or cleaning, and avoid using your nails as tools. Schedule regular fills every 2-3 weeks to maintain the look.",
        popular: false
      }
    ]
  }
];

const FAQPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeSlug = location.pathname.split("/").pop();
  const selected = faqCategories.find(c => c.slug === activeSlug) || faqCategories[0];
  const [expanded, setExpanded] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopular, setShowPopular] = useState(false);
  const [expandedSearch, setExpandedSearch] = useState(new Set());
  const searchInputRef = useRef(null);

  // Get all popular FAQs across all categories
  const popularFAQs = useMemo(() => {
    return faqCategories.flatMap(cat => 
      cat.items
        .filter(item => item.popular)
        .map(item => ({ ...item, category: cat.category, categorySlug: cat.slug, categoryIcon: cat.icon }))
    );
  }, []);

  // Filter FAQs based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return selected.items;
    const query = searchQuery.toLowerCase();
    return selected.items.filter(
      faq => 
        faq.question.toLowerCase().includes(query) || 
        faq.answer.toLowerCase().includes(query)
    );
  }, [selected, searchQuery]);

  // Search across all categories
  const allSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return faqCategories.flatMap(cat =>
      cat.items
        .filter(faq => 
          faq.question.toLowerCase().includes(query) || 
          faq.answer.toLowerCase().includes(query)
        )
        .map(item => ({ ...item, category: cat.category, categorySlug: cat.slug, categoryIcon: cat.icon }))
    );
  }, [searchQuery]);

  const toggle = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "/" && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setSearchQuery("");
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto-expand first item when category changes
  useEffect(() => {
    if (filteredItems.length > 0 && expanded === null) {
      setExpanded(0);
    }
  }, [selected.slug, filteredItems.length]);

  const displayItems = searchQuery.trim() ? allSearchResults : filteredItems;
  const isSearchMode = searchQuery.trim().length > 0;

  return (
    <section className="relative w-full py-20 md:py-32 px-4 sm:px-6 text-[#3e2e3d] pb-40 min-h-screen">
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

      <div className="relative max-w-6xl mx-auto z-10">
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
          
          <motion.div
            className="flex items-center justify-center gap-3 md:gap-4 mb-6 flex-wrap"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <FaQuestionCircle className="text-[#6b4b3e] text-2xl md:text-3xl" />
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-[Soligant] text-center tracking-tight bg-gradient-to-b from-[#3e2e3d] to-[#5f4b5a] bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <FaHandSparkles className="text-[#6b4b3e] text-2xl md:text-3xl" />
          </motion.div>

          <motion.p
            className="text-base md:text-lg text-[#5f4b5a] max-w-2xl mx-auto mb-8 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Find answers to common questions about our services, treatments, and booking process
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

        {/* Premium Search Bar - Enhanced */}
        <motion.div
          className="mb-8 md:mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="relative group">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#e8dbc9]/20 to-[#d8c7b7]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
            />
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-[#6b4b3e] text-xl z-10 transition-transform group-hover:scale-110" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search FAQs... (Press '/' to focus)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-12 py-4 rounded-2xl bg-white/95 backdrop-blur-sm border-2 border-[#e6dede]/50 focus:border-[#6b4b3e] focus:outline-none text-[#3e2e3d] placeholder:text-[#9a8a8a] shadow-lg hover:shadow-xl focus:shadow-2xl transition-all duration-300 text-base"
            />
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b4b3e] hover:text-[#3e2e3d] transition-all p-1 rounded-full hover:bg-[#e8dbc9]/30"
                aria-label="Clear search"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX size={20} />
              </motion.button>
            )}
            {searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white/98 backdrop-blur-md rounded-xl shadow-2xl border border-[#e6dede]/50 p-4 z-20"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-[#5f4b5a]">
                    Found <span className="font-semibold text-[#6b4b3e]">{allSearchResults.length}</span> result{allSearchResults.length !== 1 ? "s" : ""}
                  </p>
                  {allSearchResults.length > 0 && (
                    <span className="text-xs text-[#9a8a8a]">Press ESC to clear</span>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Premium Popular FAQs Section - Enhanced */}
        {!searchQuery && !showPopular && popularFAQs.length > 0 && (
          <motion.div
            className="mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <FaStar className="text-[#6b4b3e] text-xl" />
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-[Soligant] text-[#3e2e3d]">
                  Most Popular Questions
                </h2>
              </div>
              <motion.button
                onClick={() => setShowPopular(true)}
                className="text-sm text-[#6b4b3e] hover:text-[#3e2e3d] transition-colors font-medium flex items-center gap-1 group"
                whileHover={{ x: 4 }}
              >
                View All
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {popularFAQs.slice(0, 6).map((faq, idx) => (
                <motion.div
                  key={`popular-${idx}`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + idx * 0.05 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative bg-white/95 backdrop-blur-sm border border-[#e6dede]/50 rounded-xl p-5 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
                  onClick={() => {
                    const category = faqCategories.find(c => c.slug === faq.categorySlug);
                    if (category) {
                      navigate(`/faq/${faq.categorySlug}`);
                      setTimeout(() => {
                        const itemIndex = category.items.findIndex(item => item.question === faq.question);
                        if (itemIndex !== -1) {
                          setExpanded(itemIndex);
                        }
                      }, 100);
                    }
                  }}
                >
                  {/* Enhanced gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#e8dbc9]/0 to-[#d8c7b7]/0 group-hover:from-[#e8dbc9]/15 group-hover:to-[#d8c7b7]/10 transition-all duration-500 rounded-xl" />
                  
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#e8dbc9]/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[#d8c7b7]/10 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Popular badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#f5d142] to-[#f5b142] text-[10px] font-bold text-[#3e2e3d] shadow-sm">
                      <FaStar className="text-[8px]" />
                      <span>Popular</span>
                    </div>
                  </div>
                  
                  <div className="relative z-10 flex items-start gap-3 mb-3">
                    <motion.div 
                      className="text-[#6b4b3e] mt-1 flex-shrink-0"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                    >
                      {faq.categoryIcon}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#9a8a8a] mb-1.5 font-medium uppercase tracking-wide">{faq.category}</p>
                      <h3 className="text-base font-semibold text-[#3e2e3d] group-hover:text-[#6b4b3e] transition-colors line-clamp-2 leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-[#5f4b5a] line-clamp-2 mt-2 leading-relaxed relative z-10">
                    {faq.answer}
                  </p>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Premium Category Tabs - Enhanced */}
        {!searchQuery && (
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {faqCategories.map((cat, idx) => {
              const isActive = activeSlug === cat.slug;
              return (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + idx * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={`/faq/${cat.slug}`}
                    onClick={() => {
                      setSearchQuery("");
                      setExpandedSearch(new Set());
                    }}
                    className={`group flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-full text-sm font-medium shadow-lg transition-all duration-300 relative overflow-hidden ${
                      isActive
                        ? `bg-gradient-to-r ${cat.color} text-white shadow-xl`
                        : "bg-white/95 backdrop-blur-sm text-[#3e2e3d] border border-[#e6dede]/50 hover:bg-[#e8dbc9]/20 hover:border-[#e8dbc9] hover:shadow-xl"
                    }`}
                  >
                    {/* Subtle glow effect for active tab */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r opacity-20 blur-md"
                        animate={{ opacity: [0.2, 0.3, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <motion.span
                        animate={isActive ? { rotate: [0, 10, -10, 0] } : {}}
                        transition={{ duration: 2, repeat: isActive ? Infinity : 0, repeatDelay: 3 }}
                      >
                        {cat.icon}
                      </motion.span>
                      <span className="hidden sm:inline">{cat.category}</span>
                      <span className="sm:hidden">{cat.category.split(" ")[0]}</span>
                    </span>
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity"
                        layoutId="activeTab"
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Search Results Header */}
        {isSearchMode && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl md:text-3xl font-[Soligant] text-[#3e2e3d] mb-2">
              Search Results
            </h2>
            <p className="text-[#5f4b5a]">
              Found {allSearchResults.length} result{allSearchResults.length !== 1 ? "s" : ""} for "{searchQuery}"
            </p>
          </motion.div>
        )}

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          <AnimatePresence>
            {displayItems.length > 0 ? (
              displayItems.map((faq, i) => {
                const actualIndex = i;
                const searchKey = isSearchMode ? `${faq.categorySlug}-${faq.question}` : null;
                const isExpanded = isSearchMode 
                  ? expandedSearch.has(searchKey)
                  : expanded === actualIndex;
                const categoryInfo = isSearchMode 
                  ? faqCategories.find(c => c.slug === faq.categorySlug)
                  : selected;

                return (
                  <motion.div
                    key={isSearchMode ? `search-${i}` : `${selected.slug}-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: i * 0.03 }}
                    className="group relative bg-white/95 backdrop-blur-sm border border-[#e6dede]/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  >
                    {/* Category badge for search results - Enhanced */}
                    {isSearchMode && (
                      <motion.div 
                        className="absolute top-4 right-4 z-20"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Link
                          to={`/faq/${faq.categorySlug}`}
                          onClick={() => {
                            setSearchQuery("");
                            setExpandedSearch(new Set());
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e8dbc9]/30 text-xs font-medium text-[#6b4b3e] hover:bg-[#e8dbc9]/50 transition-all shadow-sm hover:shadow-md hover:scale-105"
                        >
                          {faq.categoryIcon}
                          <span className="hidden sm:inline">{faq.category}</span>
                          <span className="sm:hidden">View</span>
                        </Link>
                      </motion.div>
                    )}

                    {/* Enhanced premium gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#e8dbc9]/0 via-[#d8c7b7]/0 to-[#e8dbc9]/0 group-hover:from-[#e8dbc9]/12 group-hover:via-[#d8c7b7]/8 group-hover:to-[#e8dbc9]/12 transition-all duration-500 rounded-2xl" />
                    
                    {/* Enhanced decorative corner accents */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#e8dbc9]/25 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-[#d8c7b7]/15 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Enhanced Popular badge */}
                    {faq.popular && (
                      <motion.div 
                        className="absolute top-4 left-4 z-20"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#f5d142] via-[#f5c142] to-[#f5b142] text-xs font-bold text-[#3e2e3d] shadow-lg">
                          <motion.div
                            animate={{ rotate: [0, 15, -15, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                          >
                            <FaStar className="text-[10px]" />
                          </motion.div>
                          <span>Popular</span>
                        </div>
                      </motion.div>
                    )}

                    <motion.button
                      onClick={() => {
                        if (isSearchMode) {
                          // Toggle search result expansion
                          const newSet = new Set(expandedSearch);
                          if (newSet.has(searchKey)) {
                            newSet.delete(searchKey);
                          } else {
                            newSet.add(searchKey);
                          }
                          setExpandedSearch(newSet);
                        } else {
                          toggle(i);
                        }
                      }}
                      className="w-full text-left px-6 py-5 flex justify-between items-center font-semibold text-base sm:text-lg focus:outline-none relative z-10 group/button pr-12 transition-all"
                      aria-expanded={isExpanded}
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className={`text-[#3e2e3d] group-hover/button:text-[#6b4b3e] transition-colors flex-1 leading-relaxed ${isSearchMode ? 'pr-2' : ''} ${faq.popular ? 'pl-16' : ''}`}>
                        {faq.question}
                      </span>
                      <motion.span
                        className="text-[#6b4b3e] flex-shrink-0 transition-colors group-hover/button:text-[#3e2e3d]"
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        whileHover={{ scale: 1.2 }}
                      >
                        <FiChevronDown size={20} />
                      </motion.span>
                    </motion.button>
                    
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ 
                            duration: 0.4, 
                            ease: [0.4, 0, 0.2, 1],
                            height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                            opacity: { duration: 0.3 }
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-[#5f4b5a] leading-relaxed relative z-10">
                            <div className="border-l-2 border-[#e8dbc9]/50 pl-4 ml-2">
                              {faq.answer}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Enhanced shine effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                    </div>
                    
                    {/* Subtle border glow on hover */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 rounded-2xl border-2 border-[#e8dbc9]/30" />
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-16"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  <FaQuestionCircle className="text-6xl text-[#e8dbc9] mx-auto mb-4" />
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-[Soligant] text-[#3e2e3d] mb-3">
                  No results found
                </h3>
                <p className="text-[#5f4b5a] mb-8 max-w-md mx-auto">
                  Try searching with different keywords or browse our categories above.
                </p>
                <motion.button
                  onClick={() => setSearchQuery("")}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-[#3e2e3d] to-[#5f4b5a] text-white font-medium hover:shadow-xl transition-all relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Clear Search</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#5f4b5a] to-[#6b4b3e]"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Premium CTA - Enhanced */}
        <motion.div
          className="mt-20 md:mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="relative inline-block mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#6b4b3e] to-transparent" />
          </motion.div>
          
          <motion.p
            className="text-lg md:text-xl text-[#5f4b5a] mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Still have questions? We're here to help.
          </motion.p>
          
          <motion.div
            className="relative inline-block"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Enhanced animated glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#e8dbc9] to-[#d8c7b7] rounded-full blur-xl opacity-50"
              animate={{ 
                scale: [1, 1.15, 1],
                opacity: [0.5, 0.7, 0.5]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#d8c7b7] to-[#e8dbc9] rounded-full blur-2xl opacity-30"
              animate={{ 
                scale: [1.1, 1, 1.1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            />
            <Link
              to="/contact"
              className="relative inline-flex items-center gap-3 px-8 md:px-10 py-3 md:py-4 rounded-full bg-gradient-to-r from-[#3e2e3d] to-[#5f4b5a] text-white font-medium text-base shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden"
            >
              <motion.span
                className="relative z-10"
                whileHover={{ x: -2 }}
              >
                Contact Us
              </motion.span>
              <motion.span
                className="relative z-10"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
              {/* Hover gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#5f4b5a] to-[#6b4b3e]"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>

          <motion.div
            className="relative inline-block mt-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#6b4b3e] to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQPage;