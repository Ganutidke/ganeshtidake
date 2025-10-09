'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/db';
import Experience, { IExperience } from '@/models/experience.model';

export interface ExperienceParams {
  role: string;
  company: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
}

export async function createExperience(data: ExperienceParams) {
  try {
    await connectDB();
    const newExperience = new Experience(data);
    await newExperience.save();
    revalidatePath('/admin/experience');
    revalidatePath('/experience');
    revalidatePath('/about');
    revalidatePath('/');
  } catch (error: any) {
    console.error('Error creating experience entry:', error);
    throw new Error(`Failed to create experience entry: ${error.message}`);
  }
}

export async function updateExperience(id: string, data: ExperienceParams) {
  try {
    await connectDB();
    await Experience.findByIdAndUpdate(id, data, { new: true });
    revalidatePath('/admin/experience');
    revalidatePath('/experience');
    revalidatePath('/about');
    revalidatePath('/');
  } catch (error: any) {
    console.error('Error updating experience entry:', error);
    throw new Error(`Failed to update experience entry: ${error.message}`);
  }
}

export async function getExperienceHistory(): Promise<IExperience[]> {
  try {
    await connectDB();
    const history = await Experience.find().sort({ startDate: -1 }).lean();
    return JSON.parse(JSON.stringify(history));
  } catch (error) {
    console.error('Error fetching experience history:', error);
    throw error;
  }
}

export async function getExperienceById(id: string): Promise<IExperience | null> {
  try {
    await connectDB();
    const entry = await Experience.findById(id).lean();
    return entry ? JSON.parse(JSON.stringify(entry)) : null;
  } catch (error) {
    console.error('Error fetching experience by id:', error);
    throw error;
  }
}

export async function deleteExperience(id: string) {
  try {
    await connectDB();
    await Experience.findByIdAndDelete(id);
    revalidatePath('/admin/experience');
    revalidatePath('/experience');
    revalidatePath('/about');
    revalidatePath('/');
  } catch (error: any) {
    console.error('Error deleting experience entry:', error);
    throw new Error(`Failed to delete experience entry: ${error.message}`);
  }
}
