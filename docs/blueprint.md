# **App Name**: VisionFolio

## Core Features:

- Project Showcase: Display a curated collection of projects with images, descriptions, and links, showcasing the user's best work.
- Blog Articles: Share insights and expertise through blog articles, fostering engagement and demonstrating knowledge.
- Certificate Display: Highlight earned certificates with dedicated pages, building trust and credibility with site visitors.
- Contact Form: Enable users to directly contact the portfolio owner through a contact form.
- AI SEO Enhancement: AI-powered tool to suggest SEO keywords based on portfolio content to improve search engine visibility.
- Build a **Modern Portfolio website**: Build a Modern Portfolio website with an Admin Panel using:  - Framework: Next.js (App Router) for both frontend and admin. - UI Framework: Tailwind CSS + HeroUI (for a sleek, responsive, dark theme design). - Database: MongoDB (using the URI: `mongodb+srv://ganeshtidke1:ganeshtidke1@ganesh.c3pktsq.mongodb.net/?retryWrites=true&w=majority&appName=ganesh`) - Image Upload/Storage: Cloudinary ini CopyEdit `CLOUDINARY_CLOUD_NAME=dsqtgvohb CLOUDINARY_API_KEY=941491819189547 CLOUDINARY_API_SECRET=vOhmCFyrBxgZRTAMX5fVioeX0aw ` - Authentication:  - Admin panel protected by login. - Admin username and password stored in environment variables (no database). - Pages and Features:  - Home Page: Text, images, and sections editable from Admin. - About Page: Rich text, images editable. - Projects Page:  - List of projects. - Individual project pages with images, description, and links. - Admin can add/edit/delete projects. - Blogs Page:  - List of blog articles. - Individual pages for each article. - Admin can create/edit/delete. - Certificates Page:  - List of earned certificates. - Individual certificate pages (with images, description). - Admin can add/edit/delete. - Contact Page:  - Admin can edit contact information. - Contact form available for users to send messages (stored in the database). - Admin Panel Features:  - Secured by login (using the Admin username and password from `.env`). - CRUD operations for:  - Home Page sections - About Page - Projects - Blogs - Certificates - Education (and any future sections like Experience or Services). - Rich Text Editor for long text fields. - File upload via Cloudinary. - Dashboard stats (count of Projects, Blogs, etc.). - Additional Details:  - Dark theme across the site. - Subtle animations (using Framer Motion or Tailwind transitions). - Proper error handling (show user-friendly messages). - Responsive design across all devices. - Maintain a clean and extensible code structure (using proper Mongoose Models, Next.js route structure). - SEO-friendly page setup (Meta tags, OG tags). --- This project must be: - Deployed on Vercel (or another platform). - Maintain a clean `.env` file for secrets. - Developed with future extensibility in mind.

## Style Guidelines:

- Primary color: Soft lavender (#D0BFFF) for a modern and creative feel.
- Background color: Dark gray (#28282B) for a sleek, professional dark theme.
- Accent color: Muted blue (#79A7D3) to complement the primary color and create visual interest.
- Headline font: 'Poppins' (sans-serif) for a geometric and fashionable look. Body font: 'Inter' (sans-serif) for a clean and readable experience.
- Use clean, minimalist icons from HeroUI to maintain consistency with the design framework.
- Ensure a responsive design using Tailwind CSS, providing an optimal viewing experience across devices.
- Incorporate subtle animations using Framer Motion or Tailwind transitions to enhance user engagement.