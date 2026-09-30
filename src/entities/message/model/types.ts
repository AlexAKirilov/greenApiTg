import type { OutgoingMessageDeliveryStatus } from '@/entities/green-api'

export interface Message {
	id: string
	text: string
	timestamp: number
	isOutgoing: boolean
	deliveryStatus?: OutgoingMessageDeliveryStatus
	deliveryError?: string
}
