import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-6 mt-12 border-t border-border/40">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-center text-muted-foreground text-sm gap-4">
        <p>© {new Date().getFullYear()} All Rights Reserved.</p>
        <Link href="/admin" className="hover:text-primary transition-colors">Admin Login</Link>
      </div>
    </footer>
  );
}
