import { configureStore } from '@reduxjs/toolkit'

import { chatSlice } from '@/entities/chat/model/chatSlice'

import { chatPersistMiddleware } from './chatPersistMiddleware'

export const store = configureStore({
	reducer: {
		chat: chatSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(chatPersistMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
