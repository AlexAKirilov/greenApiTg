import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { OutgoingMessageStatusUpdate } from '@/entities/green-api'
import type { Message } from '@/entities/message'

import { findExistingChat } from '../lib/findExistingChat'
import { loadChats } from '../lib/storage'
import { upsertMessage } from '../lib/upsertMessage'

import type { Chat } from './types'

export interface ChatState {
	chats: Chat[]
}

const initialState: ChatState = {
	chats: loadChats(),
}

export interface IncomingMessagePayload {
	chatId: string
	messageId: string
	text: string
	timestamp: number
	senderPhoneNumber?: number
}

export interface OutgoingMessagePayload {
	chatId: string
	message: Message
}

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		createChat(
			state,
			action: PayloadAction<{ chatId: string; title: string }>
		) {
			const { chatId, title } = action.payload
			const phoneNumber = chatId.replace('@c.us', '')

			if (
				state.chats.some(
					(c) => c.chatId === chatId || c.phoneNumber === phoneNumber
				)
			) {
				return
			}

			state.chats.push({ chatId, title, phoneNumber, messages: [] })
		},
		addIncomingMessage(state, action: PayloadAction<IncomingMessagePayload>) {
			const { chatId, messageId, text, timestamp, senderPhoneNumber } =
				action.payload

			const message: Message = {
				id: messageId,
				text,
				timestamp,
				isOutgoing: false,
			}

			const existingChat = findExistingChat(
				state.chats,
				chatId,
				senderPhoneNumber
			)

			if (existingChat) {
				const index = state.chats.findIndex(
					(c) => c.chatId === existingChat.chatId
				)
				if (index !== -1) {
					if (chatId !== existingChat.chatId && !chatId.includes('@c.us')) {
						state.chats[index].peerChatId = chatId
					}
					state.chats[index].messages = upsertMessage(
						state.chats[index].messages,
						message
					)
				}
				return
			}

			state.chats.push({
				chatId,
				title: senderPhoneNumber
					? String(senderPhoneNumber)
					: chatId.replace('@c.us', ''),
				phoneNumber: senderPhoneNumber ? String(senderPhoneNumber) : undefined,
				messages: [message],
			})
		},
		addOutgoingMessage(state, action: PayloadAction<OutgoingMessagePayload>) {
			const { chatId, message } = action.payload
			const index = state.chats.findIndex((c) => c.chatId === chatId)
			if (index === -1) {
				return
			}
			state.chats[index].messages = upsertMessage(
				state.chats[index].messages,
				message
			)
		},
		updateOutgoingMessageStatus(
			state,
			action: PayloadAction<OutgoingMessageStatusUpdate>
		) {
			const { messageId, status, chatId, description } = action.payload

			for (const chat of state.chats) {
				const messageIndex = chat.messages.findIndex((m) => m.id === messageId)
				if (messageIndex === -1) {
					continue
				}

				const message = chat.messages[messageIndex]
				message.deliveryStatus = status
				if (description && (status === 'failed' || status === 'noAccount')) {
					message.deliveryError = description
				}

				if (chatId && chatId !== chat.chatId && !chatId.includes('@c.us')) {
					chat.peerChatId = chatId
				}
				return
			}

			if (!chatId) {
				return
			}

			const chat = findExistingChat(state.chats, chatId)
			if (!chat) {
				return
			}

			const index = state.chats.findIndex((c) => c.chatId === chat.chatId)
			if (index !== -1 && chatId !== chat.chatId && !chatId.includes('@c.us')) {
				state.chats[index].peerChatId = chatId
			}
		},
		resetChats(state) {
			state.chats = []
		},
	},
})

export const {
	createChat,
	addIncomingMessage,
	addOutgoingMessage,
	updateOutgoingMessageStatus,
	resetChats,
} = chatSlice.actions

export const selectChats = (state: { chat: ChatState }) => state.chat.chats
