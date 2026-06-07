// app/authors/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAuthor, getPostsByAuthor, getMetafieldValue } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export const revalidate = 60

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthor(slug)
  if (!author) {
    return { title: 'Author Not Found — My Blog' }
  }
  return {
    title: `${getMetafieldValue(author.metadata?.name) || author.title} — My Blog`,
    other: {
      'cosmic-context': JSON.stringify({ object_id: author.id, object_type: 'authors' }),
    },
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthor(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)
  const name = getMetafieldValue(author.metadata?.name) || author.title
  const bio = getMetafieldValue(author.metadata?.bio)
  const website = getMetafieldValue(author.metadata?.website)
  const photo = author.metadata?.profile_photo

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/authors"
        className="inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-700 mb-6"
      >
        ← Back to authors
      </Link>

      {/* Author header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white rounded-2xl p-8 border border-gray-200 mb-12">
        {photo ? (
          <img
            src={`${photo.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
            alt={name}
            width={120}
            height={120}
            className="w-28 h-28 rounded-full object-cover ring-4 ring-brand-50"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-brand-100 flex items-center justify-center text-3xl font-bold text-brand-600">
            {name.charAt(0)}
          </div>
        )}
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{name}</h1>
          {bio && <p className="mt-3 text-gray-600 max-w-2xl">{bio}</p>}
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              🔗 Visit website
            </a>
          )}
        </div>
      </div>

      {/* Posts */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Posts by {name}
          <span className="ml-2 text-base font-normal text-gray-500">({posts.length})</span>
        </h2>
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
          <p className="mt-4 text-gray-500">No posts by this author yet.</p>
        </div>
      )}
    </div>
  )
}