import Link from 'next/link'
import type { Channel } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { formatSubscriberCount } from '@/lib/utils'

interface ChannelCardProps {
  channel: Channel
}

export default function ChannelCard({ channel }: ChannelCardProps) {
  const name = getMetafieldValue(channel.metadata?.channel_name) || channel.title
  const description = getMetafieldValue(channel.metadata?.description)
  const avatar = channel.metadata?.avatar
  const subscribers = channel.metadata?.subscriber_count

  return (
    <Link
      href={`/channels/${channel.slug}`}
      className="group flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-lg hover:border-brand/30 transition-all"
    >
      {avatar ? (
        <img
          src={`${avatar.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
          alt={name}
          width={80}
          height={80}
          className="w-20 h-20 rounded-full object-cover"
        />
      ) : (
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-2xl font-bold">
          {name.charAt(0).toUpperCase()}
        </div>
      )}
      <h3 className="mt-4 text-base font-semibold text-gray-900 group-hover:text-brand transition-colors">
        {name}
      </h3>
      <p className="text-xs text-gray-500 mt-1">{formatSubscriberCount(subscribers)}</p>
      {description && (
        <p className="text-sm text-gray-500 mt-3 line-clamp-2">{description}</p>
      )}
    </Link>
  )
}