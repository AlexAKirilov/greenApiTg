import type { Middleware } from '@reduxjs/toolkit'

import { saveChats } from '@/entities/chat'
import { chatSlice } from '@/entities/chat/model/chatSlice'

export const chatPersistMiddleware: Middleware =
	(store) => (next) => (action) => {
		const result = next(action)

		if (typeof action === 'object' && action !== null && 'type' in action) {
			const type = action.type as string
			if (type.startsWith(`${chatSlice.name}/`)) {
				saveChats(store.getState().chat.chats)
			}
		}

		return result
	}
