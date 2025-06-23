import mongoose, { Schema, Document } from 'mongoose';

export interface IIntro extends Document {
  headline: string;
  subheadline: string;
  heroImage: {
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
  },
  { timestamps: true }
);

export default mongoose.models.Intro || mongoose.model<IIntro>('Intro', IntroSchema);