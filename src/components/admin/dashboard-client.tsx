
'use client';

import { FolderKanban, Newspaper, Inbox, Eye, PenSquare, Palette, CheckCircle, Circle, MessageSquare } from 'lucide-react';
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

type Activity = {
  type: 'project' | 'blog' | 'message';
  title: string;
  createdAt: string;
  link: string;
};

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
  activityFeed: Activity[];
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

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
            <OverviewChart data={stats.analyticsData} />
            <RecentActivityCard activities={stats.activityFeed} />
        </div>
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

const activityIcons = {
    project: <FolderKanban className="h-5 w-5" />,
    blog: <Newspaper className="h-5 w-5" />,
    message: <MessageSquare className="h-5 w-5" />,
}

function RecentActivityCard({ activities }: { activities: Activity[] }) {
    const validActivities = Array.isArray(activities) ? activities.filter(a => a.createdAt) : [];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>A log of the latest updates to your portfolio.</CardDescription>
            </CardHeader>
            <CardContent>
                {validActivities.length > 0 ? (
                    <div className="space-y-6">
                        {validActivities.map((activity, index) => (
                             <Link key={index} href={activity.link} className="flex items-start gap-4 group">
                                <div className="p-2 rounded-full bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    {activityIcons[activity.type]}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                        {activity.title}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-48 text-center">
                        <Eye className="h-10 w-10 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold">No Recent Activity</h3>
                        <p className="text-sm text-muted-foreground">
                            Create a project, blog, or receive a message to see activity here.
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
