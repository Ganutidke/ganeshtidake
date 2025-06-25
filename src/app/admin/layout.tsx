
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import AdminSidebar from '@/components/admin/admin-sidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, PanelLeft, Mail, Phone, MapPin, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { getIntro } from '@/lib/actions/intro.actions';
import { getAbout } from '@/lib/actions/about.actions';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  const intro = await getIntro();
  const title = `Admin | ${intro?.headline || 'Dashboard'}`;

  return {
    title,
    description: `Admin dashboard for the portfolio of ${intro?.headline || 'a user'}.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}


const getInitials = (name: string = '') => {
  const words = name.split(' ').filter(Boolean);
  if (words.length > 1) {
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const intro = await getIntro();
  const about = await getAbout();

  const initials = getInitials(intro?.headline);
  
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset className="bg-background min-w-0">
        <header className="p-4 md:p-6 flex items-center border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
          <SidebarTrigger className="md:hidden">
            <PanelLeft />
          </SidebarTrigger>
          <div className="ml-auto flex items-center gap-4">
            <Button asChild variant="outline">
              <Link href="/admin/get-started">
                <Compass className="h-4 w-4" />
                Get Started
              </Link>
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Contact Information</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Contact Details</h4>
                    <p className="text-sm text-muted-foreground">
                      Your primary contact information.
                    </p>
                  </div>
                   <div className="grid gap-3">
                    {intro?.email && (
                      <div className="flex items-start gap-4">
                        <Mail className="h-4 w-4 mt-1 flex-shrink-0 text-muted-foreground" />
                        <div className="grid gap-1">
                          <p className="text-sm font-medium">{intro.email}</p>
                        </div>
                      </div>
                    )}
                    {intro?.phone && (
                      <div className="flex items-start gap-4">
                        <Phone className="h-4 w-4 mt-1 flex-shrink-0 text-muted-foreground" />
                        <div className="grid gap-1">
                          <p className="text-sm font-medium">{intro.phone}</p>
                        </div>
                      </div>
                    )}
                    {intro?.address && (
                      <div className="flex items-start gap-4">
                        <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-muted-foreground" />
                        <div className="grid gap-1">
                          <p className="text-sm font-medium">{intro.address}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Avatar className='h-9 w-9'>
                <AvatarImage src={about?.profilePicture?.url || "https://placehold.co/40x40.png"} alt={intro?.headline || "User"} data-ai-hint="profile avatar" />
                <AvatarFallback>{initials || 'AD'}</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <div className="p-4 md:p-8">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
