import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';

interface Post {
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Blog Post - ${params.slug}`,
  };
}

export default function BlogPost({ params }: Props) {
  const post: Post = {
    title: "Sample Blog Post",
    content: "This is a sample blog post content.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (!post) {
    notFound();
  }

  return (
    <div className="py-20 bg-gradient-to-b from-slate-900 to-primary min-h-screen">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto p-8 bg-white/10 backdrop-blur-lg border-white/10">
          <article className="prose prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex gap-4 text-sm text-slate-400 mb-8">
              <time dateTime={post.createdAt}>
                {format(new Date(post.createdAt), 'MMMM d, yyyy')}
              </time>
              <span>•</span>
              <span>5 min read</span>
            </div>
            <div 
              className="text-slate-300"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </Card>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return [
    { slug: 'post-1' },
    { slug: 'post-2' },
    { slug: 'post-3' },
  ];
}
