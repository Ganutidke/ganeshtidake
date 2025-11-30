
import PageHeader from '@/components/admin/page-header';
import IntroForm from '@/components/admin/intro-form';
import { getIntro } from '@/lib/actions/intro.actions';

export const dynamic = 'force-dynamic';

export default async function AdminIntroPage() {
  const intro = await getIntro();
  return (
    <div>
      <PageHeader
        title="Intro / Home Page"
        description="Manage the content of your home page hero section."
      />
      <IntroForm intro={intro ?? undefined} />
    </div>
  );
}
