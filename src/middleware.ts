import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';

const protectedRoutes = ['/admin'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  
  // The old login page is now gone, but we can redirect just in case
  if (path === '/admin/login') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  const session = await getSession();

  // If accessing a protected route without a session, redirect to /login
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If accessing /login with a session, redirect to /admin
  if (path === '/login' && session) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
