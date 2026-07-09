import { getCategories } from '@/lib/cosmic'
import CategoryCard from '@/components/CategoryCard'

export const revalidate = 60

export const metadata = {
  title: "Categories | Nelson Scott's Project",
  description: 'Browse all categories',
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Categories</h1>
      <p className="text-gray-500 mb-8">{categories.length} categor{categories.length === 1 ? 'y' : 'ies'}</p>
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-gray-500">
          <p>No categories have been added yet.</p>
        </div>
      )}
    </div>
  )
}