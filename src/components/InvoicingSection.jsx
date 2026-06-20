import React from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, FileDown, CreditCard } from 'lucide-react';

export default function InvoicingSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  const phoneVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 80, damping: 20 }
    }
  };

  return (
    <section id="features" className="section-padding" style={{ borderTop: '1px solid var(--border-color)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          
          {/* Text Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p variants={itemVariants} style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              INVOICING
            </motion.p>
            
            <motion.h2 variants={itemVariants} className="font-serif heading-2 mb-6" style={{ color: 'var(--text-primary)' }}>
              Create and send invoices in seconds
            </motion.h2>
            
            <motion.p variants={itemVariants} className="body-large mb-8">
              Generate professional invoices with customizable templates, track payment statuses in real time, and get paid faster.
            </motion.p>
            
            <motion.ul variants={containerVariants} style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { icon: <Send size={20} color="var(--accent-blue)" />, text: "Send invoices via email or shareable link" },
                { icon: <CheckCircle2 size={20} color="var(--accent-blue)" />, text: "Track statuses: Draft, Outstanding, Paid, Overdue" },
                { icon: <FileDown size={20} color="var(--accent-blue)" />, text: "Generate polished PDFs with one tap" },
                { icon: <CreditCard size={20} color="var(--accent-blue)" />, text: "Record payments and create schedules" },
              ].map((item, i) => (
                <motion.li key={i} variants={itemVariants} style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                  {item.icon}
                  <span>{item.text}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* CSS Phone Mockup */}
          <motion.div 
            variants={phoneVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div style={{
              width: '100%',
              maxWidth: '320px',
              backgroundColor: '#0a0a0a', /* Pitch black phone bg */
              borderRadius: '2.5rem',
              padding: '1.25rem',
              border: '8px solid #262626',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Dynamic Island / Notch */}
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '40%', height: '25px', backgroundColor: '#262626', borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem' }}></div>
              
              <div style={{ marginTop: '2rem', marginBottom: '1rem', padding: '0 0.5rem' }}>
                <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Invoices</h3>
                <p style={{ color: '#a3a3a3', fontSize: '0.75rem' }}>Manage your business invoices</p>
              </div>

              {/* Summary Card */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <div style={{ backgroundColor: '#171717', padding: '1rem', borderRadius: '1rem', position: 'relative' }}>
                  <p style={{ color: 'white', fontWeight: 700 }}>₹12,500</p>
                  <p style={{ color: '#a3a3a3', fontSize: '0.7rem' }}>Outstanding</p>
                  <div style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '28px', height: '28px', backgroundColor: '#0ea5e9', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                  </div>
                </div>
                <div style={{ backgroundColor: '#171717', padding: '1rem', borderRadius: '1rem', position: 'relative' }}>
                  <p style={{ color: 'white', fontWeight: 700 }}>10</p>
                  <p style={{ color: '#a3a3a3', fontSize: '0.7rem' }}>Total Invoices</p>
                  <div style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '28px', height: '28px', backgroundColor: '#a855f7', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  </div>
                </div>
              </div>

              <h4 style={{ color: 'white', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem', padding: '0 0.5rem' }}>Recent Invoices</h4>
              
              {/* List Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingBottom: '2rem' }}>
                {[
                  { name: "Swarej", amount: "₹5,000.00", status: "PAID", statusColor: "#34d399", bg: "rgba(52, 211, 153, 0.2)" },
                  { name: "Ronnie", amount: "₹1,600.00", status: "CANCELLED", statusColor: "#9ca3af", bg: "rgba(156, 163, 175, 0.2)" },
                  { name: "Rashu", amount: "₹1,500.00", status: "OVERDUE", statusColor: "#f87171", bg: "rgba(248, 113, 113, 0.2)" }
                ].map((inv, i) => (
                  <div key={i} style={{ backgroundColor: '#171717', padding: '0.75rem', borderRadius: '0.75rem' }}>
                    <div className="flex justify-between items-center mb-2">
                      <span style={{ color: 'white', fontWeight: 500, fontSize: '0.875rem' }}>{inv.name}</span>
                    </div>
                    <p style={{ color: 'white', fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.5rem' }}>{inv.amount}</p>
                    <span style={{ backgroundColor: inv.bg, color: inv.statusColor, fontSize: '0.65rem', padding: '0.2rem 0.5rem', borderRadius: '0.25rem', fontWeight: 700 }}>{inv.status}</span>
                  </div>
                ))}
              </div>

              {/* Floating + Button */}
              <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', width: '48px', height: '48px', backgroundColor: '#0ea5e9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(14, 165, 233, 0.5)', cursor: 'pointer' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
