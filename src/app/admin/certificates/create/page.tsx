
import PageHeader from '@/components/admin/page-header';
import CertificateForm from '@/components/admin/certificate-form';

export default function CreateCertificatePage() {
  return (
    <div>
      <PageHeader
        title="Create New Certificate"
        description="Fill out the form below to add a new certificate."
      />
      <CertificateForm />
    </div>
  );
}
