import Link from 'next/link'
import { getVideos, getChannels, getCategories } from '@/lib/cosmic'
import VideoGrid from '@/components/VideoGrid'
import ChannelCard from '@/components/ChannelCard'
import CategoryCard from '@/components/CategoryCard'

export const revalidate = 60

export default async function HomePage() {
  const [videos, channels, categories] = await Promise.all([
    getVideos(),
    getChannels(),
    getCategories(),
  ])

  const featuredVideos = videos.slice(0, 8)
  const topChannels = channels.slice(0, 4)
  const topCategories = categories.slice(0, 6)

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Watch. Discover. Enjoy.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
            Explore a curated collection of videos, channels, and categories — all in one beautiful place.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/videos"
              className="px-6 py-3 rounded-full bg-brand hover:bg-brand-dark text-white font-semibold transition-colors"
            >
              Browse Videos
            </Link>
            <Link
              href="/channels"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
            >
              View Channels
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Videos */}
        <section className="py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Latest Videos</h2>
            <Link href="/videos" className="text-sm font-medium text-brand hover:text-brand-dark">
              View all →
            </Link>
          </div>
          <VideoGrid videos={featuredVideos} emptyMessage="No videos have been added yet." />
        </section>

        {/* Categories */}
        {topCategories.length > 0 && (
          <section className="py-12 border-t border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
              <Link href="/categories" className="text-sm font-medium text-brand hover:text-brand-dark">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </section>
        )}

        {/* Channels */}
        {topChannels.length > 0 && (
          <section className="py-12 border-t border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Featured Channels</h2>
              <Link href="/channels" className="text-sm font-medium text-brand hover:text-brand-dark">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {topChannels.map((channel) => (
                <ChannelCard key={channel.id} channel={channel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}