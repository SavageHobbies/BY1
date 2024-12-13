export const siteConfig = {
  name: 'BY1',
  description: 'Transform your customer service with BY1\'s AI solutions. 24/7 support, cost-effective, and seamless integration. Start your journey to better customer service today.',
  url: 'https://by1.net',
  ogImage: 'https://by1.net/og.jpg',
  links: {
    twitter: 'https://twitter.com/by1',
    github: 'https://github.com/by1',
  },
  keywords: [
    'technology',
    'innovation',
    'artificial intelligence',
    'software development',
    'tech news',
    'blog',
  ],
};

import { Metadata } from 'next';

const title = 'BY1 - AI-Powered Customer Service Solutions';
const description = 'Transform your customer service with BY1\'s AI solutions. 24/7 support, cost-effective, and seamless integration. Start your journey to better customer service today.';

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  metadataBase: new URL('https://by1.net'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title,
    description,
    url: 'https://by1.net',
    siteName: title,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export type SiteConfig = typeof siteConfig;
