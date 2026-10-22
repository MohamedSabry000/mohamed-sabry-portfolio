import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ContactMessage } from '../../types'

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { items: [] as ContactMessage[] },
  reducers: {
    addMessage(state, action: PayloadAction<ContactMessage>) {
      state.items.unshift(action.payload)
    },
    setMessageRead(state, action: PayloadAction<{ id: string; read: boolean }>) {
      const message = state.items.find((item) => item.id === action.payload.id)
      if (message) message.read = action.payload.read
    },
    deleteMessage(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    clearMessages(state) {
      state.items = []
    },
  },
})

export const { addMessage, setMessageRead, deleteMessage, clearMessages } = messagesSlice.actions
export default messagesSlice.reducer
