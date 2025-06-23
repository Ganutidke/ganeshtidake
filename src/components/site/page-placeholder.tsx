export default function PagePlaceholder({ title, description }: { title: string; description?: string }) {
  return (
    <div className="container py-16 text-center">
      <h1 className="font-headline text-4xl font-bold text-primary">{title}</h1>
      {description && <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{description}</p>}
    </div>
  );
}
