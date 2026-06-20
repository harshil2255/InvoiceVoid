import React from 'react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)', paddingTop: '4rem', paddingBottom: '2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          <div className="footer-brand">
            <div className="logo flex items-center gap-2 mb-4">
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
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, maxWidth: '300px' }}>
              Professional invoicing, expense tracking, and financial reporting — all in one app.
            </p>
          </div>
          
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>Product</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="#" className="body-base">Features</a></li>
              <li><a href="#" className="body-base">Pricing</a></li>
              <li><a href="#" className="body-base">Integrations</a></li>
              <li><a href="#" className="body-base">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>Resources</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="#" className="body-base">Documentation</a></li>
              <li><a href="#" className="body-base">Blog</a></li>
              <li><a href="#" className="body-base">Help Center</a></li>
              <li><a href="#" className="body-base">Contact Support</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>Legal</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="#" className="body-base">Privacy Policy</a></li>
              <li><a href="#" className="body-base">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p className="body-base" style={{ fontSize: '0.875rem' }}>
            &copy; {new Date().getFullYear()} InvoiceVoid Inc. All rights reserved.
          </p>
          <div className="flex gap-4">
            {/* Social Links could go here */}
          </div>
        </div>
      </div>
    </footer>
  );
}
