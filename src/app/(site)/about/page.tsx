
import { getAbout } from '@/lib/actions/about.actions';
import { getEducationHistory } from '@/lib/actions/education.actions';
import { getExperienceHistory } from '@/lib/actions/experience.actions';
import { getIntro } from '@/lib/actions/intro.actions';
import AboutPageClient from '@/components/site/about-page-client';

export default async function AboutPage() {
  const intro = await getIntro();
  const about = await getAbout();
  const experienceHistory = await getExperienceHistory();
  const educationHistory = await getEducationHistory();
  
  return (
    <AboutPageClient 
        intro={intro} 
        about={about} 
        experienceHistory={experienceHistory}
        educationHistory={educationHistory}
    />
  );
}
