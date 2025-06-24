
import { getAbout } from '@/lib/actions/about.actions';
import PagePlaceholder from '@/components/site/page-placeholder';
import AboutPageClient from '@/components/site/about-page-client';
import type { IAbout } from '@/models/about.model';

export default async function AboutPage() {
  const about = await getAbout();

  if (!about) {
    return (
      <PagePlaceholder
        title="About Me"
        description="This page is not configured yet. Please add content in the admin panel."
      />
    );
  }

  return <AboutPageClient about={about} />;
}
