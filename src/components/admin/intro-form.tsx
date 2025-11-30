
'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import { Loader2, Image as ImageIcon } from 'lucide-react';

import type { IIntro } from '@/models/intro.model';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { fileToBase64 } from '@/lib/utils';
import { updateIntro } from '@/lib/actions/intro.actions';

const formSchema = z.object({
  headline: z.string().min(5, { message: 'Headline must be at least 5 characters.' }),
  subheadline: z.string().min(10, { message: 'Subheadline must be at least 10 characters.' }),
  heroImage: z.instanceof(File).optional(),
  role: z.string().min(2, { message: 'Role is required.' }),
  githubUrl: z.string().url('Must be a valid URL.').optional().or(z.literal('')),
  linkedinUrl: z.string().url('Must be a valid URL.').optional().or(z.literal('')),
  email: z.string().email('Must be a valid email.').optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  resume: z.instanceof(File).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function IntroForm({ intro }: { intro?: IIntro }) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [imagePreview, setImagePreview] = useState<string | null>(intro?.heroImage?.url || null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      headline: intro?.headline || '',
      subheadline: intro?.subheadline || '',
      role: intro?.role || '',
      githubUrl: intro?.githubUrl || '',
      linkedinUrl: intro?.linkedinUrl || '',
      email: intro?.email || '',
      phone: intro?.phone || '',
      address: intro?.address || '',
    },
  });

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue('heroImage', file);
      const base64 = await fileToBase64(file);
      setImagePreview(base64);
    }
  };

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      try {
        const imageBase64 = values.heroImage ? await fileToBase64(values.heroImage) : undefined;
        const resumeBase64 = values.resume ? await fileToBase64(values.resume) : undefined;

        await updateIntro({
          ...values,
          heroImage: imageBase64,
          resume: resumeBase64,
        });

        toast({ title: 'Success', description: 'Intro section updated successfully.' });
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
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6 space-y-6">
                <FormField
                  control={form.control}
                  name="headline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Hi, I'm Ganesh Tidke" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subheadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Headline</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. A passionate Full-Stack Developer..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Frontend Engineer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="githubUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://github.com/your-username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="linkedinUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://linkedin.com/in/your-username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (234) 567-890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Pune, Maharashtra, India" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="resume"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Resume (PDF)</FormLabel>
                      <FormControl>
                        <div className="flex flex-col gap-4">
                          <Input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                onChange(file);
                              }
                            }}
                            {...field}
                          />
                          {intro?.resume?.url && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">Current Resume:</span>
                              <Button asChild variant="link" className="p-0 h-auto">
                                <a href={intro.resume.url} target="_blank" rel="noopener noreferrer">
                                  View PDF
                                </a>
                              </Button>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Update Intro Section
        </Button>
      </form>
    </Form>
  );
}
