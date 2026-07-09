import { getChannels } from '@/lib/cosmic'
import ChannelCard from '@/components/ChannelCard'

export const revalidate = 60

export const metadata = {
  title: "Channels | Nelson Scott's Project",
  description: 'Browse all channels',
}

export default async function ChannelsPage() {
  const channels = await getChannels()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Channels</h1>
      <p className="text-gray-500 mb-8">{channels.length} channel{channels.length === 1 ? '' : 's'}</p>
      {channels.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {channels.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-gray-500">
          <p>No channels have been added yet.</p>
        </div>
      )}
    </div>
  )
}