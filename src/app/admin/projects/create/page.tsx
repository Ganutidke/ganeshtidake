
import PageHeader from '@/components/admin/page-header';
import ProjectForm from '@/components/admin/project-form';
import { getProjectCategories } from '@/lib/actions/project-category.actions';

export default async function CreateProjectPage() {
  const categories = await getProjectCategories();

  return (
    <div>
      <PageHeader
        title="Create New Project"
        description="Fill out the form below to add a new project to your portfolio."
      />
      <ProjectForm categories={categories} />
    </div>
  );
}
