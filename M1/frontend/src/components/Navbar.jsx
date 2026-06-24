import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="relative z-20 border-b border-gray-200 bg-white">
      <div className="container mx-auto flex items-center gap-6 px-4 py-3">
        <Link to="/" className="font-semibold text-gray-900">
          Diploma App
        </Link>
        <Link to="/admin" className="text-sm text-gray-600 hover:text-gray-900">
          Admin
        </Link>
        <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900">
          Login
        </Link>
      </div>
    </nav>
  )
}
