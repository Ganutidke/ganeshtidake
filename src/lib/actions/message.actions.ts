'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/db';
import Message, { IMessage } from '@/models/message.model';

export interface MessageParams {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function createMessage(data: MessageParams) {
  try {
    await connectDB();
    const newMessage = new Message(data);
    await newMessage.save();

    revalidatePath('/admin/messages');
    return JSON.parse(JSON.stringify(newMessage));
  } catch (error: any) {
    console.error('Error creating message:', error);
    throw new Error(`Failed to create message: ${error.message}`);
  }
}

export async function getMessages(): Promise<IMessage[]> {
  try {
    await connectDB();
    const messages = await Message.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(messages));
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
}

export async function markMessageAsRead(id: string) {
  try {
    await connectDB();
    await Message.findByIdAndUpdate(id, { read: true }, { new: true });
    revalidatePath('/admin/messages');
  } catch (error: any)
  {
    console.error('Error marking message as read:', error);
    throw new Error(`Failed to mark message as read: ${error.message}`);
  }
}
