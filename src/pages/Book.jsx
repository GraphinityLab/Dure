// src/components/Book.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaCalendarAlt, FaClock, FaSpinner, FaCheck } from "react-icons/fa";
import CustomCalendar from "../components/CustomCalendar";
import { getSelectedService, clearSelectedService, saveSelectedService } from "../utils/serviceStorage";

const Book = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get service from URL params first, then fallback to localStorage
  const getServiceFromParams = () => {
    const params = new URLSearchParams(location.search);
    const paramService = {
      service_id: params.get("service_id") || "",
      name: decodeURIComponent(params.get("name") || ""),
      price: params.get("price") || "0",
      category: decodeURIComponent(params.get("category") || ""),
      duration: params.get("duration") || ""
    };
    
    // If URL params have a service, use it and save to localStorage
    if (paramService.name) {
      return paramService;
    }
    
    // Otherwise, try to get from localStorage
    const storedService = getSelectedService();
    if (storedService && storedService.name) {
      return storedService;
    }
    
    return {
      service_id: "",
      name: "",
      price: "0",
      category: "",
      duration: ""
    };
  };
  
  const [selectedService, setSelectedService] = useState(() => {
    // Initialize from URL params or localStorage
    const service = getServiceFromParams();
    // If we got a service from URL params, save it to localStorage
    if (service.name) {
      saveSelectedService(service);
    }
    return service;
  });
  
  // Update selected service when URL params change and save to localStorage
  useEffect(() => {
    const service = getServiceFromParams();
    setSelectedService(service);
    
    // If we got a service from URL params, save it to localStorage
    if (service.name) {
      saveSelectedService(service);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    date: "",
    time: "",
    notes: "",
  });

  const [availableTimes, setAvailableTimes] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [timesLoading, setTimesLoading] = useState(false);
  const [timesError, setTimesError] = useState("");
  const [isTimeSlotModalOpen, setIsTimeSlotModalOpen] = useState(false);
  const [tempSelectedDate, setTempSelectedDate] = useState("");
  const [tempSelectedTime, setTempSelectedTime] = useState("");

  // Format time to human-readable (e.g. "2:30 PM") - memoized
  const formatTime = useCallback((timeStr) => {
    try {
      // Handle different time formats from backend
      let hour, minute;
      if (timeStr.includes(':')) {
        [hour, minute] = timeStr.split(":");
      } else if (timeStr.length === 4) {
        // Handle "0930" format
        hour = timeStr.slice(0, 2);
        minute = timeStr.slice(2);
      } else {
        return timeStr;
      }
      
      const hourNum = parseInt(hour, 10);
      const minuteNum = parseInt(minute, 10);
      
      if (isNaN(hourNum) || isNaN(minuteNum)) {
        return timeStr;
      }
      
      const date = new Date();
      date.setHours(hourNum, minuteNum, 0);
      return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    } catch (error) {
      console.error('Error formatting time:', error, timeStr);
      return timeStr;
    }
  }, []);

  // Fetch available times whenever date or selected service changes
  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();

    const fetchAvailableTimes = async () => {
      // Use tempSelectedDate if in modal, otherwise use formData.date
      const dateToCheck = isTimeSlotModalOpen ? tempSelectedDate : formData.date;
      
      if (!dateToCheck || !selectedService.name) {
        if (isMounted) {
          setAvailableTimes([]);
          setTimesError("");
          if (!isTimeSlotModalOpen) {
            setFormData((prev) => ({ ...prev, time: "" }));
          }
        }
        return;
      }

      if (isMounted) {
        setTimesLoading(true);
        setTimesError("");
        setAvailableTimes([]);
        if (!isTimeSlotModalOpen) {
          setFormData((prev) => ({ ...prev, time: "" })); // clear previous selection
        }
      }

      try {
        const response = await axiosInstance.get(
          `/book/availability?date=${dateToCheck}&service_name=${selectedService.name}`,
          { signal: abortController.signal }
        );

        // Only update state if component is still mounted
        if (!isMounted) return;

        if (!response.data.slots || response.data.slots.length === 0) {
          setTimesError("No available times for this date.");
          setAvailableTimes([]);
          return;
        }

        // sort times
        const sortedSlots = response.data.slots.sort((a, b) => a.localeCompare(b));
        setAvailableTimes(sortedSlots);
      } catch (error) {
        // Ignore abort errors
        if (error.name === 'AbortError' || error.name === 'CanceledError') {
          return;
        }
        if (isMounted) {
          console.error("Error fetching timeslots:", error);
          setTimesError("Failed to load timeslots. Please try again.");
        }
      } finally {
        if (isMounted) {
          setTimesLoading(false);
        }
      }
    };

    fetchAvailableTimes();

    // Cleanup function
    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [formData.date, tempSelectedDate, selectedService.name, isTimeSlotModalOpen]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleDateSelect = useCallback((date) => {
    setFormData(prev => ({ ...prev, date, time: "" }));
    setTempSelectedDate(date);
  }, []);

  const handleTimeSlotConfirm = () => {
    if (tempSelectedDate && tempSelectedTime) {
      setFormData(prev => ({ 
        ...prev, 
        date: tempSelectedDate, 
        time: tempSelectedTime 
      }));
      setIsTimeSlotModalOpen(false);
      setTempSelectedDate("");
      setTempSelectedTime("");
    }
  };

  const openTimeSlotModal = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setTempSelectedDate(formData.date || "");
    setTempSelectedTime(formData.time || "");
    setIsTimeSlotModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!selectedService.name) {
      setMessage("Please select a service to book.");
      setLoading(false);
      return;
    }

    const {
      firstName,
      lastName,
      phone,
      email,
      address,
      city,
      postalCode,
      date,
      time,
      notes,
    } = formData;

    // Format appointment time as ISO string: YYYY-MM-DDTHH:mm:00
    // Ensure time is in HH:mm format (24-hour)
    const timeFormatted = time.includes(':') ? time : `${time.slice(0, 2)}:${time.slice(2)}`;
    const fullAppointmentTime = `${date}T${timeFormatted}:00`;

    try {
      const bookingData = {
        client_first_name: firstName,
        client_last_name: lastName,
        client_phone: phone,
        client_email: email,
        address,
        city,
        postal_code: postalCode,
        service_name: selectedService.name,
        appointment_time: fullAppointmentTime,
        notes,
      };

      const response = await axiosInstance.post("/book", bookingData);

      if (response.status !== 201) {
        throw new Error(
          response.data.message ||
            `Failed to book service: ${selectedService.name}`
        );
      }

      // Clear the selected service from localStorage after successful booking
      clearSelectedService();
      
      setMessage(
        "Appointment booked successfully and is pending admin approval. You will receive an email shortly."
      );
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        postalCode: "",
        date: "",
        time: "",
        notes: "",
      });
      
      // Clear selected service state
      setSelectedService({
        service_id: "",
        name: "",
        price: "0",
        category: "",
        duration: ""
      });
      
      // Redirect to services after successful booking
      setTimeout(() => {
        navigate("/services");
      }, 3000);
    } catch (error) {
      console.error("Error submitting booking:", error);
      setMessage(
        `Booking failed: ${
          error.response?.data?.message ||
          error.message ||
          "An unknown error occurred."
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  // If no service selected, redirect to services page
  if (!selectedService.name) {
    return (
      <section className="relative w-full min-h-screen py-32 px-6 text-[#3e2e3d]" style={{ backgroundColor: '#f9f4ef' }}>
        {/* Base solid background */}
        <div className="absolute inset-0 bg-[#f9f4ef] -z-10" />
        {/* Premium Background Layers */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply bg-[url('/bg-texture.png')] bg-cover bg-center -z-[9]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f9f4ef]/50 via-transparent to-[#fdfaf7]/30 -z-[9]" />
        <div className="relative max-w-3xl mx-auto z-10 text-center">
          <p className="text-xl text-[#5f4b5a] mb-4">No service selected</p>
          <button
            onClick={() => navigate("/services")}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#3e2e3d] to-[#5f4b5a] text-white hover:from-[#5f4b5a] hover:to-[#6b4b3e] transition-all"
          >
            Browse Services
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full min-h-screen py-20 md:py-32 px-4 sm:px-6 text-[#3e2e3d] pb-40 bg-[#f9f4ef" style={{ backgroundColor: '#f9f4ef' }}>
      {/* Base solid background - ensures beige is always visible */}
      <div className="absolute inset-0 bg-[#f9f4ef] -z-10" />
      
      {/* Premium Background Layers - Enhanced with absolute positioning */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-multiply bg-[url('/bg-texture.png')] bg-cover bg-center -z-[9]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#f9f4ef]/50 via-transparent to-[#fdfaf7]/30 -z-[9]" />
      
      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute top-20 left-10 w-96 h-96 bg-[#e8dbc9]/8 rounded-full blur-3xl -z-[8]"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        key="orb-1"
      />
      <motion.div 
        className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-[#d8c7b7]/8 rounded-full blur-3xl -z-[8]"
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
        key="orb-2"
      />
      
      {/* Additional subtle gradient accents */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#e8dbc9]/5 rounded-full blur-3xl -z-[8]" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#d8c7b7]/5 rounded-full blur-3xl -z-[8]" />

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
          
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-[Soligant] text-center tracking-tight bg-gradient-to-b from-[#3e2e3d] to-[#5f4b5a] bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Book an Appointment
          </motion.h1>

          <motion.p
            className="text-base md:text-lg text-[#5f4b5a] max-w-2xl mx-auto mb-8 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Reserve your session with our team and enjoy personalized care in a serene environment.
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

        {/* Selected Service Summary - Enhanced */}
        <motion.div
          className="mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl md:text-2xl font-[Soligant] text-[#3e2e3d]">
              Selected Service
            </h3>
            <motion.button
              onClick={() => {
                // Don't clear localStorage - keep the service selected
                // User can change it on the services page if needed
                navigate("/services");
              }}
              className="text-sm text-[#6b4b3e] hover:text-[#3e2e3d] font-medium flex items-center gap-2 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaTimes size={14} />
              Change Service
            </motion.button>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl bg-white/95 backdrop-blur-sm border border-[#e6dede]/50 p-6 group hover:shadow-2xl transition-all duration-300">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg md:text-xl font-semibold text-[#3e2e3d] mb-1">{selectedService.name}</p>
                <p className="text-sm text-[#9c8b92] mb-1">{selectedService.category}</p>
                {selectedService.duration && (
                  <p className="text-xs text-[#77625a]">{selectedService.duration} minutes</p>
                )}
              </div>
              <div className="text-right">
                <span className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-[#3e2e3d] to-[#5f4b5a] bg-clip-text text-transparent">
                  ${parseFloat(selectedService.price).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Premium Booking Form */}
        <motion.div
          className="max-w-3xl mx-auto bg-white/95 backdrop-blur-sm p-6 md:p-10 rounded-3xl shadow-xl border border-[#e6dede]/50 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm mb-1 font-[CaviarDreams]"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-5 py-3.5 border-2 border-[#e6dede] rounded-full text-sm bg-white/80 backdrop-blur-sm focus:border-[#6b4b3e] focus:ring-2 focus:ring-[#e8dbc9] focus:outline-none transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm mb-1 font-[CaviarDreams]"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-5 py-3.5 border-2 border-[#e6dede] rounded-full text-sm bg-white/80 backdrop-blur-sm focus:border-[#6b4b3e] focus:ring-2 focus:ring-[#e8dbc9] focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm mb-1 font-[CaviarDreams]"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-5 py-3.5 border-2 border-[#e6dede] rounded-full text-sm bg-white/80 backdrop-blur-sm focus:border-[#6b4b3e] focus:ring-2 focus:ring-[#e8dbc9] focus:outline-none transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm mb-1 font-[CaviarDreams]"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-3.5 border-2 border-[#e6dede] rounded-full text-sm bg-white/80 backdrop-blur-sm focus:border-[#6b4b3e] focus:ring-2 focus:ring-[#e8dbc9] focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="address"
                className="block text-sm mb-1 font-[CaviarDreams]"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-5 py-3.5 border-2 border-[#e6dede] rounded-full text-sm bg-white/80 backdrop-blur-sm focus:border-[#6b4b3e] focus:ring-2 focus:ring-[#e8dbc9] focus:outline-none transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="block text-sm mb-1 font-[CaviarDreams]"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-5 py-3.5 border-2 border-[#e6dede] rounded-full text-sm bg-white/80 backdrop-blur-sm focus:border-[#6b4b3e] focus:ring-2 focus:ring-[#e8dbc9] focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Postal Code */}
          <div>
            <label
              htmlFor="postalCode"
              className="block text-sm mb-1 font-[CaviarDreams]"
            >
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="w-full px-5 py-3.5 border-2 border-[#e6dede] rounded-full text-sm bg-white/80 backdrop-blur-sm focus:border-[#6b4b3e] focus:ring-2 focus:ring-[#e8dbc9] focus:outline-none transition-all"
            />
          </div>

          {/* Date & Time Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm mb-4 font-[CaviarDreams] text-[#3e2e3d] flex items-center gap-2">
                <FaCalendarAlt className="text-[#6b4b3e]" />
                Appointment Date & Time
              </label>
              
              {/* Selected Date/Time Display */}
              {formData.date && formData.time ? (
                <div className="bg-white/80 backdrop-blur-sm border-2 border-[#e8dbc9] rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#5f4b5a] mb-1">Selected Appointment</p>
                    <p className="text-base font-medium text-[#3e2e3d]">
                      {new Date(formData.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })} at {formatTime(formData.time)}
                    </p>
                  </div>
                  <motion.button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      openTimeSlotModal(e);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#e8dbc9]/30 hover:bg-[#e8dbc9]/50 text-[#6b4b3e] text-sm font-medium transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Change
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openTimeSlotModal(e);
                  }}
                  className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-[#3e2e3d] to-[#5f4b5a] text-white font-medium flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaCalendarAlt />
                  <span>Pick Time Slot</span>
                </motion.button>
              )}
            </div>

          </div>

          {/* Notes */}
          <div>
            <label
              htmlFor="notes"
              className="block text-sm mb-1 font-[CaviarDreams]"
            >
              Additional Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows="4"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-5 py-3.5 border-2 border-[#e6dede] rounded-2xl text-sm bg-white/80 backdrop-blur-sm focus:border-[#6b4b3e] focus:ring-2 focus:ring-[#e8dbc9] focus:outline-none transition-all resize-none"
              placeholder="Any special requests or notes for your appointment..."
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-[#3e2e3d] to-[#5f4b5a] text-white font-medium text-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                <span>Booking Appointment...</span>
              </>
            ) : (
              "Confirm Booking"
            )}
          </motion.button>
        </form>

        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mt-6 p-4 rounded-xl text-center text-sm ${
                message.includes("success")
                  ? "bg-gradient-to-r from-[#5a7d5a]/10 to-[#6b9a6b]/10 border border-[#5a7d5a]/20 text-[#5a7d5a]"
                  : "bg-red-50/50 border border-red-200 text-red-600"
              }`}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>
        </motion.div>
      </div>

      {/* Time Slot Selection Modal - Outside form, darkens entire page */}
      <AnimatePresence>
        {isTimeSlotModalOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 backdrop-blur-md bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsTimeSlotModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white/98 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#e6dede]/60 text-[#3e2e3d]"
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-[#e6dede]/50 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-[Soligant] text-[#3e2e3d] flex items-center gap-2">
                  <FaCalendarAlt className="text-[#6b4b3e]" />
                  Pick Time Slot
                </h2>
                <motion.button
                  type="button"
                  onClick={() => setIsTimeSlotModalOpen(false)}
                  className="p-2 rounded-full hover:bg-[#e8dbc9]/20 transition-colors text-[#6b4b3e]"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes />
                </motion.button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Compact Calendar */}
                <div>
                  <label className="block text-sm mb-3 font-[CaviarDreams] text-[#3e2e3d]">
                    Select Date
                  </label>
                  <div className="scale-90 origin-top-left">
                    <CustomCalendar
                      selectedDate={tempSelectedDate}
                      onDateSelect={(date) => {
                        setTempSelectedDate(date);
                        setTempSelectedTime("");
                      }}
                      serviceName={selectedService.name}
                    />
                  </div>
                </div>

                {/* Time Selection */}
                {tempSelectedDate && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="block text-sm mb-3 font-[CaviarDreams] text-[#3e2e3d] flex items-center gap-2">
                      <FaClock className="text-[#6b4b3e]" />
                      Select Time
                      {timesLoading && (
                        <span className="text-xs text-[#5f4b5a] font-normal ml-2">
                          (Checking availability...)
                        </span>
                      )}
                    </label>
                    {timesLoading ? (
                      <div className="flex items-center justify-center py-8 bg-white/50 rounded-2xl border border-[#e6dede]">
                        <FaSpinner className="animate-spin text-[#6b4b3e] text-xl mr-3" />
                        <span className="text-[#5f4b5a]">Loading available times...</span>
                      </div>
                    ) : availableTimes.length > 0 ? (
                      <div>
                        <p className="text-xs text-[#5f4b5a] mb-3 italic">
                          {availableTimes.length} time slot{availableTimes.length !== 1 ? 's' : ''} available
                        </p>
                        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                          {availableTimes.map((timeSlot) => {
                            const normalizedTime = timeSlot.includes(':') 
                              ? timeSlot 
                              : timeSlot.length === 4 
                                ? `${timeSlot.slice(0, 2)}:${timeSlot.slice(2)}`
                                : timeSlot;
                            
                            return (
                              <motion.button
                                key={normalizedTime}
                                type="button"
                                onClick={() => setTempSelectedTime(normalizedTime)}
                                className={`
                                  px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300
                                  ${tempSelectedTime === normalizedTime
                                    ? "bg-gradient-to-r from-[#3e2e3d] to-[#5f4b5a] text-white shadow-lg scale-105"
                                    : "bg-white border-2 border-[#e8dbc9] text-[#3e2e3d] hover:border-[#6b4b3e] hover:bg-[#e8dbc9]/20 hover:scale-105"
                                  }
                                `}
                                whileHover={{ scale: tempSelectedTime === normalizedTime ? 1.05 : 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {formatTime(normalizedTime)}
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="py-6 bg-amber-50/50 rounded-2xl border border-amber-200 text-center">
                        <p className="text-amber-700 text-sm font-medium mb-1">
                          No available time slots for this date
                        </p>
                        <p className="text-amber-600 text-xs">
                          All time slots are booked. Please select another date.
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Confirm Button */}
                {tempSelectedDate && tempSelectedTime && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pt-4 border-t border-[#e6dede]/50"
                  >
                    <motion.button
                      type="button"
                      onClick={handleTimeSlotConfirm}
                      className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-[#3e2e3d] to-[#5f4b5a] text-white font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaCheck />
                      <span>Confirm Selection</span>
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Book;
