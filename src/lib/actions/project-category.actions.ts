
'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/db';
import ProjectCategory, { IProjectCategory } from '@/models/project-category.model';

export async function createProjectCategory(name: string) {
  try {
    await connectDB();
    const existingCategory = await ProjectCategory.findOne({ name });
    if (existingCategory) {
      throw new Error('Category with this name already exists.');
    }
    await ProjectCategory.create({ name });
    revalidatePath('/admin/projects/categories');
  } catch (error: any) {
    throw new Error(`Failed to create category: ${error.message}`);
  }
}

export async function getProjectCategories(): Promise<IProjectCategory[]> {
  try {
    await connectDB();
    const categories = await ProjectCategory.find().sort({ name: 1 }).lean();
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    console.error('Error fetching project categories:', error);
    return [];
  }
}

export async function deleteProjectCategory(id: string) {
  try {
    await connectDB();
    // Note: You might want to check if any projects are using this category before deleting.
    await ProjectCategory.findByIdAndDelete(id);
    revalidatePath('/admin/projects/categories');
    revalidatePath('/admin/projects/*');
  } catch (error: any) {
    throw new Error(`Failed to delete category: ${error.message}`);
  }
}
