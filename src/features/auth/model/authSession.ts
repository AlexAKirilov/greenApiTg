import {
	clearCredentials,
	loadCredentials,
	normalizeGreenApiUrl,
	saveCredentials,
	type GreenApiCredentials,
} from '@/entities/credentials'
import { setInstanceSettings } from '@/entities/green-api'

type AuthListener = () => void

const listeners = new Set<AuthListener>()

/** Стабильная ссылка для useSyncExternalStore (getSnapshot не должен каждый раз создавать новый объект). */
let cachedCredentials: GreenApiCredentials | null = loadCredentials()

function credentialsEqual(
	a: GreenApiCredentials | null,
	b: GreenApiCredentials | null
): boolean {
	if (a === b) {
		return true
	}
	if (!a || !b) {
		return false
	}
	return (
		a.apiUrl === b.apiUrl &&
		a.idInstance === b.idInstance &&
		a.apiTokenInstance === b.apiTokenInstance
	)
}

function notifyListeners(): void {
	listeners.forEach((listener) => listener())
}

export function getAuthCredentials(): GreenApiCredentials | null {
	return cachedCredentials
}

export function subscribeAuth(listener: AuthListener): () => void {
	listeners.add(listener)
	return () => listeners.delete(listener)
}

export async function loginSession(
	credentials: GreenApiCredentials
): Promise<void> {
	const next: GreenApiCredentials = {
		apiUrl: normalizeGreenApiUrl(credentials.apiUrl),
		idInstance: credentials.idInstance,
		apiTokenInstance: credentials.apiTokenInstance,
	}

	if (credentialsEqual(cachedCredentials, next)) {
		return
	}

	await setInstanceSettings(next)

	saveCredentials(next)
	cachedCredentials = next
	notifyListeners()
}

export function logoutSession(): void {
	if (cachedCredentials === null) {
		return
	}

	clearCredentials()
	cachedCredentials = null
	notifyListeners()
}
