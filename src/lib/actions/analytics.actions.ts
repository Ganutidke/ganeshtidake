'use server';

import connectDB from '@/lib/db';
import Project from '@/models/project.model';
import Blog from '@/models/blog.model';
import Message from '@/models/message.model';
import View from '@/models/view.model';

export async function getDashboardStats() {
  try {
    await connectDB();

    const [
      projectCount,
      blogCount,
      unreadMessagesCount,
      viewCount,
      recentProjects,
      recentMessages,
    ] = await Promise.all([
      Project.countDocuments(),
      Blog.countDocuments(),
      Message.countDocuments({ read: false }),
      View.countDocuments(),
      Project.find().sort({ createdAt: -1 }).limit(5).lean(),
      Message.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    return {
      projectCount,
      blogCount,
      unreadMessagesCount,
      viewCount,
      recentProjects: JSON.parse(JSON.stringify(recentProjects)),
      recentMessages: JSON.parse(JSON.stringify(recentMessages)),
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      projectCount: 0,
      blogCount: 0,
      unreadMessagesCount: 0,
      viewCount: 0,
      recentProjects: [],
      recentMessages: [],
    };
  }
}

export async function trackView() {
  try {
    await connectDB();
    await View.create({});
  } catch (error) {
    // Fail silently so it doesn't crash the site for visitors
    console.error('Failed to track view:', error);
  }
}
