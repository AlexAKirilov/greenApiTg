import type { OutgoingMessageDeliveryStatus } from '../api/dto'

export interface OutgoingMessageStatusUpdate {
	messageId: string
	status: OutgoingMessageDeliveryStatus
	chatId?: string
	description?: string
}
