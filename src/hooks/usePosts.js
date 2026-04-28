import { useEffect, useMemo, useState } from 'react'
import { API_POST_LIMIT, localPosts, normalizeApiPost } from '../data/posts'

const POSTS_URL = `https://jsonplaceholder.typicode.com/posts?_limit=${API_POST_LIMIT}`

function usePosts() {
  const [apiPosts, setApiPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadPosts() {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch(POSTS_URL, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Unable to load API posts right now.')
        }

        const data = await response.json()
        setApiPosts(data.map(normalizeApiPost))
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('API posts could not be loaded. Showing local posts only.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadPosts()

    return () => controller.abort()
  }, [])

  const posts = useMemo(() => [...localPosts, ...apiPosts], [apiPosts])

  return {
    posts,
    isLoading,
    error,
  }
}

export default usePosts