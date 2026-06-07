import { getAuthors } from '@/lib/cosmic'
import AuthorCard from '@/components/AuthorCard'

export const revalidate = 60

export const metadata = {
  title: 'Authors — My Blog',
  description: 'Meet the writers behind My Blog.',
}

export default async function AuthorsPage() {
  const authors = await getAuthors()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Authors</h1>
        <p className="mt-2 text-gray-600">Meet the talented writers behind My Blog.</p>
      </div>

      {authors.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <span className="text-5xl">👤</span>
          <p className="mt-4 text-gray-500">No authors available yet.</p>
        </div>
      )}
    </div>
  )
}