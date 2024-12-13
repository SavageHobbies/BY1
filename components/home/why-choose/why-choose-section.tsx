"use client";

import { motion } from 'framer-motion';
import { Award, Code2, Gauge, Cpu } from 'lucide-react';
import { Card } from '@/components/ui/card';

const reasons = [
  {
    icon: Award,
    title: 'Industry Expertise',
    description: 'Deep understanding of AI and automation across multiple sectors',
  },
  {
    icon: Code2,
    title: 'Custom Solutions',
    description: 'Tailored approaches that perfectly fit your business needs',
  },
  {
    icon: Gauge,
    title: 'Proven Results',
    description: 'Track record of successful implementations and ROI',
  },
  {
    icon: Cpu,
    title: 'Cutting-edge Technology',
    description: 'Access to the latest AI and automation innovations',
  },
];

export default function WhyChooseSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Why Choose BY1
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            Partner with experts who understand your business needs and deliver results
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 bg-primary/10 rounded-lg mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      {reason.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}