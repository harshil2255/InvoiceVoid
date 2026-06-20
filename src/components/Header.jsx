import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Header({ isDarkMode, toggleTheme }) {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="header">
      <div className="container header-content">
        <Link to={session ? "/dashboard" : "/"} className="logo flex items-center gap-2" style={{ textDecoration: 'none' }}>
          <div style={{ 
            width: '38px', height: '38px', 
            background: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)', 
            borderRadius: '0.75rem', 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(37, 99, 235, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.2)'
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" fill="white" />
              <path d="M14 2V8H20" fill="#e2e8f0" />
              <path d="M8 12H16M8 16H13" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>InvoiceVoid</span>
        </Link>
        
        <div className="mobile-menu-btn">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="btn btn-ghost"
            aria-label="Toggle Mobile Menu"
            style={{ padding: '0.5rem', borderRadius: '50%' }}
          >
            {isMobileMenuOpen ? <X size={24} color="var(--text-primary)" /> : <Menu size={24} color="var(--text-primary)" />}
          </button>
        </div>

        <div className={`nav-container ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <nav className="nav-links">
            <a href="/#features" className="nav-link" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '0.875rem' }}>Features</a>
            <a href="/blog" className="nav-link" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '0.875rem' }}>Blog</a>
            <a href="/#faq" className="nav-link" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '0.875rem' }}>FAQ</a>
            <a href="/about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '0.875rem' }}>About</a>
            <Link to="/contact" className="nav-link" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: '0.875rem' }}>Contact</Link>
          </nav>
          
          <div className="nav-actions flex items-center gap-4">
            <button 
              onClick={toggleTheme} 
              className="btn btn-ghost"
              aria-label="Toggle Dark Mode"
              style={{ padding: '0.5rem', borderRadius: '50%' }}
            >
              {isDarkMode ? <Sun size={20} color="var(--text-primary)" /> : <Moon size={20} color="var(--text-primary)" />}
            </button>
            
            <motion.button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate(session ? '/dashboard' : '/signup');
              }}
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem', width: '100%' }}
            >
              {session ? 'Dashboard' : 'Get Started'}
            </motion.button>
          </div>
        </div>
      </div>
      
      <style>{`
        .nav-container {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .mobile-menu-btn {
          display: none;
        }
        @media (max-width: 768px) {
          .nav-container {
            display: none;
            position: absolute;
            top: 4.5rem;
            left: 0;
            width: 100%;
            background-color: var(--bg-primary);
            flex-direction: column;
            padding: 2rem;
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
            border-bottom: 1px solid var(--border-color);
          }
          .nav-container.mobile-open {
            display: flex;
          }
          .nav-links {
            flex-direction: column;
            gap: 1.5rem;
            align-items: flex-start;
            width: 100%;
          }
          .nav-actions {
            width: 100%;
            justify-content: space-between;
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid var(--border-color);
          }
          .mobile-menu-btn {
            display: block;
          }
        }
      `}</style>
    </header>
  );
}
