// Format view count into human-readable string (e.g. 1.2K, 3.4M)
export function formatViewCount(count?: number): string {
  if (count === undefined || count === null) return '0 views'
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, '')}M views`
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1).replace(/\.0$/, '')}K views`
  }
  return `${count} view${count === 1 ? '' : 's'}`
}

// Format subscriber count
export function formatSubscriberCount(count?: number): string {
  if (count === undefined || count === null) return '0 subscribers'
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, '')}M subscribers`
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1).replace(/\.0$/, '')}K subscribers`
  }
  return `${count} subscriber${count === 1 ? '' : 's'}`
}

// Format a date string into a readable format
export function formatDate(dateString?: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Extract a YouTube embed URL from a variety of video URL formats
export function getEmbedUrl(url?: string): string | null {
  if (!url) return null

  // youtu.be/ID
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
  if (shortMatch && shortMatch[1]) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`
  }

  // youtube.com/watch?v=ID
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/)
  if (watchMatch && watchMatch[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`
  }

  // youtube.com/embed/ID (already embed)
  const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/)
  if (embedMatch && embedMatch[1]) {
    return `https://www.youtube.com/embed/${embedMatch[1]}`
  }

  return null
}