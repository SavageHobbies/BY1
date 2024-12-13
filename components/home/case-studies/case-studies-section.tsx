"use client";

import { motion } from 'framer-motion';
import { Building2, Activity, Briefcase } from 'lucide-react';
import CaseStudyCard from './case-study-card';

const caseStudies = [
  {
    title: "Manufacturing Efficiency",
    industry: "Manufacturing",
    metrics: "40% efficiency increase",
    description: "Implemented AI-driven process optimization for a leading manufacturer, resulting in significant productivity gains and cost reduction.",
    icon: Building2,
  },
  {
    title: "Healthcare Analytics",
    industry: "Healthcare",
    metrics: "60% faster diagnostics",
    description: "Developed predictive analytics system for patient care optimization, leading to improved patient outcomes and reduced wait times.",
    icon: Activity,
  },
  {
    title: "Financial Automation",
    industry: "Finance",
    metrics: "85% cost reduction",
    description: "Automated complex financial processes with AI-powered solutions, dramatically reducing manual work and improving accuracy.",
    icon: Briefcase,
  },
];

export default function CaseStudiesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="text-sm font-semibold text-secondary uppercase tracking-wider">
              Success Stories
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
          >
            Real Results from Real Clients
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto"
          >
            See how our AI and automation solutions have transformed businesses across industries
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <CaseStudyCard
              key={study.title}
              {...study}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}