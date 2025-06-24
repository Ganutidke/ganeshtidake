
import mongoose, { Schema, Document } from 'mongoose';
import '@/models/project-category.model'; // Ensures ProjectCategory model is registered before Project model
import type { IProjectCategory } from '@/models/project-category.model';

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  coverImage: {
    url: string;
    public_id: string;
  };
  category: IProjectCategory['_id'];
  repositoryUrl?: string;
  liveUrl?: string;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
    coverImage: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    category: { type: Schema.Types.ObjectId, ref: 'ProjectCategory', required: true },
    repositoryUrl: { type: String },
    liveUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
