"use client";

import { motion } from 'framer-motion';
import { Search, PenTool, Rocket, BarChart } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Assessment & Strategy',
    description: 'We analyze your current processes and develop a tailored strategy',
  },
  {
    icon: PenTool,
    title: 'Solution Design',
    description: 'Custom solution architecture aligned with your business goals',
  },
  {
    icon: Rocket,
    title: 'Implementation',
    description: 'Seamless deployment with minimal disruption to operations',
  },
  {
    icon: BarChart,
    title: 'Ongoing Support',
    description: 'Continuous optimization and support for maximum ROI',
  },
];

export default function ProcessSection() {
  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Our Process
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            A proven approach to digital transformation
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 w-full h-0.5 bg-gradient-to-r from-secondary to-transparent -translate-y-1/2 translate-x-1/2" />
                )}
                <div className="flex flex-col items-center text-center relative z-10">
                  <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg mb-4">
                    <Icon className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}