import mongoose, { Schema, Document } from 'mongoose';

export interface ICertificate extends Document {
  title: string;
  issuingOrganization: string;
  issueDate: Date;
  credentialUrl: string;
  coverImage: {
    url:string;
    public_id: string;
  };
}

const CertificateSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    issuingOrganization: { type: String, required: true },
    issueDate: { type: Date, required: true },
    credentialUrl: { type: String },
    coverImage: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    }
  },
  { timestamps: true }
);

export default mongoose.models.Certificate || mongoose.model<ICertificate>('Certificate', CertificateSchema);