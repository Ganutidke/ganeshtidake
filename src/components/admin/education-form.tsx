
'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Loader2, Calendar as CalendarIcon, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

import type { IEducation } from '@/models/education.model';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { createEducation, updateEducation } from '@/lib/actions/education.actions';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

const formSchema = z.object({
  school: z.string().min(3, 'School name is required.'),
  degree: z.string().min(2, 'Degree is required.'),
  fieldOfStudy: z.string().min(3, 'Field of study is required.'),
  startDate: z.date(),
  endDate: z.date().optional(),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function EducationForm({ education }: { education?: IEducation }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      school: education?.school || '',
      degree: education?.degree || '',
      fieldOfStudy: education?.fieldOfStudy || '',
      startDate: education?.startDate ? new Date(education.startDate) : undefined,
      endDate: education?.endDate ? new Date(education.endDate) : undefined,
      description: education?.description || '',
    },
  });

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      try {
        if (education) {
          await updateEducation(education._id as string, values);
          toast({ title: 'Success', description: 'Education entry updated successfully.' });
        } else {
          await createEducation(values);
          toast({ title: 'Success', description: 'Education entry created successfully.' });
        }
        router.push('/admin/education');
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
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="school" render={({ field }) => (
                <FormItem><FormLabel>School / University</FormLabel><FormControl><Input placeholder="e.g. University of Example" {...field} /></FormControl><FormMessage /></FormItem>
              )}/>
              <FormField control={form.control} name="degree" render={({ field }) => (
                <FormItem><FormLabel>Degree</FormLabel><FormControl><Input placeholder="e.g. Bachelor of Science" {...field} /></FormControl><FormMessage /></FormItem>
              )}/>
            </div>
            <FormField control={form.control} name="fieldOfStudy" render={({ field }) => (
              <FormItem><FormLabel>Field of Study</FormLabel><FormControl><Input placeholder="e.g. Computer Science" {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="startDate" render={({ field }) => (
                <FormItem className="flex flex-col"><FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild><FormControl>
                        <Button variant={"outline"} className={cn("pl-3 text-left font-normal",!field.value && "text-muted-foreground")}>
                          {field.value ? format(field.value, "PPP") : (<span>Pick a date</span>)}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </FormControl></PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange}   captionLayout="dropdown"  animate  />
                    </PopoverContent>
                  </Popover><FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="endDate" render={({ field }) => (
                <FormItem className="flex flex-col"><FormLabel>End Date (Optional)</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild><FormControl>
                        <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                          {field.value ? format(field.value, "PPP") : (<span>Pick a date</span>)}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </FormControl></PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} captionLayout="dropdown"  />
                    </PopoverContent>
                  </Popover><FormMessage />
                </FormItem>
              )}/>
            </div>
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem><FormLabel>Description (Optional)</FormLabel><FormControl>
                <Textarea placeholder="Describe your activities, courses, or achievements..." {...field} />
              </FormControl><FormMessage /></FormItem>
            )}/>
          </CardContent>
        </Card>
        <div className="flex items-center gap-4">
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {education ? 'Update' : 'Create'} Entry
          </Button>
           <Button variant="outline" asChild>
              <Link href="/admin/education">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
        </div>
      </form>
    </Form>
  );
}
