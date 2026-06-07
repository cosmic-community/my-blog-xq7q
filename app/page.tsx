import Link from 'next/link'
import { getPosts, getCategories, getMetafieldValue } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import CategoryCard from '@/components/CategoryCard'
import { formatDate } from '@/lib/utils'

export const revalidate = 60

export default async function HomePage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()])

  const featuredPost = posts[0]
  const recentPosts = posts.slice(1, 7)

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-600 via-brand-500 to-brand-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Stories, Ideas & Inspiration
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-lg text-brand-50">
            Discover thoughtful writing from talented authors across a range of topics.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/posts"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-brand-600 font-semibold hover:bg-brand-50 transition-colors"
            >
              Browse Posts
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-brand-700/40 text-white font-semibold hover:bg-brand-700/60 transition-colors"
            >
              Explore Categories
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured post */}
        {featuredPost && (
          <section className="mb-16">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-600 mb-4">
              Featured
            </h2>
            <Link
              href={`/posts/${featuredPost.slug}`}
              className="group grid md:grid-cols-2 gap-6 bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow"
            >
              {featuredPost.metadata?.featured_image ? (
                <div className="aspect-[16/10] md:aspect-auto overflow-hidden bg-gray-100">
                  <img
                    src={`${featuredPost.metadata.featured_image.imgix_url}?w=1200&h=750&fit=crop&auto=format,compress`}
                    alt={getMetafieldValue(featuredPost.metadata?.title) || featuredPost.title}
                    width={600}
                    height={375}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="aspect-[16/10] bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
                  <span className="text-5xl">📝</span>
                </div>
              )}
              <div className="p-6 sm:p-8 flex flex-col justify-center">
                {featuredPost.metadata?.category && (
                  <span className="inline-block w-fit text-xs font-semibold uppercase tracking-wide text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full mb-3">
                    {getMetafieldValue(featuredPost.metadata.category.metadata?.name) ||
                      featuredPost.metadata.category.title}
                  </span>
                )}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight group-hover:text-brand-600 transition-colors">
                  {getMetafieldValue(featuredPost.metadata?.title) || featuredPost.title}
                </h3>
                <div className="flex items-center gap-3 mt-6 text-sm text-gray-500">
                  {featuredPost.metadata?.author && (
                    <span className="font-medium text-gray-700">
                      {getMetafieldValue(featuredPost.metadata.author.metadata?.name) ||
                        featuredPost.metadata.author.title}
                    </span>
                  )}
                  {featuredPost.metadata?.publish_date && (
                    <>
                      <span>•</span>
                      <time>{formatDate(featuredPost.metadata.publish_date)}</time>
                    </>
                  )}
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Recent posts */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Posts</h2>
            <Link href="/posts" className="text-sm font-medium text-brand-600 hover:text-brand-700">
              View all →
            </Link>
          </div>
          {recentPosts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No posts available yet.</p>
          )}
        </section>

        {/* Categories */}
        {categories.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Browse by Category</h2>
              <Link
                href="/categories"
                className="text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                View all →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}