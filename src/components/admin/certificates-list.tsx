
'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { Edit, Trash, ExternalLink } from 'lucide-react';

import type { ICertificate } from '@/models/certificate.model';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { deleteCertificate } from '@/lib/actions/certificate.actions';

export default function CertificatesList({ certificates }: { certificates: ICertificate[] }) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    startTransition(async () => {
      try {
        await deleteCertificate(id);
        toast({ title: 'Success!', description: 'Certificate has been deleted.' });
      } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete certificate.' });
      }
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Organization</TableHead>
            <TableHead className="hidden md:table-cell">Issue Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {certificates.map((cert) => (
            <TableRow key={cert._id as string}>
              <TableCell>
                <Image
                  src={cert.coverImage.url}
                  alt={cert.title}
                  width={80}
                  height={45}
                  className="rounded-md object-contain"
                />
              </TableCell>
              <TableCell className="font-medium">{cert.title}</TableCell>
              <TableCell>{cert.issuingOrganization}</TableCell>
              <TableCell className="hidden md:table-cell">
                {format(new Date(cert.issueDate), 'PPP')}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {cert.credentialUrl && (
                    <Button asChild variant="ghost" size="icon">
                        <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    </Button>
                  )}
                  <Button asChild variant="ghost" size="icon">
                    <Link href={`/admin/certificates/edit/${cert._id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
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
                        <AlertDialogDescription>This action cannot be undone. This will permanently delete this certificate.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(cert._id as string)}
                          disabled={isPending}
                          className="bg-destructive hover:bg-destructive/90"
                        >
                          {isPending ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
