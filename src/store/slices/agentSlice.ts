import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { defaultAgentSettings } from '../../data/portfolio'
import type { AgentSettings } from '../../types'

const agentSlice = createSlice({
  name: 'agent',
  initialState: defaultAgentSettings,
  reducers: {
    updateAgent(state, action: PayloadAction<Partial<AgentSettings>>) {
      return { ...state, ...action.payload }
    },
    resetAgent() {
      return defaultAgentSettings
    },
  },
})

export const { updateAgent, resetAgent } = agentSlice.actions
export default agentSlice.reducer
