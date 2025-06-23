import mongoose, { Schema, Document } from 'mongoose';

export interface IAbout extends Document {
  bio: string;
  skills: string;
  profilePicture: {
    url: string;
    public_id: string;
  };
}

const AboutSchema: Schema = new Schema(
  {
    bio: { type: String, required: true },
    skills: { type: String },
    profilePicture: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.models.About || mongoose.model<IAbout>('About', AboutSchema);