import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function SignupPage() {
  const navigate = useNavigate()
  const { signup } = useAuth()

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [error, setError]       = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }

    setSubmitting(true)
    try {
      await signup(email, password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err.message || 'Signup failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Sign up</h1>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Password</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Confirm password</label>
          <input
            type="password"
            required
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-700 disabled:opacity-50"
        >
          {submitting ? 'Creating account…' : 'Sign up'}
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-gray-900 underline">Log in</Link>
      </p>
    </div>
  )
}
