import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  tags: string[];
  coverImage: {
    url: string;
    public_id: string;
  };
  repositoryUrl?: string;
  liveUrl?: string;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
    coverImage: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    repositoryUrl: { type: String },
    liveUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);