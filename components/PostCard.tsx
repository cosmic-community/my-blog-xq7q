import Link from 'next/link'
import { Post } from '@/types'
import { getMetafieldValue, normalizeTags } from '@/lib/cosmic'
import { formatDate } from '@/lib/utils'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  if (!post) return null

  const title = getMetafieldValue(post.metadata?.title) || post.title
  const featuredImage = post.metadata?.featured_image
  const category = post.metadata?.category
  const author = post.metadata?.author
  const publishDate = post.metadata?.publish_date
  const tags = normalizeTags(post.metadata?.tags).slice(0, 3)

  return (
    <article className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <Link href={`/posts/${post.slug}`} className="block">
        {featuredImage ? (
          <div className="aspect-[16/9] overflow-hidden bg-gray-100">
            <img
              src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={title}
              width={400}
              height={225}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="aspect-[16/9] bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
            <span className="text-4xl">📝</span>
          </div>
        )}
      </Link>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          {category && (
            <Link
              href={`/categories/${category.slug}`}
              className="inline-block text-xs font-semibold uppercase tracking-wide text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full hover:bg-brand-100 transition-colors"
            >
              {getMetafieldValue(category.metadata?.name) || category.title}
            </Link>
          )}
        </div>
        <Link href={`/posts/${post.slug}`}>
          <h3 className="text-lg font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-brand-600 transition-colors">
            {title}
          </h3>
        </Link>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          {author ? (
            <Link
              href={`/authors/${author.slug}`}
              className="flex items-center gap-2 group/author"
            >
              {author.metadata?.profile_photo ? (
                <img
                  src={`${author.metadata.profile_photo.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={getMetafieldValue(author.metadata?.name) || author.title}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-xs font-bold text-brand-600">
                  {(getMetafieldValue(author.metadata?.name) || author.title).charAt(0)}
                </div>
              )}
              <span className="text-sm font-medium text-gray-700 group-hover/author:text-brand-600 transition-colors">
                {getMetafieldValue(author.metadata?.name) || author.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {publishDate && (
            <time className="text-xs text-gray-400">{formatDate(publishDate)}</time>
          )}
        </div>
      </div>
    </article>
  )
}