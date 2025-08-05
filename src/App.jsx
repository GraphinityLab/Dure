import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/ServicesPage";
import Contact from "./pages/Contact";
import FaqPage from "./pages/FaqPage";
import Book from "./pages/Book";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Iridescence from "./components/Iridescence";
import CartIcon from "./components/CartIcon"; 
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      {/* Global Iridescence Background */}
      <div className="absolute inset-0 z-[-1] pointer-events-none">
        <Iridescence
          color={[0.88, 0.76, 0.50]}  // warm pastel beige-pink base
          amplitude={0.18}
          speed={0.25}
          mouseReact={true}
        />

      </div>

      {/* UI Layout */}
      <Navbar />
      <ScrollToTop />
      <main className="flex-grow bg-transparent z-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book-now" element={<Book />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/faq/:category" element={<FaqPage />} />
        </Routes>
      </main>
      <CartIcon />
      <Footer />
    </div>
  );
}

export default App;
