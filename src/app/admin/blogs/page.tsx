import Link from 'next/link';
import { getBlogs } from '@/lib/actions/blog.actions';
import BlogsList from '@/components/admin/blogs-list';
import PageHeader from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default async function AdminBlogsPage() {
  const blogs = await getBlogs();

  return (
    <div>
      <PageHeader
        title="Blog Posts"
        description="Create, edit, and manage your blog posts."
      >
        <Button asChild>
          <Link href="/admin/blogs/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Post
          </Link>
        </Button>
      </PageHeader>
      
      <BlogsList blogs={blogs} />
    </div>
  );
}
