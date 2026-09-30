import type { Message } from '@/entities/message'

export function upsertMessage(
	messages: Message[],
	message: Message
): Message[] {
	if (messages.some((m) => m.id === message.id)) {
		return messages
	}
	return [...messages, message]
}
