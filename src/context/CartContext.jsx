// src/context/CartContext.js
// This file defines the Cart Context for your React application,
// allowing services to be added, removed, and managed across components.

import React, { createContext, useContext, useState } from 'react';

// Create the CartContext. This will hold the cart state and functions to modify it.
const CartContext = createContext();

// Custom hook 'useCart' to easily consume the CartContext in any functional component.
export const useCart = () => {
  return useContext(CartContext);
};

// CartProvider component. This component wraps around parts of your application
// that need access to the cart state.
export const CartProvider = ({ children }) => {
  // 'cart' state: an array to hold the selected services.
  // Each service object in the cart will now include 'service_id', 'name', 'price', and 'category'.
  const [cart, setCart] = useState([]);

  // Function to add a service to the cart.
  // It expects a 'service' object with at least 'service_id', 'name', 'price', and 'category'.
  const addService = (service) => {
    setCart((prevCart) => {
      // Check if the service (identified by its unique 'service_id') is already in the cart.
      const exists = prevCart.find((item) => item.service_id === service.service_id);
      if (exists) {
        // If the service already exists, return the previous cart state without adding it again.
        // This prevents duplicate entries for the same service_id.
        return prevCart;
      }
      // If the service is new, add it to the cart by creating a new array.
      return [...prevCart, service];
    });
  };

  // Function to remove a service from the cart.
  // It filters out the service based on its 'name'.
  // NOTE: For absolute robustness, removing by 'service_id' might be preferred if service names are not strictly unique.
  const removeService = (serviceName) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== serviceName));
  };

  // Function to clear all items from the cart.
  const clearCart = () => {
    setCart([]);
  };

  // The value object that will be provided by the CartContext.Provider.
  // This makes 'cart', 'addService', 'removeService', and 'clearCart' available to any component
  // that uses the 'useCart' hook.
  const value = {
    cart,
    addService,
    removeService,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children} {/* Renders the child components that need cart access */}
    </CartContext.Provider>
  );
};