
import mongoose, { Schema, Document } from 'mongoose';

export interface IGalleryImage extends Document {
  _id: string;
  title: string;
  image: {
    url: string;
    public_id: string;
  };
  createdAt: Date;
}

const GalleryImageSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    image: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.models.GalleryImage || mongoose.model<IGalleryImage>('GalleryImage', GalleryImageSchema);
