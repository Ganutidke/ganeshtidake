
import mongoose from 'mongoose';

// Import all models to ensure they are registered with Mongoose
import '@/models/about.model';
import '@/models/blog.model';
import '@/models/certificate.model';
import '@/models/education.model';
import '@/models/experience.model';
import '@/models/faq.model';
import '@/models/intro.model';
import '@/models/message.model';
import '@/models/project-category.model';
import '@/models/project.model';
import '@/models/gallery.model';


const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
