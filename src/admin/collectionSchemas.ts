// Field definitions for the generic admin collection editor (CollectionPage).
// To make a new collection editable: add it to `CollectionKey`, then describe its fields here.
import type { TranslationKey } from '../i18n/translations'
import type { CollectionKey, ProjectLink } from '../types'

export type FieldType = 'localized' | 'localizedText' | 'text' | 'month' | 'tags' | 'links' | 'category' | 'checkbox' | 'slug' | 'date' | 'markdown'
export interface FieldDef {
  key: string
  label: string
  type: FieldType
  hint?: string
  defaultValue?: unknown
}

export interface Schema {
  titleKey: TranslationKey
  primary: string
  secondary?: string
  fields: FieldDef[]
}

const dateHint = 'Format: YYYY-MM (use "present" for current)'

export const today = () => new Date().toISOString().slice(0, 10)

export const schemas: Record<CollectionKey, Schema> = {
  blog: {
    titleKey: 'admin.blog',
    primary: 'title',
    secondary: 'excerpt',
    fields: [
      { key: 'title', label: 'Title', type: 'localized' },
      { key: 'slug', label: 'URL slug', type: 'slug', hint: 'Leave empty to generate it from the English title' },
      { key: 'date', label: 'Publish date', type: 'date' },
      { key: 'excerpt', label: 'Excerpt', type: 'localizedText' },
      { key: 'content', label: 'Content', type: 'markdown', hint: 'Markdown: ## Heading, **bold**, `code`, - list, 1. list, > quote, [link](https://…), ``` code block' },
      { key: 'tags', label: 'Tags', type: 'tags', hint: 'Comma separated' },
      { key: 'cover', label: 'Cover image URL (optional)', type: 'text' },
      { key: 'published', label: 'Published', type: 'checkbox', defaultValue: true },
    ],
  },
  faqs: {
    titleKey: 'admin.faq',
    primary: 'question',
    secondary: 'answer',
    fields: [
      { key: 'question', label: 'Question', type: 'localized' },
      { key: 'answer', label: 'Answer', type: 'localizedText', hint: 'Supports **bold**, links and - lists' },
    ],
  },
  experiences: {
    titleKey: 'admin.experience',
    primary: 'role',
    secondary: 'company',
    fields: [
      { key: 'company', label: 'Company', type: 'localized' },
      { key: 'role', label: 'Role', type: 'localized' },
      { key: 'start', label: 'Start', type: 'month', hint: dateHint },
      { key: 'end', label: 'End', type: 'month', hint: dateHint },
      { key: 'description', label: 'Description', type: 'localizedText' },
      { key: 'tech', label: 'Tech stack', type: 'tags', hint: 'Comma separated' },
      { key: 'link', label: 'Link', type: 'text' },
    ],
  },
  projects: {
    titleKey: 'admin.projects',
    primary: 'title',
    secondary: 'role',
    fields: [
      { key: 'title', label: 'Title', type: 'localized' },
      { key: 'role', label: 'Role', type: 'localized' },
      { key: 'description', label: 'Description', type: 'localizedText' },
      { key: 'tech', label: 'Tech stack', type: 'tags', hint: 'Comma separated' },
      { key: 'link', label: 'Link', type: 'text' },
      { key: 'links', label: 'Extra links', type: 'links', hint: 'One per line: Label | https://…' },
      { key: 'category', label: 'Category', type: 'category' },
      { key: 'featured', label: 'Featured', type: 'checkbox' },
    ],
  },
  skillGroups: {
    titleKey: 'admin.skills',
    primary: 'name',
    fields: [
      { key: 'name', label: 'Group name', type: 'localized' },
      { key: 'items', label: 'Skills', type: 'tags', hint: 'Comma separated' },
    ],
  },
  education: {
    titleKey: 'admin.education',
    primary: 'title',
    secondary: 'institution',
    fields: [
      { key: 'title', label: 'Title', type: 'localized' },
      { key: 'institution', label: 'Institution', type: 'localized' },
      { key: 'start', label: 'Start', type: 'month', hint: dateHint },
      { key: 'end', label: 'End', type: 'month', hint: dateHint },
      { key: 'details', label: 'Details', type: 'localizedText' },
    ],
  },
  certificates: {
    titleKey: 'admin.certificates',
    primary: 'title',
    secondary: 'issuer',
    fields: [
      { key: 'title', label: 'Title', type: 'localized' },
      { key: 'issuer', label: 'Issuer', type: 'localized' },
      { key: 'date', label: 'Date', type: 'month', hint: 'Format: YYYY-MM' },
      { key: 'description', label: 'Description', type: 'localizedText' },
      { key: 'link', label: 'Credential URL', type: 'text' },
    ],
  },
  languages: {
    titleKey: 'admin.languages',
    primary: 'name',
    secondary: 'level',
    fields: [
      { key: 'name', label: 'Language', type: 'localized' },
      { key: 'level', label: 'Level', type: 'localized' },
    ],
  },
}

export function parseLinks(raw: string): ProjectLink[] {
  return raw
    .split('\n')
    .map((line) => {
      const [label, ...rest] = line.split('|')
      const url = rest.join('|').trim() || label.trim()
      return { label: rest.length ? label.trim() : url, url }
    })
    .filter((link) => /^https?:\/\//.test(link.url))
}

export type AnyItem = Record<string, unknown> & { id: string }

export const emptyItem = (schema: Schema): AnyItem => {
  const item: AnyItem = { id: '' }
  for (const field of schema.fields) {
    if (field.defaultValue !== undefined) item[field.key] = field.defaultValue
    else if (field.type === 'localized' || field.type === 'localizedText' || field.type === 'markdown') item[field.key] = { en: '', ar: '' }
    else if (field.type === 'date') item[field.key] = today()
    else if (field.type === 'tags' || field.type === 'links') item[field.key] = []
    else if (field.type === 'checkbox') item[field.key] = false
    else if (field.type === 'category') item[field.key] = 'professional'
    else item[field.key] = ''
  }
  return item
}
