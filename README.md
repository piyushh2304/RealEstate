# RealTrust - Real Estate Solutions

A comprehensive full-stack application designed for real estate consultation, design, and marketing. This project features a high-end landing page and a robust admin panel for managing projects, clients, and leads.

## 🚀 Features

### Landing Page
- **Interactive Hero Section**: High-performance "Background Beams with Collision" effect.
- **Project Showcase**: Dynamically fetched project list with details.
- **Client Testimonials**: "Happy Clients" section showcasing user feedback.
- **Lead Generation**: Integrated contact form and newsletter subscription.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.
- **Dark/Light Mode**: Seamless theme switching with system detection.

### Admin Panel
- **Dashboard**: Overview of project and lead status.
- **Project Management**: Full CRUD for projects including automated image cropping (450x350).
- **Client Management**: Manage testimonial data and designations.
- **Contact Inquiries**: View and track user submissions from the contact form.
- **Subscriber List**: Manage newsletter email subscriptions.

## 🛠️ Tech Stack

- **Frontend**: Next.js, Tailwind CSS, Framer Motion.
- **Backend**: Next.js Server Actions, MongoDB (Mongoose).
- **Storage**: Cloudinary (Image hosting & optimization).
- **Theme**: next-themes.
- **Form Handling**: react-hook-form, zod.

## 📦 Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd <project-folder>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root and add your credentials:
   ```env
   MONGODB_URI=your_mongodb_uri
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

## 📝 License

All rights reserved.
