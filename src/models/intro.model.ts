
import mongoose, { Schema, Document } from 'mongoose';

export interface IIntro extends Document {
  headline: string; // Headline is to store the Name of User Who is going to use the template
  subheadline: string;
  heroImage: {
    url: string;
    public_id: string;
  };
  role?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  email?: string;
  phone?: string;
  address?: string;
  resume?: {
    url: string;
    public_id: string;
  };
}

const IntroSchema: Schema = new Schema(
  {
    headline: { type: String, required: true },
    subheadline: { type: String, required: true },
    heroImage: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    resume: {
      url: { type: String },
      public_id: { type: String },
    },
    role: { type: String, default: 'Full-Stack Developer' },
    githubUrl: { type: String, default: '' },
    linkedinUrl: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
  },
  { timestamps: true }
);

// Prevent Mongoose OverwriteModelError in development
if (process.env.NODE_ENV === 'development') {
  if (mongoose.models.Intro) {
    delete mongoose.models.Intro;
  }
}

export default mongoose.models.Intro || mongoose.model<IIntro>('Intro', IntroSchema);
