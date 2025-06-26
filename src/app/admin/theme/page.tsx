
import PageHeader from '@/components/admin/page-header';
import { getTheme } from '@/lib/actions/theme.actions';
import ThemePageClient from '@/components/admin/theme-page-client';

export default async function ThemePage() {
  const theme = await getTheme();
  
  return (
    <div>
      <PageHeader
        title="Theme Customizer"
        description="Customize the look and feel of your site. Select a preset or enter HSL values."
      />
      <ThemePageClient initialTheme={theme} />
    </div>
  );
}
