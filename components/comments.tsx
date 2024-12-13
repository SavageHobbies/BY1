'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';
import { MessageSquare, User } from 'lucide-react';

interface Comment {
  id: number;
  content: string;
  author: string;
  email?: string;
  createdAt: string;
  updatedAt: string;
}

interface CommentsProps {
  comments: Comment[];
  postId: number;
}

export default function Comments({ comments: initialComments, postId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState({
    author: '',
    email: '',
    content: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.author || !newComment.content) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newComment,
          postId,
        }),
      });

      if (!response.ok) throw new Error('Failed to post comment');

      const comment = await response.json();
      setComments([comment, ...comments]);
      setNewComment({ author: '', email: '', content: '' });
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2">
        <MessageSquare className="w-5 h-5" />
        <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>
      </div>

      {/* Comment Form */}
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <Input
                value={newComment.author}
                onChange={(e) =>
                  setNewComment({ ...newComment, author: e.target.value })
                }
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                value={newComment.email}
                onChange={(e) =>
                  setNewComment({ ...newComment, email: e.target.value })
                }
                placeholder="Your email (optional)"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Comment *</label>
            <Textarea
              value={newComment.content}
              onChange={(e) =>
                setNewComment({ ...newComment, content: e.target.value })
              }
              placeholder="Write your comment here..."
              required
              rows={4}
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </Button>
        </form>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        <AnimatePresence>
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-semibold">{comment.author}</span>
                        <span className="text-sm text-slate-500 ml-2">
                          {format(new Date(comment.createdAt), 'MMM d, yyyy')}
                        </span>
                      </div>
                    </div>
                    <div className="prose prose-sm max-w-none">
                      {comment.content}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
