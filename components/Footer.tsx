import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">📝</span>
            <span className="font-extrabold text-gray-900">My Blog</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm text-gray-600">
            <Link href="/posts" className="hover:text-brand-600 transition-colors">
              Posts
            </Link>
            <Link href="/categories" className="hover:text-brand-600 transition-colors">
              Categories
            </Link>
            <Link href="/authors" className="hover:text-brand-600 transition-colors">
              Authors
            </Link>
          </nav>
          <p className="text-sm text-gray-500">© {year} My Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}