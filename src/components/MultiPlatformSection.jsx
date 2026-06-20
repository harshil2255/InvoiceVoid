import React from 'react';
import { motion } from 'framer-motion';

export default function MultiPlatformSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 20 }
    }
  };

  // Helper component to render the inner UI for the mockups so we don't repeat code
  const MockupUI = ({ isDesktop = false }) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ color: 'white', fontSize: isDesktop ? '1.5rem' : '1.25rem', fontWeight: 700, margin: 0 }}>Invoices</h3>
            <p style={{ color: '#a3a3a3', fontSize: '0.75rem', margin: 0 }}>Manage your business invoices</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <div style={{ width: '32px', height: '32px', backgroundColor: '#262626', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a3a3a3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
            <div style={{ width: '32px', height: '32px', backgroundColor: '#0ea5e9', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ width: '100%', height: '36px', backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '0.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', padding: '0 0.75rem' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#737373" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <span style={{ color: '#737373', fontSize: '0.75rem', marginLeft: '0.5rem' }}>Search invoices...</span>
        </div>

        {/* Summary Cards */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <div style={{ flex: 2, backgroundColor: '#171717', padding: '1rem', borderRadius: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'white', fontWeight: 700, fontSize: isDesktop ? '1.25rem' : '1rem' }}>₹1,12,00,000.00</p>
              <p style={{ color: '#a3a3a3', fontSize: '0.7rem' }}>Total Outstanding</p>
            </div>
            <div style={{ width: '32px', height: '32px', backgroundColor: '#0ea5e9', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
            </div>
          </div>
          <div style={{ flex: 1, backgroundColor: '#171717', padding: '1rem', borderRadius: '1rem', position: 'relative' }}>
            <p style={{ color: 'white', fontWeight: 700, fontSize: isDesktop ? '1.25rem' : '1rem' }}>10</p>
            <p style={{ color: '#a3a3a3', fontSize: '0.7rem' }}>Total Invoices</p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', overflow: 'hidden' }}>
          <div style={{ padding: '0.25rem 0.75rem', backgroundColor: '#0ea5e9', color: 'white', fontSize: '0.75rem', borderRadius: '1rem', fontWeight: 600 }}>All</div>
          <div style={{ padding: '0.25rem 0.75rem', backgroundColor: '#171717', color: '#a3a3a3', fontSize: '0.75rem', borderRadius: '1rem', fontWeight: 600, border: '1px solid #262626' }}>Outstanding</div>
          <div style={{ padding: '0.25rem 0.75rem', backgroundColor: '#171717', color: '#a3a3a3', fontSize: '0.75rem', borderRadius: '1rem', fontWeight: 600, border: '1px solid #262626' }}>Paid</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <h4 style={{ color: 'white', fontSize: '0.875rem', fontWeight: 600, margin: 0 }}>Recent Invoices (10)</h4>
          <span style={{ color: '#a3a3a3', fontSize: '0.75rem' }}>Total ₹1,73,18,000.00</span>
        </div>
        
        {/* List Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1, overflow: 'hidden' }}>
          {[
            { name: "Swaraj", amount: "₹5,00,000.00", status: "PAID", statusColor: "#34d399", bg: "rgba(52, 211, 153, 0.2)" },
            { name: "Ronnie", amount: "₹50,00,000.00", status: "CANCELLED", statusColor: "#9ca3af", bg: "rgba(156, 163, 175, 0.2)" },
            { name: "Aashu", amount: "₹15,000.00", status: "OVERDUE", statusColor: "#f87171", bg: "rgba(248, 113, 113, 0.2)" },
            { name: "Ronnie", amount: "₹9,00,000.00", status: "OUTSTANDING", statusColor: "#60a5fa", bg: "rgba(96, 165, 250, 0.2)" },
          ].map((inv, i) => (
            <div key={i} style={{ backgroundColor: '#171717', padding: isDesktop ? '1rem' : '0.75rem', borderRadius: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <span style={{ color: 'white', fontWeight: 500, fontSize: '0.875rem' }}>{inv.name}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#737373" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
              </div>
              <p style={{ color: 'white', fontWeight: 700, fontSize: isDesktop ? '1rem' : '0.875rem', marginBottom: '0.5rem' }}>{inv.amount}</p>
              <span style={{ backgroundColor: inv.bg, color: inv.statusColor, fontSize: '0.65rem', padding: '0.2rem 0.5rem', borderRadius: '0.25rem', fontWeight: 700 }}>{inv.status}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)', overflow: 'hidden' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem auto' }}
        >
          <h2 className="font-serif heading-2 mb-4" style={{ color: 'var(--text-primary)' }}>Works everywhere you do</h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
            Access InvoiceVoid on your phone, tablet, or desktop. Your data syncs instantly across all devices.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'flex-end', 
            height: '600px', 
            gap: '2rem',
            position: 'relative',
            marginTop: '2rem'
          }}
        >
          {/* Phone (Left) */}
          <motion.div variants={itemVariants} style={{ zIndex: 10, width: '300px', height: '500px', flexShrink: 0 }}>
            <div style={{ width: '100%', height: '100%', backgroundColor: '#0f172a', borderRadius: '2.5rem', padding: '1.25rem', border: '8px solid #1e293b', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '40%', height: '20px', backgroundColor: '#1e293b', borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem' }}></div>
              <div style={{ paddingTop: '1.5rem', height: '100%' }}>
                <MockupUI />
              </div>
            </div>
          </motion.div>

          {/* Desktop/Web (Center) */}
          <motion.div variants={itemVariants} style={{ zIndex: 5, width: '600px', height: '600px', flexShrink: 0 }}>
            <div style={{ width: '100%', height: '100%', backgroundColor: '#0f172a', borderRadius: '1.5rem', padding: '1.5rem', border: '8px solid #1e293b', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
              <MockupUI isDesktop={true} />
            </div>
          </motion.div>
          
          {/* Tablet (Right) */}
          <motion.div variants={itemVariants} style={{ zIndex: 8, width: '400px', height: '450px', flexShrink: 0 }}>
            <div style={{ width: '100%', height: '100%', backgroundColor: '#0f172a', borderRadius: '1.5rem', padding: '1.25rem', border: '8px solid #1e293b', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
              <MockupUI />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
