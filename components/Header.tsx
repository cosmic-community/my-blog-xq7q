import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">📝</span>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
              My Blog
            </span>
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-600 rounded-md hover:bg-gray-100 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/posts"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-600 rounded-md hover:bg-gray-100 transition-colors"
            >
              Posts
            </Link>
            <Link
              href="/categories"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-600 rounded-md hover:bg-gray-100 transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/authors"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-600 rounded-md hover:bg-gray-100 transition-colors"
            >
              Authors
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}