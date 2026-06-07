import { getPosts } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export const revalidate = 60

export const metadata = {
  title: 'All Posts — My Blog',
  description: 'Browse all blog posts.',
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">All Posts</h1>
        <p className="mt-2 text-gray-600">
          {posts.length} {posts.length === 1 ? 'story' : 'stories'} to explore
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
          <p className="mt-4 text-gray-500">No posts available yet.</p>
        </div>
      )}
    </div>
  )
}