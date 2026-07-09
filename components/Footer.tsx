import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand text-white">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="font-semibold">Nelson Scott's Project</span>
          </div>
          <nav className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/videos" className="hover:text-brand transition-colors">
              Videos
            </Link>
            <Link href="/channels" className="hover:text-brand transition-colors">
              Channels
            </Link>
            <Link href="/categories" className="hover:text-brand transition-colors">
              Categories
            </Link>
          </nav>
        </div>
        <p className="mt-6 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Nelson Scott's Project. Built with Cosmic.
        </p>
      </div>
    </footer>
  )
}