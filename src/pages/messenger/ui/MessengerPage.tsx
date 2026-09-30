import React, { FC, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { ROUTES } from '@/app/router/routes'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { createChat, selectChats } from '@/entities/chat/model/chatSlice'
import { useAuth } from '@/features/auth/model/useAuth'
import { useNotifications } from '@/features/poll-notifications'
import { sendMessageThunk } from '@/features/send-message/model/sendMessageThunk'
import { ChatList } from '@/widgets/chat-sidebar'
import { ChatWindow } from '@/widgets/chat-window'

import styles from './MessengerPage.module.css'

export const MessengerPage: FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { chatId: encodedChatId } = useParams<{ chatId?: string }>()

	const { credentials, logout } = useAuth()
	const chats = useAppSelector(selectChats)

	const activeChatId = encodedChatId ? decodeURIComponent(encodedChatId) : null
	const activeChat = useMemo(
		() => chats.find((chat) => chat.chatId === activeChatId) ?? null,
		[activeChatId, chats]
	)

	useNotifications()

	const handleCreateChat = (chatId: string, title: string) => {
		dispatch(createChat({ chatId, title }))
		navigate(ROUTES.messengerChat(chatId))
	}

	const handleSelectChat = (chatId: string) => {
		navigate(ROUTES.messengerChat(chatId))
	}

	const handleSendMessage = async (text: string) => {
		if (!activeChatId || !credentials) {
			return
		}

		await dispatch(
			sendMessageThunk({ credentials, chatId: activeChatId, text })
		).unwrap()
	}

	const handleLogout = () => {
		logout()
		navigate(ROUTES.login, { replace: true })
	}

	return (
		<div className={styles.layout}>
			<ChatList
				chats={chats}
				activeChatId={activeChatId}
				onSelectChat={handleSelectChat}
				onCreateChat={handleCreateChat}
				onLogout={handleLogout}
			/>
			<ChatWindow chat={activeChat} onSendMessage={handleSendMessage} />
		</div>
	)
}
