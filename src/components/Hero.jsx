import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <>
      <section className="section-padding" style={{ paddingTop: '8rem', paddingBottom: '8rem', position: 'relative' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 350px), 1fr))", gap: "4rem", alignItems: 'center' }}>
            
            {/* Left Column */}
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.p variants={itemVariants} style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                INVOICES
              </motion.p>
              
              <motion.h1 variants={itemVariants} className="font-serif" style={{ fontSize: '4.5rem', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                Professional <br/>invoicing, <br/>simplified.
              </motion.h1>
              
              <motion.p variants={itemVariants} style={{ fontSize: '1.125rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '90%' }}>
                Create, send, and track invoices, estimates, and expenses — all from one beautiful app. Receipt scanning, PDF generation, customizable templates, and financial reports at your fingertips.
              </motion.p>
              
              <motion.p variants={itemVariants} style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '90%' }}>
                InvoiceVoid is built for freelancers and small businesses who need professional invoicing without the complexity. Use it on the web or on your phone; your data stays in sync everywhere.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex gap-4">
                <motion.button 
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/signup')}
                >
                  Get Started Free <ArrowRight size={18} />
                </motion.button>
                <motion.a 
                  href="#features"
                  className="btn btn-secondary"
                  style={{ textDecoration: 'none' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  See Features
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right Column - Invoice Card */}
            <motion.div 
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 80, damping: 20 }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <div className="card tilt-card" style={{ width: '100%', maxWidth: '440px', padding: '2rem', backgroundColor: 'var(--bg-primary)' }}>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>INVOICE</p>
                    <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>INV-2026-0042</p>
                  </div>
                  <span className="badge badge-green" style={{ backgroundColor: 'var(--status-green-bg)', color: 'var(--status-green)' }}>Paid</span>
                </div>

                <div style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1.25rem' }}>
                  <div className="flex justify-between mb-2">
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Client</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>Acme Corp</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Date</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>Feb 26, 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Due</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>Mar 28, 2026</span>
                  </div>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <div className="flex justify-between mb-2">
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Web Design Package</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>₹2,400.00</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Logo & Branding</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>₹800.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>SEO Optimization</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>₹600.00</span>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Total</span>
                  <span style={{ fontWeight: 600, color: 'var(--accent-blue)', fontSize: '1.125rem' }}>₹3,800.00</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
