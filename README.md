# 🌌 ZenFolio: AI-Powered Next.js Portfolio & Blog  

![ZenFolio Banner](https://res.cloudinary.com/dsqtgvohb/image/upload/v1750928396/fozcaefihotwz7foejqx.png)

ZenFolio is a sleek, AI-enhanced portfolio and blogging template built with **Next.js**, **Tailwind CSS**, and **MongoDB**. It's ideal for developers and creators seeking a beautiful, functional space for their work — complete with an Admin Panel, customizable themes, and AI tools for automated SEO, chat, and image generation.

👉 **Live Demo:** [Ganesh Tidake](https://your-portfolio-url.com)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Ganutidke/ganeshtidake)

---

## ✨ Features  

- 🚀 **Modern Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, ShadCN UI  
- 🔐 **Secure Admin Panel:** Password-protected, role-based access  
- ✍️ **Full CRUD Features:** Edit Intro, Projects, Blog, Education, Experience, and more  
- 🤖 **AI-Powered Tools (Genkit):**  
  - ✅ AI SEO Suggestions  
  - ✅ Chatbot Assistant  
  - ✅ AI Cover Image Generation  
- 🎨 **Theme Customization:** Tailor site colors and layout from the Admin Panel  
- 🖼️ **Cloudinary Integration:** Streamline media storage and optimization  
- 📧 **Contact Form:** Store visitor messages in your database  
- 📊 **Site Analytics:** Monitor page views and engagement metrics  
- 📱 **Fully Responsive & Dark Mode Supported**  
- ⚡️ **One-Click Deployment:** Quickly launch your site with Vercel  

---

## 🛠️ Tech Stack  

- **Framework:** [Next.js](https://nextjs.org/) (App Router) + TypeScript  
- **UI Framework:** [Tailwind CSS](https://tailwindcss.com/) + [ShadCN UI](https://ui.shadcn.com/)  
- **Database:** [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)  
- **Image Management:** [Cloudinary](https://cloudinary.com/)  
- **Authentication:** JWT-based Session Management  
- **Deployment:** [Vercel](https://vercel.com/)  
- **AI Services:** [Genkit (Google AI)](https://firebase.google.com/docs/genkit)

---

## ⚡ Getting Started  

### ✅ Prerequisites
- [Node.js](https://nodejs.org/) v18 or later  
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) Account  
- [Cloudinary](https://cloudinary.com/) Account  
- [Google AI Studio API Key](https://aistudio.google.com/app/apikey)

### 📥 Installation
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
    ```
    MONGODB_URI=
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=
    ADMIN_USERNAME=
    ADMIN_PASSWORD=
    SESSION_SECRET=
    GOOGLE_API_KEY=
    ```

4. **Run the Development Server:**  
    ```bash
    npm run dev
    ```
    - 🌐 **App:** http://localhost:9002
    - 🧠 **Genkit AI Server:** http://localhost:4000

---

## ⚡️ Project Structure  

Here's an overview of the key directories in the project:

-   `/src/app/(site)`: Contains all the pages for the public-facing website.
-   `/src/app/admin`: Contains all the pages for the admin panel.
-   `/src/app/api`: API routes for server-side logic.
-   `/src/ai`: All Genkit-related code, including AI flows.
-   `/src/components`: Reusable React components (both for the site and admin panel).
-   `/src/lib`: Core logic, server actions, database connection, and utilities.
-   `/src/models`: Mongoose schemas for your database collections.


---

## ☁️ Deployment Guide  

1. Push your code to **GitHub**.
2. Import the repo to **Vercel**.
3. Add environment variables in **Vercel Project Settings**.
4. Click **Deploy** — Done! ✅  
