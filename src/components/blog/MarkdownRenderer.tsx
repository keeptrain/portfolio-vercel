'use client'

interface MarkdownRendererProps {
  content: string
}

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  // Simple markdown to HTML conversion
  const renderMarkdown = (text: string) => {
    let html = text

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')

    // Italic
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>')

    // Code blocks
    html = html.replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')

    // Inline code
    html = html.replace(/`(.*?)`/gim, '<code>$1</code>')

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')

    // Lists
    html = html.replace(/^- (.*$)/gim, '<li>$1</li>')
    html = html.replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>')

    // Line breaks
    html = html.replace(/\n\n/gim, '</p><p>')
    html = html.replace(/\n/gim, '<br>')

    // Wrap in paragraphs
    html = '<p>' + html + '</p>'

    // Clean up empty paragraphs
    html = html.replace(/<p><\/p>/gim, '')
    html = html.replace(/<p>(<h[1-6]>)/gim, '$1')
    html = html.replace(/(<\/h[1-6]>)<\/p>/gim, '$1')
    html = html.replace(/<p>(<ul>)/gim, '$1')
    html = html.replace(/(<\/ul>)<\/p>/gim, '$1')
    html = html.replace(/<p>(<pre>)/gim, '$1')
    html = html.replace(/(<\/pre>)<\/p>/gim, '$1')

    return html
  }

  return (
    <div 
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
      style={{
        lineHeight: '1.7',
      }}
    />
  )
}

export default MarkdownRenderer