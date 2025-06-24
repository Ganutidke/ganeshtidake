
import PageHeader from '@/components/admin/page-header';
import { getImages } from '@/lib/actions/gallery.actions';
import GalleryManagementClient from '@/components/admin/gallery-management-client';

export default async function AdminGalleryPage() {
  const images = await getImages();

  return (
    <div>
      <PageHeader
        title="Gallery"
        description="Manage your gallery images here. Upload, view, and delete images."
      />
      <GalleryManagementClient images={images} />
    </div>
  );
}
