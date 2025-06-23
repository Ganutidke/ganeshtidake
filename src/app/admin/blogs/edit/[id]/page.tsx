import { notFound } from 'next/navigation';
import PageHeader from '@/components/admin/page-header';
import BlogForm from '@/components/admin/blog-form';
import { getBlogById } from '@/lib/actions/blog.actions';

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const blog = await getBlogById(params.id);

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title="Edit Post"
        description="Update the details of your blog post below."
      />
      <BlogForm blog={blog} />
    </div>
  );
}
