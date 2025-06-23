'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Loader2, Image as ImageIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import type { IBlog } from '@/models/blog.model';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { createBlog, updateBlog } from '@/lib/actions/blog.actions';
import { fileToBase64 } from '@/lib/utils';
import { Separator } from '../ui/separator';

const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long.' }),
  content: z.string().min(100, { message: 'Content must be at least 100 characters long.' }),
  tags: z.string(),
  coverImage: z.instanceof(File).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function BlogForm({ blog }: { blog?: IBlog }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [imagePreview, setImagePreview] = useState<string | null>(blog?.coverImage.url || null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: blog?.title || '',
      content: blog?.content || '',
      tags: blog?.tags?.join(', ') || '',
    },
  });
  
  const contentValue = form.watch('content');

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue('coverImage', file);
      const base64 = await fileToBase64(file);
      setImagePreview(base64);
    }
  };

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      try {
        const imageBase64 = values.coverImage ? await fileToBase64(values.coverImage) : undefined;
        
        if (blog) {
          await updateBlog(blog._id as string, {
            title: values.title,
            content: values.content,
            tags: values.tags,
            ...(imageBase64 && { coverImage: imageBase64 }),
          });
          toast({ title: 'Success', description: 'Blog post updated successfully.' });
        } else {
          if (!imageBase64) {
             toast({ variant: 'destructive', title: 'Error', description: 'Cover image is required.' });
             return;
          }
          await createBlog({
            title: values.title,
            content: values.content,
            tags: values.tags,
            coverImage: imageBase64,
          });
          toast({ title: 'Success', description: 'Blog post created successfully.' });
        }
        router.push('/admin/blogs');
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error.message || 'Something went wrong.',
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardContent className="p-6 space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter post title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Content</CardTitle>
                    <CardDescription>Use markdown for formatting. A live preview is shown below.</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Markdown</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Write your blog post here..." className="min-h-[400px]" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div>
                            <FormLabel>Preview</FormLabel>
                            <div className="prose prose-invert prose-sm max-w-none rounded-md border p-4 h-[400px] overflow-auto">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{contentValue}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

          </div>
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Post Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="coverImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Image</FormLabel>
                      <FormControl>
                        <div>
                          <label htmlFor="coverImage" className="block w-full cursor-pointer">
                            <div className="w-full aspect-video rounded-md border-2 border-dashed border-border flex items-center justify-center bg-card hover:bg-muted/50 transition-colors">
                              {imagePreview ? (
                                <Image src={imagePreview} alt="Cover preview" width={300} height={168} className="object-cover w-full h-full rounded-md" />
                              ) : (
                                <div className="text-center text-muted-foreground p-4">
                                  <ImageIcon className="mx-auto h-12 w-12" />
                                  <p className="mt-2 text-sm">Click to upload image</p>
                                </div>
                              )}
                            </div>
                          </label>
                          <Input id="coverImage" type="file" accept="image/*" className="sr-only" onChange={handleImageChange} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input placeholder="react, nextjs, development" {...field} />
                      </FormControl>
                      <FormMessage />
                       <CardDescription>
                        Comma-separated tags.
                      </CardDescription>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {blog ? 'Update' : 'Create'} Post
        </Button>
      </form>
    </Form>
  );
}
