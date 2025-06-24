
import mongoose, { Schema, Document } from 'mongoose';

// HSL color values are stored as strings, e.g., "217.2 91.2% 59.8%"
export interface ITheme extends Document {
  primary: string;
  background: string;
  foreground: string;
  card: string;
  secondary: string;
  accent: string;
  border: string;
}

const ThemeSchema: Schema = new Schema({
    primary: { type: String, required: true },
    background: { type: String, required: true },
    foreground: { type: String, required: true },
    card: { type: String, required: true },
    secondary: { type: String, required: true },
    accent: { type: String, required: true },
    border: { type: String, required: true },
});

export default mongoose.models.Theme || mongoose.model<ITheme>('Theme', ThemeSchema);
