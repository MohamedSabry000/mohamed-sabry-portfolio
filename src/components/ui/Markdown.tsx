import { Fragment, type ReactNode } from 'react'
import { cn } from '../../lib/utils'
import '../../styles/markdown.less'

const inlineRe = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\)|https?:\/\/[^\s)]+)/g
const linkRe = /^\[([^\]]+)\]\(([^)\s]+)\)$/

function renderInline(text: string): ReactNode[] {
  return text.split(inlineRe).map((part, index) => {
    if (!part) return null
    if (part.startsWith('`') && part.endsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>
    const link = linkRe.exec(part)
    if (link || /^https?:\/\//.test(part)) {
      const href = link ? link[2] : part
      const external = /^https?:/.test(href)
      return (
        <a key={index} href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
          {link ? link[1] : part}
        </a>
      )
    }
    return <Fragment key={index}>{part}</Fragment>
  })
}

const isBullet = (line: string) => /^\s*[-*]\s+/.test(line)
const isOrdered = (line: string) => /^\s*\d+[.)]\s+/.test(line)
const isSpecial = (line: string) =>
  !line.trim() || line.startsWith('```') || /^#{2,4}\s/.test(line) || line.startsWith('>') || isBullet(line) || isOrdered(line)

/** Minimal, safe Markdown renderer (no raw HTML) for blog posts and FAQ answers. */
export default function Markdown({ content, className }: { content: string; className?: string }) {
  const lines = content.replace(/\r\n/g, '\n').split('\n')
  const blocks: ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    const key = blocks.length

    if (line.startsWith('```')) {
      const code: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) code.push(lines[i++])
      i++
      blocks.push(
        <pre key={key} dir="ltr">
          <code>{code.join('\n')}</code>
        </pre>,
      )
      continue
    }

    const heading = /^(#{2,4})\s+(.*)$/.exec(line)
    if (heading) {
      const Tag = `h${heading[1].length}` as 'h2' | 'h3' | 'h4'
      blocks.push(<Tag key={key}>{renderInline(heading[2])}</Tag>)
      i++
      continue
    }

    if (isBullet(line) || isOrdered(line)) {
      const ordered = isOrdered(line)
      const test = ordered ? isOrdered : isBullet
      const items: string[] = []
      while (i < lines.length && test(lines[i])) items.push(lines[i++].replace(/^\s*(?:[-*]|\d+[.)])\s+/, ''))
      const List = ordered ? 'ol' : 'ul'
      blocks.push(
        <List key={key}>
          {items.map((item, index) => (
            <li key={index}>{renderInline(item)}</li>
          ))}
        </List>,
      )
      continue
    }

    if (line.startsWith('>')) {
      const quote: string[] = []
      while (i < lines.length && lines[i].startsWith('>')) quote.push(lines[i++].replace(/^>\s?/, ''))
      blocks.push(<blockquote key={key}>{renderInline(quote.join(' '))}</blockquote>)
      continue
    }

    if (!line.trim()) {
      i++
      continue
    }

    const paragraph: string[] = []
    while (i < lines.length && !isSpecial(lines[i])) paragraph.push(lines[i++])
    blocks.push(<p key={key}>{renderInline(paragraph.join(' '))}</p>)
  }

  return <div className={cn('prose-md', className)}>{blocks}</div>
}
