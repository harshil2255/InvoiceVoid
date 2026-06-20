import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: "How do I create an invoice?", a: "Simply log into your dashboard, click 'New Invoice', select a template, add your client and line items, and hit send." },
    { q: "What payment methods are supported?", a: "We support Stripe, PayPal, and standard bank transfers. Your clients can pay directly from the invoice link." },
    { q: "Can I track expenses and scan receipts?", a: "Yes, our mobile app lets you snap a photo of any receipt and our OCR technology will automatically extract the details." },
    { q: "Is there a mobile app?", a: "Yes, InvoiceVoid is available on both iOS and Android platforms, allowing you to manage your business on the go." },
    { q: "How does client scheduling work?", a: "You can set up a unique booking link. Clients can select available slots, and those appointments will sync directly to your calendar." },
    { q: "Can I customize invoice templates?", a: "Absolutely. We offer over 5 customizable templates where you can add your logo, brand colors, and custom footers." }
  ];

  return (
    <section id="faq" className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 className="font-serif heading-2 mb-4" style={{ color: 'var(--text-primary)' }}>FAQ</h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
            Everything you need to know about InvoiceVoid.
          </p>
        </motion.div>

        <div>
          {faqs.map((faq, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ borderBottom: '1px solid var(--border-color)', padding: '1.5rem 0' }}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '1.125rem', fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}
              >
                {faq.q}
                <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }}>
                  <ChevronDown size={20} color="var(--text-secondary)" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{ paddingTop: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
