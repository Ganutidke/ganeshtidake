
'use client';

import { FolderKanban, Newspaper, Inbox, Eye, PenSquare, Palette, CheckCircle, Circle } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import type { PopulatedProject } from '@/models/project.model';
import type { IMessage } from '@/models/message.model';
import { OverviewChart } from './overview-chart';
import type { IBlog } from '@/models/blog.model';

type DashboardStats = {
  projectCount: number;
  blogCount: number;
  unreadMessagesCount: number;
  viewCount: number;
  recentProjects: PopulatedProject[];
  recentMessages: IMessage[];
  mostViewedBlogs: IBlog[];
  analyticsData: any[];
  portfolioStatus: {
    hasIntro: boolean;
    hasAbout: boolean;
    hasProjects: boolean;
    hasBlogs: boolean;
  };
};

export default function DashboardClient({ stats }: { stats: DashboardStats }) {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
            Here's a quick overview of your portfolio's performance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Projects" value={stats.projectCount} icon={<FolderKanban className="h-6 w-6 text-primary" />} />
        <StatCard title="Total Blogs" value={stats.blogCount} icon={<Newspaper className="h-6 w-6 text-primary" />} />
        <StatCard title="Unread Messages" value={stats.unreadMessagesCount} icon={<Inbox className="h-6 w-6 text-primary" />} />
        <StatCard title="Total Site Views" value={stats.viewCount} icon={<Eye className="h-6 w-6 text-primary" />} />
      </div>

      <OverviewChart data={stats.analyticsData} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Your five most recently created projects.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden sm:table-cell">Category</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.recentProjects.length > 0 ? (
                  stats.recentProjects.map((project) => (
                    <TableRow key={project._id as string}>
                      <TableCell className="font-medium">{project.title}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="outline">{project.category}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button asChild variant="ghost" size="sm">
                          <Link href={`/admin/projects/edit/${project._id}`}>View</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="h-48 text-center">
                       <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <FolderKanban className="h-10 w-10" />
                          <h3 className="text-lg font-semibold">No Projects Yet</h3>
                          <p className="text-sm">You haven't added any projects.</p>
                          <Button asChild size="sm" className="mt-2">
                            <Link href="/admin/projects/create">Add a Project</Link>
                          </Button>
                        </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <div className="space-y-8">
            <QuickActionsCard />
            <PortfolioStatusCard status={stats.portfolioStatus} />
            <Card>
            <CardHeader>
                <CardTitle>Most Viewed Blogs</CardTitle>
                <CardDescription>Your top 3 most viewed blog posts.</CardDescription>
            </CardHeader>
            <CardContent>
                {stats.mostViewedBlogs.length > 0 ? (
                    <div className="space-y-4">
                    {stats.mostViewedBlogs.map((blog) => (
                        <div key={blog._id as string} className="flex items-center">
                            <div className="flex-1 space-y-1">
                            <Link href={`/admin/blogs/edit/${blog._id}`} className="text-sm font-medium leading-none hover:underline">{blog.title}</Link>
                            </div>
                            <div className="ml-auto text-sm text-muted-foreground flex items-center gap-1.5">
                                <Eye className="h-4 w-4" />
                                <span>{blog.views.toLocaleString()}</span>
                            </div>
                        </div>
                    ))}
                    </div>
                ) : (
                <div className="flex flex-col items-center justify-center h-32 text-center">
                    <Newspaper className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-semibold text-foreground">No blog views yet.</p>
                    <p className="text-xs text-muted-foreground">Views will appear here once your articles are read.</p>
                </div>
                )}
            </CardContent>
            </Card>
            <Card>
            <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
            </CardHeader>
            <CardContent>
                {stats.recentMessages.length > 0 ? (
                <div className="space-y-4">
                    {stats.recentMessages.map((message) => (
                    <div key={message._id as string} className="flex items-center">
                        <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{message.name}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">{message.subject}</p>
                        </div>
                        <div className="ml-auto text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                        </div>
                    </div>
                    ))}
                </div>
                ) : (
                <div className="flex flex-col items-center justify-center h-32 text-center">
                    <Inbox className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-semibold text-foreground">Your inbox is empty.</p>
                    <p className="text-xs text-muted-foreground">New messages from your contact form will show up here.</p>
                </div>
                )}
            </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: number | string; icon: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

function QuickActionsCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                <Button asChild variant="outline">
                    <Link href="/admin/projects/create">
                        <FolderKanban className="mr-2" />
                        New Project
                    </Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/admin/blogs/create">
                        <PenSquare className="mr-2" />
                        New Blog
                    </Link>
                </Button>
                 <Button asChild variant="outline" className="col-span-2">
                    <Link href="/admin/theme">
                        <Palette className="mr-2" />
                        Customize Theme
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
}

function PortfolioStatusCard({ status }: { status: DashboardStats['portfolioStatus'] }) {
    const checklist = [
        { label: 'Setup Intro Section', completed: status.hasIntro, link: '/admin/intro' },
        { label: 'Complete About Me', completed: status.hasAbout, link: '/admin/about' },
        { label: 'Add First Project', completed: status.hasProjects, link: '/admin/projects/create' },
        { label: 'Write First Blog', completed: status.hasBlogs, link: '/admin/blogs/create' },
    ];

    const completedCount = checklist.filter(item => item.completed).length;
    const totalCount = checklist.length;
    const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Portfolio Status</CardTitle>
                <CardDescription>
                    Complete these steps to launch your portfolio.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4 mb-4">
                     <div className={`w-12 h-12 flex items-center justify-center rounded-full ${progress === 100 ? 'bg-green-500/20 text-green-500' : 'bg-primary/10 text-primary'}`}>
                        <span className="text-xl font-bold">{Math.round(progress)}%</span>
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold text-foreground">{completedCount} of {totalCount} steps completed</p>
                        <p className="text-xs text-muted-foreground">Looking good! Keep it up.</p>
                    </div>
                </div>
                <ul className="space-y-3">
                    {checklist.map(item => (
                        <li key={item.label} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {item.completed ? (
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                ) : (
                                    <Circle className="h-5 w-5 text-muted-foreground" />
                                )}
                                <span className={cn("text-sm", item.completed && "text-muted-foreground line-through")}>
                                    {item.label}
                                </span>
                            </div>
                            {!item.completed && (
                                <Button asChild variant="secondary" size="sm" className="h-7">
                                    <Link href={item.link}>Go</Link>
                                </Button>
                            )}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}
