'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { suggestSeoKeywords } from '@/ai/flows/seo-keyword-suggestions';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PageHeader from '@/components/admin/page-header';

const formSchema = z.object({
  portfolioContent: z.string().min(100, {
    message: 'Please provide at least 100 characters of content.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function SeoHelperPage() {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      portfolioContent: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setKeywords([]);
    try {
      const result = await suggestSeoKeywords(values);
      if (result && result.keywords) {
        setKeywords(result.keywords);
        toast({
          title: "Keywords Generated!",
          description: "Here are your SEO keyword suggestions.",
        });
      } else {
         throw new Error('No keywords returned from AI.');
      }
    } catch (error) {
      console.error('Error generating SEO keywords:', error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "Could not generate SEO keywords. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <PageHeader title="AI SEO Helper" description="Generate SEO keywords based on your portfolio content." />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Content</CardTitle>
                  <CardDescription>
                    Paste in your portfolio content (like your about page, project descriptions, etc.) to get keyword suggestions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="portfolioContent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Portfolio Content</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., I am a full-stack developer with 5 years of experience in React, Next.js, and Node.js..."
                            className="min-h-[400px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Lightbulb className="mr-2 h-4 w-4" />
                        Generate Keywords
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </div>
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Suggested Keywords</CardTitle>
              <CardDescription>
                Here are the keywords suggested by the AI. Use them in your page titles, meta descriptions, and content.
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-[400px]">
              {isLoading && (
                  <div className="flex h-full items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
              )}
              {!isLoading && keywords.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              )}
              {!isLoading && keywords.length === 0 && (
                <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
                   <Lightbulb className="h-10 w-10 mb-4" />
                   <p>Your keywords will appear here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
