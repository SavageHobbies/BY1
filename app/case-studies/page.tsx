"use client";

import { motion } from 'framer-motion';
import CaseStudiesSection from '@/components/home/case-studies/case-studies-section';

export default function CaseStudiesPage() {
  return (
    <div className="pt-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CaseStudiesSection />
      </motion.div>
    </div>
  );
}