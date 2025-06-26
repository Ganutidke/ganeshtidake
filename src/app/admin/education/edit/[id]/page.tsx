
import { notFound } from 'next/navigation';
import PageHeader from '@/components/admin/page-header';
import EducationForm from '@/components/admin/education-form';
import { getEducationById } from '@/lib/actions/education.actions';

export default async function EditEducationPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const education = await getEducationById(resolvedParams.id);

  if (!education) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title="Edit Education Entry"
        description="Update the details of your education entry below."
      />
      <EducationForm education={education} />
    </div>
  );
}
