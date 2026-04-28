import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, login } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const redirectTo = location.state?.from || '/blog'

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const result = login({ username, password })
    if (!result.ok) {
      setError(result.error)
      return
    }

    setError('')
    navigate(redirectTo, { replace: true })
  }

  return (
    <main className="page auth-page">
      <section className="auth-card">
        <p className="eyebrow">Login Required</p>
        <h1>Access your blog space</h1>
        <p className="lead">Enter your username and password to journey into the blog.</p>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error && <p className="form-error">{error}</p>}

          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>
      </section>
    </main>
  )
}

export default LoginPage
