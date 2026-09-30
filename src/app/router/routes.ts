export const ROUTES = {
	login: '/login',
	messenger: '/c',
	messengerChat: (chatId: string) => `/c/${encodeURIComponent(chatId)}`,
} as const
