import type { Chat } from '../model/types'

function phoneFromChatId(chatId: string): string | undefined {
	if (chatId.endsWith('@c.us')) {
		return chatId.replace('@c.us', '')
	}
	return undefined
}

export function findExistingChat(
	chats: Chat[],
	chatId: string,
	senderPhoneNumber?: number
): Chat | undefined {
	const phone = phoneFromChatId(chatId)

	return chats.find(
		(c) =>
			c.chatId === chatId ||
			c.peerChatId === chatId ||
			(phone !== undefined && c.phoneNumber === phone) ||
			(senderPhoneNumber !== undefined &&
				c.phoneNumber === String(senderPhoneNumber))
	)
}
