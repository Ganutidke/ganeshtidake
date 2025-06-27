# 🌌 Portfolio: AI-Powered Next.js Portfolio Template & Blog

![Portfolio Banner](https://res.cloudinary.com/dsqtgvohb/image/upload/v1750928396/fozcaefihotwz7foejqx.png)

Portfolio is a sleek, AI-enhanced portfolio and blogging template built with **Next.js**, **Tailwind CSS**, and **MongoDB**. It's ideal for developers and creators seeking a beautiful, functional space for their work — complete with an Admin Panel, customizable themes, and AI tools for automated SEO, chat, and image generation.

👉 **Live Demo:** [Ganesh Tidake](https://ganeshtidake.vercel.app)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Ganutidke/ganeshtidake)

---

## ✨ Features

* 🚀 **Modern Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, ShadCN UI
* 🔐 **Secure Admin Panel:** Password-protected, role-based access
* ✍️ **Full CRUD Features:** Edit Intro, Projects, Blog, Education, Experience, and more
* 🤖 **AI-Powered Tools (Genkit):**

  * ✅ AI SEO Suggestions
  * ✅ Chatbot Assistant
  * ✅ AI Cover Image Generation
* 🎨 **Theme Customization:** Tailor site colors and layout from the Admin Panel
* 🖼️ **Cloudinary Integration:** Streamline media storage and optimization
* 📧 **Contact Form:** Store visitor messages in your database
* 📊 **Site Analytics:** Monitor page views and engagement metrics
* 📱 **Fully Responsive & Dark Mode Supported**
* ⚡️ **One-Click Deployment:** Quickly launch your site with Vercel

---

## 💪 Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router) + TypeScript
* **UI Framework:** [Tailwind CSS](https://tailwindcss.com/) + [ShadCN UI](https://ui.shadcn.com/)
* **Database:** [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
* **Image Management:** [Cloudinary](https://cloudinary.com/)
* **Authentication:** JWT-based Session Management
* **Deployment:** [Vercel](https://vercel.com/)
* **AI Services:** [Genkit (Google AI)](https://firebase.google.com/docs/genkit)

---

## ⚡ Getting Started

> ⚠️ **Important Note:** Before you begin, make sure to **configure all environment variables with valid values** as shown below. Incorrect or missing values will cause runtime **errors** and prevent features like database, image uploads, and AI tools from working!

### ✅ Prerequisites

* [Node.js](https://nodejs.org/) v18 or later
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) Account
* [Cloudinary](https://cloudinary.com/) Account
* [Google AI Studio API Key](https://aistudio.google.com/app/apikey)

### 📅 Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Ganutidke/ganeshtidake.git
   cd ganeshtidake
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Setup Environment Variables:**
   Create a `.env` file in the root directory:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and fill in your details:

   ```env
   MONGODB_URI=your_mongodb_uri
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ADMIN_USERNAME=your_admin_username
   ADMIN_PASSWORD=your_admin_password
   SESSION_SECRET=your_secret
   GOOGLE_API_KEY=your_google_api_key
   ```

4. **Run the Development Server:**

   ```bash
   npm run dev
   ```

   * 🌐 **App:** [http://localhost:9002](http://localhost:9002)
   * 🧠 **Genkit AI Server:** [http://localhost:4000](http://localhost:4000)

---

## 🚦 Dashboard Walkthrough

### 🔹 Core Setup: Your Identity

* **[Intro Section](/admin/intro)**: First impression matters. Customize your name, role, hero image, and social/contact links.

  * 📝 Tips:

    * Use your name as "Headline" and your title as "Role"
    * Add GitHub, LinkedIn, etc. for credibility
    * These details also appear on your Contact page

* **[About Me](/admin/about)**: Tell your story & showcase skills.

  * 📝 Tips:

    * Write engaging bio
    * Format skills like: `Languages: JavaScript, Python`
    * Upload a professional photo

### 🔹 Showcasing Your Work & Experience

* **[Projects](/admin/projects)**: Highlight what you’ve built.

  * 📝 Tips:

    * Add markdown to descriptions
    * Use categories + tags for filtering and SEO
    * Good images increase visual appeal

* **[Experience](/admin/experience)**: Work history & current roles

  * 📝 Tips:

    * Most recent job w/o end date is shown on homepage

* **[Education](/admin/education)**: List academic background

  * 📝 Tips:

    * Mention key courses or achievements

* **[Certificates](/admin/certificates)**: Add certifications

  * 📝 Tips:

    * Upload a clear image
    * Add a credential URL

* **[Gallery](/admin/gallery)**: For designs, mockups, or creative visuals

  * 📝 Tips:

    * Use high-resolution assets

### 🔹 Content & Engagement

* **[Blogs](/admin/blogs)**: Share knowledge & boost SEO

  * 📝 Tips:

    * Use markdown editor
    * Use AI to generate cover images
    * Good excerpt = more clicks

* **[FAQ](/admin/faq)**: Anticipate and answer common questions

  * 📝 Tips:

    * Keep it concise

* **[Messages](/admin/messages)**: Read contact form messages

  * 📝 Tips:

    * Unread messages are highlighted

### 🔹 Advanced Customization & AI Tools

* **[Theme Customizer](/admin/theme)**: Change colors & styles live

  * 📝 Tips:

    * Input HSL values like: `217.2 91.2% 59.8%`
    * You can always reset

* **[AI SEO Helper](/admin/seo)**: Get AI keyword suggestions

  * 📝 Tips:

    * Combine About + Projects content for best results

* **[AI Chatbot](/admin/chatbot)**: Let your visitors ask questions

  * 📝 Tips:

    * Keep site content updated for best results
    * Try asking: "What are your top skills?"

---

## ☁️ Deployment Guide

1. Push your code to **GitHub**.
2. Import the repo to **Vercel**.
3. Add environment variables in **Vercel Project Settings**.
4. Click **Deploy** — Done! ✅
