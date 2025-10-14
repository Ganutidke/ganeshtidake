
import { getAbout } from '@/lib/actions/about.actions';
import { getEducationHistory } from '@/lib/actions/education.actions';
import { getExperienceHistory } from '@/lib/actions/experience.actions';
import { getIntro } from '@/lib/actions/intro.actions';
import AboutPageClient from '@/components/site/about-page-client';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAbout();
  const intro = await getIntro();

  const pageTitle = `About ${intro?.headline || "Ganesh Tidake"} | Full Stack Developer`;
  const pageDescription =
    about?.bio ||
    "Learn more about Ganesh Tidake, a passionate Full Stack Developer who builds scalable and modern web applications using Next.js, React, and Tailwind CSS.";

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: "https://ganeshtidake.site/about",
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: "https://ganeshtidake.site/about",
      siteName: "Ganesh Tidake Portfolio",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Ganesh Tidake – Full Stack Developer",
        },
      ],
      locale: "en_IN",
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: ["/og-image.png"],
    },
    keywords: [
      "Ganesh Tidake",
      "About Ganesh Tidake",
      "Next.js Developer",
      "Full Stack Developer",
      "React Developer",
      "Frontend Developer",
      "SaaS Builder",
      "Web Developer Portfolio",
      "Ganesh Tidake Portfolio",
    ],
    creator: "Ganesh Tidake",
    publisher: "Ganesh Tidake",
  };
}

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
