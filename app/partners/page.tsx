"use client";

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const partners = [
  {
    name: "StackBlitz",
    logo: "https://c.staticblitz.com/assets/favicon-7453cf0c12d349fb64b7aa2b69cc69c026f083a27f139f0839b1f4948bed6811.png",
    description: "Cloud Development Platform revolutionizing the way we build and deploy web applications.",
    url: "https://stackblitz.com",
    partnership: "Technology Partner"
  },
  {
    name: "GLHF.chat",
    logo: "https://glhf.chat/favicon.ico",
    description: "Advanced AI chat solutions for modern businesses and developers.",
    url: "https://glhf.chat",
    partnership: "Integration Partner"
  },
  {
    name: "WebContainers",
    logo: "https://webcontainers.io/favicon.ico",
    description: "Browser-based development environment powering the next generation of tools.",
    url: "https://webcontainers.io",
    partnership: "Infrastructure Partner"
  }
];

export default function PartnersPage() {
  return (
    <div className="pt-20 pb-16 bg-gradient-to-b from-slate-900 to-primary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">Our Partners</h1>
          <p className="text-xl text-slate-300 mb-12 text-center">
            Collaborating with industry leaders to deliver exceptional solutions
          </p>

          <div className="grid gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/10">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="w-24 h-24 rounded-lg bg-white/5 flex items-center justify-center p-4">
                      <img
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        className="max-w-full max-h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-2xl font-semibold text-white">{partner.name}</h2>
                        <span className="text-xs text-secondary px-2 py-1 rounded-full border border-secondary">
                          {partner.partnership}
                        </span>
                      </div>
                      <p className="text-slate-300 mb-4">{partner.description}</p>
                      <a
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="secondary" className="group">
                          Visit Website
                          <ExternalLink className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Become a Partner</h2>
            <p className="text-slate-300 mb-6">
              Join our network of industry leaders and innovators. Let's create the future of technology together.
            </p>
            <Button size="lg" className="bg-secondary hover:bg-secondary-dark">
              Apply for Partnership
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}