'use server';

import { z } from 'zod';
import { createSession, deleteSession } from '@/lib/session';
import { redirect } from 'next/navigation';

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export async function login(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return { error: 'Invalid fields.' };
  }

  const { username, password } = validatedFields.data;

  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    await createSession(username);
    redirect('/admin');
  } else {
    return { error: 'Invalid username or password.' };
  }
}

export async function logout() {
  await deleteSession();
}
