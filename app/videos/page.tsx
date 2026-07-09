import { getVideos } from '@/lib/cosmic'
import VideoGrid from '@/components/VideoGrid'

export const revalidate = 60

export const metadata = {
  title: "Videos | Nelson Scott's Project",
  description: 'Browse all videos',
}

export default async function VideosPage() {
  const videos = await getVideos()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">All Videos</h1>
      <p className="text-gray-500 mb-8">{videos.length} video{videos.length === 1 ? '' : 's'}</p>
      <VideoGrid videos={videos} emptyMessage="No videos have been added yet." />
    </div>
  )
}