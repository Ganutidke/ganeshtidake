
import { getImages } from '@/lib/actions/gallery.actions';
import PagePlaceholder from '@/components/site/page-placeholder';
import GalleryPageClient from '@/components/site/gallery-page-client';
import type { IGalleryImage } from '@/models/gallery.model';

export default async function GalleryPage() {
  const images: IGalleryImage[] = await getImages();

  if (!images || images.length === 0) {
    return (
      <PagePlaceholder
        title="Gallery"
        description="No images have been uploaded yet. Check back soon!"
      />
    );
  }

  return <GalleryPageClient images={images} />;
}
