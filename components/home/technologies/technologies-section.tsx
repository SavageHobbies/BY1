"use client";

import { motion } from 'framer-motion';

const technologies = [
  {
    name: 'TensorFlow',
    category: 'AI/ML',
  },
  {
    name: 'PyTorch',
    category: 'AI/ML',
  },
  {
    name: 'UiPath',
    category: 'RPA',
  },
  {
    name: 'Blue Prism',
    category: 'RPA',
  },
  {
    name: 'Azure AI',
    category: 'Cloud AI',
  },
  {
    name: 'AWS AI',
    category: 'Cloud AI',
  },
];

export default function TechnologiesSection() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Technologies We Work With
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            Leveraging cutting-edge platforms to deliver innovative solutions
          </motion.p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="w-24 h-24 bg-white dark:bg-slate-700 rounded-lg shadow-md flex items-center justify-center mb-4 hover:shadow-lg transition-shadow">
                <span className="text-xl font-semibold text-primary dark:text-white">
                  {tech.name}
                </span>
              </div>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {tech.category}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}