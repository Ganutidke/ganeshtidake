
import mongoose, { Schema, Document } from 'mongoose';

export interface IProjectCategory extends Document {
  _id: string;
  name: string;
}

const ProjectCategorySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
});

export default mongoose.models.ProjectCategory || mongoose.model<IProjectCategory>('ProjectCategory', ProjectCategorySchema);
