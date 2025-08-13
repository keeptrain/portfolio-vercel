import { blogPosts, BlogPost, BlogPostTranslations } from '@/data/blogPosts'

export function getAllPosts(language: 'en' | 'id' = 'en'): BlogPost[] {
  return blogPosts
    .map(post => post[language])
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string, language: 'en' | 'id' = 'en'): BlogPost | null {
  const postTranslations = blogPosts.find(post => 
    post[language].id === slug
  )
  
  return postTranslations ? postTranslations[language] : null
}

export function getFeaturedPosts(language: 'en' | 'id' = 'en'): BlogPost[] {
  return getAllPosts(language).filter(post => post.featured)
}

export function getPostsByTag(tag: string, language: 'en' | 'id' = 'en'): BlogPost[] {
  return getAllPosts(language).filter(post => 
    post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  )
}

export function getAllTags(language: 'en' | 'id' = 'en'): string[] {
  const allTags = getAllPosts(language).flatMap(post => post.tags)
  return [...new Set(allTags)].sort()
}

export function formatDate(dateString: string, language: 'en' | 'id' = 'en'): string {
  const date = new Date(dateString)
  
  if (language === 'id') {
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function getRelatedPosts(currentPost: BlogPost, language: 'en' | 'id' = 'en', limit: number = 3): BlogPost[] {
  const allPosts = getAllPosts(language).filter(post => post.id !== currentPost.id)
  
  // Score posts based on shared tags
  const scoredPosts = allPosts.map(post => {
    const sharedTags = post.tags.filter(tag => 
      currentPost.tags.includes(tag)
    ).length
    
    return { post, score: sharedTags }
  })
  
  // Sort by score (descending) and take the limit
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post)
}