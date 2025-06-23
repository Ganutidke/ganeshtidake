
import PageHeader from '@/components/admin/page-header';
import AboutForm from '@/components/admin/about-form';
import { getAbout } from '@/lib/actions/about.actions';

export default async function AdminAboutPage() {
  const about = await getAbout();

  return (
    <div>
      <PageHeader
        title="About Page"
        description="Manage the content of your 'About Me' page."
      />
      <AboutForm about={about ?? undefined}/>
    </div>
  );
}
