# My Blog

![App Preview](https://imgix.cosmicjs.com/a5f66790-622f-11f1-ac86-a9b6c7f3b674-autopilot-photo-1526772662000-3f88f10405ff-1780809221178.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern, and fully responsive blog built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com). My Blog showcases posts with featured images, rich content, and tags, organized by categories and written by talented authors.

## Features

- 📝 **Posts** — Browse blog posts with featured images, rich content, tags, and publish dates
- 👤 **Authors** — Dedicated author pages with bio, profile photo, and website links
- 🏷️ **Categories** — Filter and explore posts organized by category
- 🎨 **Modern Design** — Clean, responsive layout with smooth typography and elegant cards
- ⚡ **Fast & SEO-Friendly** — Server-rendered pages with optimized images via imgix
- 📱 **Fully Responsive** — Looks great on mobile, tablet, and desktop

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=6a24fdc247418f1917c7d633&clone_repository=6a24febb47418f1917c7d65b)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a blog with posts (including featured images, content, and tags), authors, and categories.
> 
> User instructions: A blog with posts, authors, and categories"

### Code Generation Prompt

> Build a Next.js application for a creative portfolio called "My Blog". The content is managed in Cosmic CMS with the following object types: categories, authors, posts. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A blog with posts, authors, and categories

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cosmic](https://www.cosmicjs.com) ([SDK Docs](https://www.cosmicjs.com/docs))

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A Cosmic account and bucket with `posts`, `authors`, and `categories` object types

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Create a `.env.local` file with your Cosmic credentials:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```
4. Run the development server:
   ```bash
   bun run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all posts with author and category data
const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch a single post by slug
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'my-post' })
  .depth(1)

// Fetch posts in a specific category
const { objects } = await cosmic.objects
  .find({ type: 'posts', 'metadata.category': categoryId })
  .depth(1)
```

## Cosmic CMS Integration

This app reads content from three Cosmic object types:

- **Posts** (`posts`) — title, content, featured_image, tags, publish_date, author (object), category (object)
- **Authors** (`authors`) — name, bio, profile_photo, website
- **Categories** (`categories`) — name, description

Connected objects (author and category on each post) are resolved using the `depth(1)` parameter so nested data is available directly. Learn more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add the environment variables (`COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`)
4. Deploy

### Netlify

1. Connect your repository in [Netlify](https://netlify.com)
2. Set the build command to `bun run build`
3. Add the environment variables
4. Deploy

<!-- README_END -->