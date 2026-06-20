import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Tags, Palette, CreditCard } from 'lucide-react';

export default function StatsBanner() {
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

  const stats = [
    { icon: <BarChart2 size={24} color="var(--accent-blue)" />, value: "100+", label: "API Endpoints" },
    { icon: <Tags size={24} color="var(--accent-blue)" />, value: "24", label: "Expense Categories" },
    { icon: <Palette size={24} color="var(--accent-blue)" />, value: "5+", label: "Invoice Templates" },
    { icon: <CreditCard size={24} color="var(--accent-blue)" />, value: "6", label: "Payment Methods" },
  ];

  return (
    <section style={{ backgroundColor: 'var(--bg-secondary)', padding: '4rem 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '2rem', textAlign: 'center' }}
        >
          {stats.map((stat, i) => (
            <motion.div key={i} variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              {stat.icon}
              <h3 style={{ color: 'var(--text-primary)', fontSize: '2.5rem', fontWeight: 800, margin: 0 }}>{stat.value}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
