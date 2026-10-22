import { defineField, defineType } from 'sanity'

export const aiKnowledge = defineType({
  name: 'aiKnowledge',
  title: 'Knowledge entry',
  type: 'document',
  description: 'Facts the assistant can use when answering visitors.',
  fields: [
    defineField({
      name: 'question',
      title: 'Question / topic',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'localizedText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'keywords',
      title: 'Trigger keywords',
      description: 'Words or phrases (English or Arabic) that should return this answer.',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      description: 'Higher numbers are listed first in the AI model prompt.',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: 'question.en', subtitle: 'answer.en', active: 'active' },
    prepare: ({ title, subtitle, active }) => ({
      title: `${active === false ? '[inactive] ' : ''}${title ?? 'Untitled'}`,
      subtitle,
    }),
  },
})
