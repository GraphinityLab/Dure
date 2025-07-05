import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const faqCategories = [
  {
    slug: "general",
    category: "General Services",
    items: [
      {
        question: "What services do you offer?",
        answer:
          "We offer a wide range of beauty and wellness services including facials, massages, laser hair removal, waxing, eyebrows, customized nail art, makeup, hairstyling, and signature bridal packages. We also feature a photography room for glam sessions and transformations."
      },
      {
        question: "Are walk-ins allowed, or do I need an appointment?",
        answer:
          "Appointments are highly recommended to ensure your preferred time and specialist are available. Walk-ins are welcome but subject to availability."
      },
      {
        question: "What products do you use?",
        answer:
          "We use top-tier, professional-grade products approved by dermatologists and trusted globally. Our skincare lines are tailored for all skin types, including sensitive and acne-prone."
      },
      {
        question: "What’s different about your clinic?",
        answer:
          "We offer all-in-one services under one roof in a warm, empowering environment. We focus on beauty with purpose, making clients feel seen, beautiful, and confident from the inside out."
      }
    ]
  },
  {
    slug: "skincare",
    category: "Skin Care & Facials",
    items: [
      {
        question: "Do you offer facials for sensitive or acne-prone skin?",
        answer:
          "Yes. We provide customized facials for sensitive, acne-prone, and rosacea-prone skin. Our team performs a skin analysis before every treatment to ensure safety and results."
      },
      {
        question: "How often should I get a facial?",
        answer:
          "Ideally every 4-6 weeks. For specific issues like acne or hyperpigmentation, a series of targeted treatments may be recommended."
      },
      {
        question: "Can I book a facial before a big event or makeup session?",
        answer:
          "Absolutely! We recommend booking your facial 3-5 days before any big event to allow your skin to glow and settle beautifully."
      }
    ]
  },
  {
    slug: "bridal",
    category: "Bridal & Special Event Services",
    items: [
      {
        question: "Do you offer bridal makeup and hairstyling?",
        answer:
          "Yes! We specialize in signature bridal makeup, hairstyling, and pre-wedding treatments. Our bridal packages can include facials, waxing, nails, trial sessions, and photoshoots."
      },
      {
        question: "How early should I book for my wedding or special event?",
        answer:
          "For bridal clients, we recommend booking at least 6-8 weeks in advance. Trials and consultations can be scheduled earlier to plan the look and treatments in advance."
      },
      {
        question: "Do you travel for bridal appointments?",
        answer:
          "Yes, we offer on-location bridal services within Markham and surrounding areas for an additional travel fee."
      }
    ]
  },
  {
    slug: "laser",
    category: "Laser Hair Removal",
    items: [
      {
        question: "Is laser hair removal safe for all skin tones?",
        answer:
          "Yes! We use advanced, medical-grade laser systems that are safe for a wide range of skin tones and hair types."
      },
      {
        question: "How many sessions are needed for permanent results?",
        answer:
          "On average, 6-8 sessions are recommended for best results, with occasional maintenance depending on the area and hair type."
      },
      {
        question: "Does laser hair removal hurt?",
        answer:
          "Most clients describe the sensation as a mild snapping feeling. We offer numbing creams and use cooling systems to make the process as comfortable as possible."
      },
      {
        question: "Can I wax or shave between laser sessions?",
        answer:
          "You should avoid waxing or plucking between sessions, but shaving is allowed and often encouraged to maintain results without disrupting the follicle."
      }
    ]
  },
  {
    slug: "nails",
    category: "Nails & Customization",
    items: [
      {
        question: "Do you offer customized nail art?",
        answer:
          "Yes! From subtle elegance to full themed nail sets, our artists specialize in custom nail designs tailored to your taste, season, or event."
      },
      {
        question: "How long do gel extensions or nail art last?",
        answer:
          "Typically 3-4 weeks with proper care. We also offer refill and repair services if needed."
      }
    ]
  }
];

const FAQPage = () => {
  const location = useLocation();
  const activeTab = location.pathname.split("/").pop();
  const selectedCategory =
    faqCategories.find((c) => c.slug === activeTab) || faqCategories[0];
  const [expanded, setExpanded] = useState(null);

  const toggleAccordion = (idx) => {
    setExpanded(expanded === idx ? null : idx);
  };

  return (
    <section className="relative overflow-hidden py-24 px-6 text-[#3e2e3d]"
      > <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-[Soligant] mb-10 text-center"
        >
          Frequently Asked Questions
        </motion.h1>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {faqCategories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/faq/${cat.slug}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeTab === cat.slug
                  ? "bg-[#3e2e3d] text-white border-[#3e2e3d]"
                  : "bg-white/60 border-[#ecdede] hover:bg-[#f1eaea]"
              }`}
            >
              {cat.category}
            </Link>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {selectedCategory.items.map((faq, idx) => (
            <motion.div
              key={idx}
              layout
              className="bg-white/60 border border-[#ecdede] p-5 sm:p-6 rounded-xl shadow-md backdrop-blur-md cursor-pointer"
              onClick={() => toggleAccordion(idx)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
            >
              <h3 className="text-base sm:text-lg font-semibold flex justify-between items-center">
                {faq.question}
                <span className="text-xl">{expanded === idx ? "−" : "+"}</span>
              </h3>
              <AnimatePresence>
                {expanded === idx && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-sm sm:text-base text-[#5e4a56] mt-3"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-base mb-4">Still have questions? We’re here to help.</p>
          <Link
            to="/contact"
            className="inline-block bg-[#3e2e3d] text-white px-6 py-3 rounded-full hover:bg-[#5c4a5a] transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQPage;
