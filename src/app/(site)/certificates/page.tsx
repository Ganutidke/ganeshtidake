
import { getCertificates } from '@/lib/actions/certificate.actions';
import PagePlaceholder from '@/components/site/page-placeholder';
import CertificatesPageClient from '@/components/site/certificates-page-client';

export default async function CertificatesPage() {
  const certificates = await getCertificates();

  if (!certificates || certificates.length === 0) {
    return (
      <PagePlaceholder
        title="Certificates"
        description="No certificates found yet. Add some from the admin panel!"
      />
    );
  }

  return <CertificatesPageClient certificates={certificates} />;
}
