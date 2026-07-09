import type { Video } from '@/types'
import VideoCard from '@/components/VideoCard'

interface VideoGridProps {
  videos: Video[]
  emptyMessage?: string
}

export default function VideoGrid({ videos, emptyMessage = 'No videos found.' }: VideoGridProps) {
  if (!videos || videos.length === 0) {
    return (
      <div className="py-16 text-center text-gray-500">
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )
}