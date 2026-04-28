import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import usePosts from '../hooks/usePosts'

function PostPage() {
  const { postId } = useParams()
  const { isAuthenticated, user } = useAuth()
  const { posts, isLoading, error } = usePosts()

  const post = useMemo(
    () => posts.find((entry) => entry.id === postId),
    [postId, posts],
  )

  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState('')

  if (isLoading) {
    return (
      <main className="page post-page">
        <section className="post-detail">
          <h1>Loading post...</h1>
          <p>Fetching the latest blog content now.</p>
        </section>
      </main>
    )
  }

  if (!post) {
    return (
      <main className="page post-page">
        <section className="post-detail">
          <h1>Post not found</h1>
          <p>{error || 'The requested article does not exist.'}</p>
          <Link className="btn btn-outline" to="/blog">
            Back to Blog
          </Link>
        </section>
      </main>
    )
  }

  const handleCommentSubmit = (event) => {
    event.preventDefault()
    const trimmed = comment.trim()
    if (!trimmed) return

    setSubmitted(trimmed)
    setComment('')
  }

  return (
    <main className="page post-page">
      <article className="post-detail">
        <p className="post-number">Post #{post.displayId ?? post.id}</p>
        <h1>{post.title}</h1>
        {(post.author || post.publishedAt) && (
          <p className="post-meta">
            {post.author ? `By ${post.author}` : ''}
            {post.author && post.publishedAt ? ' · ' : ''}
            {post.publishedAt || ''}
          </p>
        )}
        <p>{post.body}</p>
      </article>

      <section className="comment-area" aria-label="Comment section">
        <h2>Discussion</h2>

        {isAuthenticated ? (
          <>
            <p className="comment-helper">Logged in as {user.username}. Share your thoughts below.</p>
            <form className="comment-form" onSubmit={handleCommentSubmit}>
              <label htmlFor="comment">Your comment</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Write a thoughtful response..."
                rows={4}
              />
              <button className="btn btn-primary" type="submit">
                Post Comment
              </button>
            </form>
            {submitted && (
              <p className="comment-preview">
                Latest comment: <strong>{submitted}</strong>
              </p>
            )}
          </>
        ) : (
          <p className="login-required-message">
            Please log in to join the discussion on this post.
          </p>
        )}
      </section>

      <Link className="btn btn-outline" to="/blog">
        Back to Blog
      </Link>
    </main>
  )
}

export default PostPage
