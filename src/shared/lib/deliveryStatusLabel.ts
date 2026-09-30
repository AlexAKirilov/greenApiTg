import type { OutgoingMessageDeliveryStatus } from '@/entities/green-api'

export function formatDeliveryStatus(
	status: OutgoingMessageDeliveryStatus | undefined,
	isOutgoing: boolean
): string | null {
	if (!isOutgoing) {
		return null
	}

	switch (status) {
		case 'sent':
			return '✓'
		case 'delivered':
			return '✓✓'
		case 'read':
			return '✓✓'
		case 'failed':
		case 'noAccount':
			return '!'
		default:
			return '◷'
	}
}
