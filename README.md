# Nelson Scott's Project

![App Preview](https://imgix.cosmicjs.com/b46167e0-7b3d-11f1-9ed1-e9ba15611567-autopilot-photo-1587202372775-e229f172b9d7-1783564037460.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern YouTube-style video platform built with Next.js and powered by [Cosmic](https://www.cosmicjs.com). Browse videos, explore channels, and filter by categories in a sleek, responsive interface.

## Features

- 🎬 **Video Grid** — Browse all videos with thumbnails, durations, view counts, and publish dates
- 📺 **Video Detail Pages** — Watch embedded videos with full descriptions, channel info, and related videos
- 👤 **Channel Pages** — View channel banners, avatars, subscriber counts, and all channel videos
- 🏷️ **Category Filtering** — Explore videos organized by category
- 🔍 **Responsive Design** — Fully optimized for mobile, tablet, and desktop
- ⚡ **Fast & SEO-Optimized** — Server-side rendering with Next.js App Router

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a4f06a767f2f6a3f8054da9&clone_repository=6a4f07b867f2f6a3f8054de0)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: youtube"

### Code Generation Prompt

> Build a Next.js application for a website called "Nelson Scott's Project". The content is managed in Cosmic CMS with the following object types: categories, channels, videos. Create a beautiful, modern, responsive design with a homepage and pages for each content type. User instructions: youtube

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) or Node.js 18+
- A Cosmic account with a bucket containing `categories`, `channels`, and `videos` object types

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Set up environment variables (see Cosmic CMS Integration below)
4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all videos with connected channel and category data
const response = await cosmic.objects
  .find({ type: 'videos' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const videos = response.objects

// Fetch a single video by slug
const { object } = await cosmic.objects
  .findOne({ type: 'videos', slug: 'my-video' })
  .depth(1)

// Fetch videos for a specific channel
const channelVideos = await cosmic.objects
  .find({ type: 'videos', 'metadata.channel': channelId })
  .depth(1)
```

## Cosmic CMS Integration

This app integrates with the following Cosmic object types:

- **Videos** — `video_title`, `description`, `video_url`, `thumbnail_image`, `duration`, `view_count`, `publish_date`, `channel` (object), `category` (object)
- **Channels** — `channel_name`, `description`, `avatar`, `banner_image`, `subscriber_count`
- **Categories** — `name`, `description`

Set these environment variables:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

Learn more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import the project in [Netlify](https://netlify.com)
3. Add environment variables in Site settings
4. Deploy

<!-- README_END -->