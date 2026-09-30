import type { Chat } from '../model/types'

const CHATS_KEY = 'green-api-chats'

export function loadChats(): Chat[] {
	try {
		const raw = localStorage.getItem(CHATS_KEY)
		return raw ? (JSON.parse(raw) as Chat[]) : []
	} catch {
		return []
	}
}

export function saveChats(chats: Chat[]): void {
	localStorage.setItem(CHATS_KEY, JSON.stringify(chats))
}
