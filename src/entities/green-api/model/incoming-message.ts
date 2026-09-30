export interface IncomingTextMessage {
	chatId: string
	messageId: string
	text: string
	timestamp: number
	senderPhoneNumber?: number
}
