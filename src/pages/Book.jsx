// src/components/Book.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

const Book = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const preselectedService = decodeURIComponent(params.get("service") || "");

  const { cart, removeService, clearCart } = useCart();

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

  // Format time to human-readable (e.g. "2:30 PM")
  const formatTime = (timeStr) => {
    try {
      const [hour, minute] = timeStr.split(":");
      const date = new Date();
      date.setHours(hour, minute);
      return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    } catch {
      return timeStr;
    }
  };

  // Fetch available times whenever date or cart changes
  useEffect(() => {
    const fetchAvailableTimes = async () => {
      if (!formData.date || cart.length === 0) {
        setAvailableTimes([]);
        setTimesError("");
        setFormData((prev) => ({ ...prev, time: "" }));
        return;
      }

      setTimesLoading(true);
      setTimesError("");
      setAvailableTimes([]);
      setFormData((prev) => ({ ...prev, time: "" })); // clear previous selection

      try {
        const serviceName = cart[0].name;
        const response = await axiosInstance.get(
          `/book/availability?date=${formData.date}&service_name=${serviceName}`
        );

        if (!response.data.slots || response.data.slots.length === 0) {
          setTimesError("No available times for this date.");
          setAvailableTimes([]);
          return;
        }

        // sort times
        const sortedSlots = response.data.slots.sort((a, b) => a.localeCompare(b));
        setAvailableTimes(sortedSlots);
      } catch (error) {
        console.error("Error fetching timeslots:", error);
        setTimesError("Failed to load timeslots. Please try again.");
      } finally {
        setTimesLoading(false);
      }
    };

    fetchAvailableTimes();
  }, [formData.date, cart]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (cart.length === 0) {
      setMessage("Please add at least one service to your cart before booking.");
      setLoading(false);
      return;
    }

    const serviceItem = cart[0];
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

    const fullAppointmentTime = `${date}T${time}:00`;

    try {
      const bookingData = {
        client_first_name: firstName,
        client_last_name: lastName,
        client_phone: phone,
        client_email: email,
        address,
        city,
        postal_code: postalCode,
        service_name: serviceItem.name,
        appointment_time: fullAppointmentTime,
        notes,
      };

      const response = await axiosInstance.post("/book", bookingData);

      if (response.status !== 201) {
        throw new Error(
          response.data.message ||
            `Failed to book service: ${serviceItem.name}`
        );
      }

      setMessage(
        "Appointment booked successfully and is pending admin approval. You will receive an email shortly."
      );
      clearCart();
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

  return (
    <section className="relative overflow-hidden py-32 px-6 text-[#3e2e3d]">
      {/* Decorative Background */}
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
        <h2 className="text-5xl md:text-6xl font-[Soligant] mb-20 text-center tracking-tight">
          Book an Appointment
        </h2>
        <p className="max-w-2xl mx-auto text-base md:text-lg text-[#5f4b5a]">
          Reserve your session with our team and enjoy personalized care in a
          serene environment.
        </p>
      </motion.div>

      {/* Cart Summary */}
      <div className="mb-12 max-w-3xl mx-auto">
        <h3 className="text-xl font-[Soligant] mb-4 border-l-4 pl-4 border-[#c1a38f]">
          Selected Services
        </h3>
        {cart.length === 0 ? (
          <p className="text-sm text-[#9c8b92] italic">
            No services selected yet. Add some from the Services tab.
          </p>
        ) : (
          <ul className="divide-y divide-[#eadcda] rounded-xl overflow-hidden shadow-md bg-white/70 backdrop-blur-md border border-[#e8dcd4]">
            {cart.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center px-6 py-4"
              >
                <div>
                  <p className="text-sm text-[#3e2e3d]">{item.name}</p>
                  <p className="text-xs text-[#9c8b92]">{item.category}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-[CaviarDreams] text-[#7e5e54]">
                    ${parseFloat(item.price).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeService(item.service_id)}
                    className="text-xs text-red-400 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Booking Form */}
      <div className="max-w-3xl mx-auto bg-white/80 p-10 rounded-3xl shadow-lg border border-[#e6dede] backdrop-blur-lg">
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
                className="w-full px-4 py-3 border border-[#e6dede] rounded-full text-sm bg-white/70 focus:ring-2 focus:ring-[#3e2e3d] focus:outline-none"
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
                className="w-full px-4 py-3 border border-[#e6dede] rounded-full text-sm bg-white/70 focus:ring-2 focus:ring-[#3e2e3d] focus:outline-none"
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
                className="w-full px-4 py-3 border border-[#e6dede] rounded-full text-sm bg-white/70 focus:ring-2 focus:ring-[#3e2e3d] focus:outline-none"
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
                className="w-full px-4 py-3 border border-[#e6dede] rounded-full text-sm bg-white/70 focus:ring-2 focus:ring-[#3e2e3d] focus:outline-none"
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
                className="w-full px-4 py-3 border border-[#e6dede] rounded-full text-sm bg-white/70 focus:ring-2 focus:ring-[#3e2e3d] focus:outline-none"
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
                className="w-full px-4 py-3 border border-[#e6dede] rounded-full text-sm bg-white/70 focus:ring-2 focus:ring-[#3e2e3d] focus:outline-none"
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
              className="w-full px-4 py-3 border border-[#e6dede] rounded-full text-sm bg-white/70 focus:ring-2 focus:ring-[#3e2e3d] focus:outline-none"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="date"
                className="block text-sm mb-1 font-[CaviarDreams]"
              >
                Preferred Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#e6dede] rounded-full text-sm bg-white/70 focus:ring-2 focus:ring-[#3e2e3d] focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="time"
                className="block text-sm mb-1 font-[CaviarDreams]"
              >
                Preferred Time
              </label>
              <select
                id="time"
                name="time"
                required
                value={formData.time}
                onChange={handleChange}
                disabled={!formData.date || timesLoading || cart.length === 0}
                className="w-full px-4 py-3 border border-[#e6dede] rounded-full text-sm bg-white/70 focus:ring-2 focus:ring-[#3e2e3d] focus:outline-none disabled:bg-gray-200 disabled:cursor-not-allowed"
              >
                <option value="" disabled>
                  {timesLoading
                    ? "Loading..."
                    : availableTimes.length === 0
                    ? "No times available"
                    : "Select a time"}
                </option>
                {availableTimes.map((time) => (
                  <option key={time} value={time}>
                    {formatTime(time)}
                  </option>
                ))}
              </select>
              {timesError && (
                <p className="text-red-500 text-xs mt-1">{timesError}</p>
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
              className="w-full px-4 py-3 border border-[#e6dede] rounded-2xl text-sm bg-white/70 focus:ring-2 focus:ring-[#3e2e3d] focus:outline-none"
              placeholder="Let us know anything else you'd like to share..."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || cart.length === 0}
            className="w-full mt-4 px-6 py-3 rounded-full bg-[#3e2e3d] text-white hover:bg-[#5f4b5a] transition font-[CaviarDreams] text-sm uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Confirming..." : "Confirm Booking"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-6 text-center text-sm ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
};

export default Book;
