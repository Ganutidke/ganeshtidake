
import Link from 'next/link';
import { getExperienceHistory } from '@/lib/actions/experience.actions';
import ExperienceList from '@/components/admin/experience-list';
import PageHeader from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default async function AdminExperiencePage() {
  const experienceHistory = await getExperienceHistory();

  return (
    <div>
      <PageHeader
        title="Work Experience"
        description="Create, edit, and manage your work experience."
      >
        <Button asChild>
          <Link href="/admin/experience/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Entry
          </Link>
        </Button>
      </PageHeader>
      
      <ExperienceList experienceHistory={experienceHistory} />
    </div>
  );
}
