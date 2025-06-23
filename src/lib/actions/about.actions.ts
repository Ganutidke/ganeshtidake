
'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/db';
import About, { IAbout } from '@/models/about.model';
import cloudinary from '@/lib/cloudinary';

export interface UpdateAboutParams {
  bio: string;
  skills: string;
  profilePicture?: string; // base64
}

export async function getAbout(): Promise<IAbout | null> {
  try {
    await connectDB();
    const about = await About.findOne().lean();
    return about ? (JSON.parse(JSON.stringify(about)) as IAbout) : null;
  } catch (error) {
    console.error('Error fetching about data:', error);
    return null;
  }
}

export async function updateAbout(data: UpdateAboutParams) {
  try {
    await connectDB();

    const existingAbout = await About.findOne();
    let profilePicture;

    if (data.profilePicture) {
      if (existingAbout?.profilePicture?.public_id) {
        await cloudinary.uploader.destroy(existingAbout.profilePicture.public_id);
      }
      const uploadResponse = await cloudinary.uploader.upload(data.profilePicture, {
        folder: 'portfolio-about',
      });
      profilePicture = {
        url: uploadResponse.secure_url,
        public_id: uploadResponse.public_id,
      };
    }

    const updateData = {
      bio: data.bio,
      skills: data.skills,
      ...(profilePicture && { profilePicture }),
    };

    const options = { new: true, upsert: true, setDefaultsOnInsert: true };
    await About.findOneAndUpdate({}, updateData, options);

    revalidatePath('/admin/about');
    revalidatePath('/about');
    revalidatePath('/');
  } catch (error: any) {
    console.error('Error updating about data:', error);
    throw new Error(`Failed to update about data: ${error.message}`);
  }
}
