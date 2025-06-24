
'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/db';
import Project from '@/models/project.model';
import ProjectCategory from '@/models/project-category.model';
import cloudinary from '@/lib/cloudinary';
import { slugify } from '@/lib/utils';
import type { PopulatedProject } from '@/models/project.model';

export interface ProjectParams {
  title: string;
  description: string;
  tags: string;
  categoryId: string;
  repositoryUrl?: string;
  liveUrl?: string;
  coverImage: string; // base64
}

export interface UpdateProjectParams extends Omit<ProjectParams, 'coverImage'> {
  coverImage?: string; // base64
}

export async function createProject(data: ProjectParams) {
  try {
    await connectDB();

    const uploadResponse = await cloudinary.uploader.upload(data.coverImage, {
      folder: 'portfolio-projects',
    });

    const newProject = new Project({
      title: data.title,
      description: data.description,
      repositoryUrl: data.repositoryUrl,
      liveUrl: data.liveUrl,
      slug: slugify(data.title),
      tags: data.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      category: data.categoryId,
      coverImage: {
        url: uploadResponse.secure_url,
        public_id: uploadResponse.public_id,
      },
    });

    await newProject.save();
    revalidatePath('/admin/projects');
    revalidatePath('/projects');
  } catch (error: any) {
    console.error('Error creating project:', error);
    throw new Error(`Failed to create project: ${error.message}`);
  }
}

export async function updateProject(id: string, data: UpdateProjectParams) {
  try {
    await connectDB();
    const existing = await Project.findById(id);
    if (!existing) throw new Error('Project not found');

    let coverImage = existing.coverImage;
    if (data.coverImage) {
      if (existing.coverImage?.public_id) {
        await cloudinary.uploader.destroy(existing.coverImage.public_id);
      }
      const uploadResponse = await cloudinary.uploader.upload(data.coverImage, {
        folder: 'portfolio-projects',
      });
      coverImage = {
        url: uploadResponse.secure_url,
        public_id: uploadResponse.public_id,
      };
    }
    
    const updateData = {
      title: data.title,
      description: data.description,
      tags: data.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      category: data.categoryId,
      repositoryUrl: data.repositoryUrl,
      liveUrl: data.liveUrl,
      slug: slugify(data.title),
      coverImage,
    };

    await Project.findByIdAndUpdate(id, updateData, { new: true });

    revalidatePath('/admin/projects');
    revalidatePath('/projects');
    revalidatePath(`/projects/${updateData.slug}`);
  } catch (error: any) {
    console.error('Error updating project:', error);
    throw new Error(`Failed to update project: ${error.message}`);
  }
}

export async function getProjects(): Promise<PopulatedProject[]> {
  try {
    await connectDB();
    const projects = await Project.find().sort({ createdAt: -1 }).populate({
        path: 'category',
        model: ProjectCategory
    }).lean();
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
}

export async function getProjectById(id: string): Promise<PopulatedProject | null> {
  try {
    await connectDB();
    const project = await Project.findById(id).populate({
        path: 'category',
        model: ProjectCategory
    }).lean();
    return project ? JSON.parse(JSON.stringify(project)) : null;
  } catch (error) {
    console.error('Error fetching project by id:', error);
    return null;
  }
}

export async function getProjectBySlug(slug: string): Promise<PopulatedProject | null> {
  try {
    await connectDB();
    const project = await Project.findOne({ slug }).populate({
        path: 'category',
        model: ProjectCategory
    }).lean();
    return project ? JSON.parse(JSON.stringify(project)) : null;
  } catch (error) {
    console.error('Error fetching project by slug:', error);
    return null;
  }
}


export async function deleteProject(id: string) {
  try {
    await connectDB();
    const project = await Project.findById(id);
    if (!project) throw new Error('Project not found');

    if (project.coverImage?.public_id) {
      await cloudinary.uploader.destroy(project.coverImage.public_id);
    }

    await Project.findByIdAndDelete(id);
    revalidatePath('/admin/projects');
    revalidatePath('/projects');
  } catch (error: any) {
    console.error('Error deleting project:', error);
    throw new Error(`Failed to delete project: ${error.message}`);
  }
}
