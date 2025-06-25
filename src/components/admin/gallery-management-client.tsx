
'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Loader2, Image as ImageIcon, Trash, UploadCloud } from 'lucide-react';

import { fileToBase64 } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { uploadImage, deleteImage } from '@/lib/actions/gallery.actions';
import type { IGalleryImage } from '@/models/gallery.model';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long.' }),
  image: z.instanceof(File).refine(file => file.size > 0, 'Image is required.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function GalleryManagementClient({ images: initialImages }: { images: IGalleryImage[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [images, setImages] = useState(initialImages);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: '' },
  });

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue('image', file);
      const base64 = await fileToBase64(file);
      setImagePreview(base64);
    }
  };

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      try {
        const imageBase64 = await fileToBase64(values.image);
        await uploadImage({ title: values.title, image: imageBase64 });
        toast({ title: 'Success', description: 'Image uploaded successfully.' });
        form.reset({ title: ''});
        setImagePreview(null);
        const newImages = await getImages();
        setImages(newImages);
        router.refresh();
      } catch (error: any) {
        toast({ variant: 'destructive', title: 'Error', description: error.message });
      }
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      try {
        await deleteImage(id);
        setImages(currentImages => currentImages.filter(img => img._id !== id));
        toast({ title: 'Success', description: 'Image deleted successfully.' });
        router.refresh();
      } catch (error: any) {
        toast({ variant: 'destructive', title: 'Error', description: error.message });
      }
    });
  };

  async function getImages(): Promise<IGalleryImage[]> {
      const res = await fetch('/api/gallery');
      if (!res.ok) {
          return [];
      }
      return res.json();
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Upload New Image</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image Title</FormLabel>
                      <FormControl><Input placeholder="e.g. Sunset in the mountains" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={() => (
                    <FormItem>
                      <FormLabel>Image File</FormLabel>
                      <FormControl>
                        <div>
                          <label htmlFor="gallery-image" className="block w-full cursor-pointer">
                            <div className="w-full aspect-video rounded-md border-2 border-dashed border-border flex items-center justify-center bg-card hover:bg-muted/50 transition-colors">
                              {imagePreview ? (
                                <Image src={imagePreview} alt="Image preview" width={300} height={168} className="object-contain w-full h-full rounded-md p-1" />
                              ) : (
                                <div className="text-center text-muted-foreground p-4">
                                  <ImageIcon className="mx-auto h-12 w-12" />
                                  <p className="mt-2 text-sm">Click to upload image</p>
                                </div>
                              )}
                            </div>
                          </label>
                          <Input id="gallery-image" type="file" accept="image/*" className="sr-only" onChange={handleImageChange} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPending} className="w-full">
                  {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
                  Upload Image
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Images</CardTitle>
            <CardDescription>
              {images.length} image{images.length === 1 ? '' : 's'} in your gallery.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {images.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((img) => (
                  <div key={img._id} className="relative group aspect-square">
                    <Image
                      src={img.image.url}
                      alt={img.title}
                      fill
                      className="rounded-md object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-center text-sm p-2">{img.title}</p>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash className="h-4 w-4 mr-2" /> Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>This action will permanently delete the image from your gallery and from Cloudinary.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(img._id)} disabled={isPending} className="bg-destructive hover:bg-destructive/90">
                              {isPending ? 'Deleting...' : 'Delete'}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8 border-2 border-dashed rounded-md">
                <ImageIcon className="h-12 w-12 mb-4" />
                <p>No images found.</p>
                <p className="text-sm">Upload an image to get started.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
