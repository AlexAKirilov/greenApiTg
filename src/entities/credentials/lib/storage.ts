import { DEFAULT_API_URL } from '@/shared/config/constants'

import type { GreenApiCredentials } from '../model/types'

const CREDENTIALS_KEY = 'green-api-credentials'

export function normalizeGreenApiUrl(value: string): string {
	const trimmed = (value ?? '').trim().replace(/\/+$/, '')

	if (!trimmed) {
		return DEFAULT_API_URL
	}

	try {
		const candidate = /^https?:\/\//i.test(trimmed)
			? trimmed
			: `https://${trimmed}`
		const url = new URL(candidate)
		const hostname = url.hostname.toLowerCase()

		if (
			hostname === 'green-api.com' ||
			hostname === 'api.green-api.com' ||
			hostname.endsWith('.green-api.com')
		) {
			return `https://${hostname}`
		}

		return DEFAULT_API_URL
	} catch {
		return DEFAULT_API_URL
	}
}

export function loadCredentials(): GreenApiCredentials | null {
	try {
		const raw = localStorage.getItem(CREDENTIALS_KEY)
		if (!raw) {
			return null
		}

		const parsed = JSON.parse(raw) as Partial<GreenApiCredentials>

		if (!parsed || !parsed.idInstance || !parsed.apiTokenInstance) {
			return null
		}

		return {
			apiUrl: normalizeGreenApiUrl(parsed.apiUrl ?? DEFAULT_API_URL),
			idInstance: String(parsed.idInstance),
			apiTokenInstance: String(parsed.apiTokenInstance),
		}
	} catch {
		return null
	}
}

export function saveCredentials(credentials: GreenApiCredentials): void {
	localStorage.setItem(
		CREDENTIALS_KEY,
		JSON.stringify({
			...credentials,
			apiUrl: normalizeGreenApiUrl(credentials.apiUrl),
		})
	)
}

export function clearCredentials(): void {
	localStorage.removeItem(CREDENTIALS_KEY)
}
