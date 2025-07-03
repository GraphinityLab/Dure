import React from "react";
import { motion } from "framer-motion";

const Book = () => {
    return (
        <section
            id="book"
            className="relative overflow-hidden py-24 px-6 bg-gradient-to-b from-[#fdf6f6]/100 to-transparent  text-[#3e2e3d]"
        >
            {/* Decorative Blurs */}
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
                <h2 className="text-4xl md:text-5xl font-serif mb-4 tracking-tight relative">
                    <span className="relative z-10">Book an Appointment</span>
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-[2px] bg-[#3e2e3d] rounded-full opacity-40" />
                </h2>
                <p className="max-w-2xl mx-auto text-base md:text-lg text-[#5f4b5a]">
                    Reserve your session with our team and enjoy personalized care in a serene environment.
                </p>
            </motion.div>

            {/* Booking Form */}
            <div className="max-w-3xl mx-auto bg-white/80 p-8 rounded-3xl shadow-lg border border-[#e6dede] backdrop-blur-lg">
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm mb-1 font-medium text-[#3e2e3d]">Full Name</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 border border-[#e6dede] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#3e2e3d] bg-white/70"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1 font-medium text-[#3e2e3d]">Phone</label>
                            <input
                                type="tel"
                                required
                                className="w-full px-4 py-3 border border-[#e6dede] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#3e2e3d] bg-white/70"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm mb-1 font-medium text-[#3e2e3d]">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-3 border border-[#e6dede] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#3e2e3d] bg-white/70"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1 font-medium text-[#3e2e3d]">Preferred Service</label>
                            <select
                                required
                                className="w-full px-4 py-3 border border-[#e6dede] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#3e2e3d] bg-white/70"
                            >
                                <option value="">Select a Service</option>
                                <option value="Facial">Facial Treatment</option>
                                <option value="Massage">Body Massage</option>
                                <option value="Skin Therapy">Skin Therapy</option>
                                <option value="Waxing">Waxing</option>
                                <option value="Consultation">Aesthetic Consultation</option>
                                <option value="Rituals">Healing Ritual</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm mb-1 font-medium text-[#3e2e3d]">Preferred Date</label>
                            <input
                                type="date"
                                required
                                className="w-full px-4 py-3 border border-[#e6dede] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#3e2e3d] bg-white/70"
                            />
                        </div>
                        <div>
                            <label className="block text-sm mb-1 font-medium text-[#3e2e3d]">Preferred Time</label>
                            <input
                                type="time"
                                required
                                className="w-full px-4 py-3 border border-[#e6dede] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#3e2e3d] bg-white/70"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm mb-1 font-medium text-[#3e2e3d]">Additional Notes</label>
                        <textarea
                            rows="4"
                            className="w-full px-4 py-3 border border-[#e6dede] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3e2e3d] bg-white/70"
                            placeholder="Let us know anything else you'd like to share..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-4 px-6 py-3 rounded-full bg-[#3e2e3d] text-white hover:bg-[#5f4b5a] transition font-medium text-sm uppercase tracking-wide"
                    >
                        Confirm Booking
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Book;
