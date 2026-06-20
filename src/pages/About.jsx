import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div style={{ minHeight: 'calc(100vh - 4.5rem)', padding: '6rem 1.5rem', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="heading-1 font-serif" style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
            About <span style={{ color: 'var(--accent-blue)' }}>InvoiceVoid</span>
          </h1>
          <p className="body-large" style={{ marginBottom: '3rem' }}>
            We're on a mission to simplify billing for freelancers, independent contractors, and small business owners around the world.
          </p>

          <div className="card" style={{ padding: '3rem', marginBottom: '3rem', borderTop: '4px solid var(--accent-blue)' }}>
            <h2 className="heading-2 font-serif" style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Our Story</h2>
            <p className="body-base" style={{ marginBottom: '1.5rem' }}>
              InvoiceVoid started with a simple realization: sending invoices shouldn't require a degree in accounting or an expensive monthly subscription. As freelancers ourselves, we were tired of clunky, outdated software that made us look unprofessional.
            </p>
            <p className="body-base">
              So, we built InvoiceVoid. A lightning-fast, beautifully designed invoicing tool that gets out of your way and lets you focus on what you do best—your work.
            </p>
          </div>

          <div className="grid-2-col" style={{ gap: '2rem' }}>
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--accent-blue-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Secure by Default</h3>
              <p className="body-base" style={{ fontSize: '0.875rem' }}>
                Your data is locked down with enterprise-grade encryption. We never share your financial information.
              </p>
            </div>
            
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--accent-blue-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Time is Money</h3>
              <p className="body-base" style={{ fontSize: '0.875rem' }}>
                Designed for speed. Create, send, and track invoices in seconds, not hours.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
