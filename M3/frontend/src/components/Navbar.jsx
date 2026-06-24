import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function onLogout() {
    logout()
    navigate('/login')
  }

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex items-center gap-6 px-4 py-3">
        <Link to="/" className="font-semibold text-gray-900">
          Diploma App
        </Link>
        {user && (
          <Link to="/admin" className="text-sm text-gray-600 hover:text-gray-900">
            Admin
          </Link>
        )}

        <div className="ml-auto flex items-center gap-4 text-sm">
          {user ? (
            <>
              <span className="text-gray-500">{user.email}</span>
              <button onClick={onLogout} className="text-gray-600 hover:text-gray-900">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-gray-900">Log in</Link>
              <Link to="/signup" className="text-gray-600 hover:text-gray-900">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
