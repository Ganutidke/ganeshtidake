
import { getProjects } from '@/lib/actions/project.actions';
import { getProjectCategories } from '@/lib/actions/project-category.actions';
import PagePlaceholder from '@/components/site/page-placeholder';
import ProjectsPageClient from '@/components/site/projects-page-client';

export default async function ProjectsPage() {
  const [projects, categories] = await Promise.all([
    getProjects(),
    getProjectCategories()
  ]);

  if (!projects || projects.length === 0) {
    return (
      <PagePlaceholder
        title="My Projects"
        description="No projects found yet. Check back soon!"
      />
    );
  }

  return <ProjectsPageClient projects={projects} categories={categories} />;
}
