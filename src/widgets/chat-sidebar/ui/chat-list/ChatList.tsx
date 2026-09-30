import cn from 'classnames'
import React, { FC, FormEvent, useState } from 'react'

import type { Chat } from '@/entities/chat'
import { formatTime } from '@/shared/lib/formatTime'
import { formatPhoneDisplay, formatPhoneToChatId } from '@/shared/lib/phone'
import { Avatar, Button, FormError, IconButton, Input } from '@/shared/ui'

import styles from './ChatList.module.css'

export interface ChatListProps {
	chats: Chat[]
	activeChatId: string | null
	onSelectChat: (chatId: string) => void
	onCreateChat: (chatId: string, title: string) => void
	onLogout: () => void
}

export const ChatList: FC<ChatListProps> = (props) => {
	const { chats, activeChatId, onSelectChat, onCreateChat, onLogout } = props

	const [showNewChat, setShowNewChat] = useState(false)
	const [phone, setPhone] = useState('')
	const [error, setError] = useState('')

	const handleCreateChat = (event: FormEvent) => {
		event.preventDefault()
		setError('')

		try {
			const chatId = formatPhoneToChatId(phone)
			const title = formatPhoneDisplay(phone)
			onCreateChat(chatId, title)
			setPhone('')
			setShowNewChat(false)
			onSelectChat(chatId)
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Ошибка')
		}
	}

	return (
		<aside className={styles.sidebar}>
			<div className={styles.header}>
				<h2 className={styles.title}>Чаты</h2>
				<div className={styles.actions}>
					<IconButton
						title='Новый чат'
						onClick={() => setShowNewChat((v) => !v)}
					>
						✏️
					</IconButton>
					<IconButton title='Выйти' onClick={onLogout}>
						⏻
					</IconButton>
				</div>
			</div>

			{showNewChat && (
				<form className={styles.newChatForm} onSubmit={handleCreateChat}>
					<Input
						className={styles.newChatInput}
						inputSize='compact'
						type='tel'
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						placeholder='Номер телефона'
					/>
					<Button type='submit' size='compact'>
						Создать
					</Button>
				</form>
			)}

			{error && (
				<FormError className={styles.errorMessage} placement='block'>
					{error}
				</FormError>
			)}

			{chats.length === 0 ? (
				<div className={styles.empty}>
					Создайте новый чат, указав номер телефона получателя
				</div>
			) : (
				<ul className={styles.list}>
					{chats.map((chat) => {
						const lastMessage = chat.messages[chat.messages.length - 1]
						const isActive = chat.chatId === activeChatId

						return (
							<li key={chat.chatId}>
								<button
									type='button'
									className={cn(styles.item, isActive && styles.itemActive)}
									onClick={() => onSelectChat(chat.chatId)}
								>
									<Avatar
										name={chat.title}
										tone={isActive ? 'muted' : 'default'}
									/>
									<div className={styles.itemContent}>
										<div className={styles.itemHeader}>
											<span className={styles.itemTitle}>{chat.title}</span>
											{lastMessage && (
												<span className={styles.itemTime}>
													{formatTime(lastMessage.timestamp)}
												</span>
											)}
										</div>
										{lastMessage && (
											<div className={styles.itemPreview}>
												{lastMessage.text}
											</div>
										)}
									</div>
								</button>
							</li>
						)
					})}
				</ul>
			)}
		</aside>
	)
}
