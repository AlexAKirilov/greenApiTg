import React, { FC, useEffect, useRef } from 'react'

import { MessageBubble } from '@/shared/ui'

import type { Message } from '../../model/types'

import styles from './MessageList.module.css'

export interface MessageListProps {
	messages: Message[]
}

export const MessageList: FC<MessageListProps> = (props) => {
	const { messages } = props

	const bottomRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages])

	if (messages.length === 0) {
		return (
			<div className={styles.container}>
				<div className={styles.empty}>Напишите первое сообщение</div>
			</div>
		)
	}

	return (
		<div className={styles.container}>
			<div className={styles.messages}>
				{messages.map((message) => (
					<MessageBubble
						key={message.id}
						text={message.text}
						timestamp={message.timestamp}
						isOutgoing={message.isOutgoing}
						deliveryStatus={message.deliveryStatus}
						deliveryError={message.deliveryError}
					/>
				))}
				<div ref={bottomRef} />
			</div>
		</div>
	)
}
