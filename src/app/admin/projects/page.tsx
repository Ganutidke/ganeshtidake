
import Link from 'next/link';
import { getProjects } from '@/lib/actions/project.actions';
import ProjectsList from '@/components/admin/projects-list';
import PageHeader from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <PageHeader
        title="Projects"
        description="Create, edit, and manage your portfolio projects."
      >
        <Button asChild>
          <Link href="/admin/projects/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Project
          </Link>
        </Button>
      </PageHeader>
      
      <ProjectsList projects={projects} />
    </div>
  );
}
