
'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Loader2, Calendar as CalendarIcon, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

import type { IExperience } from '@/models/experience.model';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { createExperience, updateExperience } from '@/lib/actions/experience.actions';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

const formSchema = z.object({
  role: z.string().min(3, 'Role is required.'),
  company: z.string().min(2, 'Company is required.'),
  startDate: z.date(),
  endDate: z.date().optional(),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ExperienceForm({ experience }: { experience?: IExperience }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: experience?.role || '',
      company: experience?.company || '',
      startDate: experience?.startDate ? new Date(experience.startDate) : undefined,
      endDate: experience?.endDate ? new Date(experience.endDate) : undefined,
      description: experience?.description || '',
    },
  });

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      try {
        if (experience) {
          await updateExperience(experience._id as string, values);
          toast({ title: 'Success', description: 'Experience entry updated successfully.' });
        } else {
          await createExperience(values);
          toast({ title: 'Success', description: 'Experience entry created successfully.' });
        }
        router.push('/admin/experience');
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
              <FormField control={form.control} name="role" render={({ field }) => (
                <FormItem><FormLabel>Role / Position</FormLabel><FormControl><Input placeholder="e.g. Software Engineer" {...field} /></FormControl><FormMessage /></FormItem>
              )}/>
              <FormField control={form.control} name="company" render={({ field }) => (
                <FormItem><FormLabel>Company</FormLabel><FormControl><Input placeholder="e.g. Google" {...field} /></FormControl><FormMessage /></FormItem>
              )}/>
            </div>
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
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} captionLayout="dropdown" fromYear={1980} toYear={new Date().getFullYear()} initialFocus />
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
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} captionLayout="dropdown" fromYear={1980} toYear={new Date().getFullYear() + 10} initialFocus />
                    </PopoverContent>
                  </Popover><FormMessage />
                </FormItem>
              )}/>
            </div>
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem><FormLabel>Description (Optional)</FormLabel><FormControl>
                <Textarea placeholder="Describe your responsibilities and achievements..." {...field} />
              </FormControl><FormMessage /></FormItem>
            )}/>
          </CardContent>
        </Card>
        <div className="flex items-center gap-4">
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {experience ? 'Update' : 'Create'} Entry
          </Button>
           <Button variant="outline" asChild>
              <Link href="/admin/experience">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
        </div>
      </form>
    </Form>
  );
}
