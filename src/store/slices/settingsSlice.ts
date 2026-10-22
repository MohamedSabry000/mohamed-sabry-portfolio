import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

// SHA-256 of the default admin password "admin123" — change it from Admin › Settings.
export const DEFAULT_PASSWORD_HASH =
  '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9'

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    adminUsername: 'admin',
    passwordHash: DEFAULT_PASSWORD_HASH,
  },
  reducers: {
    setCredentials(state, action: PayloadAction<{ username: string; passwordHash: string }>) {
      state.adminUsername = action.payload.username
      state.passwordHash = action.payload.passwordHash
    },
  },
})

export const { setCredentials } = settingsSlice.actions
export default settingsSlice.reducer
