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
} from "react-icons/fa";
import { FaScissors } from "react-icons/fa6";
import { GiFingernail } from "react-icons/gi";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

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
    const slug = decodeURIComponent(location.pathname.split("/").pop() || "all");
    const activeTab = slug === "services" ? "all" : slug;

    const { cart, addService } = useCart();

    const [servicesData, setServicesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // New state for the modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

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

    const isServiceInCart = (serviceId) => {
        return cart.some(item => item.service_id === serviceId);
    };

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

    // Render loading or error states without the explicit white container
    if (loading) {
        return (
            <section className="relative overflow-hidden py-32 px-6 text-[#3e2e3d] text-center min-h-screen">
                <div className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply bg-[url('/bg-texture.png')] bg-center bg-cover" />
                <div className="relative max-w-6xl mx-auto z-10 p-4 sm:p-6 md:p-8 lg:p-10"> {/* Retain padding and centering */}
                    <p>Loading services...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="relative overflow-hidden py-32 px-6 text-[#3e2e3d] text-center min-h-screen">
                <div className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply bg-[url('/bg-texture.png')] bg-center bg-cover" />
                <div className="relative max-w-6xl mx-auto z-10 p-4 sm:p-6 md:p-8 lg:p-10 text-red-600"> {/* Retain padding and centering */}
                    <p>{error}</p>
                    <p>Please ensure your Node.js backend server is running and accessible at `http://localhost:5000`.</p>
                </div>
            </section>
        );
    }

    return (
        // The outermost section provides overall page padding and positions the main content block.
        // min-h-screen ensures the page has minimum height, crucial for background.
        <section className="relative overflow-hidden py-32 px-6 text-[#3e2e3d] min-h-screen">
            {/* Background texture for the entire page */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply bg-[url('/bg-texture.png')] bg-center bg-cover" />

            {/* Main Content Container - now without the explicit white/pastel background box. */}
            {/* It's centered and has a max-width to match the live site's layout. */}
            <div className="relative max-w-6xl mx-auto z-10 p-4 sm:p-6 md:p-8 lg:p-10">
                {/* Page Header */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl md:text-6xl font-[Soligant] mb-20 text-center tracking-tight"
                >
                    Our Services
                </motion.h1>

                {/* Tabs for Service Categories */}
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                    {finalAllServices.map((s, i) => {
                        const categorySlug = s.category.toLowerCase().replace(/\s+/g, "-");
                        const isActive = activeTab === categorySlug;
                        return (
                            <NavLink
                                key={i}
                                to={`/services/${categorySlug === "all" ? "" : categorySlug}`}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-[CaviarDreams] text-sm shadow-sm transition
                                ${isActive ? "bg-[#3e2e3d] text-white" : "bg-white text-[#3e2e3d] border border-[#d8c9c9] hover:bg-[#f5eeee]"}`}
                            >
                                {s.icon}
                                {s.category}
                            </NavLink>
                        );
                    })}
                </div>

                {/* Service Lists Grouped by Category */}
                {selectedServices.map((s, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="mb-20"
                    >
                        <h2 className="text-2xl font-[Soligant] text-[#3e2e3d] mb-6 border-l-4 pl-4 border-[#c1a38f]">
                            {s.category}
                        </h2>
                        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {s.items.map((item, idx) => {
                                const addedToCart = isServiceInCart(item.service_id);
                                return (
                                    <li
                                        key={item.service_id || idx}
                                        className={`flex flex-col justify-between p-6 bg-white/60 backdrop-blur-md border border-[#e8dcd4] rounded-2xl shadow-sm hover:shadow-md transition
                                            ${addedToCart ? 'ring-2 ring-offset-2 ring-[#c1a38f] opacity-80' : ''}`}
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[#3e2e3d] text-lg font-semibold">{item.name}</span>
                                            <span className="font-[CaviarDreams] text-[#7e5e54] text-md">${parseFloat(item.price).toFixed(2)}</span>
                                        </div>
                                        <p className="text-sm text-[#5f4b5a] mb-4 line-clamp-2">{item.description}</p>
                                        <div className="flex justify-between items-center mt-auto">
                                            <button
                                                onClick={() => openModal(item)}
                                                className="text-xs text-[#c1a38f] hover:underline"
                                            >
                                                More Info
                                            </button>
                                            <button
                                                onClick={() => addService({ service_id: item.service_id, name: item.name, price: parseFloat(item.price), category: item.category })}
                                                disabled={addedToCart}
                                                className={`ml-4 px-3 py-1 rounded-full text-sm font-[CaviarDreams] transition
                                                    ${addedToCart
                                                        ? 'bg-gray-400 text-white cursor-not-allowed'
                                                        : 'bg-[#3e2e3d] text-white hover:bg-[#5f4b5a]'
                                                    }`}
                                            >
                                                {addedToCart ? 'Added' : 'Add'}
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </motion.div>
                ))}

                {/* Call to Action Button to Book Now */}
                <div className="text-center mt-10">
                    <NavLink
                        to={`/book-now`}
                        className="inline-block px-8 py-3 rounded-full bg-[#3e2e3d] text-white font-[CaviarDreams] text-sm shadow-md hover:bg-[#2d1e2c] transition"
                    >
                        Book Now
                    </NavLink>
                </div>
            </div>

            {/* Service Details Modal */}
            {isModalOpen && selectedService && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="relative w-full max-w-lg p-8 bg-white/90 rounded-3xl shadow-xl border border-[#e6dede] text-[#3e2e3d]"
                    >
                        <h2 className="text-3xl font-[Soligant] mb-4 border-b pb-2 border-[#c1a38f]">
                            {selectedService.name}
                        </h2>
                        <div className="space-y-4 text-sm font-[CaviarDreams] text-[#5f4b5a]">
                            <div className="flex justify-between items-center">
                                <span>Category:</span>
                                <span className="text-[#3e2e3d] font-semibold">{selectedService.category}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Price:</span>
                                <span className="text-[#3e2e3d] font-semibold">${parseFloat(selectedService.price).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Duration:</span>
                                <span className="text-[#3e2e3d] font-semibold">{selectedService.duration_minutes} minutes</span>
                            </div>
                            <div className="pt-4">
                                <h3 className="text-base font-semibold text-[#3e2e3d] mb-2">Description:</h3>
                                <p className="text-sm">{selectedService.description}</p>
                            </div>
                        </div>
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-[#9c8b92] hover:text-[#5f4b5a] transition"
                            aria-label="Close"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </motion.div>
                </div>
            )}
        </section>
    );
};

export default ServicesPage;