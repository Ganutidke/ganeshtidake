import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';

const protectedRoutes = ['/admin'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));

  if (isProtectedRoute && path !== '/admin/login') {
    const session = await getSession();
    if (!session) {
      const absoluteURL = new URL('/admin/login', req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }

  if (path === '/admin/login') {
    const session = await getSession();
    if (session) {
        const absoluteURL = new URL('/admin', req.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString());
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
