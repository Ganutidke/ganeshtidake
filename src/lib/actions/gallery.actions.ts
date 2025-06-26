'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/db';
import GalleryImage, { IGalleryImage } from '@/models/gallery.model';
import cloudinary from '@/lib/cloudinary';

export async function getImages(): Promise<IGalleryImage[]> {
  try {
    await connectDB();
    const images = await GalleryImage.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(images));
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    throw error;
  }
}

export async function uploadImage(data: { title: string; image: string }) {
  try {
    await connectDB();
    const uploadResponse = await cloudinary.uploader.upload(data.image, {
      folder: 'portfolio-gallery',
      transformation: [
        { width: 1920, crop: 'limit' },
        { quality: 'auto', fetch_format: 'auto' }
      ]
    });

    const newImage = new GalleryImage({
      title: data.title,
      image: {
        url: uploadResponse.secure_url,
        public_id: uploadResponse.public_id,
      },
    });

    await newImage.save();
    revalidatePath('/admin/gallery');
    revalidatePath('/gallery');
  } catch (error: any) {
    console.error('Error uploading image:', error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
}

export async function deleteImage(id: string) {
  try {
    await connectDB();
    const imageToDelete = await GalleryImage.findById(id);

    if (!imageToDelete) {
      throw new Error('Image not found.');
    }

    if (imageToDelete.image && imageToDelete.image.public_id) {
      await cloudinary.uploader.destroy(imageToDelete.image.public_id);
    }
    
    await GalleryImage.findByIdAndDelete(id);

    revalidatePath('/admin/gallery');
    revalidatePath('/gallery');
  } catch (error: any) {
    console.error('Error deleting image:', error);
    throw new Error(`Failed to delete image: ${error.message}`);
  }
}
