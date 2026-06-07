// app/categories/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCategory, getPostsByCategory, getMetafieldValue } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export const revalidate = 60

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategory(slug)
  if (!category) {
    return { title: 'Category Not Found — My Blog' }
  }
  return {
    title: `${getMetafieldValue(category.metadata?.name) || category.title} — My Blog`,
    other: {
      'cosmic-context': JSON.stringify({ object_id: category.id, object_type: 'categories' }),
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/categories"
        className="inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-700 mb-6"
      >
        ← Back to categories
      </Link>

      <div className="mb-10">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-100 text-brand-600 text-xl">
            🏷️
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">{name}</h1>
        </div>
        {description && <p className="mt-3 text-gray-600 max-w-2xl">{description}</p>}
        <p className="mt-2 text-sm text-gray-500">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <span className="text-5xl">📝</span>
          <p className="mt-4 text-gray-500">No posts in this category yet.</p>
        </div>
      )}
    </div>
  )
}