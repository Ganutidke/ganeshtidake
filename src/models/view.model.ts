import mongoose, { Schema, Document } from 'mongoose';

export interface IView extends Document {
  createdAt: Date;
}

const ViewSchema: Schema = new Schema(
  {},
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.models.View || mongoose.model<IView>('View', ViewSchema);
