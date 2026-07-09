// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Cosmic file/image metafield
export interface CosmicImage {
  url: string;
  imgix_url: string;
}

// Category type
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
  };
}

// Channel type
export interface Channel extends CosmicObject {
  type: 'channels';
  metadata: {
    channel_name?: string;
    description?: string;
    avatar?: CosmicImage;
    banner_image?: CosmicImage;
    subscriber_count?: number;
  };
}

// Video type
export interface Video extends CosmicObject {
  type: 'videos';
  metadata: {
    video_title?: string;
    description?: string;
    video_url?: string;
    thumbnail_image?: CosmicImage;
    duration?: string;
    view_count?: number;
    publish_date?: string;
    channel?: Channel;
    category?: Category;
  };
}

// Cosmic API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isVideo(obj: CosmicObject): obj is Video {
  return obj.type === 'videos';
}

export function isChannel(obj: CosmicObject): obj is Channel {
  return obj.type === 'channels';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}