import Link from 'next/link'
import type { Video } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { formatViewCount, formatDate } from '@/lib/utils'

interface VideoCardProps {
  video: Video
}

export default function VideoCard({ video }: VideoCardProps) {
  const title = getMetafieldValue(video.metadata?.video_title) || video.title
  const thumbnail = video.metadata?.thumbnail_image
  const duration = getMetafieldValue(video.metadata?.duration)
  const channel = video.metadata?.channel
  const channelName = channel ? getMetafieldValue(channel.metadata?.channel_name) || channel.title : ''
  const channelAvatar = channel?.metadata?.avatar
  const views = video.metadata?.view_count
  const publishDate = video.metadata?.publish_date

  return (
    <div className="group">
      <Link href={`/videos/${video.slug}`} className="block">
        <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-200">
          {thumbnail ? (
            <img
              src={`${thumbnail.imgix_url}?w=640&h=360&fit=crop&auto=format,compress`}
              alt={title}
              width={320}
              height={180}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          )}
          {duration && (
            <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-white text-xs font-medium">
              {duration}
            </span>
          )}
        </div>
      </Link>
      <div className="flex gap-3 mt-3">
        {channel && channelAvatar && (
          <Link href={`/channels/${channel.slug}`} className="flex-shrink-0">
            <img
              src={`${channelAvatar.imgix_url}?w=72&h=72&fit=crop&auto=format,compress`}
              alt={channelName}
              width={36}
              height={36}
              className="w-9 h-9 rounded-full object-cover"
            />
          </Link>
        )}
        <div className="min-w-0">
          <Link href={`/videos/${video.slug}`}>
            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-brand transition-colors">
              {title}
            </h3>
          </Link>
          {channel && (
            <Link
              href={`/channels/${channel.slug}`}
              className="text-xs text-gray-500 hover:text-brand transition-colors block mt-1"
            >
              {channelName}
            </Link>
          )}
          <p className="text-xs text-gray-500 mt-0.5">
            {formatViewCount(views)}
            {publishDate ? ` • ${formatDate(publishDate)}` : ''}
          </p>
        </div>
      </div>
    </div>
  )
}