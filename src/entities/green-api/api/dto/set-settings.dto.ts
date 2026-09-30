export interface SetSettingsRequestDto {
	webhookUrl: string
	outgoingWebhook?: 'yes' | 'no'
	stateWebhook?: 'yes' | 'no'
	incomingWebhook?: 'yes' | 'no'
}

export interface SetSettingsResponseDto {
	result: boolean
	reason?: string
}
