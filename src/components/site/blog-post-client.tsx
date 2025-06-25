
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { ArrowLeft, Eye, Volume2, Loader2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import FramerMotionWrapper from '@/components/site/framer-motion-wrapper';
import type { IBlog } from '@/models/blog.model';
import { Card, CardContent } from '@/components/ui/card';
import { generateSpeech } from '@/ai/flows/tts-flow';
import { useToast } from '@/hooks/use-toast';

export default function BlogPostClient({ blog, relatedBlogs }: { blog: IBlog, relatedBlogs: IBlog[] }) {
  const { toast } = useToast();
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);

  const handleListen = async () => {
    setIsGeneratingAudio(true);
    try {
      // Create a simplified text version for TTS
      const textForSpeech = `
        Title: ${blog.title}.
        
        ${blog.content}
      `.replace(/!\[.*?\]\(.*?\)/g, '') // Remove markdown images
       .replace(/<.*?>/g, '') // Remove HTML tags
       .replace(/[`*#_~]/g, ''); // Remove markdown syntax

      const result = await generateSpeech({ text: textForSpeech });
      setAudioSrc(result.audio);
    } catch (error) {
      console.error('Error generating audio:', error);
      toast({
        variant: 'destructive',
        title: 'Error generating audio',
        description: 'Could not generate audio for this article. Please try again later.',
      });
    } finally {
      setIsGeneratingAudio(false);
    }
  };


  return (
    <FramerMotionWrapper>
      <article className="max-w-4xl mx-auto py-12 px-4">
        <div className="mb-8">
          <Button asChild variant="link" className="p-0 text-muted-foreground hover:text-primary">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>

        <div className="space-y-4 text-center">
          <div className="flex flex-wrap justify-center gap-2">
              {blog.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
          </div>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">
            {blog.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-muted-foreground">
            <p>{format(new Date(blog.createdAt), 'MMMM d, yyyy')}</p>
            <span className="text-muted-foreground">&middot;</span>
            <p className="flex items-center gap-1.5">
              <Eye className="h-4 w-4" />
              {blog.views.toLocaleString()} views
            </p>
          </div>
        </div>

        <div className="mt-8 text-center space-y-4">
          <Button onClick={handleListen} disabled={isGeneratingAudio || !!audioSrc}>
            {isGeneratingAudio ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Audio...
              </>
            ) : (
              <>
                <Volume2 className="mr-2 h-4 w-4" />
                Listen to this article
              </>
            )}
          </Button>
          {audioSrc && (
            <div className="w-full">
                <audio controls src={audioSrc} className="w-full">
                    Your browser does not support the audio element.
                </audio>
            </div>
          )}
        </div>

        <div className="relative my-8 h-64 md:h-96 w-full">
          <Image
            src={blog.coverImage.url}
            alt={blog.title}
            fill
            className="rounded-lg object-cover shadow-lg"
            priority
          />
        </div>

        <div className="prose prose-invert prose-lg mx-auto max-w-none 
            prose-headings:text-foreground prose-headings:font-headline
            prose-a:text-primary hover:prose-a:text-primary/80
            prose-strong:text-foreground
            prose-blockquote:border-l-primary
            prose-code:bg-muted prose-code:text-foreground prose-code:p-1 prose-code:rounded-md
            prose-pre:bg-muted
            ">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content}</ReactMarkdown>
        </div>

        {relatedBlogs && relatedBlogs.length > 0 && (
          <div className="mt-16 pt-8 border-t">
            <h2 className="text-2xl font-bold text-center mb-8 text-primary">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedBlogs.map((relatedBlog) => (
                <Card key={relatedBlog._id as string} className="group overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={`/blog/${relatedBlog.slug}`} className="block">
                    <div className="relative h-40 w-full">
                      <Image
                        src={relatedBlog.coverImage.url}
                        alt={relatedBlog.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        {format(new Date(relatedBlog.createdAt), 'MMMM d, yyyy')}
                      </p>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}
      </article>
    </FramerMotionWrapper>
  );
}
