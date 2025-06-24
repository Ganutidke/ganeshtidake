
'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, PlusCircle, Trash, Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { createFaq, deleteFaq, updateFaq } from '@/lib/actions/faq.actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import type { IFaq } from '@/models/faq.model';
import { Textarea } from '../ui/textarea';

const formSchema = z.object({
  question: z.string().min(5, { message: 'Question must be at least 5 characters.' }),
  answer: z.string().min(10, { message: 'Answer must be at least 10 characters.' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function FaqManagementClient({ faqs: initialFaqs }: { faqs: IFaq[] }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [faqs, setFaqs] = useState<IFaq[]>(initialFaqs);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<IFaq | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { question: '', answer: '' },
  });

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      try {
        if (editingFaq) {
          await updateFaq(editingFaq._id, values);
          toast({ title: 'Success', description: 'FAQ updated successfully.' });
        } else {
          await createFaq(values);
          toast({ title: 'Success', description: 'FAQ created successfully.' });
        }
        form.reset();
        setEditingFaq(null);
        setIsDialogOpen(false);
        router.refresh();
      } catch (error: any) {
        toast({ variant: 'destructive', title: 'Error', description: error.message });
      }
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      try {
        await deleteFaq(id);
        toast({ title: 'Success', description: 'FAQ deleted successfully.' });
        router.refresh();
      } catch (error: any) {
        toast({ variant: 'destructive', title: 'Error', description: error.message });
      }
    });
  };

  const openEditDialog = (faq: IFaq) => {
    setEditingFaq(faq);
    form.reset({ question: faq.question, answer: faq.answer });
    setIsDialogOpen(true);
  };
  
  const openNewDialog = () => {
    setEditingFaq(null);
    form.reset({ question: '', answer: '' });
    setIsDialogOpen(true);
  };


  return (
    <div>
        <div className="flex justify-end mb-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button onClick={openNewDialog}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New FAQ
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingFaq ? 'Edit FAQ' : 'Add New FAQ'}</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField control={form.control} name="question" render={({ field }) => (
                                <FormItem><FormLabel>Question</FormLabel><FormControl><Input placeholder="Enter the question" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField control={form.control} name="answer" render={({ field }) => (
                                <FormItem><FormLabel>Answer</FormLabel><FormControl><Textarea placeholder="Enter the answer" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit" disabled={isPending}>
                                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    {editingFaq ? 'Update FAQ' : 'Create FAQ'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Existing FAQs</CardTitle>
                <CardDescription>Manage your frequently asked questions.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Question</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {faqs.map((faq) => (
                        <TableRow key={faq._id}>
                        <TableCell className="font-medium">{faq.question}</TableCell>
                        <TableCell className="text-right">
                           <Button variant="ghost" size="icon" onClick={() => openEditDialog(faq)}>
                                <Edit className="h-4 w-4" />
                            </Button>
                           <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                  <AlertDialogDescription>This action cannot be undone. This will permanently delete this FAQ.</AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(faq._id)} disabled={isPending} className="bg-destructive hover:bg-destructive/90">
                                    {isPending ? 'Deleting...' : 'Delete'}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                {faqs.length === 0 && <p className="text-center text-muted-foreground p-4">No FAQs found.</p>}
            </CardContent>
        </Card>
    </div>
  );
}
