
'use client';

import Image from 'next/image';
import FramerMotionWrapper from '@/components/site/framer-motion-wrapper';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { IGalleryImage } from '@/models/gallery.model';

export default function GalleryPageClient({ images }: { images: IGalleryImage[] }) {
  return (
    <FramerMotionWrapper>
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="font-headline text-4xl font-bold text-primary">Photo Gallery</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A collection of moments and visuals.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 mt-12">
          {images.map((item, index) => (
            <FramerMotionWrapper key={item._id} delay={index * 0.05}>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="overflow-hidden rounded-lg cursor-pointer break-inside-avoid">
                    <Image
                      src={item.image.url}
                      alt={item.title}
                      width={500}
                      height={500}
                      className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="p-0 border-0 max-w-4xl bg-transparent">
                  <Image
                    src={item.image.url}
                    alt={item.title}
                    width={1200}
                    height={800}
                    className="w-full h-auto rounded-lg"
                  />
                </DialogContent>
              </Dialog>
            </FramerMotionWrapper>
          ))}
        </div>
      </div>
    </FramerMotionWrapper>
  );
}
