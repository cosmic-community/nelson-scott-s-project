// app/channels/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getChannel, getVideosByChannel } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/cosmic'
import { formatSubscriberCount } from '@/lib/utils'
import VideoGrid from '@/components/VideoGrid'

export const revalidate = 60

export default async function ChannelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const channel = await getChannel(slug)

  if (!channel) {
    notFound()
  }

  const name = getMetafieldValue(channel.metadata?.channel_name) || channel.title
  const description = getMetafieldValue(channel.metadata?.description)
  const avatar = channel.metadata?.avatar
  const banner = channel.metadata?.banner_image
  const subscribers = channel.metadata?.subscriber_count

  const videos = await getVideosByChannel(channel.id)

  return (
    <div>
      {/* Banner */}
      <div className="relative h-40 sm:h-56 bg-gray-200 overflow-hidden">
        {banner ? (
          <img
            src={`${banner.imgix_url}?w=2000&h=560&fit=crop&auto=format,compress`}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-gray-700 to-gray-900" />
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Channel header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-12 sm:-mt-14 pb-6 border-b border-gray-200">
          {avatar ? (
            <img
              src={`${avatar.imgix_url}?w=256&h=256&fit=crop&auto=format,compress`}
              alt={name}
              width={128}
              height={128}
              className="w-28 h-28 rounded-full object-cover border-4 border-white bg-white"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-gray-300 border-4 border-white flex items-center justify-center text-4xl font-bold text-gray-600">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="text-center sm:text-left pb-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{name}</h1>
            <p className="text-sm text-gray-500 mt-1">{formatSubscriberCount(subscribers)}</p>
          </div>
        </div>

        {description && (
          <p className="mt-6 text-gray-700 max-w-3xl whitespace-pre-line">{description}</p>
        )}

        {/* Channel videos */}
        <section className="py-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Videos ({videos.length})
          </h2>
          <VideoGrid videos={videos} emptyMessage="This channel has no videos yet." />
        </section>
      </div>
    </div>
  )
}