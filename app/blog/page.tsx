"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

interface Post {
  id: number;
  title: string;
  content: string;
  excerpt: string | null;
  slug: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setPosts(data.filter((post: Post) => post.published));
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  return (
    <div className="pt-20 pb-16 bg-gradient-to-b from-slate-900 to-primary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">Blog</h1>
          <div className="space-y-6">
            {loading ? (
              // Loading skeletons
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="p-6 bg-white/10 backdrop-blur-lg border-white/10">
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-32 bg-slate-700" />
                    <Skeleton className="h-6 w-3/4 bg-slate-700" />
                    <Skeleton className="h-20 w-full bg-slate-700" />
                  </div>
                </Card>
              ))
            ) : (
              posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/10 hover:bg-white/20 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-secondary text-sm">
                        Blog Post
                      </span>
                      <span className="text-slate-400 text-sm">
                        {format(new Date(post.createdAt), 'MMM d, yyyy')}
                      </span>
                    </div>
                    <h2 className="text-2xl font-semibold text-white mb-2">{post.title}</h2>
                    <p className="text-slate-300 mb-4 line-clamp-3">
                      {post.excerpt || post.content.slice(0, 150) + '...'}
                    </p>
                    <a href={`/blog/${post.slug}`} className="text-secondary hover:underline">
                      Read more →
                    </a>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}