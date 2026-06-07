// app/posts/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPost, getMetafieldValue, normalizeTags } from '@/lib/cosmic'
import { formatDate } from '@/lib/utils'

export const revalidate = 60

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) {
    return { title: 'Post Not Found — My Blog' }
  }
  return {
    title: `${getMetafieldValue(post.metadata?.title) || post.title} — My Blog`,
    other: {
      'cosmic-context': JSON.stringify({ object_id: post.id, object_type: 'posts' }),
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const title = getMetafieldValue(post.metadata?.title) || post.title
  const content = getMetafieldValue(post.metadata?.content)
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category
  const publishDate = post.metadata?.publish_date
  const tags = normalizeTags(post.metadata?.tags)

  return (
    <article>
      {/* Hero image */}
      {featuredImage && (
        <div className="w-full aspect-[21/9] max-h-[480px] overflow-hidden bg-gray-100">
          <img
            src={`${featuredImage.imgix_url}?w=2000&h=860&fit=crop&auto=format,compress`}
            alt={title}
            width={1000}
            height={430}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href="/posts"
          className="inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-700 mb-6"
        >
          ← Back to posts
        </Link>

        {category && (
          <Link
            href={`/categories/${category.slug}`}
            className="inline-block text-xs font-semibold uppercase tracking-wide text-brand-600 bg-brand-50 px-3 py-1 rounded-full mb-4 hover:bg-brand-100 transition-colors"
          >
            {getMetafieldValue(category.metadata?.name) || category.title}
          </Link>
        )}

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
          {title}
        </h1>

        {/* Author & date */}
        <div className="flex items-center gap-3 mt-6 pb-6 border-b border-gray-200">
          {author && (
            <Link href={`/authors/${author.slug}`} className="flex items-center gap-3 group">
              {author.metadata?.profile_photo ? (
                <img
                  src={`${author.metadata.profile_photo.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                  alt={getMetafieldValue(author.metadata?.name) || author.title}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center font-bold text-brand-600">
                  {(getMetafieldValue(author.metadata?.name) || author.title).charAt(0)}
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
                  {getMetafieldValue(author.metadata?.name) || author.title}
                </p>
                {publishDate && (
                  <time className="text-sm text-gray-500">{formatDate(publishDate)}</time>
                )}
              </div>
            </Link>
          )}
          {!author && publishDate && (
            <time className="text-sm text-gray-500">{formatDate(publishDate)}</time>
          )}
        </div>

        {/* Content */}
        {content && (
          <div
            className="prose prose-lg prose-brand max-w-none mt-8"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-200">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}