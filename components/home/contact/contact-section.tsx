"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, User, Mail, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useChat } from '@/hooks/use-chat';

export default function ContactSection() {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ type: 'user' | 'bot'; content: string }>>([
    { type: 'bot', content: 'Hello! How can I help you today?' }
  ]);
  const { toast } = useToast();
  const { openChat } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
  };

  const handleChatSubmit = () => {
    if (!message.trim()) return;
    openChat();
    setMessage('');
  };

  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
          >
            Get in Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-200 max-w-2xl mx-auto"
          >
            Ready to transform your business? Let's start a conversation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 bg-slate-800 border-slate-700">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <Input
                      placeholder="Your Name"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <Input
                      type="email"
                      placeholder="Email Address"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <Input
                      placeholder="Company Name"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Textarea
                    placeholder="How can we help?"
                    className="min-h-[100px]"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-secondary hover:bg-secondary-dark"
                >
                  Send Message
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Chat Interface */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 bg-slate-800 border-slate-700 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="h-5 w-5 text-secondary" />
                <h3 className="text-lg font-semibold text-white">AI Assistant</h3>
              </div>
              
              <div className="flex-grow overflow-y-auto space-y-4 mb-4">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.type === 'user'
                          ? 'bg-secondary text-white'
                          : 'bg-slate-700 text-slate-200'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow"
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                />
                <Button
                  onClick={handleChatSubmit}
                  className="bg-secondary hover:bg-secondary-dark"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}