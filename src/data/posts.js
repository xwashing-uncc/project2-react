export const localPosts = [
  {
    id: 'local-1',
    displayId: 1,
    title: 'Keeping Sane in a World of Screens',
    author: 'Xavier Washington',
    publishedAt: 'March 21, 2026',
    excerpt:
      'Notifications are useful until they become constant noise. I started turning off every non-essential alert and reclaiming focused blocks in...',
    body: `Notifications are useful until they become constant noise. I started turning off every non-essential alert and reclaiming focused blocks in my day.

The biggest shift was choosing one time window for news and social feeds instead of checking all day. It lowered stress almost immediately and gave me room to think before reacting.

Now my phone is a tool again, not the pace-setter for my attention.`,
  },
  {
    id: 'local-2',
    displayId: 2,
    title: 'Making the Most of Micro-Habits',
    author: 'Maya Carter',
    publishedAt: 'March 18, 2026',
    excerpt:
      "Everyday I find myself popping a jolly rancher in my mouth at exactly 5:02 p.m. I don't even think about it anymore, until yesterday. I grab...",
    body: "Everyday I find myself popping a jolly rancher in my mouth at exactly 5:02 p.m. I don't even think about it anymore, until yesterday. I grabbed a grape one. Nasty. Now, I take EXTRA PRECAUTIONS to ensure that heinous flavor doesn't end up in my mouth.",
  },
  {
    id: 'local-3',
    displayId: 3,
    title: 'Designing Better Learning Loops',
    author: 'Aisha Webster',
    publishedAt: 'March 14, 2026',
    excerpt:
      "Learning sticks when feedback arrives quickly. Instead of studying in long isolated sessions, I switched to short self-quizzing. I'll read o...",
    body: "Learning sticks when feedback arrives quickly. Instead of studying in long isolated sessions, I switched to short self-quizzing. I'll read over a few lines of material, put it down, and quiz myself on it. Just to make sure I wasn't daydreaming. That happens more often than I would like to admit :(",
  },
]

export const API_POST_LIMIT = 50

export function normalizeApiPost(post, index) {
  return {
    id: `api-${post.id}`,
    apiId: post.id,
    displayId: localPosts.length + index + 1,
    title: post.title,
    excerpt: `${post.body.slice(0, 132).trim()}...`,
    body: post.body,
    author: 'API Guest Writer',
    publishedAt: 'Imported from API',
    source: 'api',
  }
}
