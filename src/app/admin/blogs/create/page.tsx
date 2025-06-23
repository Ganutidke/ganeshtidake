import PageHeader from '@/components/admin/page-header';
import BlogForm from '@/components/admin/blog-form';

export default function CreateBlogPage() {
  return (
    <div>
      <PageHeader
        title="Create New Post"
        description="Fill out the form below to add a new blog post to your portfolio."
      />
      <BlogForm />
    </div>
  );
}
