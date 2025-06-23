
import { notFound } from 'next/navigation';
import PageHeader from '@/components/admin/page-header';
import CertificateForm from '@/components/admin/certificate-form';
import { getCertificateById } from '@/lib/actions/certificate.actions';

export default async function EditCertificatePage({ params }: { params: { id: string } }) {
  const certificate = await getCertificateById(params.id);

  if (!certificate) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title="Edit Certificate"
        description="Update the details of your certificate below."
      />
      <CertificateForm certificate={certificate} />
    </div>
  );
}
