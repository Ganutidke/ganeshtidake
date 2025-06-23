
import Link from 'next/link';
import { getCertificates } from '@/lib/actions/certificate.actions';
import CertificatesList from '@/components/admin/certificates-list';
import PageHeader from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default async function AdminCertificatesPage() {
  const certificates = await getCertificates();

  return (
    <div>
      <PageHeader
        title="Certificates"
        description="Create, edit, and manage your certificates."
      >
        <Button asChild>
          <Link href="/admin/certificates/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Certificate
          </Link>
        </Button>
      </PageHeader>
      
      <CertificatesList certificates={certificates} />
    </div>
  );
}
