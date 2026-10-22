import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { ASSISTANT_ID, schemaTypes, singletonTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Mohamed Sabry — AI Assistant',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? 'rdln7m0z',
  dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('AI Assistant')
          .items([
            S.listItem()
              .title('Assistant settings')
              .id(ASSISTANT_ID)
              .child(S.document().schemaType('aiAssistant').documentId(ASSISTANT_ID)),
            S.divider(),
            S.documentTypeListItem('faq').title('FAQ'),
            S.documentTypeListItem('aiKnowledge').title('Knowledge base (bilingual)'),
            S.documentTypeListItem('aiConversation').title('Visitor conversations'),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    // The settings document is a singleton: hide it from "create new" menus.
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : actions,
  },
})
