"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from 'date-fns';
import { Pencil, Trash2, Plus, Save, X } from 'lucide-react';
import { Label } from '@/components/ui/label';

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

export default function AdminDashboard() {
  const { logout } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  
  // New post form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [slug, setSlug] = useState('');
  const [published, setPublished] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch posts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          excerpt,
          slug,
          published,
        }),
      });

      if (!response.ok) throw new Error('Failed to create post');

      toast({
        title: "Success",
        description: "Post created successfully",
      });

      // Reset form
      setTitle('');
      setContent('');
      setExcerpt('');
      setSlug('');
      setPublished(false);

      // Refresh posts
      fetchPosts();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive",
      });
    }
  };

  const handleUpdatePost = async (post: Post) => {
    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });

      if (!response.ok) throw new Error('Failed to update post');

      toast({
        title: "Success",
        description: "Post updated successfully",
      });

      setEditingPost(null);
      fetchPosts();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update post",
        variant: "destructive",
      });
    }
  };

  const handleDeletePost = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete post');

      toast({
        title: "Success",
        description: "Post deleted successfully",
      });

      fetchPosts();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      });
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-b from-slate-900 to-primary">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <Button onClick={logout} variant="destructive">
            Logout
          </Button>
        </div>

        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="bg-white/10">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="create">Create New</TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/10">
              <div className="rounded-md border border-white/10">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10">
                      <TableHead className="text-white">Title</TableHead>
                      <TableHead className="text-white">Status</TableHead>
                      <TableHead className="text-white">Created</TableHead>
                      <TableHead className="text-white">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts.map((post) => (
                      <TableRow key={post.id} className="border-white/10">
                        {editingPost?.id === post.id ? (
                          <TableCell className="font-medium" colSpan={4}>
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdatePost(editingPost);
                              }}
                              className="space-y-4"
                            >
                              <div className="space-y-2">
                                <Label className="text-white">Title</Label>
                                <Input
                                  value={editingPost.title}
                                  onChange={(e) =>
                                    setEditingPost({
                                      ...editingPost,
                                      title: e.target.value,
                                      slug: generateSlug(e.target.value),
                                    })
                                  }
                                  className="bg-white/5 border-white/10 text-white"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-white">Content</Label>
                                <Textarea
                                  value={editingPost.content}
                                  onChange={(e) =>
                                    setEditingPost({
                                      ...editingPost,
                                      content: e.target.value,
                                    })
                                  }
                                  className="min-h-[200px] bg-white/5 border-white/10 text-white"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-white">Excerpt</Label>
                                <Input
                                  value={editingPost.excerpt || ''}
                                  onChange={(e) =>
                                    setEditingPost({
                                      ...editingPost,
                                      excerpt: e.target.value,
                                    })
                                  }
                                  className="bg-white/5 border-white/10 text-white"
                                />
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={editingPost.published}
                                  onCheckedChange={(checked) =>
                                    setEditingPost({
                                      ...editingPost,
                                      published: checked,
                                    })
                                  }
                                />
                                <Label className="text-white">Published</Label>
                              </div>
                              <div className="flex space-x-2">
                                <Button type="submit" size="sm">
                                  <Save className="w-4 h-4 mr-2" />
                                  Save
                                </Button>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setEditingPost(null)}
                                >
                                  <X className="w-4 h-4 mr-2" />
                                  Cancel
                                </Button>
                              </div>
                            </form>
                          </TableCell>
                        ) : (
                          <>
                            <TableCell className="font-medium text-white">
                              {post.title}
                            </TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  post.published
                                    ? 'bg-green-500/20 text-green-400'
                                    : 'bg-yellow-500/20 text-yellow-400'
                                }`}
                              >
                                {post.published ? 'Published' : 'Draft'}
                              </span>
                            </TableCell>
                            <TableCell className="text-white">
                              {format(new Date(post.createdAt), 'MMM d, yyyy')}
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setEditingPost(post)}
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleDeletePost(post.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="create">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/10">
                <h2 className="text-xl font-semibold text-white mb-4">Create New Post</h2>
                <form onSubmit={handleCreatePost} className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-white">Title</Label>
                    <Input
                      placeholder="Post title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        setSlug(generateSlug(e.target.value));
                      }}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Content</Label>
                    <Textarea
                      placeholder="Post content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="min-h-[200px] bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Excerpt</Label>
                    <Input
                      placeholder="Short excerpt (optional)"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Slug</Label>
                    <Input
                      placeholder="post-url-slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={published}
                      onCheckedChange={setPublished}
                    />
                    <Label className="text-white">Published</Label>
                  </div>
                  <Button type="submit" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Post
                  </Button>
                </form>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}