// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import SmoothScrollWrapper from "./components/SmoothScrollWrapper.jsx";
import { CartProvider } from "./context/CartContext.jsx"; // ✅ Make sure path is correct
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <SmoothScrollWrapper>
          <App />
        </SmoothScrollWrapper>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
