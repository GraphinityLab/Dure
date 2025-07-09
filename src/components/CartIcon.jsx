// CartIcon.jsx
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext"; // adjust if path is different
import { useNavigate } from "react-router-dom";

const CartIcon = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  return (
    <div
      className="fixed bottom-6 right-6 z-50 cursor-pointer"
      onClick={() => navigate("/book-now")}
    >
      <div className="relative bg-[#3e2e3d] text-white p-3 rounded-full shadow-lg hover:bg-[#5f4b5a] transition">
        <FaShoppingCart size={20} />
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full px-2 py-0.5">
            {cart.length}
          </span>
        )}
      </div>
    </div>
  );
};

export default CartIcon;
