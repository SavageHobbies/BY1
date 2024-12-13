"use client";

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="pt-20 pb-16 bg-gradient-to-b from-slate-900 to-primary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">About BY1</h1>
          <Card className="p-8 bg-white/10 backdrop-blur-lg border-white/10">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-slate-300 mb-6">
                BY1 is a leading AI and automation consulting firm dedicated to transforming businesses through innovative technology solutions. Our team of experts combines deep technical knowledge with practical business experience to deliver results that matter.
              </p>
              <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
              <p className="text-slate-300 mb-6">
                To empower organizations with cutting-edge AI and automation solutions that drive growth, efficiency, and innovation in the digital age.
              </p>
              <h2 className="text-2xl font-semibold text-white mb-4">Our Vision</h2>
              <p className="text-slate-300 mb-6">
                To be the global leader in AI and automation consulting, known for delivering transformative solutions that shape the future of business.
              </p>
              <h2 className="text-2xl font-semibold text-white mb-4">Our Values</h2>
              <ul className="list-disc list-inside text-slate-300 space-y-2 mb-6">
                <li>Innovation in everything we do</li>
                <li>Excellence in delivery</li>
                <li>Client success first</li>
                <li>Ethical AI development</li>
                <li>Continuous learning and improvement</li>
              </ul>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}