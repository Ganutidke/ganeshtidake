
'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Loader2, Image as ImageIcon, Calendar as CalendarIcon, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

import type { ICertificate } from '@/models/certificate.model';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { fileToBase64, cn } from '@/lib/utils';
import { createCertificate, updateCertificate } from '@/lib/actions/certificate.actions';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

const formSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  issuingOrganization: z.string().min(3, 'Organization is required.'),
  issueDate: z.date(),
  credentialUrl: z.string().url('Must be a valid URL.').optional().or(z.literal('')),
  coverImage: z.instanceof(File).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CertificateForm({ certificate }: { certificate?: ICertificate }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [imagePreview, setImagePreview] = useState<string | null>(certificate?.coverImage.url || null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: certificate?.title || '',
      issuingOrganization: certificate?.issuingOrganization || '',
      issueDate: certificate?.issueDate ? new Date(certificate.issueDate) : new Date(),
      credentialUrl: certificate?.credentialUrl || '',
    },
  });

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
        const { coverImage, ...restValues } = values;
        const imageBase64 = values.coverImage ? await fileToBase64(values.coverImage) : undefined;
        
        if (certificate) {
          await updateCertificate(certificate._id as string, {
            ...restValues,
            credentialUrl: restValues.credentialUrl ?? '',
            ...(imageBase64 && { coverImage: imageBase64 }),
          });
          toast({ title: 'Success', description: 'Certificate updated successfully.' });
        } else {
          if (!imageBase64) {
             toast({ variant: 'destructive', title: 'Error', description: 'Certificate image is required.' });
             return;
          }
          await createCertificate({
            ...values,
            credentialUrl: restValues.credentialUrl ?? '',
            coverImage: imageBase64,
          });
          toast({ title: 'Success', description: 'Certificate created successfully.' });
        }
        router.push('/admin/certificates');
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
                <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="e.g. Certified Next.js Developer" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="issuingOrganization" render={({ field }) => (
                  <FormItem><FormLabel>Issuing Organization</FormLabel><FormControl><Input placeholder="e.g. Vercel" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="credentialUrl" render={({ field }) => (
                  <FormItem><FormLabel>Credential URL</FormLabel><FormControl><Input placeholder="https://example.com/credential/123" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card>
              <CardHeader><CardTitle>Certificate Details</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <FormField control={form.control} name="coverImage" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certificate Image</FormLabel>
                    <FormControl>
                      <div>
                        <label htmlFor="coverImage" className="block w-full cursor-pointer">
                          <div className="w-full aspect-video rounded-md border-2 border-dashed border-border flex items-center justify-center bg-card hover:bg-muted/50 transition-colors">
                            {imagePreview ? (
                              <Image src={imagePreview} alt="Cover preview" width={300} height={168} className="object-contain w-full h-full rounded-md p-2" />
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
                    name="issueDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Issue Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              captionLayout="dropdown"
                              fromYear={1980}
                              toYear={new Date().getFullYear()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex items-center gap-4">
            <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {certificate ? 'Update' : 'Create'} Certificate
            </Button>
             <Button variant="outline" asChild>
              <Link href="/admin/certificates">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
        </div>
      </form>
    </Form>
  );
}
