import { createAsyncThunk } from '@reduxjs/toolkit'

import { addOutgoingMessage } from '@/entities/chat/model/chatSlice'
import type { GreenApiCredentials } from '@/entities/credentials'
import { sendMessage } from '@/entities/green-api'

interface SendMessageArgs {
	credentials: GreenApiCredentials
	chatId: string
	text: string
}

export const sendMessageThunk = createAsyncThunk<void, SendMessageArgs>(
	'sendMessage/send',
	async ({ credentials, chatId, text }, { dispatch, rejectWithValue }) => {
		try {
			const response = await sendMessage(credentials, chatId, text)
			dispatch(
				addOutgoingMessage({
					chatId,
					message: {
						id: response.idMessage,
						text,
						timestamp: Date.now(),
						isOutgoing: true,
					},
				})
			)
		} catch (error) {
			return rejectWithValue(
				error instanceof Error ? error.message : 'Не удалось отправить'
			)
		}
	}
)
