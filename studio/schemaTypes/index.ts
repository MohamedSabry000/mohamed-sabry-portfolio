import { aiAssistant } from './aiAssistant'
import { aiConversation } from './aiConversation'
import { aiKnowledge } from './aiKnowledge'
import { localizedString, localizedText } from './localized'

export const ASSISTANT_ID = 'aiAssistant'
export const singletonTypes = new Set(['aiAssistant'])

export const schemaTypes = [localizedString, localizedText, aiAssistant, aiKnowledge, aiConversation]
