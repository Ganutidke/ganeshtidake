
import { NextResponse } from 'next/server';
import { getImages } from '@/lib/actions/gallery.actions';

export async function GET() {
  try {
    const images = await getImages();
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}
