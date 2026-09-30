import cn from 'classnames'
import React, { FC } from 'react'

import type { OutgoingMessageDeliveryStatus } from '@/entities/green-api'
import { formatDeliveryStatus } from '@/shared/lib/deliveryStatusLabel'
import { formatTime } from '@/shared/lib/formatTime'

import styles from './MessageBubble.module.css'

export interface MessageBubbleProps {
	text: string
	timestamp: number
	isOutgoing: boolean
	deliveryStatus?: OutgoingMessageDeliveryStatus
	deliveryError?: string
}

export const MessageBubble: FC<MessageBubbleProps> = (props) => {
	const { text, timestamp, isOutgoing, deliveryStatus, deliveryError } = props
	const statusLabel = formatDeliveryStatus(deliveryStatus, isOutgoing)

	return (
		<div
			className={cn(styles.row, isOutgoing ? styles.outgoing : styles.incoming)}
		>
			<div
				className={cn(
					styles.bubble,
					isOutgoing ? styles.bubbleOutgoing : styles.bubbleIncoming
				)}
			>
				<p className={styles.text}>{text}</p>
				<div className={styles.meta}>
					{statusLabel ? (
						<span
							className={cn(
								styles.status,
								deliveryStatus === 'read' && styles.statusRead,
								(deliveryStatus === 'failed' ||
									deliveryStatus === 'noAccount') &&
									styles.statusFailed
							)}
							title={deliveryError}
						>
							{statusLabel}
						</span>
					) : null}
					<span className={styles.time}>{formatTime(timestamp)}</span>
				</div>
			</div>
		</div>
	)
}
