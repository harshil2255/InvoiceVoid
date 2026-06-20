import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateInvoice from './pages/CreateInvoice';
import ViewInvoice from './pages/ViewInvoice';
import EditInvoice from './pages/EditInvoice';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lenisInstance, setLenisInstance] = useState(null);
  const location = useLocation();

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });
    
    setLenisInstance(lenis);

    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  // Handle route changes and hash links
  useEffect(() => {
    if (!lenisInstance) return;

    if (location.hash) {
      // Wait a tiny bit for render if coming from another page
      setTimeout(() => {
        try {
          lenisInstance.scrollTo(location.hash, { offset: -80 });
        } catch (e) {}
      }, 100);
    } else {
      lenisInstance.scrollTo(0, { immediate: true });
    }
  }, [location.pathname, location.hash, lenisInstance]);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="app-wrapper">
      <CustomCursor />
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/invoices/new" element={<CreateInvoice />} />
        <Route path="/invoices/:id" element={<ViewInvoice />} />
        <Route path="/invoices/:id/edit" element={<EditInvoice />} />
      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;
