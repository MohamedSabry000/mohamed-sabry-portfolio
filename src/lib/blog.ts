import type { BlogPost } from '../types'

export const publishedPosts = (posts: BlogPost[] = []) =>
  posts.filter((post) => post.published).sort((a, b) => b.date.localeCompare(a.date))
