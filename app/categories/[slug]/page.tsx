// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getCategory, getVideosByCategory } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/cosmic'
import VideoGrid from '@/components/VideoGrid'

export const revalidate = 60

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    notFound()
  }

  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)
  const videos = await getVideosByCategory(category.id)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
      {description && <p className="text-gray-500 max-w-3xl mb-2">{description}</p>}
      <p className="text-gray-500 mb-8">{videos.length} video{videos.length === 1 ? '' : 's'}</p>
      <VideoGrid videos={videos} emptyMessage="No videos in this category yet." />
    </div>
  )
}