
'use client';

import { useEffect, useTransition, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getTheme, updateTheme, resetTheme } from '@/lib/actions/theme.actions';
import type { ITheme } from '@/models/theme.model';
import PageHeader from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, RefreshCw, Save } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const themeSchema = z.object({
  primary: z.string().min(1, "Primary color is required."),
  background: z.string().min(1, "Background color is required."),
  foreground: z.string().min(1, "Foreground color is required."),
  card: z.string().min(1, "Card color is required."),
  secondary: z.string().min(1, "Secondary color is required."),
  accent: z.string().min(1, "Accent color is required."),
  border: z.string().min(1, "Border color is required."),
});

type ThemeFormValues = z.infer<typeof themeSchema>;

const themeFields: Array<keyof ThemeFormValues> = [
  'background', 'foreground', 'card', 'primary', 'secondary', 'accent', 'border'
];

const defaultTheme: ThemeFormValues = {
  background: '222.2 84% 4.9%',
  foreground: '210 40% 98%',
  card: '222.2 47.4% 11.2%',
  primary: '217.2 91.2% 59.8%',
  secondary: '217.2 32.6% 17.5%',
  accent: '217.2 32.6% 17.5%',
  border: '217.2 32.6% 17.5%',
};

export default function ThemePage() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<ThemeFormValues>({
    resolver: zodResolver(themeSchema),
    defaultValues: defaultTheme,
  });

  useEffect(() => {
    async function loadTheme() {
      setIsLoading(true);
      const savedTheme = await getTheme();
      if (savedTheme) {
        form.reset(savedTheme);
      }
      setIsLoading(false);
    }
    loadTheme();
  }, [form]);

  const watchedValues = form.watch();

  useEffect(() => {
    const root = document.documentElement;
    if (watchedValues.background) root.style.setProperty('--background', watchedValues.background);
    if (watchedValues.foreground) root.style.setProperty('--foreground', watchedValues.foreground);
    if (watchedValues.card) root.style.setProperty('--card', watchedValues.card);
    if (watchedValues.primary) root.style.setProperty('--primary', watchedValues.primary);
    if (watchedValues.secondary) root.style.setProperty('--secondary', watchedValues.secondary);
    if (watchedValues.accent) root.style.setProperty('--accent', watchedValues.accent);
    if (watchedValues.border) root.style.setProperty('--border', watchedValues.border);
  }, [watchedValues]);

  const onSubmit = (values: ThemeFormValues) => {
    startTransition(async () => {
      try {
        await updateTheme(values);
        toast({ title: 'Success', description: 'Theme updated successfully.' });
      } catch (error: any) {
        toast({ variant: 'destructive', title: 'Error', description: error.message });
      }
    });
  };

  const handleReset = () => {
    startTransition(async () => {
      try {
        await resetTheme();
        form.reset(defaultTheme);
        toast({ title: 'Theme Reset', description: 'Theme has been reset to default.' });
      } catch (error: any) {
        toast({ variant: 'destructive', title: 'Error', description: error.message });
      }
    });
  };

  return (
    <div>
      <PageHeader
        title="Theme Customizer"
        description="Customize the look and feel of your site. Enter HSL values."
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Site Colors</CardTitle>
              <CardDescription>
                Enter HSL values without the `hsl()` wrapper. E.g., `217.2 91.2% 59.8%`.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {themeFields.map(field => (
                    <div key={field} className="space-y-2">
                       <Skeleton className="h-4 w-20" />
                       <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {themeFields.map((fieldName) => (
                    <FormField
                      key={fieldName}
                      control={form.control}
                      name={fieldName}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="capitalize">{fieldName}</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 217.2 91.2% 59.8%" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="gap-4">
              <Button type="submit" disabled={isPending || isLoading}>
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save Theme
              </Button>
              <Button type="button" variant="outline" onClick={handleReset} disabled={isPending || isLoading}>
                 <RefreshCw className="mr-2 h-4 w-4" />
                Reset to Default
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
