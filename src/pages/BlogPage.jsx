import { Link } from 'react-router-dom'
import usePosts from '../hooks/usePosts'

function BlogPage() {
  const { posts, isLoading, error } = usePosts()

  return (
    <main className="page blog-page">
      <section className="page-head">
        <p className="eyebrow">Today&apos;s Top Posts</p>
        <h1>Read, reflect, and return with questions</h1>
        <p className="lead">
          This feed blends your original writing with imported API posts to match the live blog experience.
        </p>
      </section>

      {isLoading && <p className="status-note">Loading API posts...</p>}
      {error && <p className="status-error">{error}</p>}

      <section className="post-list" aria-label="Blog posts">
        {posts.map((post) => (
          <article className="post-card" key={post.id}>
            <p className="post-number">Post #{post.displayId ?? post.id}</p>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <Link className="btn btn-outline" to={`/posts/${post.id}`}>
              Read full post
            </Link>
          </article>
        ))}
      </section>
    </main>
  )
}

export default BlogPage
