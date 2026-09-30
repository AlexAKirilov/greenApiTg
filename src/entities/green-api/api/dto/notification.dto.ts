export interface ReceiveNotificationResponseDto {
	receiptId: number
	body: IncomingNotificationBodyDto
}

export interface InstanceDataDto {
	idInstance: number
	wid: string
	typeInstance: string
}

export type OutgoingMessageDeliveryStatus =
	'sent' | 'delivered' | 'read' | 'failed' | 'noAccount'

export interface IncomingNotificationBodyDto {
	typeWebhook: string
	timestamp: number
	idMessage: string
	chatId?: string
	status?: OutgoingMessageDeliveryStatus
	description?: string
	sendByApi?: boolean
	instanceData?: InstanceDataDto
	senderData?: IncomingSenderDataDto
	messageData?: IncomingMessageDataDto
}

export interface IncomingSenderDataDto {
	chatId: string
	chatName?: string
	sender?: string
	senderName?: string
	senderPhoneNumber?: number
}

export interface IncomingMessageDataDto {
	typeMessage: string
	textMessageData?: TextMessageDataDto
}

export interface TextMessageDataDto {
	textMessage: string
}
