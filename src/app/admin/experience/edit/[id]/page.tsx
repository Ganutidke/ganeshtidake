
import { notFound } from 'next/navigation';
import PageHeader from '@/components/admin/page-header';
import ExperienceForm from '@/components/admin/experience-form';
import { getExperienceById } from '@/lib/actions/experience.actions';

export default async function EditExperiencePage({ params }: { params: { id: string } }) {
  const experience = await getExperienceById(params.id);

  if (!experience) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title="Edit Experience Entry"
        description="Update the details of your experience entry below."
      />
      <ExperienceForm experience={experience} />
    </div>
  );
}
