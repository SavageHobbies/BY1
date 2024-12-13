'use client';

import { Button } from '@/components/ui/button';
import {
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Link as LinkIcon,
} from 'lucide-react';
import { toast } from 'sonner';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

export default function SocialShare({
  url,
  title,
  description,
}: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || '');

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-[#1877f2] hover:bg-[#1877f2]/90',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'bg-[#1da1f2] hover:bg-[#1da1f2]/90',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
      color: 'bg-[#0a66c2] hover:bg-[#0a66c2]/90',
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
      color: 'bg-slate-600 hover:bg-slate-600/90',
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard');
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {shareLinks.map((link) => (
        <Button
          key={link.name}
          variant="default"
          size="icon"
          className={link.color}
          onClick={() => window.open(link.url, '_blank')}
          title={`Share on ${link.name}`}
        >
          <link.icon className="h-4 w-4" />
        </Button>
      ))}
      <Button
        variant="default"
        size="icon"
        className="bg-slate-800 hover:bg-slate-800/90"
        onClick={copyToClipboard}
        title="Copy link"
      >
        <LinkIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
