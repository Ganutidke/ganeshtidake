
import mongoose, { Schema, Document } from 'mongoose';

export interface IIntro extends Document {
  headline: string;
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
}

const IntroSchema: Schema = new Schema(
  {
    headline: { type: String, required: true },
    subheadline: { type: String, required: true },
    heroImage: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    role: { type: String, default: 'Full Stack devloper' },
    githubUrl: { type: String, default: 'https://github.com/Ganutidke' },
    linkedinUrl: { type: String, default: 'https://www.linkedin.com/in/ganeshtidake/' },
    email: { type: String, default: 'ganeshtidake519@gmail.com' },
    phone: { type: String, default: '+1 (234) 567-890' },
    address: { type: String, default: 'Pune, Maharashtra, India' },
  },
  { timestamps: true }
);

export default mongoose.models.Intro || mongoose.model<IIntro>('Intro', IntroSchema);
