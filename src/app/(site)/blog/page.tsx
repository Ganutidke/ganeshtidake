
import { getBlogs } from '@/lib/actions/blog.actions';
import PagePlaceholder from '@/components/site/page-placeholder';
import BlogListClient from '@/components/site/blog-list-client';

export default async function BlogPage() {
  const blogs = await getBlogs();

  if (!blogs || blogs.length === 0) {
    return (
      <PagePlaceholder
        title="Blog"
        description="No blog posts found yet. Check back soon!"
      />
    );
  }

  return <BlogListClient blogs={blogs} />;
}
