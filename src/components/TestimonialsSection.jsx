import React from 'react';
import { motion } from 'framer-motion';

export default function TestimonialsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 20 }
    }
  };

  const testimonials = [
    {
      quote: "\"InvoiceVoid transformed how I manage my freelance business. Creating invoices used to take 20 minutes -- now it takes 30 seconds. The receipt scanning alone saves me hours every month.\"",
      name: "Sarah Chen",
      role: "Freelance Designer, Chen Creative Studio",
      initial: "S",
      color: "#3b82f6"
    },
    {
      quote: "\"The ability to convert estimates to invoices with one click is a game-changer. My team loves the scheduling feature for managing client appointments.\"",
      name: "Marcus Rivera",
      role: "Operations Manager, Rivera Home Services",
      initial: "M",
      color: "#3b82f6"
    },
    {
      quote: "\"Finally, an invoicing app that doesn't feel like it was built in 2005. The dark mode, the templates, the expense tracking -- everything just works beautifully.\"",
      name: "Priya Patel",
      role: "Small Business Owner, Patel Consulting",
      initial: "P",
      color: "#3b82f6"
    }
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
            TESTIMONIALS
          </p>
          <h2 className="font-serif heading-2 mb-4" style={{ color: 'var(--text-primary)' }}>Loved by businesses everywhere</h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
            See what professionals are saying about InvoiceVoid.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '2rem' }}
        >
          {testimonials.map((test, i) => (
            <motion.div key={i} variants={itemVariants} style={{ backgroundColor: 'var(--bg-primary)', padding: '2rem', borderRadius: '1.5rem', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={{ color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '2rem' }}>
                {test.quote}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: test.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>
                  {test.initial}
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.875rem' }}>{test.name}</p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{test.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
