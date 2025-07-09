import React, { createContext, useContext, useEffect, useState } from "react";

// Create context
const CartContext = createContext();

// Hook to access cart
export const useCart = () => useContext(CartContext);

// Provider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem("beauty-cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("beauty-cart", JSON.stringify(cart));
  }, [cart]);

  const addService = (service) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.name === service.name);
      return exists ? prev : [...prev, service];
    });
  };

  const removeService = (serviceName) => {
    setCart((prev) => prev.filter((item) => item.name !== serviceName));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addService, removeService, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
