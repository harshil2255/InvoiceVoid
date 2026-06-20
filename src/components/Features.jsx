import React from 'react';
import { motion } from 'framer-motion';
import { FileText, PieChart, CreditCard, Clock, Users, Shield } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <FileText size={24} color="var(--accent-blue)" />,
      title: "Smart Invoices",
      description: "Create professional invoices in seconds. Customize with your brand and logo."
    },
    {
      icon: <PieChart size={24} color="var(--status-green)" />,
      title: "Insightful Reports",
      description: "Understand your cash flow with beautiful, easy-to-read financial reports."
    },
    {
      icon: <CreditCard size={24} color="#8b5cf6" />,
      title: "Online Payments",
      description: "Get paid up to 3x faster by accepting credit cards and bank transfers online."
    },
    {
      icon: <Clock size={24} color="#f59e0b" />,
      title: "Time Tracking",
      description: "Track your time seamlessly and convert billable hours directly into invoices."
    },
    {
      icon: <Users size={24} color="#ec4899" />,
      title: "Client Portal",
      description: "Give your clients a dedicated portal to view and pay their invoices."
    },
    {
      icon: <Shield size={24} color="#14b8a6" />,
      title: "Secure Data",
      description: "Your financial data is encrypted and backed up automatically every single day."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="features" className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">Everything you need to run your business</h2>
          <p className="body-large" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Powerful features designed to save you time and help you get paid faster.
          </p>
        </div>

        <motion.div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '2rem'
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { type: "spring", stiffness: 400, damping: 10 } }}
              className="card"
            >
              <div 
                style={{ 
                  display: 'inline-flex', 
                  padding: '1rem', 
                  borderRadius: '1rem', 
                  backgroundColor: 'var(--bg-primary)',
                  boxShadow: 'var(--shadow-sm)',
                  marginBottom: '1.5rem'
                }}
              >
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                {feature.title}
              </h3>
              <p className="body-base">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
