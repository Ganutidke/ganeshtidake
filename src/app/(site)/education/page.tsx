
import { getEducationHistory } from '@/lib/actions/education.actions';
import PagePlaceholder from '@/components/site/page-placeholder';
import EducationPageClient from '@/components/site/education-page-client';

export default async function EducationPage() {
  const educationHistory = await getEducationHistory();

  if (!educationHistory || educationHistory.length === 0) {
    return (
        <PagePlaceholder 
            title="Education" 
            description="No education history found yet. Add some from the admin panel!" 
        />
    )
  }

  return <EducationPageClient educationHistory={educationHistory} />;
}
