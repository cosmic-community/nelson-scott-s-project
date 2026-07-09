import Link from 'next/link'
import type { Category } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface CategoryCardProps {
  category: Category
}

const GRADIENTS = [
  'from-red-500 to-pink-500',
  'from-blue-500 to-indigo-500',
  'from-green-500 to-teal-500',
  'from-purple-500 to-violet-500',
  'from-orange-500 to-amber-500',
  'from-cyan-500 to-blue-500',
]

export default function CategoryCard({ category }: CategoryCardProps) {
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)

  // Deterministic gradient based on slug length
  const gradientIndex = category.slug.length % GRADIENTS.length
  const gradient = GRADIENTS[gradientIndex] ?? GRADIENTS[0]

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative block overflow-hidden rounded-2xl p-6 h-40"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-transform duration-300 group-hover:scale-105`} />
      <div className="relative z-10 h-full flex flex-col justify-end">
        <h3 className="text-xl font-bold text-white">{name}</h3>
        {description && (
          <p className="text-sm text-white/80 mt-1 line-clamp-2">{description}</p>
        )}
      </div>
    </Link>
  )
}