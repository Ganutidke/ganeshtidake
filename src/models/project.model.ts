
import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  coverImage: {
    url: string;
    public_id: string;
  };
  category: string[];
  repositoryUrl?: string;
  liveUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PopulatedProject = IProject;

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
    category: [{ type: String, required: true }],
    repositoryUrl: { type: String },
    liveUrl: { type: String },
  },
  { timestamps: true }
);

// Prevent Mongoose OverwriteModelError in development
if (process.env.NODE_ENV === 'development') {
  if (mongoose.models.Project) {
    delete mongoose.models.Project;
  }
}

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
