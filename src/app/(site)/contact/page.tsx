
import { getIntro } from '@/lib/actions/intro.actions';
import ContactPageClient from '@/components/site/contact-page-client';
import { IIntro } from '@/models/intro.model';

export default async function ContactPage() {
  const intro: IIntro | null = await getIntro();
  
  return <ContactPageClient intro={intro} />;
}
