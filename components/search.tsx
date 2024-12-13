'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search as SearchIcon, Tag, Folder, FileText, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useDebounce } from '@/lib/hooks';

interface SearchResult {
  posts: any[];
  categories: any[];
  tags: any[];
}

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    async function performSearch() {
      if (!debouncedQuery) {
        setResults(null);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    }

    performSearch();
  }, [debouncedQuery]);

  return (
    <div className="relative" ref={searchRef}>
      <div className="flex items-center">
        <Input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full"
        />
        <Button
          variant="ghost"
          size="icon"
          className="ml-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <SearchIcon className="h-4 w-4" />
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (query || loading) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
          >
            <Card className="p-4 shadow-lg max-h-[80vh] overflow-auto">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              ) : results ? (
                <div className="space-y-6">
                  {/* Posts */}
                  {results.posts.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        Posts
                      </h3>
                      <ul className="space-y-2">
                        {results.posts.map((post) => (
                          <li key={post.id}>
                            <Link
                              href={`/blog/${post.slug}`}
                              className="block hover:bg-slate-100 p-2 rounded"
                            >
                              <div className="font-medium">{post.title}</div>
                              {post.excerpt && (
                                <div className="text-sm text-slate-600 mt-1">
                                  {post.excerpt}
                                </div>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Categories */}
                  {results.categories.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center">
                        <Folder className="w-4 h-4 mr-2" />
                        Categories
                      </h3>
                      <ul className="space-y-2">
                        {results.categories.map((category) => (
                          <li key={category.id}>
                            <Link
                              href={`/blog/category/${category.slug}`}
                              className="block hover:bg-slate-100 p-2 rounded"
                            >
                              <div className="font-medium">{category.name}</div>
                              <div className="text-sm text-slate-600">
                                {category._count.posts} posts
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tags */}
                  {results.tags.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center">
                        <Tag className="w-4 h-4 mr-2" />
                        Tags
                      </h3>
                      <ul className="space-y-2">
                        {results.tags.map((tag) => (
                          <li key={tag.id}>
                            <Link
                              href={`/blog/tag/${tag.slug}`}
                              className="block hover:bg-slate-100 p-2 rounded"
                            >
                              <div className="font-medium">{tag.name}</div>
                              <div className="text-sm text-slate-600">
                                {tag._count.posts} posts
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* No Results */}
                  {!results.posts.length && !results.categories.length && !results.tags.length && (
                    <div className="text-center py-8 text-slate-500">
                      No results found for "{query}"
                    </div>
                  )}
                </div>
              ) : null}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
