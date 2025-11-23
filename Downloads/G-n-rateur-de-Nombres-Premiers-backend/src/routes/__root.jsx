import { Outlet, Link, useLocation } from 'react-router-dom'

/**
 * Root layout component
 */
export const Root = () => {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
              🔢 Générateur de Nombres Premiers
            </Link>
            <div className="flex gap-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded transition-colors ${
                  isActive('/')
                    ? 'text-blue-600 font-semibold bg-blue-50'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                Accueil
              </Link>
              <Link
                to="/primes"
                className={`px-3 py-2 rounded transition-colors ${
                  isActive('/primes')
                    ? 'text-blue-600 font-semibold bg-blue-50'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                Nombres Premiers
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

