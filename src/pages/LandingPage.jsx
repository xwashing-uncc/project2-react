import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function LandingPage() {
  const { isAuthenticated, user } = useAuth()

  return (
    <main className="page landing-page">
      <section className="landing-hero">
        <p className="eyebrow">Personal writing space</p>
        <h1>Gateway into Gardens</h1>
        <p className="lead">
          A blog about habits, focus, growth, and building a calmer digital life.
          Log in to read posts and join the discussion.
        </p>

        <div className="cta-row">
          <Link className="btn btn-primary" to={isAuthenticated ? '/blog' : '/login'}>
            {isAuthenticated ? 'Go to Blog' : 'Login'}
          </Link>
        </div>

        {isAuthenticated && (
          <p className="welcome-note">Welcome back, {user.username}.</p>
        )}
      </section>

      <section className="feature-grid" aria-label="Highlights">
        <article className="feature-card">
          <h2>Focused Reading</h2>
          <p>Clean, distraction-light pages made for short, meaningful reading sessions.</p>
        </article>
        <article className="feature-card">
          <h2>Protected Discussions</h2>
          <p>Commenting is available only for authenticated users to keep conversations intentional.</p>
        </article>
        <article className="feature-card">
          <h2>Mobile Friendly</h2>
          <p>Responsive layout with clear typography and touch-friendly actions on every screen size.</p>
        </article>
      </section>
    </main>
  )
}

export default LandingPage
