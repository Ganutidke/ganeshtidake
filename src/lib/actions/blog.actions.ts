'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import connectDB from '@/lib/db';
import Blog, { IBlog } from '@/models/blog.model';
import { slugify } from '@/lib/utils';
import cloudinary from '@/lib/cloudinary';

export interface CreateBlogParams {
  title: string;
  content: string;
  tags: string;
  coverImage: string; // base64
}

export interface UpdateBlogParams {
  title: string;
  content: string;
  tags: string;
  coverImage?: string; // base64
}

export async function createBlog(data: CreateBlogParams) {
  try {
    await connectDB();

    if (!data.coverImage) {
      throw new Error('Cover image is required.');
    }

    const uploadResponse = await cloudinary.uploader.upload(data.coverImage, {
      folder: 'portfolio-blogs',
    });

    const newBlog = new Blog({
      title: data.title,
      slug: slugify(data.title),
      content: data.content,
      tags: data.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      coverImage: {
        url: uploadResponse.secure_url,
        public_id: uploadResponse.public_id,
      },
    });

    await newBlog.save();
    
    revalidatePath('/admin/blogs');
    revalidatePath('/blog');
  } catch (error: any) {
    console.error('Error creating blog:', error);
    throw new Error(`Failed to create blog: ${error.message}`);
  }

  redirect('/admin/blogs');
}

export async function updateBlog(id: string, data: UpdateBlogParams) {
  try {
    await connectDB();

    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      throw new Error('Blog not found');
    }

    let coverImage = existingBlog.coverImage;

    if (data.coverImage) {
      // Delete old image from Cloudinary
      if (existingBlog.coverImage?.public_id) {
        await cloudinary.uploader.destroy(existingBlog.coverImage.public_id);
      }
      // Upload new image
      const uploadResponse = await cloudinary.uploader.upload(data.coverImage, {
        folder: 'portfolio-blogs',
      });
      coverImage = {
        url: uploadResponse.secure_url,
        public_id: uploadResponse.public_id,
      };
    }

    const updateData = {
      title: data.title,
      content: data.content,
      slug: slugify(data.title),
      tags: data.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      coverImage,
    };

    await Blog.findByIdAndUpdate(id, updateData, { new: true });
    
    revalidatePath('/admin/blogs');
    revalidatePath(`/blog/${updateData.slug}`);
  } catch (error: any) {
    console.error('Error updating blog:', error);
    throw new Error(`Failed to update blog: ${error.message}`);
  }

  redirect('/admin/blogs');
}

export async function getBlogs() {
  try {
    await connectDB();
    const blogs = await Blog.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(blogs)) as IBlog[];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export async function getBlogById(id: string) {
  try {
    await connectDB();
    const blog = await Blog.findById(id).lean();
    if (!blog) return null;
    return JSON.parse(JSON.stringify(blog)) as IBlog;
  } catch (error) {
    console.error('Error fetching blog by ID:', error);
    return null;
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    await connectDB();
    const blog = await Blog.findOne({ slug }).lean();
    if (!blog) return null;
    return JSON.parse(JSON.stringify(blog)) as IBlog;
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    return null;
  }
}

export async function deleteBlog(id: string) {
  try {
    await connectDB();
    const blogToDelete = await Blog.findById(id);

    if (!blogToDelete) {
      throw new Error('Blog not found.');
    }

    if (blogToDelete.coverImage && blogToDelete.coverImage.public_id) {
      await cloudinary.uploader.destroy(blogToDelete.coverImage.public_id);
    }
    
    await Blog.findByIdAndDelete(id);

    revalidatePath('/admin/blogs');
    revalidatePath('/blog');
  } catch (error: any) {
    console.error('Error deleting blog:', error);
    throw new Error(`Failed to delete blog: ${error.message}`);
  }
}
