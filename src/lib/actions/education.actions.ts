'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/db';
import Education, { IEducation } from '@/models/education.model';

export interface EducationParams {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
}

export async function createEducation(data: EducationParams) {
  try {
    await connectDB();
    const newEducation = new Education(data);
    await newEducation.save();
    revalidatePath('/admin/education');
    revalidatePath('/education');
  } catch (error: any) {
    console.error('Error creating education entry:', error);
    throw new Error(`Failed to create education entry: ${error.message}`);
  }
}

export async function updateEducation(id: string, data: EducationParams) {
  try {
    await connectDB();
    await Education.findByIdAndUpdate(id, data, { new: true });
    revalidatePath('/admin/education');
    revalidatePath('/education');
  } catch (error: any) {
    console.error('Error updating education entry:', error);
    throw new Error(`Failed to update education entry: ${error.message}`);
  }
}

export async function getEducationHistory(): Promise<IEducation[]> {
  try {
    await connectDB();
    const history = await Education.find().sort({ startDate: -1 }).lean();
    return JSON.parse(JSON.stringify(history));
  } catch (error) {
    console.error('Error fetching education history:', error);
    throw error;
  }
}

export async function getEducationById(id: string): Promise<IEducation | null> {
  try {
    await connectDB();
    const entry = await Education.findById(id).lean();
    return entry ? JSON.parse(JSON.stringify(entry)) : null;
  } catch (error) {
    console.error('Error fetching education by id:', error);
    throw error;
  }
}

export async function deleteEducation(id: string) {
  try {
    await connectDB();
    await Education.findByIdAndDelete(id);
    revalidatePath('/admin/education');
    revalidatePath('/education');
  } catch (error: any) {
    console.error('Error deleting education entry:', error);
    throw new Error(`Failed to delete education entry: ${error.message}`);
  }
}
