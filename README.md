# VisionFolio: AI-Powered Next.js Portfolio & Blog

![VisionFolio Banner]([https://placehold.co/1200x630.png?text=VisionFolio](https://res.cloudinary.com/dsqtgvohb/image/upload/v1750928396/fozcaefihotwz7foejqx.png))

VisionFolio is a modern, feature-rich, and highly customizable portfolio template built with Next.js, Tailwind CSS, and MongoDB. It comes with a powerful admin panel to manage every part of your site, from your bio and projects to blog posts and AI-powered tools.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fvisionfolio-template)

**Live Demo:** [your-portfolio-url.com](https://your-portfolio-url.com) *(replace with your deployed link)*

---

## ✨ Features

- **🚀 Modern Tech Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS, and ShadCN UI.
- **🔐 Admin Panel**: A secure, password-protected dashboard to manage your entire portfolio.
- **✍️ Full CRUD Functionality**: Create, Read, Update, and Delete operations for:
  - Intro & About Me sections
  - Projects (with categories and tags)
  - Blog Posts (with Markdown support)
  - Work Experience & Education History
  - Certificates & Gallery Images
  - FAQs
- **🤖 AI-Powered Tools (Genkit)**:
  - **AI SEO Helper**: Get keyword suggestions based on your content.
  - **AI Chatbot**: An intelligent assistant that answers visitor questions based on your portfolio data.
  - **AI Image Generation**: Generate unique cover images for your blog posts from a text prompt.
- **🎨 Theme Customizer**: Change your site's color palette directly from the admin panel.
- **🖼️ Cloudinary Integration**: Optimized image uploads and storage.
- **📨 Contact Form**: Receive messages directly from visitors, stored in your database.
- **📊 Analytics**: A dashboard with site view tracking and content analytics.
- **📱 Fully Responsive**: A sleek, dark-themed design that looks great on all devices.
- **🚀 One-Click Deploy**: Ready to deploy on Vercel.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (with Mongoose)
- **Image Management**: [Cloudinary](https://cloudinary.com/)
- **AI Integration**: [Genkit (Google AI)](https://firebase.google.com/docs/genkit)
- **Authentication**: JWT-based session management
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

Follow these steps to get your portfolio up and running.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (you can start with a free tier)
- A [Cloudinary](https://cloudinary.com/) account (the free tier is generous)
- A [Google AI API Key](https://aistudio.google.com/app/apikey) for the AI features

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/visionfolio-template.git
    cd visionfolio-template
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    -   Create a new file named `.env` in the root of your project by copying the example file.
    -   Fill in the values for each variable. See the section below for details.

    ```bash
    cp .env.example .env
    ```

### Running the Development Server

This project uses `concurrently` to run both the Next.js frontend and the Genkit AI server with a single command.

**Run the development server:**
```bash
npm run dev
```
This will:
- Start the Next.js site at `http://localhost:9002`.
- Start the Genkit AI server. You can inspect your AI flows at `http://localhost:4000`.

---

## 🔑 Environment Variables

You must create a `.env` file in the root of your project and add the following variables. Refer to `.env.example` for a template.

| Variable                 | Description                                                                                                   | Example                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `MONGODB_URI`            | Your MongoDB connection string.                                                                               | `mongodb+srv://user:pass@cluster.mongodb.net/`  |
| `CLOUDINARY_CLOUD_NAME`  | Your Cloudinary cloud name.                                                                                   | `your-cloud-name`                               |
| `CLOUDINARY_API_KEY`     | Your Cloudinary API key.                                                                                      | `123456789012345`                               |
| `CLOUDINARY_API_SECRET`  | Your Cloudinary API secret.                                                                                   | `aBcDeFgHiJkLmNoPqRsTuVwXyZ_12345`               |
| `ADMIN_USERNAME`         | The username for accessing the admin panel.                                                                   | `admin`                                         |
| `ADMIN_PASSWORD`         | The password for the admin panel.                                                                             | `a-very-secure-password`                        |
| `SESSION_SECRET`         | A long, random, secret string for signing session cookies.                                                    | `generate-a-32-char-random-string`              |
| `GOOGLE_API_KEY`         | Your API key from Google AI Studio for Genkit.                                                                | `AIzaSy...`                                     |

---

## 📂 Project Structure

Here's an overview of the key directories in the project:

-   `/src/app/(site)`: Contains all the pages for the public-facing website.
-   `/src/app/admin`: Contains all the pages for the admin panel.
-   `/src/app/api`: API routes for server-side logic.
-   `/src/ai`: All Genkit-related code, including AI flows.
-   `/src/components`: Reusable React components (both for the site and admin panel).
-   `/src/lib`: Core logic, server actions, database connection, and utilities.
-   `/src/models`: Mongoose schemas for your database collections.

---

## ☁️ Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/).

1.  **Push your code to a GitHub repository.**

2.  **Import your project into Vercel.**
    -   Go to your Vercel dashboard and click "Add New... > Project".
    -   Import the GitHub repository you just created.
    -   Vercel will automatically detect that it's a Next.js project.

3.  **Configure Environment Variables.**
    -   In the Vercel project settings, navigate to "Environment Variables".
    -   Add all the variables from your `.env` file one by one. **This is a crucial step.**

4.  **Deploy!**
    -   Click the "Deploy" button. Vercel will build and deploy your site. Any time you push to your `main` branch, Vercel will automatically redeploy the changes.
