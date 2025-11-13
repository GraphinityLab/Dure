// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import SmoothScrollWrapper from "./components/SmoothScrollWrapper.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <SmoothScrollWrapper>
          <App />
        </SmoothScrollWrapper>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
