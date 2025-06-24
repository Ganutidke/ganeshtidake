
import Link from 'next/link';
import { getBlogs } from '@/lib/actions/blog.actions';
import BlogsList from '@/components/admin/blogs-list';
import PageHeader from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Search from '@/components/admin/search';

export default async function AdminBlogsPage({ searchParams }: { searchParams?: { query?: string } }) {
  const query = searchParams?.query || '';
  const blogs = await getBlogs({ query });

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

      <div className="mb-4">
        <Search placeholder="Search by title or tag..." />
      </div>
      
      <BlogsList blogs={blogs} />
    </div>
  );
}
