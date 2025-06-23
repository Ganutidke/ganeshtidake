
import { notFound } from 'next/navigation';
import PageHeader from '@/components/admin/page-header';
import ProjectForm from '@/components/admin/project-form';
import { getProjectById } from '@/lib/actions/project.actions';

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title="Edit Project"
        description="Update the details of your project below."
      />
      <ProjectForm project={project} />
    </div>
  );
}
