
import Link from 'next/link';
import { getEducationHistory } from '@/lib/actions/education.actions';
import EducationList from '@/components/admin/education-list';
import PageHeader from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default async function AdminEducationPage() {
  const educationHistory = await getEducationHistory();

  return (
    <div>
      <PageHeader
        title="Education History"
        description="Create, edit, and manage your education history."
      >
        <Button asChild>
          <Link href="/admin/education/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Entry
          </Link>
        </Button>
      </PageHeader>
      
      <EducationList educationHistory={educationHistory} />
    </div>
  );
}
