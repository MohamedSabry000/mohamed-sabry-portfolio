import { defineArrayMember, defineField, defineType } from 'sanity'

export const aiAssistant = defineType({
  name: 'aiAssistant',
  title: 'Assistant settings',
  type: 'document',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Show the AI assistant on the website',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({ name: 'name', title: 'Assistant name', type: 'localizedString' }),
    defineField({ name: 'greeting', title: 'Greeting message', type: 'localizedText' }),
    defineField({
      name: 'mode',
      title: 'Response engine',
      type: 'string',
      initialValue: 'auto',
      options: {
        layout: 'radio',
        list: [
          { title: 'Auto: AI model when available, otherwise built-in engine', value: 'auto' },
          { title: 'Built-in knowledge engine only', value: 'local' },
          { title: 'AI model only (requires OPENAI_API_KEY on the server)', value: 'remote' },
        ],
      },
    }),
    defineField({
      name: 'instructions',
      title: 'Extra instructions for the AI model',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'suggestions',
      title: 'Suggested questions',
      type: 'array',
      of: [defineArrayMember({ type: 'localizedString' })],
    }),
  ],
  preview: { prepare: () => ({ title: 'Assistant settings' }) },
})
