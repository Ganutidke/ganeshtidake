
import PageHeader from '@/components/admin/page-header';
import EducationForm from '@/components/admin/education-form';

export default function CreateEducationPage() {
  return (
    <div>
      <PageHeader
        title="Create New Education Entry"
        description="Fill out the form below to add a new education entry."
      />
      <EducationForm />
    </div>
  );
}
