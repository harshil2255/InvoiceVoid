import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <h2 className="font-serif heading-2 mb-6" style={{ color: 'var(--text-primary)' }}>Get the job done with InvoiceVoid</h2>
          <p className="body-large mb-8" style={{ color: 'var(--text-secondary)', margin: '0 auto 2.5rem auto' }}>
            Join thousands of freelancers and small businesses who trust InvoiceVoid to manage their finances. Get started for free — no credit card required.
          </p>
          
          <div className="flex justify-center gap-4">
            <motion.button 
              onClick={() => navigate('/signup')}
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Free <ArrowRight size={18} />
            </motion.button>
            <motion.button 
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
