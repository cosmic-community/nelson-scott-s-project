import { createBucketClient } from '@cosmicjs/sdk'
import type { Video, Channel, Category } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Safe metadata value renderer
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

// Sort videos by publish date (newest first)
function sortByPublishDate(videos: Video[]): Video[] {
  return [...videos].sort((a, b) => {
    const dateA = new Date(a.metadata?.publish_date || '').getTime()
    const dateB = new Date(b.metadata?.publish_date || '').getTime()
    return dateB - dateA
  })
}

// Fetch all videos
export async function getVideos(): Promise<Video[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'videos' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return sortByPublishDate(response.objects as Video[])
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch videos')
  }
}

// Fetch a single video by slug
export async function getVideo(slug: string): Promise<Video | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'videos', slug })
      .depth(1)
    return (response.object as Video) || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch video')
  }
}

// Fetch all channels
export async function getChannels(): Promise<Channel[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'channels' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Channel[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch channels')
  }
}

// Fetch a single channel by slug
export async function getChannel(slug: string): Promise<Channel | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'channels', slug })
      .depth(1)
    return (response.object as Channel) || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch channel')
  }
}

// Fetch videos for a specific channel
export async function getVideosByChannel(channelId: string): Promise<Video[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'videos', 'metadata.channel': channelId })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return sortByPublishDate(response.objects as Video[])
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch channel videos')
  }
}

// Fetch all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Category[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch categories')
  }
}

// Fetch a single category by slug
export async function getCategory(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'categories', slug })
      .depth(1)
    return (response.object as Category) || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch category')
  }
}

// Fetch videos for a specific category
export async function getVideosByCategory(categoryId: string): Promise<Video[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'videos', 'metadata.category': categoryId })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return sortByPublishDate(response.objects as Video[])
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch category videos')
  }
}