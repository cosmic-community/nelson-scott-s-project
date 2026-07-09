import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand text-white">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="text-lg font-bold tracking-tight">Nelson Scott's Project</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/" className="hover:text-brand transition-colors">
              Home
            </Link>
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
      </div>
    </header>
  )
}