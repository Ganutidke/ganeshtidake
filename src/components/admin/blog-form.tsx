
'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Loader2, Image as ImageIcon, Sparkles } from 'lucide-react';
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
import { generateImage } from '@/ai/flows/image-generation-flow';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long.' }),
  excerpt: z.string().min(10, { message: 'Excerpt must be at least 10 characters long.' }).max(200, { message: 'Excerpt must be 200 characters or less.'}),
  content: z.string().min(100, { message: 'Content must be at least 100 characters long.' }),
  tags: z.string(),
  coverImageFile: z.instanceof(File).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function BlogForm({ blog }: { blog?: IBlog }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [imagePreview, setImagePreview] = useState<string | null>(blog?.coverImage.url || null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [imagePrompt, setImagePrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);


  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: blog?.title || '',
      excerpt: blog?.excerpt || '',
      content: blog?.content || '',
      tags: blog?.tags?.join(', ') || '',
    },
  });
  
  const contentValue = form.watch('content');

  const handleImageFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue('coverImageFile', file);
      setGeneratedImage(null); // Clear generated image if a file is selected
      const base64 = await fileToBase64(file);
      setImagePreview(base64);
    }
  };

  const handleGenerateImage = () => {
    if (!imagePrompt) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please enter a prompt for the image.' });
      return;
    }
    setIsGenerating(true);
    startTransition(async () => {
      try {
        const result = await generateImage({ prompt: imagePrompt });
        setGeneratedImage(result.image);
        setImagePreview(result.image);
        form.setValue('coverImageFile', undefined); // Clear file input
        toast({ title: 'Success', description: 'Image generated successfully.' });
      } catch (error: any) {
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to generate image. Please try again.' });
      } finally {
        setIsGenerating(false);
      }
    });
  };

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      try {
        let imageBase64: string | undefined = generatedImage;
        if (!imageBase64 && values.coverImageFile) {
          imageBase64 = await fileToBase64(values.coverImageFile);
        }

        const blogData = {
          title: values.title,
          excerpt: values.excerpt,
          content: values.content,
          tags: values.tags,
        };
        
        if (blog) {
          await updateBlog(blog._id as string, {
            ...blogData,
            ...(imageBase64 && { coverImage: imageBase64 }),
          });
          toast({ title: 'Success', description: 'Blog post updated successfully.' });
        } else {
          if (!imageBase64) {
             toast({ variant: 'destructive', title: 'Error', description: 'Cover image is required.' });
             return;
          }
          await createBlog({
            ...blogData,
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
                <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="Enter post title" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="excerpt" render={({ field }) => (
                  <FormItem><FormLabel>Excerpt</FormLabel><FormControl><Textarea placeholder="A short summary of the post..." className="h-24" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
              </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Content</CardTitle>
                    <CardDescription>Use markdown for formatting. A live preview is shown below.</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="content" render={({ field }) => (
                          <FormItem><FormLabel>Markdown</FormLabel><FormControl><Textarea placeholder="Write your blog post here..." className="min-h-[400px]" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
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
              <CardHeader><CardTitle>Post Settings</CardTitle></CardHeader>
              <CardContent className="space-y-6">
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
                <Tabs defaultValue="manual">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="manual">Manual Upload</TabsTrigger>
                    <TabsTrigger value="ai">AI Generate</TabsTrigger>
                  </TabsList>
                  <TabsContent value="manual" className="pt-4">
                     <FormField control={form.control} name="coverImageFile" render={() => (
                        <FormItem>
                          <FormLabel>Cover Image</FormLabel>
                          <FormControl>
                            <div>
                                <label htmlFor="coverImage" className="block w-full cursor-pointer">
                                <div className="w-full aspect-video rounded-md border-2 border-dashed border-border flex items-center justify-center bg-card hover:bg-muted/50 transition-colors">
                                    {imagePreview ? <Image src={imagePreview} alt="Cover preview" width={300} height={168} className="object-cover w-full h-full rounded-md" /> : (
                                    <div className="text-center text-muted-foreground p-4">
                                        {isGenerating ? <Loader2 className="mx-auto h-12 w-12 animate-spin" /> : <ImageIcon className="mx-auto h-12 w-12" />}
                                        <p className="mt-2 text-sm">{isGenerating ? 'Generating...' : 'Click to upload image'}</p>
                                    </div>
                                    )}
                                </div>
                                </label>
                                <Input id="coverImage" type="file" accept="image/*" className="sr-only" onChange={handleImageFileChange} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}/>
                  </TabsContent>
                  <TabsContent value="ai" className="pt-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="ai-prompt">Image Prompt</Label>
                        <Textarea id="ai-prompt" placeholder="A futuristic cityscape at dusk, watercolor style" value={imagePrompt} onChange={(e) => setImagePrompt(e.target.value)} />
                      </div>
                       <Button type="button" className="w-full" onClick={handleGenerateImage} disabled={isGenerating}>
                          {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                          Generate Image
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
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
