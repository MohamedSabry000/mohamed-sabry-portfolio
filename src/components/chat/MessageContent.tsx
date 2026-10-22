import { Fragment, type ReactNode } from 'react'

const tokenRe = /(\*\*[^*]+\*\*|https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.-]+)/g

function renderInline(text: string): ReactNode[] {
  return text.split(tokenRe).map((part, index) => {
    if (!part) return null
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>
    if (/^https?:\/\//.test(part))
      return (
        <a key={index} href={part} target="_blank" rel="noreferrer" className="break-all underline underline-offset-2">
          {part}
        </a>
      )
    if (/^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(part))
      return (
        <a key={index} href={`mailto:${part}`} className="break-all underline underline-offset-2">
          {part}
        </a>
      )
    return <Fragment key={index}>{part}</Fragment>
  })
}

export default function MessageContent({ content }: { content: string }) {
  const lines = content.split('\n')
  return (
    <div className="space-y-1">
      {lines.map((line, index) => {
        const trimmed = line.trim()
        if (!trimmed) return <div key={index} className="h-1.5" />
        const bullet = /^([•\-*])\s+/.exec(trimmed)
        if (bullet)
          return (
            <div key={index} className="flex gap-2">
              <span className="opacity-60">•</span>
              <span>{renderInline(trimmed.slice(bullet[0].length))}</span>
            </div>
          )
        return <p key={index}>{renderInline(line)}</p>
      })}
    </div>
  )
}
