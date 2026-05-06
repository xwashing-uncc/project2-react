import { Link, Navigate, NavLink, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import BlogPage from './pages/BlogPage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import PostPage from './pages/PostPage'

function AppShell() {
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/">
          Xavier&apos;s Blog
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/blog">Posts</NavLink>
          {isAuthenticated ? (
            <button className="btn btn-ghost" type="button" onClick={logout}>
              Logout ({user.username})
            </button>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/posts/:postId" element={<PostPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default AppShell
