'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Star, Timer } from 'lucide-react';
import Link from 'next/link';
import ROICalculator from '@/components/roi-calculator';

const features = [
  '24/7 Automated Call Answering',
  'Basic Customer Inquiry Handling',
  'FAQ Response System',
  'Intelligent Call Routing',
  'Monthly Performance Reports',
  'Data-Driven Insights',
];

const plans = [
  {
    name: 'Basic',
    description: 'Perfect for small businesses just getting started',
    setupFee: 999, // Limited time offer
    regularSetupFee: 2000,
    monthlyFee: 400,
    features: [
      '24/7 Automated Call Answering',
      'Basic Customer Inquiry Handling',
      'FAQ Response System',
      'Monthly Reports',
    ],
  },
  {
    name: 'Professional',
    description: 'Ideal for growing businesses',
    setupFee: 999, // Limited time offer
    regularSetupFee: 4000,
    monthlyFee: 800,
    features: [
      ...features,
      'Advanced Analytics',
      'Custom Integration',
      'Priority Support',
    ],
  },
  {
    name: 'Enterprise',
    description: 'For businesses that need the ultimate solution',
    setupFee: 999, // Limited time offer
    regularSetupFee: 6000,
    monthlyFee: 1500,
    features: [
      ...features,
      'Advanced Analytics',
      'Custom Integration',
      'Priority Support',
      'Dedicated Account Manager',
      'Custom AI Training',
    ],
  },
];

export default function AICustomerService() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-primary">
      {/* Hero Section */}
      <section className="pt-32 pb-16 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full mb-6">
              <Timer className="w-4 h-4 mr-2" />
              Limited Time Offer: $999 Setup Fee (Save up to $5,001)
            </div>
            <h1 className="text-5xl font-bold mb-6">
              AI-Powered Customer Service
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Transform your customer service with our AI solution. 24/7 availability,
              instant responses, and significant cost savings.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" variant="default">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline">
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-16 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Calculate Your ROI
            </h2>
            <p className="text-xl text-slate-300">
              See how much you can save by switching to AI-powered customer service
            </p>
          </div>
          <ROICalculator />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Why Choose Our AI Customer Service
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/10">
                  <div className="flex items-center mb-4">
                    <Check className="w-5 h-5 text-green-400 mr-2" />
                    <h3 className="text-lg font-semibold text-white">{feature}</h3>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Flexible Pricing Plans
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-8 bg-white/10 backdrop-blur-lg border-white/10 relative">
                  {plan.name === 'Professional' && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                        <Star className="w-4 h-4 mr-1" /> Most Popular
                      </span>
                    </div>
                  )}
                  <div className="absolute -top-4 right-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Save ${plan.regularSetupFee - plan.setupFee}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-slate-300 mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-white">
                      ${plan.monthlyFee}
                      <span className="text-lg font-normal text-slate-300">/mo</span>
                    </div>
                    <div className="text-slate-300 mt-2">
                      <span className="line-through">${plan.regularSetupFee}</span>
                      <span className="text-yellow-400 ml-2">${plan.setupFee} setup fee</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-slate-300">
                        <Check className="w-5 h-5 text-green-400 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.name === 'Professional' ? 'default' : 'outline'}>
                    Get Started
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full mb-6">
              <Timer className="w-4 h-4 mr-2" />
              Limited Time Offer - Act Now!
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Transform Your Customer Service?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Start your free trial today and experience the power of AI-driven customer support.
              Special setup fee of just $999 - Save up to $5,001!
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" variant="default">
                Start Free Trial
              </Button>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
