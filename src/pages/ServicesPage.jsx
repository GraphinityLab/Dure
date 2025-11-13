// src/components/ServicesPage.jsx
// This component displays salon services, fetching them dynamically from the backend API.
// It is now styled to visually match the live version, with services appearing directly
// on the page's background, without an explicit white container box.

import React, { useEffect, useState } from "react";
import axiosInstance from '../utils/axiosInstance';
import {
    FaSpa,
    FaFeatherAlt,
    FaLeaf,
    FaCameraRetro,
    FaSnowflake,
    FaClock,
    FaSearch,
    FaTimes,
    FaCalendarCheck,
    FaStar,
} from "react-icons/fa";
import { FaScissors } from "react-icons/fa6";
import { GiFingernail } from "react-icons/gi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { saveSelectedService } from "../utils/serviceStorage";

const getCategoryIcon = (category) => {
    switch (category) {
        case "Facials & Skin Treatments": return <FaLeaf size={20} />;
        case "Massage Therapy": return <FaSpa size={20} />;
        case "Nail Services": return <GiFingernail size={20} />;
        case "Makeup Services": return <FaSnowflake size={20} />;
        case "Waxing & Hair Removal": return <FaFeatherAlt size={20} />;
        case "Hairstyling": return <FaScissors size={20} />;
        case "Photography Studio Add-On": return <FaCameraRetro size={20} />;
        default: return null;
    }
};

const ServicesPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const slug = decodeURIComponent(location.pathname.split("/").pop() || "all");
    const activeTab = slug === "services" ? "all" : slug;

    const [servicesData, setServicesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    // New state for the modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    // Function to handle booking - navigates to book page with service
    const handleBookNow = (service) => {
        // Save to localStorage for persistence
        saveSelectedService({
            service_id: service.service_id,
            name: service.name,
            price: service.price,
            category: service.category,
            duration: service.duration_minutes || ''
        });
        
        const serviceParams = new URLSearchParams({
            service_id: service.service_id,
            name: service.name,
            price: service.price,
            category: service.category,
            duration: service.duration_minutes || ''
        });
        navigate(`/book-now?${serviceParams.toString()}`);
    };

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axiosInstance.get('/services');
                setServicesData(response.data);
            } catch (err) {
                console.error("Error fetching services:", err);
                setError("Failed to load services. Please ensure the backend is running and accessible.");
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);


    const groupedServices = servicesData.reduce((acc, service) => {
        const category = service.category || "Uncategorized";

        if (!acc[category]) {
            acc[category] = { category, icon: getCategoryIcon(category), items: [] };
        }
        acc[category].items.push(service);
        return acc;
    }, {});

    const categoriesForDisplay = Object.values(groupedServices);
    const allCategoryItems = categoriesForDisplay.flatMap(cat => cat.items);
    const finalAllServices = [{ category: "All", icon: null, items: allCategoryItems }, ...categoriesForDisplay];

    const selectedServices = activeTab === "all"
        ? finalAllServices.slice(1)
        : finalAllServices.filter(s => s.category.toLowerCase().replace(/\s+/g, "-") === activeTab);

    // Filter services by search query
    const filteredServices = selectedServices.map(category => ({
        ...category,
        items: category.items.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description?.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(category => category.items.length > 0);

    // Function to open the modal with service details
    const openModal = (service) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedService(null);
    };

    // Render loading or error states
    if (loading) {
        return (
            <section className="relative py-32 px-6 text-[#3e2e3d] text-center min-h-screen w-full">
                <div className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply bg-[url('/bg-texture.png')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#f9f4ef]/50 via-transparent to-[#fdfaf7]/30" />
                <div className="absolute top-20 left-10 w-72 h-72 bg-[#e8dbc9]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d8c7b7]/10 rounded-full blur-3xl" />
                
                <div className="relative max-w-6xl mx-auto z-10 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col items-center justify-center min-h-[60vh]">
                    <motion.div
                        className="w-16 h-16 border-4 border-[#e8dbc9] border-t-[#6b4b3e] rounded-full mb-6"
                        initial={false}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <p className="text-xl font-[Soligant] text-[#3e2e3d]">
                        Loading our premium services...
                    </p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="relative py-32 px-6 text-[#3e2e3d] text-center min-h-screen w-full">
                <div className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply bg-[url('/bg-texture.png')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#f9f4ef]/50 via-transparent to-[#fdfaf7]/30" />
                <div className="relative max-w-6xl mx-auto z-10 p-4 sm:p-6 md:p-8 lg:p-10 text-red-600">
                    <p>{error}</p>
                    <p>Please ensure your Node.js backend server is running and accessible.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="relative  w-full py-32 px-6 pb-40 text-[#3e2e3d] min-h-screen">
            {/* Premium Background Layers - Enhanced to match other pages */}
            <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none opacity-[0.035] mix-blend-multiply bg-[url('/bg-texture.png')] bg-cover bg-center" />
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-[#f9f4ef]/50 via-transparent to-[#fdfaf7]/30" />
            
            {/* Animated gradient orbs - matching FAQ and Contact pages */}
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

            <div className="relative max-w-7xl mx-auto z-10 p-4 sm:p-6 md:p-8 lg:p-10">
                {/* Premium Page Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="relative inline-block mb-6">
                        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#6b4b3e] to-transparent" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-[Soligant] mb-6 text-center tracking-tight bg-gradient-to-b from-[#3e2e3d] to-[#5f4b5a] bg-clip-text text-transparent">
                        Our Services
                    </h1>
                    <p className="text-lg text-[#5f4b5a] max-w-2xl mx-auto mb-8">
                        Discover our comprehensive range of premium beauty and wellness services
                    </p>
                    <div className="relative inline-block mt-6">
                        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#6b4b3e] to-transparent" />
                    </div>
                </motion.div>

                {/* Premium Search Bar */}
                <div className="relative max-w-2xl mx-auto mb-12">
                    <div className="relative">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#77625a] text-lg" />
                        <input
                            type="text"
                            placeholder="Search services..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#e6dede]/50 text-[#3e2e3d] placeholder-[#9c8b92] focus:outline-none focus:ring-2 focus:ring-[#e8dbc9] focus:border-transparent shadow-lg transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#77625a] hover:text-[#3e2e3d] transition-colors"
                            >
                                <FaTimes />
                            </button>
                        )}
                    </div>
                </div>

                {/* Premium Category Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {finalAllServices.map((s, i) => {
                        const categorySlug = s.category.toLowerCase().replace(/\s+/g, "-");
                        const isActive = activeTab === categorySlug;
                        return (
                            <motion.div
                                key={i}
                                initial={false}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <NavLink
                                    to={`/services/${categorySlug === "all" ? "" : categorySlug}`}
                                    className={`group flex items-center gap-2.5 px-6 py-3 rounded-full font-medium text-sm shadow-lg transition-all duration-300 relative overflow-hidden
                                    ${isActive 
                                        ? "bg-gradient-to-r from-[#3e2e3d] to-[#5f4b5a] text-white shadow-xl" 
                                        : "bg-white/95 backdrop-blur-sm text-[#3e2e3d] border border-[#e6dede]/50 hover:bg-[#e8dbc9]/20 hover:border-[#e8dbc9]"
                                    }`}
                                >
                                    {s.icon && (
                                        <span className={`transition-transform ${isActive ? "text-white" : "text-[#6b4b3e]"}`}>
                                            {s.icon}
                                        </span>
                                    )}
                                    <span className="relative z-10">{s.category}</span>
                                    {isActive && (
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-[#5f4b5a] to-[#6b4b3e] opacity-0 group-hover:opacity-100 transition-opacity"
                                            layoutId="activeTab"
                                        />
                                    )}
                                </NavLink>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Premium Service Lists Grouped by Category */}
                <AnimatePresence>
                    {filteredServices.length > 0 ? (
                        filteredServices.map((s, i) => (
                            <div
                                key={`${s.category}-${i}`}
                                className="mb-20"
                            >
                                {/* Premium Category Header */}
                                <div className="flex items-center gap-4 mb-8">
                                    {s.icon && (
                                        <div className="p-3 rounded-xl bg-gradient-to-br from-[#e8dbc9]/30 to-[#d8c7b7]/20 text-[#6b4b3e]">
                                            {s.icon}
                                        </div>
                                    )}
                                    <div>
                                        <h2 className="text-3xl md:text-4xl font-[Soligant] text-[#3e2e3d] mb-2 bg-gradient-to-r from-[#3e2e3d] to-[#5f4b5a] bg-clip-text text-transparent">
                                            {s.category}
                                        </h2>
                                        <p className="text-sm text-[#77625a]">{s.items.length} {s.items.length === 1 ? 'service' : 'services'} available</p>
                                    </div>
                                </div>

                                <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {s.items.map((item, idx) => (
                                        <motion.li
                                            key={item.service_id || idx}
                                            initial={false}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{ duration: 0.4 }}
                                            whileHover={{ y: -6, scale: 1.01 }}
                                            className="group relative flex flex-col p-4 bg-white/95 backdrop-blur-sm border border-[#e6dede]/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                                        >
                                            {/* Premium gradient overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#e8dbc9]/0 to-[#d8c7b7]/0 group-hover:from-[#e8dbc9]/10 group-hover:to-[#d8c7b7]/5 transition-all duration-500 rounded-2xl" />
                                            
                                            {/* Decorative corner accent */}
                                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#e8dbc9]/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            <div className="relative z-10">
                                                {/* Service Name and Price */}
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-lg font-semibold text-[#3e2e3d] group-hover:text-[#6b4b3e] transition-colors pr-2 flex-1">
                                                        {item.name}
                                                    </h3>
                                                    <div className="flex flex-col items-end ml-2">
                                                        <span className="text-xl font-bold text-[#3e2e3d] bg-gradient-to-br from-[#3e2e3d] to-[#5f4b5a] bg-clip-text text-transparent whitespace-nowrap">
                                                            ${parseFloat(item.price).toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Duration Badge */}
                                                {item.duration_minutes && (
                                                    <div className="flex items-center gap-1.5 text-[#6b4b3e] bg-[#e8dbc9]/20 px-2.5 py-0.5 rounded-full text-xs font-medium mb-3 inline-flex">
                                                        <FaClock size={9} />
                                                        <span>{item.duration_minutes} min</span>
                                                    </div>
                                                )}

                                                {/* Description */}
                                                <p className="text-xs text-[#5f4b5a] mb-4 line-clamp-2 leading-relaxed group-hover:text-[#4a3c3a] transition-colors">
                                                    {item.description}
                                                </p>

                                                {/* Action Buttons */}
                                                <div className="flex flex-col gap-2 mt-auto">
                                                    <motion.button
                                                        onClick={() => openModal(item)}
                                                        className="text-xs text-[#6b4b3e] hover:text-[#3e2e3d] font-medium hover:underline transition-colors text-left"
                                                        whileHover={{ x: 4 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        View Details
                                                    </motion.button>
                                                    <motion.button
                                                        onClick={() => handleBookNow(item)}
                                                        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 shadow-md bg-gradient-to-r from-[#3e2e3d] to-[#5f4b5a] text-white hover:from-[#5f4b5a] hover:to-[#6b4b3e] hover:shadow-lg group/btn"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        <FaCalendarCheck size={12} />
                                                        <span>Book Now</span>
                                                    </motion.button>
                                                </div>
                                            </div>

                                            {/* Shine effect */}
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                            </div>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-xl text-[#5f4b5a] mb-4">No services found</p>
                            <p className="text-sm text-[#77625a]">Try adjusting your search or category filter</p>
                        </div>
                    )}
                </AnimatePresence>

            </div>

            {/* Premium Service Details Modal */}
            <AnimatePresence>
                {isModalOpen && selectedService && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/40"
                        initial={false}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={false}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-2xl p-10 bg-white/98 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#e6dede]/60 text-[#3e2e3d] overflow-hidden"
                        >
                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#e8dbc9]/20 to-transparent rounded-bl-full" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#d8c7b7]/10 to-transparent rounded-tr-full" />

                            {/* Close button */}
                            <motion.button
                                onClick={closeModal}
                                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-[#e6dede] text-[#77625a] hover:text-[#3e2e3d] hover:bg-[#e8dbc9]/20 transition-all z-20 flex items-center justify-center shadow-md"
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label="Close"
                            >
                                <FaTimes />
                            </motion.button>

                            <div className="relative z-10">
                                {/* Service Icon and Category */}
                                <div className="flex items-center gap-4 mb-6">
                                    {getCategoryIcon(selectedService.category) && (
                                        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#e8dbc9]/30 to-[#d8c7b7]/20 text-[#6b4b3e] text-2xl">
                                            {getCategoryIcon(selectedService.category)}
                                        </div>
                                    )}
                                    <div>
                                        <div className="text-xs text-[#77625a] uppercase tracking-wider mb-1">
                                            {selectedService.category}
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-[Soligant] text-[#3e2e3d] bg-gradient-to-r from-[#3e2e3d] to-[#5f4b5a] bg-clip-text text-transparent">
                                            {selectedService.name}
                                        </h2>
                                    </div>
                                </div>

                                {/* Service Details Grid */}
                                <div className="grid md:grid-cols-2 gap-6 mb-8">
                                    <div className="bg-gradient-to-br from-[#f9f4ef] to-[#e8dbc9]/20 rounded-2xl p-6 border border-[#e6dede]/50">
                                        <div className="flex items-center gap-2 text-[#77625a] text-sm mb-2">
                                            <FaStar className="text-[#eeab54]" />
                                            <span>Price</span>
                                        </div>
                                        <div className="text-3xl font-bold text-[#3e2e3d]">
                                            ${parseFloat(selectedService.price).toFixed(2)}
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-[#f9f4ef] to-[#e8dbc9]/20 rounded-2xl p-6 border border-[#e6dede]/50">
                                        <div className="flex items-center gap-2 text-[#77625a] text-sm mb-2">
                                            <FaClock className="text-[#6b4b3e]" />
                                            <span>Duration</span>
                                        </div>
                                        <div className="text-3xl font-bold text-[#3e2e3d]">
                                            {selectedService.duration_minutes} min
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-[#3e2e3d] mb-3">About This Service</h3>
                                    <p className="text-base text-[#5f4b5a] leading-relaxed">
                                        {selectedService.description}
                                    </p>
                                </div>

                                {/* Book Now Button */}
                                <motion.button
                                    onClick={() => {
                                        handleBookNow(selectedService);
                                        closeModal();
                                    }}
                                    className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-medium transition-all duration-300 shadow-lg bg-gradient-to-r from-[#3e2e3d] to-[#5f4b5a] text-white hover:from-[#5f4b5a] hover:to-[#6b4b3e] hover:shadow-xl"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <FaCalendarCheck />
                                    <span>Book This Service</span>
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default ServicesPage;