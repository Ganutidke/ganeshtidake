'use client';

import { FolderKanban, Newspaper, Inbox, Eye } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
};

export default function DashboardClient({ stats }: { stats: DashboardStats }) {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Projects" value={stats.projectCount} icon={<FolderKanban className="h-6 w-6 text-primary" />} />
        <StatCard title="Total Blogs" value={stats.blogCount} icon={<Newspaper className="h-6 w-6 text-primary" />} />
        <StatCard title="Unread Messages" value={stats.unreadMessagesCount} icon={<Inbox className="h-6 w-6 text-primary" />} />
        <StatCard title="Total Site Views" value={stats.viewCount} icon={<Eye className="h-6 w-6 text-primary" />} />
      </div>

      <OverviewChart data={stats.analyticsData} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
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
                    <TableCell colSpan={3} className="h-24 text-center">
                      No recent projects.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <div className="space-y-8">
            <Card>
            <CardHeader>
                <CardTitle>Most Viewed Blogs</CardTitle>
                <CardDescription>Your top 3 most viewed blog posts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {stats.mostViewedBlogs.length > 0 ? (
                    stats.mostViewedBlogs.map((blog) => (
                    <div key={blog._id as string} className="flex items-center">
                        <div className="flex-1 space-y-1">
                        <Link href={`/admin/blogs/edit/${blog._id}`} className="text-sm font-medium leading-none hover:underline">{blog.title}</Link>
                        </div>
                        <div className="ml-auto text-sm text-muted-foreground flex items-center gap-1.5">
                            <Eye className="h-4 w-4" />
                            <span>{blog.views.toLocaleString()}</span>
                        </div>
                    </div>
                    ))
                ) : (
                <p className="text-center text-sm text-muted-foreground py-4">No blog views yet.</p>
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
                <p className="text-center text-sm text-muted-foreground py-8">No recent messages.</p>
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
