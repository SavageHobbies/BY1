'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="relative min-h-[50vh] bg-gradient-to-b from-slate-900 to-primary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      
      {/* Main Content */}
      <div className="relative pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl font-bold text-white mb-6">
                Transform Your Business with AI Solutions
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                Cutting-edge technology solutions for modern businesses.
                From AI-powered customer service to custom development.
              </p>
              <div className="flex gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </motion.div>

            {/* Right Column - Featured Offering */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 border border-white/10">
                <div className="inline-block bg-primary/20 rounded-full px-4 py-1 text-sm font-semibold text-primary-foreground mb-6">
                  New Offering
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  AI-Powered Customer Service
                </h2>
                <p className="text-slate-300 mb-6">
                  24/7 customer support with advanced AI technology.
                  Reduce costs and improve customer satisfaction.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-slate-300">
                    <span className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center mr-3">
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                    </span>
                    24/7 Automated Support
                  </li>
                  <li className="flex items-center text-slate-300">
                    <span className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center mr-3">
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                    </span>
                    Up to 60% Cost Reduction
                  </li>
                  <li className="flex items-center text-slate-300">
                    <span className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center mr-3">
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                    </span>
                    Instant Response Time
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/ai-customer-service" className="flex items-center justify-center">
                    Learn More About AI Service
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Animated Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20 opacity-30 animate-gradient" />
    </div>
  );
}
