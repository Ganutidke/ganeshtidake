import ContactForm from '@/components/site/contact-form';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold text-primary">Get In Touch</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold font-headline text-primary mb-6">Contact Information</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Email</h3>
                <p className="text-muted-foreground">Drop me a line anytime!</p>
                <a href="mailto:ganeshtidke1@example.com" className="text-secondary hover:underline">
                  ganeshtidke1@example.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Phone</h3>
                <p className="text-muted-foreground">Let's have a chat.</p>
                <a href="tel:+1234567890" className="text-secondary hover:underline">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
             <div className="flex items-start gap-4">
              <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Location</h3>
                <p className="text-muted-foreground">Pune, Maharashtra, India</p>
              </div>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
