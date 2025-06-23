import mongoose, { Schema, Document } from 'mongoose';

export interface IEducation extends Document {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date;
  endDate?: Date;
  description: string;
}

const EducationSchema: Schema = new Schema(
  {
    school: { type: String, required: true },
    degree: { type: String, required: true },
    fieldOfStudy: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Education || mongoose.model<IEducation>('Education', EducationSchema);