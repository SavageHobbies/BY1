"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Github, Linkedin, Twitter, ExternalLink, BookOpen, Newspaper } from 'lucide-react';

const businessNetwork = [
  {
    category: "AI & Technology",
    sites: [
      {
        name: "AI Tool Lab",
        url: "https://aitoollab.ai",
        description: "AI Tools Directory"
      },
      {
        name: "AI Review App",
        url: "https://aireviewapp.com",
        description: "AI Product Reviews"
      },
      {
        name: "AI-I.net",
        url: "https://ai-i.net",
        description: "AI Innovation Hub"
      }
    ]
  },
  {
    category: "Books & Education",
    sites: [
      {
        name: "P2E Bible",
        url: "https://p2ebible.com",
        description: "The Ultimate Play-to-Earn Guide Book",
        icon: BookOpen
      },
      {
        name: "eBook Mastermind",
        url: "https://ebookmastermind.com",
        description: "Digital Publishing Platform"
      }
    ]
  },
  {
    category: "Media & Entertainment",
    sites: [
      {
        name: "Game Track",
        url: "https://gametrack.org",
        description: "Gaming Analytics Platform"
      },
      {
        name: "Live Recordings",
        url: "https://live-recordings.com",
        description: "Music Platform"
      },
      {
        name: "The Black Files",
        url: "https://theblackfiles.com",
        description: "Satirical Conspiracy News",
        icon: Newspaper
      },
      {
        name: "Trendsetterz",
        url: "https://trendsetterz.buzz",
        description: "Trend Analysis"
      }
    ]
  },
  {
    category: "Business & Personal",
    sites: [
      {
        name: "Deals BY1",
        url: "https://dealsby1.net",
        description: "Tech Deals Platform"
      },
      {
        name: "Bryce Falcon",
        url: "https://brycefalcon.com",
        description: "Personal Portfolio"
      }
    ]
  }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">BY1<span className="text-secondary">.net</span></h3>
            <p className="text-slate-400">
              Transforming businesses through AI and automation solutions.
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://twitter.com/by1net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-secondary"
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://linkedin.com/company/by1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-secondary"
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://github.com/by1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-secondary"
              >
                <Github className="h-5 w-5" />
              </motion.a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services/ai-implementation" className="hover:text-secondary transition-colors">
                  AI Implementation
                </Link>
              </li>
              <li>
                <Link href="/services/process-automation" className="hover:text-secondary transition-colors">
                  Process Automation
                </Link>
              </li>
              <li>
                <Link href="/services/digital-transformation" className="hover:text-secondary transition-colors">
                  Digital Transformation
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold mb-4 text-white">Our Network</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {businessNetwork.map((category) => (
                <div key={category.category}>
                  <h5 className="text-sm font-semibold text-secondary mb-2">{category.category}</h5>
                  <ul className="space-y-2">
                    {category.sites.map((site) => (
                      <li key={site.name}>
                        <a
                          href={site.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center hover:text-secondary transition-colors"
                        >
                          {site.name}
                          {site.icon ? (
                            <site.icon className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                          ) : (
                            <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </a>
                        <span className="text-xs text-slate-500">{site.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center text-slate-400">
            <p>&copy; {currentYear} BY1.net. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-secondary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-secondary transition-colors">
                Terms of Service
              </Link>
              <Link href="/partners" className="hover:text-secondary transition-colors">
                Partner Program
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}