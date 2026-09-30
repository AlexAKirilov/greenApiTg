import type { Message } from '@/entities/message'

export interface Chat {
	chatId: string
	/** Telegram peer id from webhooks (may differ from phone `@c.us` chatId). */
	peerChatId?: string
	title: string
	phoneNumber?: string
	messages: Message[]
}
