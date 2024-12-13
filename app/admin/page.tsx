"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import AdminDashboard from '@/components/admin/dashboard';

export default function AdminPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(username, password);
    
    if (success) {
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard",
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  if (isAuthenticated) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-b from-slate-900 to-primary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/10">
            <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}