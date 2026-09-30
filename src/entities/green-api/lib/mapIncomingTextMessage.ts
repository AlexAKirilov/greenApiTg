import type {
	IncomingNotificationBodyDto,
	ReceiveNotificationResponseDto,
} from '../api/dto'
import type { IncomingTextMessage } from '../model/incoming-message'

function extractTextMessage(body: IncomingNotificationBodyDto): string | null {
	if (body.typeWebhook !== 'incomingMessageReceived') {
		return null
	}
	if (body.messageData?.typeMessage !== 'textMessage') {
		return null
	}
	return body.messageData.textMessageData?.textMessage ?? null
}

export function mapIncomingTextMessage(
	notification: ReceiveNotificationResponseDto
): IncomingTextMessage | null {
	const { body } = notification
	const text = extractTextMessage(body)
	const chatId = body.senderData?.chatId ?? body.senderData?.sender

	if (!text || !chatId) {
		return null
	}

	return {
		chatId,
		messageId: body.idMessage,
		text,
		timestamp: body.timestamp * 1000,
		senderPhoneNumber: body.senderData?.senderPhoneNumber,
	}
}
