
'use server';

import connectDB from '@/lib/db';
import Project from '@/models/project.model';
import Blog, { IBlog } from '@/models/blog.model';
import Message from '@/models/message.model';
import View from '@/models/view.model';
import Intro from '@/models/intro.model';
import About from '@/models/about.model';
import { subDays, format as formatDate } from 'date-fns';

export async function getDashboardStats() {
  try {
    await connectDB();

    const thirtyDaysAgo = subDays(new Date(), 29);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const [
      introData,
      aboutData,
      projectCount,
      blogCount,
      unreadMessagesCount,
      viewCount,
      recentProjects,
      recentBlogs,
      recentMessages,
      mostViewedBlogs,
      monthlyViews,
      monthlyProjects,
      monthlyBlogs,
    ] = await Promise.all([
      Intro.findOne().lean(),
      About.findOne().lean(),
      Project.countDocuments(),
      Blog.countDocuments(),
      Message.countDocuments({ read: false }),
      View.countDocuments(),
      Project.find().sort({ createdAt: -1 }).limit(5).lean(),
      Blog.find().sort({ createdAt: -1 }).limit(5).lean(),
      Message.find().sort({ createdAt: -1 }).limit(5).lean(),
      Blog.find({ views: { $gt: 0 } }).sort({ views: -1 }).limit(3).lean(),
      // Aggregation for Views
      View.aggregate([
        { $match: { createdAt: { $gte: thirtyDaysAgo } } },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
        { $project: { date: '$_id', Views: '$count', _id: 0 } },
      ]),
      // Aggregation for Projects
      Project.aggregate([
        { $match: { createdAt: { $gte: thirtyDaysAgo } } },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
        { $project: { date: '$_id', Projects: '$count', _id: 0 } },
      ]),
      // Aggregation for Blogs
      Blog.aggregate([
        { $match: { createdAt: { $gte: thirtyDaysAgo } } },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
        { $project: { date: '$_id', Blogs: '$count', _id: 0 } },
      ]),
    ]);
    
    // Create a unified activity feed
    const projectActivities = recentProjects.map(p => ({ type: 'project', title: p.title, createdAt: p.createdAt, link: `/admin/projects/edit/${p._id}`}));
    const blogActivities = recentBlogs.map(b => ({ type: 'blog', title: b.title, createdAt: b.createdAt, link: `/admin/blogs/edit/${b._id}`}));
    const messageActivities = recentMessages.map(m => ({ type: 'message', title: `Message from ${m.name}`, createdAt: m.createdAt, link: '/admin/messages' }));

    const activityFeed = [...projectActivities, ...blogActivities, ...messageActivities]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 7);


    // Combine the data for the chart
    const analyticsDataMap = new Map<string, any>();

    // Initialize map with all dates in the last 30 days
    for (let i = 0; i < 30; i++) {
      const d = subDays(new Date(), i);
      const formattedDate = formatDate(d, 'yyyy-MM-dd');
      analyticsDataMap.set(formattedDate, { date: formattedDate, Views: 0, Projects: 0, Blogs: 0 });
    }

    monthlyViews.forEach(item => {
      if (analyticsDataMap.has(item.date)) {
        analyticsDataMap.get(item.date).Views = item.Views;
      }
    });
    monthlyProjects.forEach(item => {
      if (analyticsDataMap.has(item.date)) {
        analyticsDataMap.get(item.date).Projects = item.Projects;
      }
    });
    monthlyBlogs.forEach(item => {
      if (analyticsDataMap.has(item.date)) {
        analyticsDataMap.get(item.date).Blogs = item.Blogs;
      }
    });
    
    const analyticsData = Array.from(analyticsDataMap.values()).sort((a,b) => a.date.localeCompare(b.date));

    const portfolioStatus = {
        hasIntro: !!introData,
        hasAbout: !!aboutData,
        hasProjects: projectCount > 0,
        hasBlogs: blogCount > 0,
    };

    return {
      projectCount,
      blogCount,
      unreadMessagesCount,
      viewCount,
      recentProjects: JSON.parse(JSON.stringify(recentProjects)),
      recentMessages: JSON.parse(JSON.stringify(recentMessages)),
      mostViewedBlogs: JSON.parse(JSON.stringify(mostViewedBlogs)),
      analyticsData: JSON.parse(JSON.stringify(analyticsData)),
      portfolioStatus,
      activityFeed: JSON.parse(JSON.stringify(activityFeed)),
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
      mostViewedBlogs: [],
      analyticsData: [],
      portfolioStatus: {
        hasIntro: false,
        hasAbout: false,
        hasProjects: false,
        hasBlogs: false,
      },
      activityFeed: [],
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
