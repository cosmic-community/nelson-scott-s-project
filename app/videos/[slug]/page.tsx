// app/videos/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getVideo, getVideosByChannel } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/cosmic'
import { formatViewCount, formatDate, formatSubscriberCount, getEmbedUrl } from '@/lib/utils'
import VideoGrid from '@/components/VideoGrid'
import type { Video } from '@/types'

export const revalidate = 60

export default async function VideoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const video = await getVideo(slug)

  if (!video) {
    notFound()
  }

  const title = getMetafieldValue(video.metadata?.video_title) || video.title
  const description = getMetafieldValue(video.metadata?.description)
  const thumbnail = video.metadata?.thumbnail_image
  const videoUrl = getMetafieldValue(video.metadata?.video_url)
  const embedUrl = getEmbedUrl(videoUrl)
  const views = video.metadata?.view_count
  const publishDate = video.metadata?.publish_date
  const channel = video.metadata?.channel
  const category = video.metadata?.category

  const channelName = channel ? getMetafieldValue(channel.metadata?.channel_name) || channel.title : ''
  const channelAvatar = channel?.metadata?.avatar
  const subscribers = channel?.metadata?.subscriber_count

  // Related videos from same channel
  let relatedVideos: Video[] = []
  if (channel) {
    const channelVideos = await getVideosByChannel(channel.id)
    relatedVideos = channelVideos.filter((v) => v.id !== video.id).slice(0, 4)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Player */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            ) : thumbnail ? (
              <img
                src={`${thumbnail.imgix_url}?w=1280&h=720&fit=crop&auto=format,compress`}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No video available
              </div>
            )}
          </div>

          {/* Title & meta */}
          <h1 className="mt-5 text-2xl font-bold text-gray-900">{title}</h1>
          <p className="mt-1 text-sm text-gray-500">
            {formatViewCount(views)}
            {publishDate ? ` • ${formatDate(publishDate)}` : ''}
          </p>

          {/* Channel row */}
          {channel && (
            <div className="mt-4 flex items-center gap-3 py-4 border-y border-gray-200">
              <Link href={`/channels/${channel.slug}`} className="flex items-center gap-3">
                {channelAvatar ? (
                  <img
                    src={`${channelAvatar.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                    alt={channelName}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                    {channelName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900">{channelName}</p>
                  <p className="text-xs text-gray-500">{formatSubscriberCount(subscribers)}</p>
                </div>
              </Link>
              {category && (
                <Link
                  href={`/categories/${category.slug}`}
                  className="ml-auto px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-700 transition-colors"
                >
                  {getMetafieldValue(category.metadata?.name) || category.title}
                </Link>
              )}
            </div>
          )}

          {/* Description */}
          {description && (
            <div className="mt-4 p-4 rounded-xl bg-white border border-gray-200">
              <p className="text-sm text-gray-700 whitespace-pre-line">{description}</p>
            </div>
          )}
        </div>

        {/* Sidebar: related videos */}
        <aside className="lg:col-span-1">
          <h2 className="text-lg font-bold text-gray-900 mb-4">More from this channel</h2>
          {relatedVideos.length > 0 ? (
            <VideoGrid videos={relatedVideos} />
          ) : (
            <p className="text-sm text-gray-500">No related videos.</p>
          )}
        </aside>
      </div>
    </div>
  )
}