
'use client';

import { FolderKanban, Newspaper, Inbox, Eye, PenSquare, Palette, CheckCircle, Circle, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { OverviewChart } from './overview-chart';

import type { PopulatedProject } from '@/models/project.model';
import type { IMessage } from '@/models/message.model';
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

// --- Helper Components (Redesigned) ---

function StatCard({ title, value, icon }: { title: string; value: number | string; icon: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="p-6 flex items-center gap-6">
        <div className="p-3 rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function QuickActionsCard() {
    const actions = [
        { label: 'New Project', href: '/admin/projects/create', icon: FolderKanban },
        { label: 'New Blog Post', href: '/admin/blogs/create', icon: PenSquare },
        { label: 'Customize Theme', href: '/admin/theme', icon: Palette },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                {actions.map(action => (
                    <Button asChild variant="outline" className="justify-start" key={action.href}>
                        <Link href={action.href}>
                            <action.icon className="mr-2 h-4 w-4" />
                            {action.label}
                        </Link>
                    </Button>
                ))}
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
                <CardTitle>Setup Progress</CardTitle>
                <CardDescription>
                    Complete these steps to launch your portfolio.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">{completedCount} of {totalCount} completed</p>
                    <p className="text-sm font-bold text-primary">{Math.round(progress)}%</p>
                </div>
                <Progress value={progress} className="h-2" indicatorClassName={progress === 100 ? 'bg-green-500' : 'bg-primary'} />

                <ul className="space-y-4 mt-6">
                    {checklist.map(item => (
                        <li key={item.label} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {item.completed ? (
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                ) : (
                                     <div className="h-5 w-5 rounded-full border-2 border-muted-foreground flex items-center justify-center">
                                        <Circle className="h-2.5 w-2.5 text-muted-foreground/50 fill-current" />
                                    </div>
                                )}
                                <span className={cn("text-sm font-medium", item.completed && "text-muted-foreground line-through")}>
                                    {item.label}
                                </span>
                            </div>
                            {!item.completed && (
                                <Button asChild variant="secondary" size="sm" className="h-7 px-2">
                                    <Link href={item.link}>Start</Link>
                                </Button>
                            )}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}

function MostViewedBlogsCard({ blogs }: { blogs: IBlog[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Top Articles</CardTitle>
                <CardDescription>Your most viewed blog posts.</CardDescription>
            </CardHeader>
            <CardContent>
                {blogs.length > 0 ? (
                    <div className="space-y-4">
                        {blogs.map((blog) => (
                             <Link key={blog._id as string} href={`/admin/blogs/edit/${blog._id}`} className="flex items-center gap-4 group">
                                <Image 
                                    src={blog.coverImage.url}
                                    alt={blog.title}
                                    width={64}
                                    height={64}
                                    className="rounded-md object-cover w-16 h-16 shrink-0"
                                />
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-tight line-clamp-2 group-hover:text-primary transition-colors">{blog.title}</p>
                                    <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                                        <Eye className="h-3 w-3" />
                                        <span>{blog.views.toLocaleString()} views</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-32 text-center">
                        <Newspaper className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm font-semibold text-foreground">No blog views yet.</p>
                        <p className="text-xs text-muted-foreground">Your popular articles will appear here.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

const activityIcons: Record<Activity['type'], React.ReactNode> = {
    project: <FolderKanban className="h-5 w-5" />,
    blog: <Newspaper className="h-5 w-5" />,
    message: <MessageSquare className="h-5 w-5" />,
}

function RecentActivityCard({ activities }: { activities: Activity[] }) {
    const validActivities = Array.isArray(activities) ? activities.filter(a => a.createdAt) : [];
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Activity Feed</CardTitle>
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
                            New projects, blogs, or messages will appear here.
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}


// --- Main Component ---

export default function DashboardClient({ stats }: { stats: DashboardStats }) {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
            Welcome back! Here's a snapshot of your portfolio.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Projects" value={stats.projectCount} icon={<FolderKanban className="h-8 w-8" />} />
        <StatCard title="Total Blogs" value={stats.blogCount} icon={<Newspaper className="h-8 w-8" />} />
        <StatCard title="Unread Messages" value={stats.unreadMessagesCount} icon={<Inbox className="h-8 w-8" />} />
        <StatCard title="Total Site Views" value={stats.viewCount} icon={<Eye className="h-8 w-8" />} />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
            <OverviewChart data={stats.analyticsData} />
            <RecentActivityCard activities={stats.activityFeed} />
        </div>
        <div className="space-y-8">
            <QuickActionsCard />
            <PortfolioStatusCard status={stats.portfolioStatus} />
            <MostViewedBlogsCard blogs={stats.mostViewedBlogs} />
        </div>
      </div>
    </div>
  );
}
