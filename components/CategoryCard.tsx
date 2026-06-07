import Link from 'next/link'
import { Category } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  if (!category) return null

  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block bg-white rounded-xl p-6 border border-gray-200 hover:border-brand-300 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-100 text-brand-600 text-lg">
          🏷️
        </span>
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
          {name}
        </h3>
      </div>
      {description && (
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
      )}
    </Link>
  )
}