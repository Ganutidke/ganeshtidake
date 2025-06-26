'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/db';
import Intro, { IIntro } from '@/models/intro.model';
import cloudinary from '@/lib/cloudinary';

export interface UpdateIntroParams {
  headline: string;
  subheadline: string;
  heroImage?: string; // base64
  role?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export async function getIntro(): Promise<IIntro | null> {
  try {
    await connectDB();
    const intro = await Intro.findOne().lean();
    return intro ? (JSON.parse(JSON.stringify(intro)) as IIntro) : null;
  } catch (error) {
    console.error('Error fetching intro data:', error);
    throw error;
  }
}

export async function updateIntro(data: UpdateIntroParams) {
  try {
    await connectDB();

    const existingIntro = await Intro.findOne();
    let heroImage;

    if (data.heroImage) {
      if (existingIntro?.heroImage?.public_id) {
        await cloudinary.uploader.destroy(existingIntro.heroImage.public_id);
      }
      const uploadResponse = await cloudinary.uploader.upload(data.heroImage, {
        folder: 'portfolio-intro',
        transformation: [
          { width: 1920, crop: 'limit' },
          { quality: 'auto', fetch_format: 'auto' }
        ]
      });
      heroImage = {
        url: uploadResponse.secure_url,
        public_id: uploadResponse.public_id,
      };
    }

    const updateData = {
      headline: data.headline,
      subheadline: data.subheadline,
      role: data.role,
      githubUrl: data.githubUrl,
      linkedinUrl: data.linkedinUrl,
      email: data.email,
      phone: data.phone,
      address: data.address,
      ...(heroImage && { heroImage }),
    };

    const options = { new: true, upsert: true, setDefaultsOnInsert: true };
    await Intro.findOneAndUpdate({}, updateData, options);

    revalidatePath('/admin/intro');
    revalidatePath('/');
  } catch (error: any) {
    console.error('Error updating intro data:', error);
    throw new Error(`Failed to update intro data: ${error.message}`);
  }
}
