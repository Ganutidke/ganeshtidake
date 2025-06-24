
import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: {
    url: string;
    public_id: string;
  };
  content: string;
  tags: string[];
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    coverImage: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    content: { type: String, required: true },
    tags: [{ type: String }],
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
