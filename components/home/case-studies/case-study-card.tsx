"use client";

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface CaseStudyCardProps {
  title: string;
  industry: string;
  metrics: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
}

export default function CaseStudyCard({
  title,
  industry,
  metrics,
  description,
  icon: Icon,
  delay = 0
}: CaseStudyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <Card className="p-6 h-full hover:shadow-lg transition-shadow bg-white/5 backdrop-blur-lg border-white/10">
        <div className="flex flex-col h-full">
          <div className="mb-4">
            <Icon className="h-8 w-8 text-secondary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <div className="mb-2 text-sm text-slate-500 dark:text-slate-400">
            {industry}
          </div>
          <div className="text-lg font-semibold text-secondary mb-3">
            {metrics}
          </div>
          <p className="text-slate-600 dark:text-slate-300 flex-grow">
            {description}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}