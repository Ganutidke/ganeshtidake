
import PageHeader from '@/components/admin/page-header';
import ProjectForm from '@/components/admin/project-form';

export default function CreateProjectPage() {
  return (
    <div>
      <PageHeader
        title="Create New Project"
        description="Fill out the form below to add a new project to your portfolio."
      />
      <ProjectForm />
    </div>
  );
}
