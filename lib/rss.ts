export interface RSSItem {
  title: string;
  link: string;
  content: string;
  contentSnippet: string;
  pubDate: string;
  categories?: string[];
}

// Fallback data for static environments
const FALLBACK_ITEMS: RSSItem[] = [
  {
    title: "AI Breakthrough: New Language Model Shows Human-Like Reasoning",
    link: "https://example.com/ai-breakthrough",
    content: "Researchers have developed a new language model that demonstrates unprecedented reasoning capabilities...",
    contentSnippet: "Researchers have developed a new language model that demonstrates unprecedented reasoning capabilities...",
    pubDate: new Date().toISOString(),
    categories: ["AI Research"]
  },
  {
    title: "Machine Learning Transforms Healthcare Diagnostics",
    link: "https://example.com/ml-healthcare",
    content: "Healthcare providers are reporting significant improvements in diagnostic accuracy using new ML systems...",
    contentSnippet: "Healthcare providers are reporting significant improvements in diagnostic accuracy using new ML systems...",
    pubDate: new Date(Date.now() - 86400000).toISOString(),
    categories: ["Healthcare AI"]
  },
  {
    title: "Autonomous Systems Reach New Milestone",
    link: "https://example.com/autonomous-systems",
    content: "The latest developments in autonomous systems have achieved remarkable progress in real-world applications...",
    contentSnippet: "The latest developments in autonomous systems have achieved remarkable progress in real-world applications...",
    pubDate: new Date(Date.now() - 172800000).toISOString(),
    categories: ["Automation"]
  }
];

export async function fetchRSSFeeds(): Promise<RSSItem[]> {
  try {
    // Check if we're in a static environment
    if (process.env.NEXT_PUBLIC_STATIC_ENV || typeof window === 'undefined') {
      return FALLBACK_ITEMS;
    }

    const response = await fetch('/api/rss');
    const data = await response.json();
    return data.items.length > 0 ? data.items : FALLBACK_ITEMS;
  } catch (error) {
    console.error('Error fetching RSS feeds:', error);
    return FALLBACK_ITEMS;
  }
}