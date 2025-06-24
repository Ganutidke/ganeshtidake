
import { getIntro } from '@/lib/actions/intro.actions';
import { getAbout } from '@/lib/actions/about.actions';
import { getProjects } from '@/lib/actions/project.actions';
import { getBlogs } from '@/lib/actions/blog.actions';
import { getEducationHistory } from '@/lib/actions/education.actions';
import { getExperienceHistory } from '@/lib/actions/experience.actions';
import { getFaqs } from '@/lib/actions/faq.actions';
import HomePageClient from '@/components/site/home-page-client';

export default async function HomePage() {
  const intro = await getIntro();
  const about = await getAbout();
  const projects = (await getProjects()).slice(0, 3);
  const blogs = (await getBlogs()).slice(0, 3);
  const educationHistory = (await getEducationHistory()).slice(0, 2);
  const experienceHistory = (await getExperienceHistory()).slice(0, 2);
  const faqs = (await getFaqs()).slice(0, 4);

  return (
    <HomePageClient
      intro={intro}
      about={about}
      projects={projects}
      blogs={blogs}
      educationHistory={educationHistory}
      experienceHistory={experienceHistory}
      faqs={faqs}
    />
  );
}
