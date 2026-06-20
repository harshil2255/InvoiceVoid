import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Link, LayoutDashboard, Calendar, RefreshCw, Users, FileText, IndianRupee, File, CreditCard, Settings } from 'lucide-react';

export default function ReportsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const phoneVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 80, damping: 20 }
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

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          
          {/* CSS Phone Mockup (Left Side) */}
          <motion.div 
            variants={phoneVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div style={{
              width: '100%',
              maxWidth: '340px',
              backgroundColor: '#0a0a0a',
              borderRadius: '2.5rem',
              padding: '1.25rem 1.25rem 4rem 1.25rem', // extra padding bottom for nav
              border: '8px solid #262626',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative',
              overflow: 'hidden',
              height: '650px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Scrollable Content Area */}
              <div style={{ overflowY: 'auto', flex: 1, scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style>{`
                  div::-webkit-scrollbar { display: none; }
                `}</style>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>Reports</h3>
                    <p style={{ color: '#a3a3a3', fontSize: '0.7rem' }}>Financial insights & analytics</p>
                  </div>
                  <RefreshCw size={16} color="#a3a3a3" />
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: '#171717', padding: '0.25rem', borderRadius: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ flex: 1, backgroundColor: '#3b82f6', color: 'white', textAlign: 'center', padding: '0.5rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: 600 }}>Paid</div>
                  <div style={{ flex: 1, color: '#a3a3a3', textAlign: 'center', padding: '0.5rem', fontSize: '0.75rem', fontWeight: 600 }}>Clients</div>
                  <div style={{ flex: 1, color: '#a3a3a3', textAlign: 'center', padding: '0.5rem', fontSize: '0.75rem', fontWeight: 600 }}>Items</div>
                </div>

                {/* Summary Card */}
                <div style={{ backgroundColor: '#171717', padding: '1rem', borderRadius: '1rem', marginBottom: '1rem' }}>
                  <h4 style={{ color: 'white', fontSize: '0.875rem', fontWeight: 700, marginBottom: '1rem' }}>Tax Year 2026 Summary</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '32px', height: '32px', backgroundColor: 'rgba(59, 130, 246, 0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Users size={16} color="#3b82f6" />
                      </div>
                      <span style={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>1</span>
                      <span style={{ color: '#a3a3a3', fontSize: '0.65rem' }}>Clients</span>
                    </div>
                    <div style={{ width: '1px', height: '40px', backgroundColor: '#262626' }}></div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '32px', height: '32px', backgroundColor: 'rgba(168, 85, 247, 0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FileText size={16} color="#a855f7" />
                      </div>
                      <span style={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>1</span>
                      <span style={{ color: '#a3a3a3', fontSize: '0.65rem' }}>Invoices</span>
                    </div>
                    <div style={{ width: '1px', height: '40px', backgroundColor: '#262626' }}></div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '32px', height: '32px', backgroundColor: 'rgba(16, 185, 129, 0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IndianRupee size={16} color="#10b981" />
                      </div>
                      <span style={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>₹1,00,000</span>
                      <span style={{ color: '#a3a3a3', fontSize: '0.65rem' }}>Paid</span>
                    </div>
                  </div>
                </div>

                {/* 2 Mini Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <div style={{ backgroundColor: '#171717', padding: '0.75rem', borderRadius: '0.75rem' }}>
                    <p style={{ color: 'white', fontSize: '0.7rem', fontWeight: 600, marginBottom: '0.25rem' }}>Active Months</p>
                    <p style={{ color: 'white', fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>1/12</p>
                    <div style={{ width: '100%', height: '4px', backgroundColor: '#262626', borderRadius: '2px', marginBottom: '0.25rem' }}>
                      <div style={{ width: '8%', height: '100%', backgroundColor: '#10b981', borderRadius: '2px' }}></div>
                    </div>
                    <p style={{ color: '#a3a3a3', fontSize: '0.6rem' }}>Months with revenue</p>
                  </div>
                  <div style={{ backgroundColor: '#171717', padding: '0.75rem', borderRadius: '0.75rem' }}>
                    <p style={{ color: 'white', fontSize: '0.7rem', fontWeight: 600, marginBottom: '0.25rem' }}>Client Ratio</p>
                    <p style={{ color: 'white', fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>1:1</p>
                    <div style={{ width: '100%', height: '4px', backgroundColor: '#262626', borderRadius: '2px', marginBottom: '0.25rem' }}>
                      <div style={{ width: '100%', height: '100%', backgroundColor: '#10b981', borderRadius: '2px' }}></div>
                    </div>
                    <p style={{ color: '#a3a3a3', fontSize: '0.6rem' }}>Clients to invoices</p>
                  </div>
                </div>

                <h4 style={{ color: 'white', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.75rem' }}>Monthly Breakdown</h4>
                
                {/* List Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {[
                    { mNum: "12", mName: "Dec", c: "0", i: "0", amt: "₹0.00" },
                    { mNum: "11", mName: "Nov", c: "0", i: "0", amt: "₹0.00" },
                    { mNum: "10", mName: "Oct", c: "0", i: "0", amt: "₹0.00" },
                    { mNum: "9", mName: "Sep", c: "0", i: "0", amt: "₹0.00", hasTabs: true }
                  ].map((row, i) => (
                    <div key={i} style={{ backgroundColor: '#171717', padding: '0.75rem', borderRadius: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <div style={{ backgroundColor: '#262626', width: '28px', height: '28px', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.75rem', fontWeight: 700 }}>
                          {row.mNum}
                        </div>
                        <div>
                          <p style={{ color: 'white', fontWeight: 600, fontSize: '0.875rem' }}>{row.mName}</p>
                          <p style={{ color: '#a3a3a3', fontSize: '0.65rem' }}>{row.c} Clients</p>
                        </div>
                      </div>
                      
                      {row.hasTabs ? (
                        <div style={{ backgroundColor: '#262626', borderRadius: '1rem', padding: '0.2rem', display: 'flex', gap: '0.2rem' }}>
                           <div style={{ backgroundColor: '#3b82f6', color: 'white', fontSize: '0.65rem', padding: '0.2rem 0.5rem', borderRadius: '0.75rem', fontWeight: 600 }}>2026</div>
                           <div style={{ color: '#a3a3a3', fontSize: '0.65rem', padding: '0.2rem 0.5rem', borderRadius: '0.75rem', fontWeight: 600 }}>2025</div>
                        </div>
                      ) : null}

                      <div style={{ textAlign: 'right' }}>
                        <p style={{ color: 'white', fontWeight: 700, fontSize: '0.875rem' }}>{row.amt}</p>
                        <p style={{ color: '#a3a3a3', fontSize: '0.65rem' }}>{row.i} Invoices</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Nav Bar */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#0a0a0a', borderTop: '1px solid #262626', padding: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                  <FileText size={20} color="#a3a3a3" strokeWidth={1.5} />
                  <span style={{ fontSize: '0.55rem', color: '#a3a3a3' }}>Invoices</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                  <File size={20} color="#a3a3a3" strokeWidth={1.5} />
                  <span style={{ fontSize: '0.55rem', color: '#a3a3a3' }}>Estimates</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                  <CreditCard size={20} color="#a3a3a3" strokeWidth={1.5} />
                  <span style={{ fontSize: '0.55rem', color: '#a3a3a3' }}>Expenses</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                  <BarChart2 size={20} color="#3b82f6" strokeWidth={2} />
                  <span style={{ fontSize: '0.55rem', color: '#3b82f6', fontWeight: 600 }}>Reports</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                  <Calendar size={20} color="#a3a3a3" strokeWidth={1.5} />
                  <span style={{ fontSize: '0.55rem', color: '#a3a3a3' }}>Schedule</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                  <Settings size={20} color="#a3a3a3" strokeWidth={1.5} />
                  <span style={{ fontSize: '0.55rem', color: '#a3a3a3' }}>Settings</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Content - Right Side */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p variants={itemVariants} style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              REPORTS & SCHEDULING
            </motion.p>
            
            <motion.h2 variants={itemVariants} className="font-serif heading-2 mb-6" style={{ color: 'var(--text-primary)' }}>
              Insights that drive smarter decisions
            </motion.h2>
            
            <motion.p variants={itemVariants} className="body-large mb-8">
              Generate financial reports, manage client scheduling, and keep your business data at your fingertips.
            </motion.p>
            
            <motion.ul variants={containerVariants} style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { icon: <BarChart2 size={20} color="var(--accent-blue)" />, text: "Paid invoices, client, and item reports" },
                { icon: <Link size={20} color="var(--accent-blue)" />, text: "Shareable booking links for client scheduling" },
                { icon: <LayoutDashboard size={20} color="var(--accent-blue)" />, text: "Dashboard analytics and year-over-year comparison" },
                { icon: <Calendar size={20} color="var(--accent-blue)" />, text: "Track submissions: Pending, Scheduled, Completed" },
              ].map((item, i) => (
                <motion.li key={i} variants={itemVariants} style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                  {item.icon}
                  <span>{item.text}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
