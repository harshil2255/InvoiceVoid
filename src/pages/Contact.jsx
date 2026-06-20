import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email) {
        setEmail(session.user.email);
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const subjectEncoded = encodeURIComponent(subject || 'Contact from InvoiceVoid');
    const bodyEncoded = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=opgamer2255@gmail.com&su=${subjectEncoded}&body=${bodyEncoded}`;
    
    window.open(gmailLink, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 }
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
    <main className="section-padding" style={{ backgroundColor: 'var(--bg-primary)', minHeight: 'calc(100vh - 80px)' }}>
      <div className="container" style={{ marginTop: '4rem' }}>
        
        {/* Header */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ marginBottom: '4rem', maxWidth: '800px' }}
        >
          <motion.p variants={itemVariants} style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
            CONTACT
          </motion.p>
          <motion.h2 variants={itemVariants} className="font-serif heading-2 mb-4" style={{ color: 'var(--text-primary)', fontSize: '3rem' }}>
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
            style={{ flex: '1 1 500px' }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1.5rem' }}>
                <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Name</label>
                  <input type="text" placeholder="Your name" style={inputStyle} value={name} onChange={e => setName(e.target.value)} required />
                </motion.div>
                <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Email</label>
                  <input type="email" placeholder="you@example.com" style={inputStyle} value={email} onChange={e => setEmail(e.target.value)} required />
                </motion.div>
              </div>
              
              <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Subject</label>
                <input type="text" placeholder="What is this about?" style={inputStyle} value={subject} onChange={e => setSubject(e.target.value)} required />
              </motion.div>

              <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Message</label>
                <textarea rows="5" placeholder="Tell us more..." style={{ ...inputStyle, resize: 'vertical' }} value={message} onChange={e => setMessage(e.target.value)} required></textarea>
              </motion.div>

              <motion.div variants={itemVariants} style={{ marginTop: '0.5rem' }}>
                <button type="submit" className="btn" style={{ backgroundColor: '#3b82f6', color: 'white', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}>
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
            style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            {[
              { icon: <Mail size={20} color="#3b82f6" />, title: "EMAIL", desc: "opgamer2255@gmail.com" },
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
                For bug reports, feature requests, or technical help, email us at <a href="mailto:opgamer2255@gmail.com" style={{ color: '#3b82f6' }}>opgamer2255@gmail.com</a> and we'll get you sorted.
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
