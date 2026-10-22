import { defineField, defineType } from 'sanity'

/** Matches the `faq` documents already in the dataset (plain English strings). */
export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 5, validation: (rule) => rule.required() }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: ['general', 'skills', 'experience', 'projects', 'contact'] },
    }),
    defineField({
      name: 'keywords',
      title: 'Trigger keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({ name: 'priority', title: 'Priority', type: 'number', initialValue: 0 }),
    defineField({ name: 'active', title: 'Active', type: 'boolean', initialValue: true }),
  ],
  orderings: [{ title: 'Priority', name: 'priorityDesc', by: [{ field: 'priority', direction: 'desc' }] }],
  preview: { select: { title: 'question', subtitle: 'category' } },
})
