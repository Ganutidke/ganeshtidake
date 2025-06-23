import PageHeader from '@/components/admin/page-header';

export default function AdminPlaceholder({ title, description }: { title: string; description?: string }) {
  return (
    <div>
      <PageHeader title={title} description={description} />
      <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
        <p>Management UI for {title} will be here.</p>
        <p className="text-sm">CRUD operations (Create, Read, Update, Delete) will be available.</p>
      </div>
    </div>
  );
}
