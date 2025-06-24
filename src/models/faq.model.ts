
import mongoose, { Schema, Document } from 'mongoose';

export interface IFaq extends Document {
  _id: string;
  question: string;
  answer: string;
}

const FaqSchema: Schema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Faq || mongoose.model<IFaq>('Faq', FaqSchema);
