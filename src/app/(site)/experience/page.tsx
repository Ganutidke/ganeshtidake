
import { getExperienceHistory } from '@/lib/actions/experience.actions';
import PagePlaceholder from '@/components/site/page-placeholder';
import ExperiencePageClient from '@/components/site/experience-page-client';

export default async function ExperiencePage() {
  const experienceHistory = await getExperienceHistory();

  if (!experienceHistory || experienceHistory.length === 0) {
    return (
        <PagePlaceholder 
            title="Experience" 
            description="No work experience found yet. Add some from the admin panel!" 
        />
    )
  }

  return <ExperiencePageClient experienceHistory={experienceHistory} />;
}
