import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ChatMessage } from '../../types'

interface ChatState {
  messages: ChatMessage[]
  totalVisitorMessages: number
}

const initialState: ChatState = { messages: [], totalVisitorMessages: 0 }

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    appendChatMessage(state, action: PayloadAction<ChatMessage>) {
      state.messages.push(action.payload)
      if (action.payload.role === 'user') state.totalVisitorMessages += 1
      if (state.messages.length > 100) state.messages.splice(0, state.messages.length - 100)
    },
    clearChat(state) {
      state.messages = []
    },
  },
})

export const { appendChatMessage, clearChat } = chatSlice.actions
export default chatSlice.reducer
