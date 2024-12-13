"use client";

import { motion } from 'framer-motion';
import { Brain, Cog, Network } from 'lucide-react';
import ServiceCard from './service-card';
import GridBackground from './grid-background';

const services = [
  {
    icon: Brain,
    title: "AI Implementation & Integration",
    description: [
      "Custom ML model development",
      "NLP & Computer Vision solutions",
      "AI-powered analytics",
      "Seamless system integration"
    ],
    buttonText: "Learn More"
  },
  {
    icon: Cog,
    title: "Process Automation Solutions",
    description: [
      "RPA implementation",
      "Workflow optimization",
      "Business process mapping",
      "Intelligent document processing"
    ],
    buttonText: "Explore Solutions"
  },
  {
    icon: Network,
    title: "Digital Transformation Strategy",
    description: [
      "Technology roadmap",
      "Change management",
      "Infrastructure planning",
      "ROI optimization"
    ],
    buttonText: "Get Started"
  }
];

export default function ServicesSection() {
  return (
    <section className="relative py-20 overflow-hidden bg-slate-900">
      <GridBackground />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-cyan-300 max-w-2xl mx-auto"
          >
            Comprehensive AI & Automation Solutions
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              {...service}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "AI Implementation",
            "provider": {
              "@type": "Organization",
              "name": "BY1",
              "description": "AI and Automation Solutions Provider"
            }
          })
        }}
      />
    </section>
  );
}