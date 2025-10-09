'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/db';
import Faq, { IFaq } from '@/models/faq.model';

export interface FaqParams {
  question: string;
  answer: string;
}

export async function createFaq(data: FaqParams) {
  try {
    await connectDB();
    const newFaq = new Faq(data);
    await newFaq.save();
    revalidatePath('/admin/faq');
    revalidatePath('/faq');
    revalidatePath('/');
  } catch (error: any) {
    console.error('Error creating FAQ:', error);
    throw new Error(`Failed to create FAQ: ${error.message}`);
  }
}

export async function updateFaq(id: string, data: FaqParams) {
  try {
    await connectDB();
    await Faq.findByIdAndUpdate(id, data, { new: true });
    revalidatePath('/admin/faq');
    revalidatePath('/faq');
    revalidatePath('/');
  } catch (error: any) {
    console.error('Error updating FAQ:', error);
    throw new Error(`Failed to update FAQ: ${error.message}`);
  }
}

export async function getFaqs(): Promise<IFaq[]> {
  try {
    await connectDB();
    const faqs = await Faq.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(faqs));
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    throw error;
  }
}

export async function deleteFaq(id: string) {
  try {
    await connectDB();
    await Faq.findByIdAndDelete(id);
    revalidatePath('/admin/faq');
    revalidatePath('/faq');
    revalidatePath('/');
  } catch (error: any) {
    console.error('Error deleting FAQ:', error);
    throw new Error(`Failed to delete FAQ: ${error.message}`);
  }
}
