
'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import { Loader2, Image as ImageIcon } from 'lucide-react';

import type { IAbout } from '@/models/about.model';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { fileToBase64 } from '@/lib/utils';
import { updateAbout } from '@/lib/actions/about.actions';

const formSchema = z.object({
  bio: z.string().min(10, { message: 'Bio must be at least 10 characters long.' }),
  skills: z.string().min(3, { message: 'Please list at least one skill.' }),
  profilePicture: z.instanceof(File).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function AboutForm({ about }: { about?: IAbout }) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [imagePreview, setImagePreview] = useState<string | null>(about?.profilePicture.url || null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bio: about?.bio || '',
      skills: about?.skills?.join(', ') || '',
    },
  });

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue('profilePicture', file);
      const base64 = await fileToBase64(file);
      setImagePreview(base64);
    }
  };

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      try {
        const imageBase64 = values.profilePicture ? await fileToBase64(values.profilePicture) : undefined;
        
        await updateAbout({
          ...values,
          ...(imageBase64 && { profilePicture: imageBase64 }),
        });
        toast({ title: 'Success', description: 'About information updated successfully.' });
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
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Biography</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell your story..." className="min-h-[200px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills</FormLabel>
                      <FormControl>
                        <Input placeholder="React, Next.js, TypeScript" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="profilePicture"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Profile Picture</FormLabel>
                      <FormControl>
                        <div>
                          <label htmlFor="profilePicture" className="block w-full cursor-pointer">
                            <div className="w-full aspect-square rounded-md border-2 border-dashed border-border flex items-center justify-center bg-card hover:bg-muted/50 transition-colors">
                              {imagePreview ? (
                                <Image src={imagePreview} alt="Profile preview" width={300} height={300} className="object-cover w-full h-full rounded-md" />
                              ) : (
                                <div className="text-center text-muted-foreground p-4">
                                  <ImageIcon className="mx-auto h-12 w-12" />
                                  <p className="mt-2 text-sm">Click to upload image</p>
                                </div>
                              )}
                            </div>
                          </label>
                          <Input id="profilePicture" type="file" accept="image/*" className="sr-only" onChange={handleImageChange} />
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
          Update About Info
        </Button>
      </form>
    </Form>
  );
}
