import { configureStore } from '@reduxjs/toolkit'

import { chatSlice, type ChatState } from '@/entities/chat/model/chatSlice'
import { authSlice, type AuthState } from '@/features/auth/model/authSlice'

export interface StoryStorePreloadedState {
	auth?: Partial<AuthState>
	chat?: Partial<ChatState>
}

export function createStoryStore(preloadedState?: StoryStorePreloadedState) {
	return configureStore({
		reducer: {
			auth: authSlice.reducer,
			chat: chatSlice.reducer,
		},
		preloadedState: preloadedState
			? {
					auth: { ...authSlice.getInitialState(), ...preloadedState.auth },
					chat: { ...chatSlice.getInitialState(), ...preloadedState.chat },
				}
			: undefined,
	})
}

export type StoryStore = ReturnType<typeof createStoryStore>
