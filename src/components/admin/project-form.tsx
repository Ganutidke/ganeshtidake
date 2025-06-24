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

import type { IProjectCategory } from '@/models/project-category.model';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { fileToBase64 } from '@/lib/utils';
import { createProject, updateProject } from '@/lib/actions/project.actions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { PopulatedProject } from '@/models/project.model';

const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters long.' }),
  tags: z.string(),
  category: z.string().min(1, { message: 'Please select a category.' }),
  repositoryUrl: z.string().url('Must be a valid URL.').optional().or(z.literal('')),
  liveUrl: z.string().url('Must be a valid URL.').optional().or(z.literal('')),
  coverImage: z.instanceof(File).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ProjectFormProps {
    project?: PopulatedProject;
    categories: IProjectCategory[];
}

export default function ProjectForm({ project, categories }: ProjectFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [imagePreview, setImagePreview] = useState<string | null>(project?.coverImage.url || null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: project?.title || '',
      description: project?.description || '',
      tags: project?.tags?.join(', ') || '',
      category: project?.category || '',
      repositoryUrl: project?.repositoryUrl || '',
      liveUrl: project?.liveUrl || '',
    },
  });

  const descriptionValue = form.watch('description');

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
        
        if (project) {
          await updateProject(project._id as string, {
            ...values,
            ...(imageBase64 && { coverImage: imageBase64 }),
          });
          toast({ title: 'Success', description: 'Project updated successfully.' });
        } else {
          if (!imageBase64) {
             toast({ variant: 'destructive', title: 'Error', description: 'Cover image is required.' });
             return;
          }
          await createProject({
            ...values,
            coverImage: imageBase64,
          });
          toast({ title: 'Success', description: 'Project created successfully.' });
        }
        router.push('/admin/projects');
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
                    <FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="Project Title" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                 <FormField control={form.control} name="repositoryUrl" render={({ field }) => (
                    <FormItem><FormLabel>Repository URL</FormLabel><FormControl><Input placeholder="https://github.com/user/repo" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="liveUrl" render={({ field }) => (
                    <FormItem><FormLabel>Live URL</FormLabel><FormControl><Input placeholder="https://my-project.com" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
              </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Project Description</CardTitle>
                    <CardDescription>Use markdown for formatting. A live preview is shown below.</CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Markdown</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Describe your project..." className="min-h-[400px]" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div>
                            <FormLabel>Preview</FormLabel>
                            <div className="prose prose-invert prose-sm max-w-none rounded-md border p-4 h-[400px] overflow-auto">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{descriptionValue}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card>
              <CardHeader><CardTitle>Project Settings</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <FormField control={form.control} name="coverImage" render={({ field }) => (
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
                  )}/>
                 <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {categories.map((cat) => (
                                <SelectItem key={cat._id} value={cat.name}>
                                {cat.name}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                 />
                <FormField control={form.control} name="tags" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl><Input placeholder="react, nextjs, tailwind" {...field} /></FormControl>
                      <CardDescription>Comma-separated tags.</CardDescription>
                      <FormMessage />
                    </FormItem>
                  )}/>
              </CardContent>
            </Card>
          </div>
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {project ? 'Update' : 'Create'} Project
        </Button>
      </form>
    </Form>
  );
}
