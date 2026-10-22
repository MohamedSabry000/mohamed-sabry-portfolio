import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  createMigrate,
  persistReducer,
  persistStore,
} from 'redux-persist'
import createWebStorage from 'redux-persist/es/storage/createWebStorage'
import { migrations } from './migrations'
import agent from './slices/agentSlice'
import chat from './slices/chatSlice'
import messages from './slices/messagesSlice'
import portfolio from './slices/portfolioSlice'
import settings from './slices/settingsSlice'

export const rootReducer = combineReducers({ portfolio, messages, chat, agent, settings })

const storage = createWebStorage('local')

const persistConfig = {
  key: 'mohamed-sabry-portfolio',
  version: 6,
  storage,
  whitelist: ['portfolio', 'messages', 'chat', 'agent', 'settings'],
  migrate: createMigrate(migrations, { debug: false }),
}

export const makeStore = (preloadedState?: Partial<ReturnType<typeof rootReducer>>) =>
  configureStore({
    reducer: persistReducer(persistConfig, rootReducer),
    preloadedState: preloadedState as never,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] },
      }),
  })

export const store = makeStore()
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
