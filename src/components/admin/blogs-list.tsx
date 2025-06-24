
'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { Edit, Trash, ExternalLink, Eye } from 'lucide-react';

import type { IBlog } from '@/models/blog.model';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { deleteBlog } from '@/lib/actions/blog.actions';
import { Badge } from '../ui/badge';

export default function BlogsList({ blogs }: { blogs: IBlog[] }) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    startTransition(async () => {
      try {
        await deleteBlog(id);
        toast({
          title: 'Success!',
          description: 'Blog post has been deleted.',
        });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to delete blog post.',
        });
      }
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead className="hidden md:table-cell">Views</TableHead>
            <TableHead className="hidden md:table-cell">Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow key={blog._id as string}>
              <TableCell>
                <Image
                  src={blog.coverImage.url}
                  alt={blog.title}
                  width={64}
                  height={64}
                  className="rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">{blog.title}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {blog.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <span>{blog.views?.toLocaleString() ?? 0}</span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {format(new Date(blog.createdAt), 'PPP')}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button asChild variant="ghost" size="icon">
                    <Link href={`/blog/${blog.slug}`} target="_blank">
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="icon">
                    <Link href={`/admin/blogs/edit/${blog._id}`}>
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
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete this blog post.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(blog._id as string)}
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
