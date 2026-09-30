import type { ReceiveNotificationResponseDto } from '../api/dto'
import type { OutgoingMessageStatusUpdate } from '../model/outgoing-message-status'

export function mapOutgoingMessageStatus(
	notification: ReceiveNotificationResponseDto
): OutgoingMessageStatusUpdate | null {
	const { body } = notification

	if (body.typeWebhook !== 'outgoingMessageStatus') {
		return null
	}

	const { idMessage, status, chatId } = body

	if (!idMessage || !status) {
		return null
	}

	return {
		messageId: idMessage,
		status,
		chatId,
		description: body.description,
	}
}
