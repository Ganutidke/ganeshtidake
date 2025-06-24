
import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  _id: string;
  role: string;
  company: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
}

const ExperienceSchema: Schema = new Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema);
