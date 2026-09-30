import { useCallback, useSyncExternalStore } from 'react'

import type { GreenApiCredentials } from '@/entities/credentials'

import {
	getAuthCredentials,
	loginSession,
	logoutSession,
	subscribeAuth,
} from './authSession'

export function useAuth() {
	const credentials = useSyncExternalStore(
		subscribeAuth,
		getAuthCredentials,
		() => null
	)

	const login = useCallback(async (next: GreenApiCredentials) => {
		await loginSession(next)
	}, [])

	const logout = useCallback(() => {
		logoutSession()
	}, [])

	return {
		credentials,
		isAuthenticated: credentials !== null,
		login,
		logout,
	}
}
