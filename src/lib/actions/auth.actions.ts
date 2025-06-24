'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { encrypt } from '@/lib/session';

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

async function createSession(userId: string) {
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
  const session = await encrypt({ userId, expires });

  cookies().set('session', session, { expires, httpOnly: true, path: '/' });
}

async function deleteSession() {
  cookies().delete('session');
}


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
  redirect('/login');
}
