import { useEffect, useRef } from 'react'

import { useAppDispatch } from '@/app/store'
import {
	addIncomingMessage,
	updateOutgoingMessageStatus,
} from '@/entities/chat/model/chatSlice'
import {
	deleteNotification,
	mapIncomingTextMessage,
	mapOutgoingMessageStatus,
	receiveNotification,
} from '@/entities/green-api'
import { useAuth } from '@/features/auth/model/useAuth'

function isForbiddenError(error: unknown): boolean {
	const message = error instanceof Error ? error.message : String(error ?? '')
	return /403|Forbidden/i.test(message)
}

export function useNotifications(): void {
	const dispatch = useAppDispatch()
	const { credentials, logout } = useAuth()
	const pollerRef = useRef(false)

	useEffect(() => {
		if (!credentials || pollerRef.current) {
			return
		}

		pollerRef.current = true
		let cancelled = false

		const poll = async () => {
			while (!cancelled) {
				try {
					const notification = await receiveNotification(credentials, 5)
					if (cancelled) {
						break
					}

					if (notification) {
						const incoming = mapIncomingTextMessage(notification)
						if (incoming) {
							dispatch(
								addIncomingMessage({
									chatId: incoming.chatId,
									messageId: incoming.messageId,
									text: incoming.text,
									timestamp: incoming.timestamp,
									senderPhoneNumber: incoming.senderPhoneNumber,
								})
							)
						}

						const statusUpdate = mapOutgoingMessageStatus(notification)
						if (statusUpdate) {
							dispatch(updateOutgoingMessageStatus(statusUpdate))
						}

						await deleteNotification(credentials, notification.receiptId)
					}
				} catch (error) {
					if (cancelled) {
						break
					}

					if (isForbiddenError(error)) {
						logout()
						break
					}

					await new Promise((resolve) => setTimeout(resolve, 3000))
				}
			}

			pollerRef.current = false
		}

		void poll()

		return () => {
			cancelled = true
			pollerRef.current = false
		}
	}, [credentials, dispatch, logout])
}
