
'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/db';
import Certificate, { ICertificate } from '@/models/certificate.model';
import cloudinary from '@/lib/cloudinary';

export interface CertificateParams {
  title: string;
  issuingOrganization: string;
  issueDate: Date;
  credentialUrl: string;
  coverImage: string; // base64
}

export interface UpdateCertificateParams extends Omit<CertificateParams, 'coverImage'> {
  coverImage?: string; // base64
}

export async function createCertificate(data: CertificateParams) {
  try {
    await connectDB();

    const uploadResponse = await cloudinary.uploader.upload(data.coverImage, {
      folder: 'portfolio-certificates',
    });

    const newCertificate = new Certificate({
      ...data,
      coverImage: {
        url: uploadResponse.secure_url,
        public_id: uploadResponse.public_id,
      },
    });

    await newCertificate.save();
    revalidatePath('/admin/certificates');
    revalidatePath('/certificates');
  } catch (error: any) {
    console.error('Error creating certificate:', error);
    throw new Error(`Failed to create certificate: ${error.message}`);
  }
}

export async function updateCertificate(id: string, data: UpdateCertificateParams) {
  try {
    await connectDB();
    const existing = await Certificate.findById(id);
    if (!existing) throw new Error('Certificate not found');

    let coverImage = existing.coverImage;
    if (data.coverImage) {
      if (existing.coverImage?.public_id) {
        await cloudinary.uploader.destroy(existing.coverImage.public_id);
      }
      const uploadResponse = await cloudinary.uploader.upload(data.coverImage, {
        folder: 'portfolio-certificates',
      });
      coverImage = {
        url: uploadResponse.secure_url,
        public_id: uploadResponse.public_id,
      };
    }

    await Certificate.findByIdAndUpdate(id, { ...data, coverImage }, { new: true });
    revalidatePath('/admin/certificates');
    revalidatePath('/certificates');
  } catch (error: any) {
    console.error('Error updating certificate:', error);
    throw new Error(`Failed to update certificate: ${error.message}`);
  }
}

export async function getCertificates(): Promise<ICertificate[]> {
  try {
    await connectDB();
    const certificates = await Certificate.find().sort({ issueDate: -1 }).lean();
    return JSON.parse(JSON.stringify(certificates));
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return [];
  }
}

export async function getCertificateById(id: string): Promise<ICertificate | null> {
  try {
    await connectDB();
    const certificate = await Certificate.findById(id).lean();
    return certificate ? JSON.parse(JSON.stringify(certificate)) : null;
  } catch (error) {
    console.error('Error fetching certificate by id:', error);
    return null;
  }
}

export async function deleteCertificate(id: string) {
  try {
    await connectDB();
    const certificate = await Certificate.findById(id);
    if (!certificate) throw new Error('Certificate not found');

    if (certificate.coverImage?.public_id) {
      await cloudinary.uploader.destroy(certificate.coverImage.public_id);
    }

    await Certificate.findByIdAndDelete(id);
    revalidatePath('/admin/certificates');
    revalidatePath('/certificates');
  } catch (error: any) {
    console.error('Error deleting certificate:', error);
    throw new Error(`Failed to delete certificate: ${error.message}`);
  }
}
