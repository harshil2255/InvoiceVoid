import React from 'react';
import { motion } from 'framer-motion';

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "5 Tax Deductions Every Freelancer Should Know",
      excerpt: "Don't leave money on the table. Discover the top tax deductions that independent contractors often miss during tax season.",
      date: "Oct 12, 2026",
      category: "Finance",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "How to Politely Ask a Client for Overdue Payment",
      excerpt: "Chasing down unpaid invoices is the worst part of freelancing. Here are 3 email templates you can use to get paid faster without burning bridges.",
      date: "Sep 28, 2026",
      category: "Business",
      readTime: "4 min read"
    },
    {
      id: 3,
      title: "Pricing Your Services: Hourly vs. Project Based",
      excerpt: "Are you undercharging for your time? A deep dive into the pros and cons of hourly billing versus flat-rate project pricing.",
      date: "Sep 15, 2026",
      category: "Strategy",
      readTime: "7 min read"
    }
  ];

  return (
    <div style={{ minHeight: 'calc(100vh - 4.5rem)', padding: '6rem 1.5rem', backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h1 className="heading-1 font-serif" style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>
              The InvoiceVoid <span style={{ color: 'var(--accent-blue)' }}>Blog</span>
            </h1>
            <p className="body-large">
              Tips, strategies, and advice for growing your freelance business.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '2rem' }}>
            {posts.map((post, index) => (
              <motion.div 
                key={post.id}
                className="card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ display: 'flex', flexDirection: 'column', padding: '2rem' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className="badge badge-blue">{post.category}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{post.readTime}</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.4 }}>
                  {post.title}
                </h3>
                <p className="body-base" style={{ fontSize: '0.875rem', marginBottom: '2rem', flex: 1 }}>
                  {post.excerpt}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{post.date}</span>
                  <button className="btn btn-ghost" style={{ color: 'var(--accent-blue)', padding: '0', fontWeight: 600 }}>Read More →</button>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </div>
  );
}
