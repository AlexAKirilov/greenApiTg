import React, { FC } from 'react'

import type { Chat } from '@/entities/chat'
import { MessageList } from '@/entities/message'
import { MessageInput } from '@/features/send-message'
import { Avatar } from '@/shared/ui'

import styles from './ChatWindow.module.css'

export interface ChatWindowProps {
	chat: Chat | null
	onSendMessage: (text: string) => Promise<void>
}

export const ChatWindow: FC<ChatWindowProps> = (props) => {
	const { chat, onSendMessage } = props

	if (!chat) {
		return (
			<div className={styles.empty}>
				<span className={styles.emptyIcon}>💬</span>
				<span className={styles.emptyText}>
					Выберите чат или создайте новый
				</span>
			</div>
		)
	}

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<Avatar name={chat.title} size='sm' />
				<div className={styles.info}>
					<div className={styles.name}>{chat.title}</div>
					<div className={styles.status}>в сети</div>
				</div>
			</header>

			<MessageList messages={chat.messages} />
			<MessageInput onSend={onSendMessage} />
		</div>
	)
}
