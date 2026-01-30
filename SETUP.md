# Blog Website Setup Guide

This is a personal blog website built with React 19, Vite, and Supabase.

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   VITE_ADMIN_PASSWORD=your-secure-password
   ```

3. **Set up Supabase database**
   Run this SQL in your Supabase SQL Editor:
   ```sql
   -- Categories table
   CREATE TABLE categories (
     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
     name text NOT NULL,
     slug text UNIQUE NOT NULL,
     description text,
     created_at timestamptz DEFAULT now()
   );

   -- Posts table
   CREATE TABLE posts (
     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
     title text NOT NULL,
     slug text UNIQUE NOT NULL,
     excerpt text,
     content jsonb,
     thumbnail text,
     category_id uuid REFERENCES categories(id),
     published boolean DEFAULT false,
     published_at timestamptz,
     created_at timestamptz DEFAULT now(),
     updated_at timestamptz DEFAULT now()
   );

   -- Enable RLS
   ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
   ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

   -- Policies for public read access
   CREATE POLICY "Public can read categories" ON categories FOR SELECT USING (true);
   CREATE POLICY "Public can read published posts" ON posts FOR SELECT USING (published = true);

   -- Policies for authenticated operations (admin panel)
   -- For simple password protection, we use anon key with permissive policies
   CREATE POLICY "Allow insert categories" ON categories FOR INSERT WITH CHECK (true);
   CREATE POLICY "Allow update categories" ON categories FOR UPDATE USING (true);
   CREATE POLICY "Allow delete categories" ON categories FOR DELETE USING (true);

   CREATE POLICY "Allow all posts operations" ON posts FOR ALL USING (true);
   ```

4. **Set up Supabase Storage (for image uploads)**
   - Go to Supabase Dashboard > Storage
   - Create a new bucket called `images`
   - Set the bucket to **Public**
   - Add a policy to allow uploads:
     ```sql
     CREATE POLICY "Allow public uploads" ON storage.objects
     FOR INSERT WITH CHECK (bucket_id = 'images');
     ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## Routes

### Public Pages
- `/` - Homepage with hero and posts grid
- `/blog/:slug` - Individual blog post
- `/category/:slug` - Posts filtered by category
- `/about` - About page

### Admin Pages
- `/admin` - Login page (password protected)
- `/admin/posts` - List all posts
- `/admin/posts/new` - Create new post
- `/admin/posts/:id` - Edit existing post
- `/admin/categories` - Manage categories

## Features

- **Rich Text Editor** - TipTap editor with bold, italic, headings, lists, quotes, links, and images
- **Image Upload** - Upload images to Supabase Storage or use external URLs
- **Draft/Publish** - Save posts as drafts before publishing
- **Categories** - Organize posts by categories
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Editorial Magazine Style** - Classic newspaper-inspired design

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Tech Stack

- React 19 + Vite
- React Router DOM 7
- Supabase (PostgreSQL + Storage)
- TipTap (Rich Text Editor)
- CSS Variables for theming
