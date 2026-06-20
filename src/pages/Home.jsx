import React from 'react';
import Hero from '../components/Hero';
import InvoicingSection from '../components/InvoicingSection';
import EstimatesSection from '../components/EstimatesSection';
import ExpensesSection from '../components/ExpensesSection';
import ReportsSection from '../components/ReportsSection';
import StatsBanner from '../components/StatsBanner';
import Features from '../components/Features';
import MultiPlatformSection from '../components/MultiPlatformSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';

export default function Home() {
  return (
    <main>
      <Hero />
      <InvoicingSection />
      <EstimatesSection />
      <ExpensesSection />
      <ReportsSection />
      <StatsBanner />
      <Features />
      <MultiPlatformSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
