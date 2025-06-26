'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/db';
import Theme, { ITheme } from '@/models/theme.model';

export async function getTheme(): Promise<ITheme | null> {
  try {
    await connectDB();
    const theme = await Theme.findOne().lean();
    return theme ? (JSON.parse(JSON.stringify(theme)) as ITheme) : null;
  } catch (error) {
    console.error('Error fetching theme:', error);
    throw error;
  }
}

export async function updateTheme(data: Partial<ITheme>) {
  try {
    await connectDB();
    await Theme.findOneAndUpdate({}, data, { upsert: true, new: true });
    revalidatePath('/', 'layout');
  } catch (error: any) {
    console.error('Error updating theme:', error);
    throw new Error(`Failed to update theme: ${error.message}`);
  }
}

export async function resetTheme() {
    try {
        await connectDB();
        await Theme.deleteMany({});
        revalidatePath('/', 'layout');
    } catch (error: any) {
        console.error('Error resetting theme:', error);
        throw new Error(`Failed to reset theme: ${error.message}`);
    }
}
