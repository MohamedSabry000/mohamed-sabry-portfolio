import { defineArrayMember, defineField, defineType } from 'sanity'

export const aiConversation = defineType({
  name: 'aiConversation',
  title: 'Visitor conversation',
  type: 'document',
  readOnly: true,
  fields: [
    defineField({ name: 'sessionId', title: 'Session', type: 'string' }),
    defineField({ name: 'lang', title: 'Language', type: 'string' }),
    defineField({ name: 'startedAt', title: 'Started at', type: 'datetime' }),
    defineField({ name: 'updatedAt', title: 'Last message at', type: 'datetime' }),
    defineField({
      name: 'messages',
      title: 'Messages',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'chatMessage',
          fields: [
            defineField({ name: 'role', type: 'string' }),
            defineField({ name: 'content', type: 'text' }),
            defineField({ name: 'source', type: 'string' }),
            defineField({ name: 'createdAt', type: 'datetime' }),
          ],
          preview: {
            select: { title: 'content', subtitle: 'role' },
          },
        }),
      ],
    }),
  ],
  orderings: [{ title: 'Latest first', name: 'updatedAtDesc', by: [{ field: 'updatedAt', direction: 'desc' }] }],
  preview: {
    select: { first: 'messages.0.content', updatedAt: 'updatedAt', lang: 'lang' },
    prepare: ({ first, updatedAt, lang }) => ({
      title: first ?? 'Conversation',
      subtitle: [lang?.toUpperCase(), updatedAt && new Date(updatedAt).toLocaleString()].filter(Boolean).join(' · '),
    }),
  },
})
