import Link from 'next/link'
import { Author } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  if (!author) return null

  const name = getMetafieldValue(author.metadata?.name) || author.title
  const bio = getMetafieldValue(author.metadata?.bio)
  const photo = author.metadata?.profile_photo

  return (
    <Link
      href={`/authors/${author.slug}`}
      className="group flex flex-col items-center text-center bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
    >
      {photo ? (
        <img
          src={`${photo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
          alt={name}
          width={80}
          height={80}
          className="w-20 h-20 rounded-full object-cover ring-4 ring-brand-50 group-hover:ring-brand-100 transition-all"
        />
      ) : (
        <div className="w-20 h-20 rounded-full bg-brand-100 flex items-center justify-center text-2xl font-bold text-brand-600">
          {name.charAt(0)}
        </div>
      )}
      <h3 className="mt-4 text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
        {name}
      </h3>
      {bio && <p className="mt-2 text-sm text-gray-600 line-clamp-3">{bio}</p>}
    </Link>
  )
}