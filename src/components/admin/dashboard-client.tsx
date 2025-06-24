'use client';

import { FolderKanban, Newspaper, Inbox, Eye } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import type { PopulatedProject } from '@/models/project.model';
import type { IMessage } from '@/models/message.model';

type DashboardStats = {
  projectCount: number;
  blogCount: number;
  unreadMessagesCount: number;
  viewCount: number;
  recentProjects: PopulatedProject[];
  recentMessages: IMessage[];
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

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
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
               <div className="text-center text-muted-foreground py-8">
                  No recent messages.
               </div>
            )}
             {stats.recentMessages.length > 0 && (
                <Button size="sm" className="w-full mt-4" asChild>
                    <Link href="/admin/messages">
                        View All Messages
                    </Link>
                </Button>
             )}
          </CardContent>
        </Card>
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
