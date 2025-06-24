
import PageHeader from '@/components/admin/page-header';
import ExperienceForm from '@/components/admin/experience-form';

export default function CreateExperiencePage() {
  return (
    <div>
      <PageHeader
        title="Create New Experience Entry"
        description="Fill out the form below to add a new experience entry."
      />
      <ExperienceForm />
    </div>
  );
}
