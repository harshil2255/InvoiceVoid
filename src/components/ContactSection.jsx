import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Clock, Send, X } from 'lucide-react';

export default function ContactSection({ isOpen, onClose }) {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const inputStyle = {
    padding: '0.85rem 1rem', 
    borderRadius: '0.5rem', 
    border: '1px solid var(--border-color)', 
    backgroundColor: 'var(--bg-secondary)', 
    color: 'var(--text-primary)', 
    outline: 'none', 
    width: '100%',
    fontFamily: 'inherit'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(10px)',
            zIndex: 999999, // Super high z-index to stay above cursor and header
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: '1.5rem',
              width: '100%',
              maxWidth: '900px',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              border: '1px solid var(--border-color)',
              cursor: 'auto'
            }}
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', zIndex: 10 }}
            >
              <X size={24} />
            </button>
            
            <div style={{ padding: '3rem' }}>
              {/* Header */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ marginBottom: '3rem', maxWidth: '800px' }}
              >
                <motion.p variants={itemVariants} style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '1rem' }}>
                  CONTACT
                </motion.p>
                <motion.h2 variants={itemVariants} className="font-serif heading-2 mb-4" style={{ color: 'var(--text-primary)', fontSize: '2.5rem' }}>
                  Get in touch
                </motion.h2>
                <motion.p variants={itemVariants} className="body-large">
                  Have a question, feedback, or need help? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
                </motion.p>
              </motion.div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
                
                {/* Left Column - Form */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  style={{ flex: '1 1 400px' }}
                >
                  <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '1.5rem' }}>
                      <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Name</label>
                        <input type="text" placeholder="Your name" style={inputStyle} />
                      </motion.div>
                      <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Email</label>
                        <input type="email" placeholder="you@example.com" style={inputStyle} />
                      </motion.div>
                    </div>
                    
                    <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Subject</label>
                      <input type="text" placeholder="What is this about?" style={inputStyle} />
                    </motion.div>

                    <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Message</label>
                      <textarea rows="5" placeholder="Tell us more..." style={{ ...inputStyle, resize: 'vertical' }}></textarea>
                    </motion.div>

                    <motion.div variants={itemVariants} style={{ marginTop: '0.5rem' }}>
                      <button type="button" className="btn" style={{ backgroundColor: '#3b82f6', color: 'white', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}>
                        Send Message <Send size={18} />
                      </button>
                    </motion.div>
                  </form>
                </motion.div>

                {/* Right Column - Info */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', gap: '2rem' }}
                >
                  {[
                    { icon: <Mail size={20} color="#3b82f6" />, title: "EMAIL", desc: "contact@invoicevoid.in" },
                    { icon: <MapPin size={20} color="#3b82f6" />, title: "LOCATION", desc: "Remote-first team, worldwide" },
                    { icon: <Clock size={20} color="#3b82f6" />, title: "RESPONSE TIME", desc: "Usually within 24 hours" }
                  ].map((info, i) => (
                    <motion.div key={i} variants={itemVariants} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                      <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {info.icon}
                      </div>
                      <div>
                        <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>{info.title}</p>
                        <p style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-primary)' }}>{info.desc}</p>
                      </div>
                    </motion.div>
                  ))}

                  <motion.div variants={itemVariants} style={{ marginTop: '1rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '1rem', padding: '1.5rem' }}>
                    <h4 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Looking for support?</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                      For bug reports, feature requests, or technical help, email us at <a href="mailto:support@invoicevoid.in" style={{ color: '#3b82f6' }}>support@invoicevoid.in</a> and we'll get you sorted.
                    </p>
                  </motion.div>
                </motion.div>

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
