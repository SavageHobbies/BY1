"use client";

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string[];
  buttonText: string;
  delay?: number;
}

export default function ServiceCard({ icon: Icon, title, description, buttonText, delay = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-2xl blur-xl transition-all duration-300 group-hover:blur-2xl" />
      <div className="relative bg-white/10 dark:bg-slate-900/50 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
        <div className="mb-6">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-xl flex items-center justify-center mb-4"
          >
            <Icon className="h-8 w-8 text-white" />
          </motion.div>
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-slate-100 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            {title}
          </h3>
        </div>
        <ul className="space-y-2 mb-6">
          {description.map((point, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: delay + (index * 0.1) }}
              className="flex items-center text-slate-300"
            >
              <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-2" />
              {point}
            </motion.li>
          ))}
        </ul>
        <Button
          className="w-full bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {buttonText}
        </Button>
      </div>
    </motion.div>
  );
}