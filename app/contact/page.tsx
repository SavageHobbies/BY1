"use client";

import { motion } from 'framer-motion';
import ContactSection from '@/components/home/contact/contact-section';

export default function ContactPage() {
  return (
    <div className="pt-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ContactSection />
      </motion.div>
    </div>
  );
}