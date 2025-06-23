
'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/db';
import Project, { IProject } from '@/models/project.model';
import cloudinary from '@/lib/cloudinary';
import { slugify } from '@/lib/utils';

export interface ProjectParams {
  title: string;
  description: string;
  tags: string;
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
      ...data,
      slug: slugify(data.title),
      tags: data.tags.split(',').map(tag => tag.trim()).filter(Boolean),
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
      ...data,
      slug: slugify(data.title),
      tags: data.tags.split(',').map(tag => tag.trim()).filter(Boolean),
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

export async function getProjects(): Promise<IProject[]> {
  try {
    await connectDB();
    const projects = await Project.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function getProjectById(id: string): Promise<IProject | null> {
  try {
    await connectDB();
    const project = await Project.findById(id).lean();
    return project ? JSON.parse(JSON.stringify(project)) : null;
  } catch (error) {
    console.error('Error fetching project by id:', error);
    return null;
  }
}

export async function getProjectBySlug(slug: string): Promise<IProject | null> {
  try {
    await connectDB();
    const project = await Project.findOne({ slug }).lean();
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
